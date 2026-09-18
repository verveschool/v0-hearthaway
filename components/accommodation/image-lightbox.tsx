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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={`${name} photo viewer`} onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveIndex(null) }}>
          <button type="button" onClick={() => setActiveIndex(null)} className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FCC20A]" aria-label="Close photo viewer"><X className="h-6 w-6" /></button>
          <button type="button" onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)} className="absolute left-3 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FCC20A] sm:left-8" aria-label="Previous photo"><ChevronLeft className="h-7 w-7" /></button>
          <img src={images[activeIndex]} alt={`${name} photo ${activeIndex + 1}`} className="max-h-[88vh] max-w-[90vw] object-contain" />
          <button type="button" onClick={() => setActiveIndex((activeIndex + 1) % images.length)} className="absolute right-3 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FCC20A] sm:right-8" aria-label="Next photo"><ChevronRight className="h-7 w-7" /></button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-semibold text-white">{activeIndex + 1} / {images.length}</p>
        </div>
      ) : null}
    </>
  )
}
