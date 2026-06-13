const stats = [
  { value: '40+', label: 'Cities' },
  { value: '200+', label: 'Universities' },
  { value: '15k+', label: 'Students helped' },
  { value: '3', label: 'Countries' },
]

export default function TrustStatsSection() {
  return (
    <section className="bg-[#1b365d] border-t border-white/8" aria-labelledby="trust-stats-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <p id="trust-stats-heading" className="text-white/40 text-xs font-bold tracking-widest uppercase text-center mb-10">
          Trusted by students moving abroad
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-[#FFCC00] font-extrabold text-3xl lg:text-4xl mb-2">{stat.value}</div>
              <div className="text-white/60 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
