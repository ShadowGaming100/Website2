import type { Metadata } from 'next'
import CompareClient from './CompareClient'
import Breadcrumbs from '@/components/Breadcrumbs'
import { safeJsonLd } from '../../lib/safeJsonLd'

export const metadata: Metadata = {
  title: 'Compare Free Hosting Providers Side by Side',
  description:
    'Compare free hosting providers side by side: CPU, RAM, storage, supported languages, and community ratings in one table to find the best free host for your project.',
  keywords: [
    'compare free hosting',
    'free hosting comparison',
    'free hosting comparison table',
    'best free hosting',
  ],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: {
    canonical: process.env.APP_URL + '/compare',
  },
  openGraph: {
    locale: 'en_US',
    siteName: 'FreeHosts',
    type: 'website',
    url: process.env.APP_URL + '/compare',
    title: 'Compare Free Hosting Providers Side by Side | FreeHosts',
    description:
      'Compare free hosting providers side by side: CPU, RAM, storage, supported languages, and community ratings in one table.',
    images: [
      {
        url: process.env.APP_URL + '/Src/Images/banner.png',
        width: 1280,
        height: 720,
        alt: 'FreeHosts - Compare Free Hosting Providers',
      },
    ],
  },
}

export default function ComparePage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': process.env.APP_URL + '/compare#webpage',
    url: process.env.APP_URL + '/compare',
    name: 'Compare Free Hosting Providers Side by Side',
    isPartOf: { '@id': process.env.APP_URL + '/#website' },
    inLanguage: 'en',
    description:
      'Compare free hosting providers side by side on CPU, RAM, storage, languages, and community ratings.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(webPageSchema),
        }}
      />
      <Breadcrumbs siteUrl={process.env.APP_URL} items={[{ name: 'Compare Hosts', path: '/compare' }]} />
      <CompareClient />
    </>
  )
}
