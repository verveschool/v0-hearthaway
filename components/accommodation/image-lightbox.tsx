'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type ImageLightboxProps = {
  images: string[]
  name: string
}

export default function ImageLightbox({ images, name }: ImageLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const isOpen = activeIndex !== null

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') setActiveIndex((index) => index === null ? 0 : (index - 1 + images.length) % images.length)
      if (event.key === 'ArrowRight') setActiveIndex((index) => index === null ? 0 : (index + 1) % images.length)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [images.length, isOpen])

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-[#00319D] shadow-xl">
        <button type="button" onClick={() => setActiveIndex(0)} className="group relative block h-[360px] w-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FCC20A] sm:h-[500px]" aria-label={`Open ${name} main photo`}>
          <img src={images[0]} alt={name} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-7 pb-7 pt-16 text-left text-white sm:px-9 sm:pb-9">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FCC20A]">Hatfield, UK</p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold leading-tight sm:text-5xl">{name}</h1>
          </div>
          <span className="absolute right-5 top-5 rounded-full bg-black/60 px-4 py-2 text-xs font-bold text-white">View photos</span>
        </button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.slice(1, 9).map((image, index) => (
          <button key={`${image}-${index}`} type="button" onClick={() => setActiveIndex(index + 1)} className="group overflow-hidden rounded-xl border border-[#E8E6E1] bg-white text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FCC20A]" aria-label={`Open ${name} photo ${index + 2}`}>
            <img src={image} alt={`${name} photo ${index + 2}`} className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
          </button>
        ))}
      </div>
      {isOpen && activeIndex !== null ? (
        <div className="fixed inset-0 z-50 bg-[#111]" role="dialog" aria-modal="true" aria-label={`${name} photo viewer`}>
          <div className="flex h-full flex-col">
            <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4 text-white sm:px-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FCC20A]">Property gallery</p>
                <p className="mt-1 text-sm font-semibold text-white/80">{name}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-white/60">{activeIndex + 1} / {images.length}</span>
                <button type="button" onClick={() => setActiveIndex(null)} className="rounded-full border border-white/15 bg-white/10 p-2.5 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FCC20A]" aria-label="Close photo viewer"><X className="h-5 w-5" /></button>
              </div>
            </header>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 py-6 sm:px-24 sm:py-8">
              <button type="button" onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)} className="absolute left-3 z-10 rounded-full border border-white/15 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FCC20A] sm:left-8" aria-label="Previous photo"><ChevronLeft className="h-7 w-7" /></button>
              <div className="flex h-[min(72vh,760px)] w-[min(88vw,1280px)] items-center justify-center px-2 sm:px-4">
                <img src={images[activeIndex]} alt={`${name} photo ${activeIndex + 1}`} className="max-h-full max-w-full rounded-lg object-contain shadow-2xl" />
              </div>
              <button type="button" onClick={() => setActiveIndex((activeIndex + 1) % images.length)} className="absolute right-3 z-10 rounded-full border border-white/15 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FCC20A] sm:right-8" aria-label="Next photo"><ChevronRight className="h-7 w-7" /></button>
            </div>
            <div className="shrink-0 border-t border-white/10 bg-black/20 px-4 py-4 sm:px-8">
              <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto pb-1" aria-label="Photo thumbnails">
                {images.map((image, index) => <button key={`${image}-${index}`} type="button" onClick={() => setActiveIndex(index)} className={`h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FCC20A] ${index === activeIndex ? 'border-[#FCC20A]' : 'border-transparent opacity-60 hover:opacity-100'}`} aria-label={`View photo ${index + 1}`} aria-current={index === activeIndex ? 'true' : undefined}><img src={image} alt="" className="h-full w-full object-cover" /></button>)}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
