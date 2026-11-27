'use client'

import { useState, type ComponentPropsWithoutRef } from 'react'

type CatalogueImageProps = Omit<ComponentPropsWithoutRef<'img'>, 'src'> & { src: string; card?: boolean; original?: boolean }

const cardWidths = [320, 384, 480, 640, 828, 1080]
const imageWidths = [384, 640, 828, 1200, 1920]

/** Serve pre-sized local photos and resize Vita photos via their source CDN. */
export default function CatalogueImage({ src, alt, sizes = '100vw', card = false, original = false, onError, ...props }: CatalogueImageProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const isVita = /^https:\/\/cdn\.brandfolder\.io\/2EZAWJN8\/as\/[^?#]+$/.test(src)
  const isLocalPhoto = !original && /^\/(?:accommodation|iglu|neonwood|stacey|studyinn|tannhaus)\/[^?#]+\.(?:jpe?g|png|webp)$/i.test(src)
  const optimize = (isVita || isLocalPhoto) && failedSource !== src
  const vitaCard = isVita && card
  const optimized = (width: number) => {
    if (vitaCard) return `${src.replace(/\.[^/.]+$/, '.webp')}?width=${width}`
    return `${src}?width=${width}`
  }
  const widths = vitaCard ? cardWidths : imageWidths
  const fallback = vitaCard ? `${src}?width=384` : src
  const localVariant = `/catalogue-media/${card ? 'card' : 'detail'}${src}.webp`

  return <img {...props} alt={alt} sizes={optimize && isVita ? sizes : undefined}
    src={optimize ? (isVita ? optimized(vitaCard ? 480 : 828) : localVariant) : fallback}
    srcSet={optimize && isVita ? widths.map((width) => `${optimized(width)} ${width}w`).join(', ') : undefined}
    onError={(event) => { if (optimize) setFailedSource(src); onError?.(event) }} />
}
