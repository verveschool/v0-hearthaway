'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ImageOff, X } from 'lucide-react'
import type { AccommodationRoomType } from '@/app/accommodation/accommodation-data'
import { formatRoomPrice } from '@/app/accommodation/formatters'

type PropertyGalleryProps = {
  images: string[]
  rooms: AccommodationRoomType[]
  name: string
  city: string
  country: string
  cityHref: string
  /** When viewing a specific room-type listing, opens the hero on that room's own photo and pre-selects its card. Falls back to the property's first photo when that room has none. */
  activeRoomName?: string
}

/**
 * A single interactive unit: the hero/thumbnail photo gallery and the room-type
 * catalogue below it share one "which photo is showing" state. Selecting a room
 * type swaps the displayed photo to that room's own source image; property
 * photos (the exterior, communal spaces) stay visually distinct from room
 * photos so the two are never confused with each other.
 */
export default function PropertyGallery({ images, rooms, name, city, country, cityHref, activeRoomName }: PropertyGalleryProps) {
  const propertyImages = images.length ? images : ['/images/acc-halls.png']
  // Room photos that aren't already part of the property gallery are appended so every
  // source-provided room photo is reachable, without ever standing in for a room that has none.
  const roomOnlyImages = useMemo(
    () => rooms.map((room) => room.image).filter((image): image is string => Boolean(image) && !propertyImages.includes(image as string)),
    [rooms, propertyImages],
  )
  const combinedImages = useMemo(() => [...propertyImages, ...roomOnlyImages], [propertyImages, roomOnlyImages])
  const roomImageIndex = new Map(rooms.filter((room) => room.image).map((room) => [room.image as string, room.name]))
  const activeRoom = activeRoomName ? rooms.find((room) => room.name === activeRoomName) : undefined
  const initialIndex = activeRoom?.image ? Math.max(combinedImages.indexOf(activeRoom.image), 0) : 0

  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(activeRoomName ?? null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const isLightboxOpen = lightboxIndex !== null

  useEffect(() => {
    if (!isLightboxOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null)
      if (event.key === 'ArrowLeft') setLightboxIndex((index) => index === null ? 0 : (index - 1 + combinedImages.length) % combinedImages.length)
      if (event.key === 'ArrowRight') setLightboxIndex((index) => index === null ? 0 : (index + 1) % combinedImages.length)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [combinedImages.length, isLightboxOpen])

  function showRoomPhoto(room: AccommodationRoomType) {
    if (!room.image) { setSelectedRoom(room.name); return }
    const index = combinedImages.indexOf(room.image)
    if (index === -1) return
    setActiveIndex(index)
    setSelectedRoom(room.name)
  }

  const activeImage = combinedImages[activeIndex]
  const activeLabel = roomImageIndex.get(activeImage)

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-[#00319D] shadow-xl">
        <button type="button" onClick={() => setLightboxIndex(activeIndex)} className="group relative block h-[360px] w-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FCC20A] sm:h-[500px]" aria-label={`Open ${name} photo viewer`}>
          <img src={activeImage} alt={activeLabel ? `${activeLabel} at ${name}` : name} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pt-16" aria-hidden="true" />
          <span className="absolute right-5 top-5 rounded-full bg-black/60 px-4 py-2 text-xs font-bold text-white">View photos</span>
          {activeLabel ? <span className="absolute left-5 top-5 rounded-full bg-[#FCC20A] px-4 py-2 text-xs font-bold text-[#1A1A1A]">{activeLabel} room photo</span> : null}
        </button>
        <div className="pointer-events-none absolute bottom-7 left-7 right-7 text-white sm:bottom-9 sm:left-9 sm:right-9">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FCC20A]"><Link href={cityHref} className="pointer-events-auto hover:underline">{city}</Link>, {country}</p>
          <h1 className="mt-2 font-heading text-4xl font-extrabold leading-tight sm:text-5xl">{name}</h1>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {combinedImages.slice(1, 9).map((image, index) => (
          <button key={`${image}-${index}`} type="button" onClick={() => { setActiveIndex(index + 1); setSelectedRoom(roomImageIndex.get(image) ?? null) }} className={`group overflow-hidden rounded-xl border bg-white text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FCC20A] ${activeIndex === index + 1 ? 'border-[#00319D]' : 'border-[#E8E6E1]'}`} aria-label={`Show ${roomImageIndex.get(image) ? `${roomImageIndex.get(image)} room photo` : `photo ${index + 2}`}`}>
            <img src={image} alt={roomImageIndex.get(image) ? `${roomImageIndex.get(image)} at ${name}` : `${name} photo ${index + 2}`} className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-extrabold text-[#1A1A1A]">Room types</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#6B6860]">Every room type offered at this property, as listed by the source. Select a room type to view its own photo above; a room type stays listed here even when it currently has no availability.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {rooms.map((room) => {
            const isSelected = selectedRoom === room.name
            return (
              <button
                key={room.name}
                type="button"
                onClick={() => showRoomPhoto(room)}
                aria-pressed={isSelected}
                className={`overflow-hidden rounded-2xl border text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FCC20A] ${isSelected ? 'border-[#00319D] ring-2 ring-[#00319D]' : 'border-[#E8E6E1] hover:border-[#00319D]/40'}`}
              >
                {room.image ? (
                  <div className="relative h-40 w-full overflow-hidden bg-[#F7F6F3]">
                    <img src={room.image} alt={`${room.name} at ${name}`} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex h-24 w-full items-center gap-2 bg-[#F7F6F3] px-5 text-xs font-semibold text-[#6B6860]">
                    <ImageOff className="h-4 w-4 shrink-0" aria-hidden="true" />
                    No photo provided by the source for this room type
                  </div>
                )}
                <div className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-heading text-lg font-extrabold text-[#1A1A1A]">{room.name}</h3>
                    {room.availabilityNote ? <span className="max-w-full rounded-full bg-[#F7F6F3] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#6B6860]">{room.availabilityNote}</span> : null}
                  </div>
                  <p className={`mt-2 font-heading text-xl font-extrabold ${room.price.priceOnEnquiry ? 'text-[#6B6860]' : 'text-[#00319D]'}`}>{formatRoomPrice(room.price)}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-[#6B6860]">Tentative price &mdash; subject to change, dates and contract terms</p>
                  {room.price.conditions ? <p className="mt-1 text-xs leading-relaxed text-[#6B6860]">{room.price.conditions}</p> : null}
                  {room.tenancy ? <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#6B6860]">{room.tenancy}</p> : null}
                  {room.features?.length ? (
                    <ul className="mt-3 space-y-1.5">
                      {room.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FCC20A]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {isLightboxOpen && lightboxIndex !== null ? (
        <div className="fixed inset-0 z-50 bg-[#111]" role="dialog" aria-modal="true" aria-label={`${name} photo viewer`}>
          <div className="flex h-full flex-col">
            <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4 text-white sm:px-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FCC20A]">{roomImageIndex.get(combinedImages[lightboxIndex]) ? `${roomImageIndex.get(combinedImages[lightboxIndex])} room photo` : 'Property gallery'}</p>
                <p className="mt-1 text-sm font-semibold text-white/80">{name}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-white/60">{lightboxIndex + 1} / {combinedImages.length}</span>
                <button type="button" onClick={() => setLightboxIndex(null)} className="rounded-full border border-white/15 bg-white/10 p-2.5 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FCC20A]" aria-label="Close photo viewer"><X className="h-5 w-5" /></button>
              </div>
            </header>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 py-6 sm:px-24 sm:py-8">
              <button type="button" onClick={() => setLightboxIndex((lightboxIndex - 1 + combinedImages.length) % combinedImages.length)} className="absolute left-3 z-10 rounded-full border border-white/15 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FCC20A] sm:left-8" aria-label="Previous photo"><ChevronLeft className="h-7 w-7" /></button>
              <div className="h-[min(72vh,760px)] w-[min(88vw,1280px)] px-2 sm:px-4">
                <img src={combinedImages[lightboxIndex]} alt={roomImageIndex.get(combinedImages[lightboxIndex]) ? `${roomImageIndex.get(combinedImages[lightboxIndex])} at ${name}` : `${name} photo ${lightboxIndex + 1}`} className="h-full w-full rounded-lg object-contain shadow-2xl" />
              </div>
              <button type="button" onClick={() => setLightboxIndex((lightboxIndex + 1) % combinedImages.length)} className="absolute right-3 z-10 rounded-full border border-white/15 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FCC20A] sm:right-8" aria-label="Next photo"><ChevronRight className="h-7 w-7" /></button>
            </div>
            <div className="shrink-0 border-t border-white/10 bg-black/20 px-4 py-4 sm:px-8">
              <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto pb-1" aria-label="Photo thumbnails">
                {combinedImages.map((image, index) => <button key={`${image}-${index}`} type="button" onClick={() => setLightboxIndex(index)} className={`h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FCC20A] ${index === lightboxIndex ? 'border-[#FCC20A]' : 'border-transparent opacity-60 hover:opacity-100'}`} aria-label={`View photo ${index + 1}`} aria-current={index === lightboxIndex ? 'true' : undefined}><img src={image} alt="" className="h-full w-full object-cover" /></button>)}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
