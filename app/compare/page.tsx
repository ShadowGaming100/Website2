import type { Metadata } from 'next'
import CompareClient from './CompareClient'

export const metadata: Metadata = {
  title: 'Compare Hosts | FreeHosts',
  description: 'Compare free hosting providers side by side. Evaluate CPU, RAM, storage, supported languages, and ratings to find the best free host for your project.',
}

export default function ComparePage() {
  return <CompareClient />
}
