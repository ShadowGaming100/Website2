import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@/lib/fontawesome';
import FontAwesomeInit from '@/components/FontAwesomeInit';
import { ThemeProvider } from '@/contexts/ThemeContext';
import LayoutContent from '@/components/LayoutContent';
import ThemeScript from '@/components/ThemeScript';

const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://freehosts.space'),
  title: {
    default: 'FreeHosts — Free Hosting for Websites, Bots & Apps',
    template: '%s | FreeHosts',
  },
  description: 'Find reliable free hosting for websites, bots, apps, and Discord communities. Join our community directory to discover no-cost hosting solutions.',
  keywords: ['free hosting', 'web hosting', 'bot hosting', 'Discord bot hosting', 'static site hosting', 'app hosting'],
  authors: [{ name: 'FreeHosts Team' }],
  creator: 'FreeHosts',
  publisher: 'FreeHosts',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freehosts.space',
    siteName: 'FreeHosts',
    title: 'FreeHosts — Free Hosting for Websites, Bots & Apps',
    description: 'Find reliable free hosting for websites, bots, apps, and Discord communities. Join our community directory to discover no-cost hosting solutions.',
    images: [
      {
        url: '/Src/Images/social-preview.png',
        width: 1280,
        height: 720,
        alt: 'FreeHosts — Discover Free Hosting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeHosts — Free Hosting for Websites, Bots & Apps',
    description: 'Find reliable free hosting for websites, bots, apps, and Discord communities. Join our community directory to discover no-cost hosting solutions.',
    images: ['/Src/Images/social-preview.png'],
    creator: '@freehosts_',
    site: '@freehosts_',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col antialiased font-sans">
        <FontAwesomeInit />
        <ThemeProvider>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
