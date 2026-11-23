import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type PageBannerProps = {
  title: string
  action?: { label: string; href: string }
}

export default function PageBanner({ title, action }: PageBannerProps) {
  let headingSize = 'text-3xl sm:text-4xl lg:text-5xl'
  if (title.length > 60) {
    headingSize = 'text-xl min-[400px]:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl'
  } else if (title.length > 40) {
    headingSize = 'text-2xl sm:text-4xl lg:text-5xl'
  }

  return (
    <header className="flex min-h-[210px] items-center bg-[#00319D] px-6 py-3 text-white max-[360px]:px-4 lg:min-h-[230px] lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <h1 className={`font-heading ${headingSize} font-extrabold leading-tight tracking-tight [overflow-wrap:anywhere]`}>
          {title}
        </h1>

        {action && (
          <Link
            href={action.href}
            className="secondary-cta mt-5 inline-flex min-h-11 max-w-full items-center gap-2 px-4 py-2.5 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCC20A] sm:mt-6"
          >
            {action.label}
            <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
          </Link>
        )}
      </div>
    </header>
  )
}
