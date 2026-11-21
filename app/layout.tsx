import type { Metadata, Viewport } from 'next'
import { Noto_Sans, Noto_Sans_Telugu, Poppins } from 'next/font/google'
import { SiteProviders } from '@/components/SiteProviders'
import { university } from '@/data/site'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const noto = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto',
  display: 'swap',
})

// Loaded only when Telugu glyphs appear on the page (unicode-range), so English
// visitors on slow connections don't download it.
const telugu = Noto_Sans_Telugu({
  subsets: ['telugu'],
  variable: '--font-telugu',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: `${university.name.en} | ${university.state.en}`,
  description:
    'Dr. Y.S.R. Horticultural University, Venkataramannagudem, West Godavari — horticultural education, research and extension for Andhra Pradesh. Admissions, notifications, research and contacts.',
  keywords: ['Dr.YSRHU', 'Horticultural University', 'Andhra Pradesh', 'Venkataramannagudem', 'B.Sc Horticulture admissions'],
  openGraph: {
    title: university.name.en,
    description: 'Horticultural education, research and extension for Andhra Pradesh.',
    images: ['/img/hero-orchard.jpg'],
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0e3322',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${noto.variable} ${telugu.variable}`}
    >
      <body>
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  )
}
