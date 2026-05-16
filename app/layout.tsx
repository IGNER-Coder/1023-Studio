import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(SITE_SETTINGS_QUERY)
  const siteName = settings?.siteName ?? '1023 Studios'
  const description = settings?.tagline ?? 'A visual documentation practice based in Nairobi.'

  return {
    metadataBase: new URL('https://1023studios.com'),
    title: {
      default: siteName,
      template: `%s — ${siteName}`,
    },
    description,
    openGraph: {
      title: siteName,
      description,
      siteName,
      type: 'website',
      locale: 'en_KE',
      images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description,
      images: ['/og-default.jpg'],
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-paper text-ink font-sans antialiased" suppressHydrationWarning>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
