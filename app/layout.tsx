import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'HearthAway — Find the right accommodation before you arrive',
  description:
    'HearthAway helps international students find verified student accommodation near their university in the UK, Ireland, and Australia — before they fly.',
  keywords:
    'student accommodation, international students, UK student housing, university accommodation, student housing abroad',
  openGraph: {
    title: 'HearthAway — Find the right accommodation before you arrive',
    description:
      'Guided accommodation for international students. Find your home near your university before you arrive.',
    type: 'website',
    locale: 'en_GB',
  },
}

export const viewport: Viewport = {
  themeColor: '#1B365D',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
