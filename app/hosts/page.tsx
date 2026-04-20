import { fetchHosts } from '../../lib/cache'
import HostsClient from './HostsClient'

export const runtime = 'edge';

export const metadata = {
  title: 'Hosting Directory - FreeHosts',
  description: 'Find trusted free hosting for websites, bots, and apps. Compare reliable providers in the FreeHosts Hosting Directory.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://freehosts.space/',
  },
  themeColor: '#071028',
  openGraph: {
    locale: 'en_US',
    siteName: 'FreeHosts',
    type: 'website',
    url: 'https://freehosts.space/',
    title: 'Hosting Directory - FreeHosts',
    description: 'Find trusted free hosting for websites, bots, and apps. Compare reliable providers in the FreeHosts Hosting Directory.',
    images: [
      {
        url: 'https://freehosts.space/Src/Images/social-preview.png',
        width: 1280,
        height: 720,
        alt: 'FreeHosts — Discover Free Hosting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hosting Directory - FreeHosts',
    description: 'Find trusted free hosting for websites, bots, and apps. Compare reliable providers in the FreeHosts Hosting Directory.',
    images: [
      {
        url: 'https://freehosts.space/Src/Images/social-preview.png',
        alt: 'FreeHosts — Discover Free Hosting',
      },
    ],
    site: '@freehosts_',
    creator: '@freehosts_',
  },
  other: {
    'application/ld+json': {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://freehosts.space/#website',
          url: 'https://freehosts.space/',
          name: 'FreeHosts',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://freehosts.space/hosts?search={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@type': 'Organization',
          '@id': 'https://freehosts.space/#organization',
          name: 'FreeHosts',
          url: 'https://freehosts.space/',
          logo: 'https://freehosts.space/Src/Images/icon.png',
          sameAs: [
            'https://x.com/freehosts_',
            'https://www.instagram.com/freehosts/',
            'https://github.com/freehostsofficial',
            'https://discord.gg/QbeZ3b5CQd'
          ],
          description: 'FreeHosts is a community-curated directory of free hosting providers and services.'
        },
        {
          '@type': 'WebPage',
          '@id': 'https://freehosts.space/#homepage',
          url: 'https://freehosts.space/',
          name: 'FreeHosts — Discover Free Hosting',
          isPartOf: { '@id': 'https://freehosts.space/#website' },
          inLanguage: 'en',
          description: 'FreeHosts helps developers, students, and makers discover and compare reliable free hosting for websites, bots, and more.'
        }
      ]
    }
  }
}

export default async function HostsPage() {
  const hosts = await fetchHosts()
  
  return <HostsClient initialHosts={hosts} />
}
