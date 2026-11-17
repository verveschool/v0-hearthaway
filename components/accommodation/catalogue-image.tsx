'use client'

import { useState, type ComponentPropsWithoutRef } from 'react'

type CatalogueImageProps = Omit<ComponentPropsWithoutRef<'img'>, 'src'> & { src: string }

/** Resize local photos via Vercel and Vita photos via their source CDN. */
export default function CatalogueImage({ src, alt, sizes = '100vw', onError, ...props }: CatalogueImageProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const isLocal = src.startsWith('/') && !src.startsWith('//')
  const isVita = /^https:\/\/cdn\.brandfolder\.io\/2EZAWJN8\/as\/[^?#]+$/.test(src)
  const optimize = (isLocal || isVita) && failedSource !== src
  const optimized = (width: number) => isVita
    ? `${src}?width=${width}`
    : `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`
  const widths = [384, 640, 828, 1200, 1920]

  return <img {...props} alt={alt} sizes={optimize ? sizes : undefined}
    src={optimize ? optimized(828) : src}
    srcSet={optimize ? widths.map((width) => `${optimized(width)} ${width}w`).join(', ') : undefined}
    onError={(event) => { if (optimize) setFailedSource(src); onError?.(event) }} />
}
