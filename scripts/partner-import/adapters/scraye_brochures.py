"""Reconcile the agent portal index with the partner's linked, public rental brochures."""
import argparse
import hashlib
import json
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from decimal import Decimal
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import HTTPRedirectHandler, build_opener

from lxml import html


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def read_brochure(card):
    listing_id = card["url"].rsplit("/", 1)[-1]
    if not re.fullmatch(r"[a-f0-9]{24}", listing_id):
        raise ValueError("Invalid listing ID")
    link = card["brochure"]
    if not re.fullmatch(r"https://www\.propertyhive\.io/[a-f0-9]{24}/" + listing_id, link):
        raise ValueError("Invalid partner brochure URL")
    for attempt in range(3):
        try:
            with build_opener(NoRedirect()).open(link, timeout=20) as response:
                body = response.read(2_000_001)
            break
        except HTTPError as error:
            if error.code not in (429, 502, 503, 504) or attempt == 2:
                raise
            delay = error.headers.get("Retry-After", "")
            if delay and (not delay.isdigit() or int(delay) > 60):
                raise
            time.sleep(int(delay) if delay else 2 ** attempt)
        except (TimeoutError, URLError):
            if attempt == 2:
                raise
            time.sleep(2 ** attempt)
    if len(body) > 2_000_000:
        raise ValueError("Brochure exceeded size limit")
    doc = html.fromstring(body, parser=html.HTMLParser(encoding="utf-8"))
    title = doc.xpath("//h1")
    if len(title) != 1:
        raise ValueError("Missing listing heading")
    ref, sep, address = title[0].text_content().partition(" · ")
    if not sep or not re.fullmatch(r"\d+#", ref) or ref not in card["label"]:
        raise ValueError("Brochure reference differs from portal card")
    header = title[0].getparent().getparent()
    rent = re.search(r"£([\d,]+(?:\.\d{1,2})?)\s*pcm", header.text_content(), re.I)
    card_rent = re.search(r"£([\d,]+(?:\.\d{1,2})?)\s*pcm", card["label"], re.I)
    if not rent or not card_rent or rent[1].replace(",", "") != card_rent[1].replace(",", ""):
        raise ValueError("Monthly rent differs between portal and brochure")
    details = doc.xpath('//h2[normalize-space()="Features and description"]/..')
    description = details[0].xpath('./p[contains(@class,"whitespace-pre-wrap")]') if details else []
    if len(description) != 1:
        raise ValueError("Missing source description")
    description = description[0].text_content().strip()
    photos = doc.xpath('//h2[normalize-space()="Photos"]/..//img')
    if len(photos) != len(card["photoLabels"]) or not photos:
        raise ValueError("Brochure and portal photo counts differ")
    images = []
    captions = dict(zip(card.get("photoFiles", []), card["photoLabels"]))
    for node in photos:
        src = node.get("src", "")
        if urlsplit(src).scheme != "https" or urlsplit(src).netloc != "assets.scraye.com":
            raise ValueError("Unexpected image source")
        filename = urlsplit(src).path.rsplit("/", 1)[-1]
        images.append({"url": src, "alt": captions.get(filename) or node.get("alt")})
    header_lines = header.xpath("./div[last()]/div/text()")
    payments = doc.xpath('//h2[normalize-space()="Rent payment options"]/..')
    return {
        "external_id": listing_id, "reference": ref, "address": address, "brochure_url": link,
        "observed_at": datetime.now(timezone.utc).isoformat(), "source_url": card["url"],
        "price_minor": int(Decimal(rent[1].replace(",", "")) * 100), "currency": "GBP", "period": "month",
        "location_availability_deposits": header_lines, "description": description,
        "monetary_source_lines": [line.strip() for line in description.splitlines() if "£" in line],
        "features": [n.getparent().text_content().strip() for n in details[0].xpath(".//img")],
        "payment_conditions": [" ".join(n.itertext()).strip() for n in payments[0].xpath("./div/div")] if payments else [],
        "illustrative_on_card": "illustrative" in card["label"].lower(),
        "images": images,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("index", type=Path, help="JSON array of portal cards")
    parser.add_argument("directory", type=Path, help="private checkpoint directory")
    args = parser.parse_args()
    cards = json.loads(args.index.read_text())
    args.directory.mkdir(mode=0o700, parents=True, exist_ok=True)

    def capture(card):
        key = hashlib.sha256(json.dumps(card, sort_keys=True).encode()).hexdigest()
        target = args.directory / (key + ".json")
        if target.exists() and 0 <= time.time() - target.stat().st_mtime < 3600:
            saved = json.loads(target.read_text())
            if "record" in saved:
                return saved
        try:
            result = {"record": read_brochure(card)}
        except (ValueError, OSError, IndexError) as error:
            result = {"source_url": card["url"], "error": str(error)}
        temporary = target.with_suffix(".partial")
        temporary.write_text(json.dumps(result))
        temporary.replace(target)
        return result

    with ThreadPoolExecutor(max_workers=6) as workers:
        result = list(workers.map(capture, cards))
    valid = sum("record" in item for item in result)
    print(f"Verified {valid} of {len(result)} official brochures")
    return int(valid != len(cards))


if __name__ == "__main__":
    sys.exit(main())
