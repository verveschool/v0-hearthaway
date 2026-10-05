export default function ReviewCollector() {
  return (
    <section className="bg-[#F7F6F3] border-y border-[#E8E6E1] py-12" aria-labelledby="review-collector-heading">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#00319D]">Your experience matters</p>
        <h2 id="review-collector-heading" className="font-heading text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
          Help another student move with confidence.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#6B6860]">
          Had a good experience with HearthAway? Share your story on Trustpilot and help future students make a confident move.
        </p>
        <div className="mx-auto mt-8 max-w-xl">
          {/* TrustBox widget - Review Collector */}
          <div
            className="trustpilot-widget"
            data-locale="en-US"
            data-template-id="56278e9abfbbba0bdcd568bc"
            data-businessunit-id="6a321976a30ac9aadd7ffc87"
            data-style-height="52px"
            data-style-width="100%"
            data-token="f549839c-e32a-4086-8f65-f9a53265ff20"
          >
            <a href="https://www.trustpilot.com/review/hearthaway.com" target="_blank" rel="noopener">
              Trustpilot
            </a>
          </div>
          {/* End TrustBox widget */}
        </div>
      </div>
    </section>
  )
}
