'use client'

import { useState, useCallback } from 'react'
import Link from '@/components/NoPrefetchLink'
import { type Host } from '../lib/cache'
import { slugify } from '../lib/slugify'
import { getLanguageName } from '../lib/getLanguageName'
import { ArrowLeft, Check, Copy, Cpu, Crosshair, ExternalLink, Gift, HardDrive, Info, Languages, Link as LinkIcon, MemoryStick, Settings, Star, ThumbsDown, ThumbsUp } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { showToast } from './Toast'
import { useFavorites } from '../contexts/FavoritesContext'

interface HostDetailClientProps { host: Host }

export default function HostDetailClient({ host }: HostDetailClientProps) {
  const [showDiscordModal, setShowDiscordModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()
  const totalReviews = (host.approvals || 0) + (host.disapprovals || 0)
  const rating = totalReviews > 0 ? Math.round(((host.approvals || 0) / totalReviews) * 100) : 0
  const statusClass = host.status && host.status.toLowerCase() === 'online' ? 'online' : 'closed'
  const typeDisplay = host.type ? host.type.split(',').map(t => t.trim().replace(/\s*\([^)]*\)/g, '').trim()).join(', ') : 'Unknown'

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      showToast('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      showToast('Failed to copy link', 'error')
    }
  }, [])

  function escapeHtml(text: string): string {
    if (typeof text !== 'string') return ''
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
  }

  function formatInfoText(text?: string): string {
    if (!text) return ''
    const lines = text.split('\n').filter(l => l.trim())
    let html = '<ul>'
    let inSublist = false
    lines.forEach(line => {
      const trimmed = line.trim()
      if (trimmed.startsWith('-')) {
        if (!inSublist) { html += '<ul>'; inSublist = true }
        html += `<li>${escapeHtml(trimmed.substring(1).trim())}</li>`
      } else {
        if (inSublist) { html += '</ul>'; inSublist = false }
        html += `<li>${escapeHtml(trimmed)}</li>`
      }
    })
    if (inSublist) html += '</ul>'
    html += '</ul>'
    return html
  }

  function formatSize(mb?: number): string {
    if (!mb) return 'Unknown'
    if (mb >= 1024) return (mb / 1024).toFixed(1) + 'GB'
    return Math.round(mb) + 'MB'
  }

  const handleRedirect = useCallback((url: string) => {
    if (typeof window === 'undefined') return

    // Extract hostname for the redirect URL
    let hostname: string
    try {
      hostname = new URL(url).hostname
    } catch {
      hostname = url.replace(/^https?:\/\//, '').split('/')[0]
    }

    // Open redirect page in a new tab
    window.open(`/hosts/${slugify(host.name)}/redirect/${hostname}`, '_blank', 'noopener,noreferrer')
  }, [host.name])

  return (
    <>
      <main className="host-detail-page">
        <div className="wrap">
          <div className="host-detail-back-section">
            <Link href="/hosts" className="host-detail-back-btn">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to All Hosts</span>
            </Link>
          </div>

          <div className="host-detail-header">
            <div className="host-detail-title-section">
              <h1 className="host-detail-title">{host.name}</h1>
              <div className="host-detail-badges">
                <span className="host-type-badge">{typeDisplay}</span>
                <span className={`status-badge ${statusClass}`}>{host.status}</span>
                {(host.locale || []).map(locale => (
                  <span key={locale} className="language-badge">{getLanguageName(locale)}</span>
                ))}
              </div>
            </div>
            <div className="host-detail-header-actions">
              <button
                className={`favorite-btn icon-btn${isFavorite(host.id) ? ' active' : ''}`}
                onClick={() => toggleFavorite(host.id)}
                aria-pressed={isFavorite(host.id)}
                aria-label={isFavorite(host.id) ? `Remove ${host.name} from favorites` : `Add ${host.name} to favorites`}
                title={isFavorite(host.id) ? 'Remove from saved' : 'Save host'}
                type="button"
              >
                <Star size={16} aria-hidden="true" fill={isFavorite(host.id) ? 'currentColor' : 'none'} />
              </button>
              <button
                className="copy-link-btn"
                onClick={handleCopyLink}
                aria-label="Copy link to this host"
                title={copied ? 'Copied!' : 'Copy link'}
              >
                {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              </button>
            </div>
          </div>

          <div className="host-detail-grid">
            <div className="host-detail-main">
              {host.info && host.info.trim() && (
                <div className="info-section">
                  <h3 className="info-title"><Info size={14} aria-hidden="true" /> Information</h3>
                  <div className="info-box" dangerouslySetInnerHTML={{ __html: formatInfoText(host.info) }} />
                </div>
              )}

              {host.free_plan && host.free_plan.trim() && (
                <div className="info-section">
                  <h3 className="info-title"><Gift size={14} aria-hidden="true" /> Free Plan</h3>
                  <div className="info-box" dangerouslySetInnerHTML={{ __html: formatInfoText(host.free_plan) }} />
                </div>
              )}

              <div className="info-section">
                <h3 className="info-title"><Settings size={14} aria-hidden="true" /> Key Specifications</h3>
                <div className="specs-grid">
                  <div className="spec-box">
                    <div className="spec-box-icon"><Cpu size={20} aria-hidden="true" /></div>
                    <div className="spec-box-label">CPU</div>
                    <div className="spec-box-value">{host.cpu}</div>
                  </div>
                  <div className="spec-box">
                    <div className="spec-box-icon"><MemoryStick size={20} aria-hidden="true" /></div>
                    <div className="spec-box-label">RAM</div>
                    <div className="spec-box-value">{host.ramMB ? formatSize(host.ramMB) : host.ram}</div>
                  </div>
                  <div className="spec-box">
                    <div className="spec-box-icon"><HardDrive size={20} aria-hidden="true" /></div>
                    <div className="spec-box-label">Storage</div>
                    <div className="spec-box-value">{host.diskMB ? formatSize(host.diskMB) : host.disk}</div>
                  </div>
                  <div className="spec-box">
                    <div className="spec-box-icon"><Languages size={20} aria-hidden="true" /></div>
                    <div className="spec-box-label">Languages</div>
                    <div className="spec-box-value">{(host.locale || []).map(l => getLanguageName(l)).join(', ') || 'Unknown'}</div>
                  </div>
                </div>
              </div>

              {host.targets && host.targets.length > 0 && (
                <div className="info-section">
                  <h3 className="info-title"><Crosshair size={14} aria-hidden="true" /> Targets</h3>
                  <div className="targets-container">
                    {(host.targets || []).flatMap(target =>
                      target.split(',').map(t => {
                        const d = t.trim()
                        return d ? <div key={d} className="target-card"><p className="target-name">{d}</p></div> : null
                      }).filter(Boolean)
                    )}
                  </div>
                </div>
              )}

              {host.links && host.links.length > 0 && (
                <div className="info-section">
                  <h3 className="info-title"><LinkIcon size={14} aria-hidden="true" /> Links</h3>
                  <div className="links-list">
                    {(host.links || []).map((link, index) => (
                      <a key={index} href="#" className="link-item" onClick={(e) => { e.preventDefault(); handleRedirect(link) }}>
                        <ExternalLink size={14} aria-hidden="true" /> {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="host-detail-sidebar">
              <div className="rating-section-fullpage">
                <div className="rating-big">{rating}%</div>
                <div className="rating-votes">(Based on {totalReviews} reviews)</div>
                <div className="vote-stats">
                  <div className="vote-stat">
                    <div className="vote-count vote-up">{host.approvals || 0}</div>
                    <div className="vote-label">Upvotes</div>
                  </div>
                  <div className="vote-stat">
                    <div className="vote-count vote-down">{host.disapprovals || 0}</div>
                    <div className="vote-label">Downvotes</div>
                  </div>
                </div>
                <div className="vote-buttons">
                  <button className="vote-btn" onClick={() => setShowDiscordModal(true)}>
                    <ThumbsUp size={14} aria-hidden="true" /> Upvote
                  </button>
                  <button className="vote-btn" onClick={() => setShowDiscordModal(true)}>
                    <ThumbsDown size={14} aria-hidden="true" /> Downvote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showDiscordModal && (
        <>
          <div className="discord-overlay active" onClick={() => setShowDiscordModal(false)} />
          <div className="discord-modal active">
            <div className="discord-icon">
              <FontAwesomeIcon icon={faDiscord} aria-hidden="true" />
            </div>
            <h3 className="discord-title">Discord Required</h3>
            <p className="discord-text">You can only vote and review hosts in the Discord server!</p>
            <button className="discord-btn" onClick={() => setShowDiscordModal(false)}>Got it</button>
          </div>
        </>
      )}
    </>
  )
}
