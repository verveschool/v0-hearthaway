import Link from 'next/link'

type MatchedCTAProps = {
  title: React.ReactNode
  description?: React.ReactNode
  buttonText?: string
  buttonHref?: string
  variant?: 'full' | 'compact'
  className?: string
}

export default function MatchedCTA({
  title,
  description,
  buttonText = 'Get Matched',
  buttonHref = '/get-matched',
  variant = 'full',
  className = '',
}: MatchedCTAProps) {
  if (variant === 'compact') {
    return (
      <div className={`bg-[#F7F6F3] rounded-2xl p-6 border border-[#E8E6E1] flex items-start justify-between gap-4 ${className}`}>
        <div>
          <h3 className="font-heading font-bold text-lg text-[#1A1A1A] mb-1">{title}</h3>
          {description && <p className="text-[#6B6860] text-sm">{description}</p>}
        </div>

        <div className="flex-shrink-0">
          <Link
            href={buttonHref}
            className="px-6 py-2.5 bg-[#1B365D] text-white font-bold rounded-xl hover:bg-[#24497D] transition-colors text-sm"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-[#1B365D] rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${className}`}>
      <div className="max-w-xl">
        <h3 className="font-heading font-bold text-2xl lg:text-3xl text-white mb-2">{title}</h3>
        {description && <p className="text-white/70 text-base">{description}</p>}
      </div>

      <Link
        href={buttonHref}
        className="flex-shrink-0 px-8 py-4 bg-[#FFCC00] text-[#1B365D] font-bold text-base rounded-xl hover:bg-[#E6B800] transition-colors shadow-lg"
      >
        {buttonText}
      </Link>
    </div>
  )
}
