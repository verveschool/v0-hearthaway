export default function ReviewCollector() {
  return (
    <section className="bg-[#F7F6F3] border-y border-[#E8E6E1] py-12" aria-labelledby="review-collector-heading">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 id="review-collector-heading" className="font-heading text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
          Your experience matters.
        </h2>
        <div className="mx-auto mt-8 max-w-xl">
          <div>
            <a
              href="https://www.trustpilot.com/review/hearthaway.com"
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-lg bg-[#00319D] px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#002778] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2"
            >
              Leave a review on Trustpilot
            </a>
          </div>
          <a
            href="https://g.page/r/CQbYIORr_7-pEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-[52px] w-full items-center justify-center rounded-lg border-2 border-[#00319D] bg-white px-6 py-3 text-sm font-bold text-[#00319D] transition-colors hover:bg-[#F0F4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00319D] focus-visible:ring-offset-2"
          >
            Leave a review on Google
          </a>
        </div>
      </div>
    </section>
  )
}
