import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

const brandIconPath = '/brand/  hearthaway-icon-dark.png'
const brandBannerPath = '/brand/  hearthaway-banner-dark.png'

export const metadata: Metadata = {
  title: 'HearthAway | Find the Right Student Accommodation Before You Arrive',
  description:
    'Find student accommodation near your university in the UK, Ireland, France, Australia. HearthAway helps international students find the right place before they arrive.',
  keywords:
    'student accommodation, international students, UK student housing, university accommodation, student housing abroad',
  icons: {
    icon: [
      { url: brandIconPath, type: 'image/png', sizes: '96x96' },
    ],
    apple: brandIconPath,
  },
  openGraph: {
  title: 'HearthAway | Find the Right Student Accommodation Before You Arrive',
  description:
    'Find student accommodation near your university in the UK, Ireland, France, Australia. HearthAway helps international students choose the right place before they arrive.',
  type: 'website',
  locale: 'en_GB',
  images: [
    {
      url: brandBannerPath,
      width: 1869,
      height: 484,
      alt: 'HearthAway',
    },
  ],
},
twitter: {
  card: 'summary_large_image',
  title: 'HearthAway | Find the Right Student Accommodation Before You Arrive',
  description:
    'Find student accommodation near your university in the UK, Ireland, France, Australia. HearthAway helps international students choose the right place before they arrive.',
  images: [brandBannerPath],
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
        <SpeedInsights />
      </body>
    </html>
  )
}
