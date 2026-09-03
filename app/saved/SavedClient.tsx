'use client';

import { useEffect, useState } from 'react';
import { type Host } from '../../lib/cache';
import Link from '@/components/NoPrefetchLink';
import { slugify } from '../../lib/slugify';
import { ramDisplay, diskDisplay } from '../../lib/specs';
import { getLanguageName } from '../../lib/getLanguageName';
import { GitCompare, Star } from 'lucide-react';
import { useComparison } from '../../contexts/ComparisonContext';
import { useFavorites } from '../../contexts/FavoritesContext';

// ─── Helpers ──────────────────────────────────────────────────────────────────

// ─── HostCard ─────────────────────────────────────────────────────────────────

interface HostCardProps {
  host: Host;
}

function HostCard({ host }: HostCardProps) {
  const { isSelected, addHost, removeHost, isFull } = useComparison();
  const { isFavorite, toggleFavorite } = useFavorites();

  const ramValue = ramDisplay(host);
  const storageValue = diskDisplay(host);
  const totalReviews = (host.approvals || 0) + (host.disapprovals || 0);
  const rating = totalReviews > 0 ? Math.round(((host.approvals || 0) / totalReviews) * 100) : 0;
  const iconLetter = host.name ? host.name.charAt(0).toUpperCase() : '?';
  const statusClass = host.status && host.status.toLowerCase() === 'online' ? 'online' : 'closed';
  const typeDisplay = host.type ? host.type.split(',').map(t => t.trim().replace(/\s*\([^)]*\)/g, '').trim()) : [];

  return (
    <div className="host-card">
      {/* Top: icon + name/badges */}
      <div className="host-card-top">
        <div className="host-icon">{iconLetter}</div>
        <div className="host-name-group">
          <div className="host-name">{host.name}</div>
          <div className="badges-container">
            <span className={`status-badge ${statusClass}`}>{host.status || 'Unknown'}</span>
            {typeDisplay.map(type => (
              <span key={type} className="host-type-badge">{type}</span>
            ))}
            {(host.locale || []).map(locale => (
              <span key={locale} className="language-badge">{getLanguageName(locale)}</span>
            ))}
            {(host.targets || []).flatMap(target =>
              target.split(',').map(t => {
                const d = t.trim();
                return d ? <span key={d} className="target-badge">{d}</span> : null;
              }).filter(Boolean)
            )}
          </div>
          {host.description && (
            <p className="host-description">{host.description}</p>
          )}
        </div>
      </div>

      {/* Spec cards: CPU / RAM / Storage */}
      <div className="host-specs">
        <div className="host-spec-card">
          <div className="host-spec-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M9 2v2M2 15h2M2 9h2M15 20v2M9 20v2M20 15h2M20 9h2"/></svg>
          </div>
          <div className="spec-copy">
            <div className="spec-box-value">{host.cpu || 'Unknown'}</div>
            <div className="spec-box-label">CPU</div>
          </div>
        </div>
        <div className="host-spec-card">
          <div className="host-spec-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 19v-3"/><path d="M10 19v-3"/><path d="M14 19v-3"/><path d="M18 19v-3"/><path d="M8 11V9"/><path d="M16 11V9"/><path d="M12 11V9"/><path d="M2 15h20"/><path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z"/></svg>
          </div>
          <div className="spec-copy">
            <div className="spec-box-value">{ramValue}</div>
            <div className="spec-box-label">Memory</div>
          </div>
        </div>
        <div className="host-spec-card">
          <div className="host-spec-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>
          </div>
          <div className="spec-copy">
            <div className="spec-box-value">{storageValue}</div>
            <div className="spec-box-label">Storage</div>
          </div>
        </div>
      </div>

      {/* Footer: rating + actions */}
      <div className="host-card-footer">
        <div className="host-rating">
          <div className="rating-value">{rating}%</div>
          <div className="rating-label">{totalReviews} reviews</div>
          <div className="rating-bar">
            <div className="rating-fill" style={{ width: `${rating}%` }} />
          </div>
        </div>
        <div className="host-card-actions">
          <button
            className={`compare-btn icon-btn${isSelected(host.id) ? ' active' : ''}`}
            onClick={() => isSelected(host.id) ? removeHost(host.id) : addHost(host)}
            disabled={isFull && !isSelected(host.id)}
            aria-pressed={isSelected(host.id)}
            aria-label={isSelected(host.id) ? `Remove ${host.name} from comparison` : `Add ${host.name} to comparison`}
            type="button"
          >
            <GitCompare size={14} aria-hidden="true" />
          </button>
          <button
            className={`favorite-btn icon-btn${isFavorite(host.id) ? ' active' : ''}`}
            onClick={() => toggleFavorite(host.id)}
            aria-pressed={isFavorite(host.id)}
            aria-label={isFavorite(host.id) ? `Remove ${host.name} from favorites` : `Add ${host.name} to favorites`}
            type="button"
          >
            <Star size={14} aria-hidden="true" fill={isFavorite(host.id) ? 'currentColor' : 'none'} />
          </button>
          <Link href={`/hosts/${slugify(host.name)}`} className="view-details-btn">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── SavedClient ──────────────────────────────────────────────────────────────

interface SavedClientProps {
  allHosts: Host[];
}

export default function SavedClient({ allHosts }: SavedClientProps) {
  const { favorites } = useFavorites();
  // Suppress rendering until after hydration so we don't flash the empty
  // state while the cookie-based favorites are being loaded client-side.
  const [hasMounted, setHasMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setHasMounted(true); }, []);

  // Derive saved hosts by filtering allHosts to those whose id is in favorites.
  // IDs not found in allHosts are silently omitted (requirement 2.8).
  const savedHosts = allHosts.filter(host => favorites.includes(host.id));

  // While hydrating, render the hero + a subtle skeleton so layout doesn't jump
  if (!hasMounted) {
    return (
      <main id="main-content">
        <div id="saved-page">
          <div className="wrap">
            <section className="hero centered-hero saved-hero" aria-labelledby="saved-hero-title">
              <div className="blobs" aria-hidden="true">
                <div className="blob b1" />
                <div className="blob b2" />
                <div className="blob b3" />
              </div>
              <div className="hero-inner">
                <div className="hero-left">
                  <h1 id="saved-hero-title">Saved Hosts</h1>
                  <p className="lead">Your favorited hosting providers, all in one place.</p>
                </div>
              </div>
            </section>
            {/* Invisible placeholder — prevents layout shift */}
            <div className="saved-loading-placeholder" aria-hidden="true" />
          </div>
        </div>
      </main>
    );
  }

  if (savedHosts.length === 0) {
    return (
      <main id="main-content">
        <div id="saved-page">
          <div className="wrap">
            <section className="hero centered-hero saved-hero" aria-labelledby="saved-hero-title">
              <div className="blobs" aria-hidden="true">
                <div className="blob b1" />
                <div className="blob b2" />
                <div className="blob b3" />
              </div>
              <div className="hero-inner">
                <div className="hero-left">
                  <h1 id="saved-hero-title">Saved Hosts</h1>
                  <p className="lead">Your favorited hosting providers, all in one place.</p>
                </div>
              </div>
            </section>

            <div className="compare-empty-state">
              <div className="compare-empty-icon" aria-hidden="true">
                <Star size={48} />
              </div>
              <h2 className="compare-empty-title">No saved hosts yet</h2>
              <p className="compare-empty-desc">
                Browse the hosting directory and click the{' '}
                <Star size={14} aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
                star icon on any host card to save it here.
              </p>
              <div className="compare-empty-actions">
                <Link href="/hosts" className="btn primary">
                  Browse Hosts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content">
      <div id="saved-page">
        <div className="wrap">
          <section className="hero centered-hero saved-hero" aria-labelledby="saved-hero-title">
            <div className="blobs" aria-hidden="true">
              <div className="blob b1" />
              <div className="blob b2" />
              <div className="blob b3" />
            </div>
            <div className="hero-inner">
              <div className="hero-left">
                <h1 id="saved-hero-title">Saved Hosts</h1>
                <p className="lead">
                  {savedHosts.length === 1
                    ? 'You have 1 saved host.'
                    : `You have ${savedHosts.length} saved hosts.`}
                </p>
              </div>
            </div>
          </section>

          {/* Hosts Grid */}
          <div className="hosts-grid">
            {savedHosts.map(host => (
              <HostCard key={host.id} host={host} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
