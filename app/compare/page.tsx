import type { Metadata } from 'next'
import CompareClient from './CompareClient'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Compare Hosts | FreeHosts',
  description: 'Compare free hosting providers side by side. Evaluate CPU, RAM, storage, supported languages, and ratings to find the best free host for your project.',
  robots: { index: false, follow: true },
}

export default function ComparePage() {
  return (
    <>
      <Breadcrumbs siteUrl={process.env.APP_URL} items={[{ name: 'Compare Hosts', path: '/compare' }]} />
      <CompareClient />
    </>
  )
}
