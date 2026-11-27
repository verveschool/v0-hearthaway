import type { AccommodationRoomRecord } from '@/app/accommodation/listing-data'

const dateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' })

function formatDate(value?: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : dateFormat.format(date)
}

export default function RoomTerms({ room, compact = false }: { room: AccommodationRoomRecord; compact?: boolean }) {
  const terms = [...new Set(room.pricingOptions?.flatMap((option) => {
    const start = formatDate(option.startDate)
    const end = formatDate(option.endDate)
    const duration = option.contractDurationWeeks ? `${option.contractDurationWeeks} weeks` : undefined
    if (!start && !end && !duration) return []
    return [[option.academicYear, duration, start && `starts ${start}`, end && `ends ${end}`].filter(Boolean).join(' · ')]
  }))]
  const features = [room.accommodationFormat, room.configuration].filter(Boolean)
  return (
    <dl className="mt-4 space-y-3 text-sm text-[#4C4A45]">
      {features.length ? <div><dt className="font-bold">Room type</dt><dd>{features.join(' · ')}</dd></div> : null}
      {room.publishedAreaSqm ? <div><dt className="font-bold">Published room size</dt><dd>{room.publishedAreaSqm} m²</dd></div> : null}
      <div><dt className="font-bold">Availability</dt><dd>Check with an advisor for your dates.</dd></div>
      {!compact ? <>
        {!room.publishedAreaSqm ? <div><dt className="font-bold">Room size</dt><dd>The provider has not supplied a size in this listing.</dd></div> : null}
        <div>
          <dt className="font-bold">{terms.length ? 'Provider-listed tenancy options' : 'Move-in dates and tenancy length'}</dt>
          <dd>{terms.length ? <><ul className="mt-1 space-y-1">{terms.map((term) => <li key={term}>{term}</li>)}</ul><p className="mt-1">Ask an advisor to confirm which options still apply.</p></> : 'Ask an advisor to confirm the dates and contract lengths for this room.'}</dd>
        </div>
      </> : null}
    </dl>
  )
}
