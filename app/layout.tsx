import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
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

  const ogImages = settings?.defaultSeoImage
    ? [
        {
          url: urlFor(settings.defaultSeoImage).width(1200).height(630).quality(85).auto('format').url(),
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ]
    : []

  return {
    title: {
      default: siteName,
      template: `%s — ${siteName}`,
    },
    description,
    openGraph: {
      siteName,
      type: 'website',
      locale: 'en_KE',
      description,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      description,
      images: ogImages.map((img) => img.url),
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
