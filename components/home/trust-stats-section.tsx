import { countries } from '@/lib/country-data'
import { AnimatedMetric } from '@/components/home/home-motion'

const stats = [
  { value: 210, label: 'Cities' },
  { value: 590, label: 'Universities' },
  { value: 18, suffix: 'k', label: 'Students helped' },
  { value: countries.length, label: 'Countries' },
]

export default function TrustStatsSection() {
  return (
    <section className="bg-[#01329C]" aria-labelledby="trust-stats-heading">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <p
          id="trust-stats-heading"
          className="mb-6 text-center text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/70 sm:mb-8"
        >
          Trusted by students moving abroad
        </p>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col bg-[#01329C] px-3 py-4 text-center sm:px-5 sm:py-2">
              <dt className="order-2 text-xs font-medium text-white/75 sm:text-sm">{stat.label}</dt>
              <dd className="order-1 mb-1 font-heading text-3xl font-extrabold tracking-[-0.04em] text-[#FEBB01] sm:text-4xl">
                <AnimatedMetric value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
