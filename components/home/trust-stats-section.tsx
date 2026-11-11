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
    <section className="bg-[#01329C]" aria-label="HearthAway student trust statistics">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
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
