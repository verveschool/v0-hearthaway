'use client'

import { useState, type ComponentPropsWithoutRef } from 'react'

type CatalogueImageProps = Omit<ComponentPropsWithoutRef<'img'>, 'src'> & { src: string; card?: boolean }

const cardWidths = [320, 384, 480, 640, 828, 1080]
const imageWidths = [384, 640, 828, 1200, 1920]

/** Serve local photos directly and resize Vita photos via their source CDN. */
export default function CatalogueImage({ src, alt, sizes = '100vw', card = false, onError, ...props }: CatalogueImageProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const isVita = /^https:\/\/cdn\.brandfolder\.io\/2EZAWJN8\/as\/[^?#]+$/.test(src)
  const optimize = isVita && failedSource !== src
  const vitaCard = isVita && card
  const optimized = (width: number) => {
    if (vitaCard) return `${src.replace(/\.[^/.]+$/, '.webp')}?width=${width}`
    return `${src}?width=${width}`
  }
  const widths = vitaCard ? cardWidths : imageWidths
  const fallback = vitaCard ? `${src}?width=384` : src

  return <img {...props} alt={alt} sizes={optimize ? sizes : undefined}
    src={optimize ? optimized(vitaCard ? 480 : 828) : fallback}
    srcSet={optimize ? widths.map((width) => `${optimized(width)} ${width}w`).join(', ') : undefined}
    onError={(event) => { if (optimize) setFailedSource(src); onError?.(event) }} />
}
