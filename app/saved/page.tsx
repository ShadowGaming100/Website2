import { fetchHosts } from '../../lib/cache'
import SavedClient from './SavedClient'

export const metadata = {
  title: 'Saved Hosts | FreeHosts',
  description: 'View all your favorited free hosting providers in one place. Quickly revisit and compare the hosts you care about.',
}

export default async function SavedPage() {
  const allHosts = await fetchHosts()

  return <SavedClient allHosts={allHosts} />
}
