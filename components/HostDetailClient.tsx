'use client'

import { useState, useCallback } from 'react'
import Link from '@/components/NoPrefetchLink'
import { type Host } from '../lib/cache'
import { slugify } from '../lib/slugify'

// ─── External URL helper ──────────────────────────────────────────────────────
// Appends ?ref=freehosts.space (or &ref=… if a query string already exists).
function buildTargetUrl(raw: string): string {
  try {
    const urlObj = new URL(raw)
    urlObj.searchParams.append('ref', 'freehosts.space')
    return urlObj.toString()
  } catch {
    return raw + (raw.includes('?') ? '&ref=freehosts.space' : '?ref=freehosts.space')
  }
}

interface HostDetailClientProps {
  host: Host
}

export default function HostDetailClient({ host }: HostDetailClientProps) {
  const [showDiscordModal, setShowDiscordModal] = useState(false)

  const totalReviews = (host.approvals || 0) + (host.disapprovals || 0)
  const rating = totalReviews > 0 ? Math.round(((host.approvals || 0) / totalReviews) * 100) : 0
  const statusClass = host.status && host.status.toLowerCase() === 'online' ? 'online' : 'closed'
  
  const typeDisplay = host.type ? host.type.split(',').map(t => 
    t.trim().replace(/\s*\([^)]*\)/g, '').trim()
  ).join(', ') : 'Unknown'

  function getLanguageName(locale: string): string {
    const nameMap: { [key: string]: string } = {
      'EN': 'English', 'ES': 'Spanish', 'FR': 'French', 'DE': 'German',
      'IT': 'Italian', 'PT': 'Portuguese', 'RU': 'Russian', 'JP': 'Japanese',
      'KR': 'Korean', 'CN': 'Chinese', 'IN': 'Hindi', 'BR': 'Portuguese (BR)',
      'MX': 'Spanish (MX)', 'AR': 'Arabic', 'NL': 'Dutch', 'SE': 'Swedish',
      'NO': 'Norwegian', 'DK': 'Danish', 'FI': 'Finnish', 'PL': 'Polish',
      'TR': 'Turkish', 'SA': 'Arabic (SA)', 'AE': 'Arabic (AE)',
      'AU': 'English (AU)', 'CA': 'English (CA)', 'GB': 'English (GB)',
      'US': 'English (US)'
    }
    return nameMap[locale.toUpperCase()] || locale
  }

  function formatInfoText(text?: string): string {
    if (!text) return ''
    
    const lines = text.split('\n').filter(l => l.trim())
    let html = '<ul>'
    let inSublist = false
    
    lines.forEach(line => {
      const trimmed = line.trim()
      
      if (trimmed.startsWith('-')) {
        if (!inSublist) {
          html += '<ul>'
          inSublist = true
        }
        html += `<li>${escapeHtml(trimmed.substring(1).trim())}</li>`
      } else {
        if (inSublist) {
          html += '</ul>'
          inSublist = false
        }
        html += `<li>${escapeHtml(trimmed)}</li>`
      }
    })
    
    if (inSublist) html += '</ul>'
    html += '</ul>'
    
    return html
  }

  function escapeHtml(text: string): string {
    if (typeof text !== 'string') return ''
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  function formatSize(mb?: number): string {
    if (!mb) return 'Unknown'
    if (mb >= 1024) return (mb / 1024).toFixed(1) + 'GB'
    return Math.round(mb) + 'MB'
  }

  function getLinkType(url: string): string {
    try {
      const urlLower = url.toLowerCase()
      if (urlLower.includes('discord.gg') || urlLower.includes('discord.com/invite')) return 'Discord'
      if (urlLower.includes('panel.')) return 'Panel'
      if (urlLower.includes('dash.') || urlLower.includes('dashboard.')) return 'Dashboard'
      if (urlLower.includes('client.')) return 'Client'
      return 'Website'
    } catch {
      return 'Website'
    }
  }

  function handleVote() {
    setShowDiscordModal(true)
  }


  const handleRedirect = useCallback((url: string, hostName?: string, linkType?: string) => {
    if (typeof window === 'undefined') return

    window.open(buildTargetUrl(url), '_blank', 'noopener,noreferrer')

    const encodedUrl = encodeURIComponent(btoa(url))
    const encodedHostName = hostName ? `&hostName=${encodeURIComponent(hostName)}` : ''
    const lt = linkType ? `&linkType=${encodeURIComponent(linkType)}` : ''
    const returnTo = slugify(host.name)
    window.location.href = `/redirect/${host.id}/${encodedUrl}?${encodedHostName}${lt}&returnTo=${returnTo}`
  }, [host.name])

  return (
    <>
      <main className="host-detail-page">
        <div className="wrap">
          {/* Back Button */}
          <div className="host-detail-back-section">
            <Link 
              href="/hosts" 
              className="host-detail-back-btn"
            >
              <i className="fas fa-arrow-left"></i>
              <span>Back to All Hosts</span>
            </Link>
          </div>

          {/* Host Header */}
          <div className="host-detail-header">
            <div className="host-detail-title-section">
              <h1 className="host-detail-title">{host.name}</h1>
              <div className="host-detail-badges">
                <span className="host-type-badge">{typeDisplay}</span>
                <span className={`status-badge ${statusClass}`}>{host.status}</span>
                {(host.locale || []).map(locale => (
                  <span key={locale} className="language-badge">
                    {getLanguageName(locale)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="host-detail-grid">
            {/* Left Column - Main Content */}
            <div className="host-detail-main">
              {/* Information Section */}
              {host.info && host.info.trim() && (
                <div className="info-section">
                  <h3 className="info-title">
                    <i className="fas fa-info-circle"></i> Information
                  </h3>
                  <div 
                    className="info-box" 
                    dangerouslySetInnerHTML={{ __html: formatInfoText(host.info) }}
                  />
                </div>
              )}

              {/* Free Plan Section */}
              {host.free_plan && host.free_plan.trim() && (
                <div className="info-section">
                  <h3 className="info-title">
                    <i className="fas fa-gift"></i> Free Plan
                  </h3>
                  <div 
                    className="info-box" 
                    dangerouslySetInnerHTML={{ __html: formatInfoText(host.free_plan) }}
                  />
                </div>
              )}

              {/* Specifications */}
              <div className="info-section">
                <h3 className="info-title">
                  <i className="fas fa-cog"></i> Key Specifications
                </h3>
                <div className="specs-grid">
                  <div className="spec-box">
                    <div className="spec-box-icon">
                      <i className="fas fa-microchip"></i>
                    </div>
                    <div className="spec-box-label">CPU</div>
                    <div className="spec-box-value">{host.cpu}</div>
                  </div>
                  <div className="spec-box">
                    <div className="spec-box-icon">
                      <i className="fas fa-memory"></i>
                    </div>
                    <div className="spec-box-label">RAM</div>
                    <div className="spec-box-value">
                      {host.ramMB ? formatSize(host.ramMB) : host.ram}
                    </div>
                  </div>
                  <div className="spec-box">
                    <div className="spec-box-icon">
                      <i className="fas fa-hdd"></i>
                    </div>
                    <div className="spec-box-label">Storage</div>
                    <div className="spec-box-value">
                      {host.diskMB ? formatSize(host.diskMB) : host.disk}
                    </div>
                  </div>
                  <div className="spec-box">
                    <div className="spec-box-icon">
                      <i className="fas fa-language"></i>
                    </div>
                    <div className="spec-box-label">Languages</div>
                    <div className="spec-box-value">
                      {(host.locale || []).map(l => getLanguageName(l)).join(', ') || 'Unknown'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Targets */}
              {host.targets && host.targets.length > 0 && (
                <div className="info-section">
                  <h3 className="info-title">
                    <i className="fas fa-bullseye"></i> Targets
                  </h3>
                  <div className="targets-container">
                    {(host.targets || []).flatMap(target => 
                      target.split(',').map(t => {
                        const displayTarget = t.trim()
                        return displayTarget ? (
                          <div key={displayTarget} className="target-card">
                            <p className="target-name">{displayTarget}</p>
                          </div>
                        ) : null
                      }).filter(Boolean)
                    )}
                  </div>
                </div>
              )}

              {/* Links */}
              {host.links && host.links.length > 0 && (
                <div className="info-section">
                  <h3 className="info-title">
                    <i className="fas fa-link"></i> Links
                  </h3>
                  <div className="links-list">
                    {(host.links || []).map((link, index) => (
                      <a
                        key={index}
                        href="#"
                        className="link-item"
                        onClick={(e) => {
                          e.preventDefault()
                          const linkType = getLinkType(link)
                          handleRedirect(link, host.name, linkType)
                        }}
                      >
                        <i className="fas fa-external-link-alt"></i> {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Rating Sidebar */}
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
                  <button className="vote-btn" onClick={handleVote}>
                    <i className="fas fa-thumbs-up"></i> Upvote
                  </button>
                  <button className="vote-btn" onClick={handleVote}>
                    <i className="fas fa-thumbs-down"></i> Downvote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Discord Modal */}
      {showDiscordModal && (
        <>
          <div className="discord-overlay active" onClick={() => setShowDiscordModal(false)} />
          <div className="discord-modal active">
            <div className="discord-icon">
              <i className="fab fa-discord"></i>
            </div>
            <h3 className="discord-title">Discord Required</h3>
            <p className="discord-text">You can only vote and review hosts in the Discord server!</p>
            <button className="discord-btn" onClick={() => setShowDiscordModal(false)}>
              Got it
            </button>
          </div>
        </>
      )}
    </>
  )
}