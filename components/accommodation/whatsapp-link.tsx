'use client'

import type { ReactNode } from 'react'

type WhatsAppLinkProps = {
  children: ReactNode
  className?: string
}

export default function WhatsAppLink({ children, className }: WhatsAppLinkProps) {
  const handleClick = () => {
    const message = `Hi, I’m interested in this property: ${window.location.href}`
    window.open(`https://wa.me/917065314693?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return <button type="button" onClick={handleClick} className={className}>{children}</button>
}
