"""Extract CLV's public booking data. Requires Python 3 and lxml."""
import argparse
import json
from pathlib import Path
from urllib.parse import urlparse, urljoin
from urllib.request import urlopen
from datetime import datetime, timezone
from decimal import Decimal
from lxml import html


def label(node):
    return " ".join(node.text_content().split())


def gallery(nodes):
    photos = {}
    for node in nodes:
        url = node.get("data-lazy") or node.get("src")
        if url and urlparse(url).hostname == "cdn.campuslivingvillages.com":
            photos.setdefault(url, {"url": url, "alt": node.get("alt") or None})
    return list(photos.values())


def extract(url):
    with urlopen(url, timeout=45) as response:
        if response.geturl().rstrip("/") != url.rstrip("/"):
            raise ValueError("Scheduled village redirected; verify its identity")
        page = html.fromstring(response.read())
    rooms = []
    for group in page.xpath('//*[@data-target="booking"]'):
        for room in group.xpath('.//*[@data-room-id and @data-term-ids]'):
            room_id = room.get("data-room-id")
            offers = []
            pics = []
            for term in room.get("data-term-ids").split(","):
                nodes = group.xpath('.//*[@data-term-id=$term and @data-price]', term=term)
                prices = {Decimal(n.get("data-price")) for n in nodes if "per week" in label(n).lower()}
                if len(prices) != 1:
                    raise ValueError(f"Term {term} has ambiguous or missing weekly rent")
                related = group.xpath('.//*[contains(concat(",",@data-term-ids,","),concat(",",$term,","))]', term=term)
                options = [label(n) for n in related if n.tag == "option"]
                for n in related:
                    pics.extend(n.xpath('.//img'))
                dates = group.xpath('.//*[@data-term-ids=$term]//*[@dp-output]', term=term)
                status = group.xpath('.//span[@data-term-id=$term and contains(@class,"hero__label")]', term=term)
                offers.append({"external_id": term, "price_minor": int(prices.pop()*100),
                               "currency": "GBP", "period": "week", "conditions": options,
                               "contract_dates": [label(d) for d in dates], "status": [label(n) for n in status]})
            rooms.append({"external_id": room_id, "category": label(group.xpath(".//h3")[0]),
                          "features": label(room), "images": gallery(pics), "offers": offers})
    expected = set(page.xpath('//*[@data-target="booking"]//*[@data-term-id and @data-price]/@data-term-id'))
    discovered = [offer["external_id"] for room in rooms for offer in room["offers"]]
    if set(discovered) != expected or len(set(discovered)) != len(discovered):
        raise ValueError("Booking terms did not reconcile to room identities")
    summary = page.xpath('//meta[@name="description"]/@content')
    return {"description": summary[0] if summary else None, "source_url": url, "name": label(page.xpath("//h1")[0]),
            "observed_at": datetime.now(timezone.utc).isoformat(), "rooms": rooms,
            "images": gallery(page.xpath('//*[@data-gallery]//img')),
            "review_required": not rooms or any(not r["offers"] for r in rooms)}


def to_manifest(records, config, flexible_pages):
    properties = []
    for source in records:
        city, slug = urlparse(source["source_url"]).path.strip("/").split("/")[-2:]
        address, postcode = config["addresses"][slug]
        rooms = []
        for room in source["rooms"]:
            offers = []
            for offer in room["offers"]:
                start, end = [datetime.strptime(d, "%d %b %Y").date().isoformat()
                              for d in offer["contract_dates"]]
                offers.append({k: offer[k] for k in ("external_id", "currency", "period", "price_minor")})
                offers[-1].update(start_date=start, end_date=end, observed_at=source["observed_at"],
                                  status=" / ".join(offer["status"]) or "unknown", conditions=offer["conditions"])
            rooms.append({"external_id": room["external_id"], "name": room["category"],
                          "description": room["features"], "offers": offers, "images": room["images"]})
        flexibility = ({"short_stay_enquiry_url": config["short_stays_page"]}
                       if source["source_url"].rstrip("/") in flexible_pages else {})
        properties.append({**flexibility, "external_id": slug, "name": source["name"], "source_url": source["source_url"],
                           "description": source.get("description"), "address": address, "postcode": postcode,
                           "city": city.title(), "country": "GB", "images": source["images"], "rooms": rooms})
    return {"schema_version": 1, "partner": config["slug"], "expected_count": len(config["inventory_pages"]),
            "observed_at": datetime.now(timezone.utc).isoformat(), "complete": True, "properties": properties}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", required=True, type=Path)
    args = parser.parse_args()
    config = Path(__file__).resolve().parents[1] / "configs/campus-living-villages.json"
    settings = json.loads(config.read_text())
    snapshots = []
    for source in settings["inventory_pages"]:
        try:
            snapshots.append(extract(source))
        except (OSError, ValueError, IndexError) as exc:
            snapshots.append({"source_url": source, "review_required": True, "error": str(exc)})
    if any(s["review_required"] for s in snapshots):
        for s in snapshots:
            if s["review_required"]:
                print(s["source_url"], s.get("error", "missing booking data"))
        raise SystemExit(1)
    short_stays = settings["short_stays_page"]
    with urlopen(short_stays, timeout=45) as response:
        page = html.fromstring(response.read())
    flexible_pages = {urljoin(short_stays, href).rstrip("/") for href in page.xpath("//a/@href")}
    result = to_manifest(snapshots, settings, flexible_pages)
    temporary = args.out.with_suffix(".partial")
    temporary.write_text(json.dumps(result, indent=2))
    temporary.replace(args.out)
