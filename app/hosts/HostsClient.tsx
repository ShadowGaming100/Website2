'use client'

import { useState, useEffect, useCallback, Suspense, useRef, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from '@/components/NoPrefetchLink'
import { type Host } from '../../lib/cache'

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function HostsClient({ initialHosts }: { initialHosts: Host[] }) {
  return (
    <Suspense fallback={<HostsLoading />}>
      <HostsContent initialHosts={initialHosts} />
    </Suspense>
  )
}

// Loading component for Suspense fallback
function HostsLoading() {
  return (
    <main id="main-content">
      <div id="hosts-page">
        <div className="wrap">
          <section className="hero centered-hero" id="home" aria-labelledby="hero-title">
            <div className="blobs" aria-hidden="true">
              <div className="blob b1"></div>
              <div className="blob b2"></div>
              <div className="blob b3"></div>
            </div>
            <div className="hero-inner">
              <div className="hero-left">
                <h1 id="hero-title">Freee Hosting Directory</h1>
                <p className="lead">Discover and compare the best free hosting providers for your projects.</p>
              </div>
            </div>
          </section>
          <div className="loading">
            <div className="spinner"></div>
            <p style={{ color: 'var(--muted)' }}>Loading hosts...</p>
          </div>
        </div>
      </div>
    </main>
  )
}

// Main content component that uses useSearchParams
function HostsContent({ initialHosts }: { initialHosts: Host[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [hosts, setHosts] = useState<Host[]>(initialHosts)
  const [filteredHosts, setFilteredHosts] = useState<Host[]>(initialHosts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [currentFilters, setCurrentFilters] = useState({
    search: '',
    locale: '',
    target: '',
    sort: 'random'
  })
  
  // Use debounced search to reduce unnecessary updates
  const debouncedSearch = useDebounce(currentFilters.search, 300)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 5

  // Filter options state
  const [locales, setLocales] = useState<string[]>([])
  const [targets, setTargets] = useState<string[]>([])

  // Use ref to track initial load
  const initialLoad = useRef(true)

  useEffect(() => {
    if (hosts.length > 0) {
      populateFilterOptions()
      if (initialLoad.current) {
        checkURLParams()
        initialLoad.current = false
      }
    }
  }, [hosts])

  // Use debounced search in filters
  useEffect(() => {
    applyFilters()
  }, [hosts, debouncedSearch, currentFilters.locale, currentFilters.target, currentFilters.sort])

  // Only update URL when filters actually change (not during typing)
  useEffect(() => {
    if (!initialLoad.current) {
      updateURL()
    }
  }, [debouncedSearch, currentFilters.locale, currentFilters.target, currentFilters.sort])

  const populateFilterOptions = () => {
    const uniqueLocales = new Set<string>()
    const uniqueTargets = new Set<string>()

    hosts.forEach(host => {
      (host.locale || []).forEach(locale => uniqueLocales.add(locale))
      ;(host.targets || []).forEach(target => {
        if (target) {
          const targetList = target.split(',').map(t => t.trim())
          targetList.forEach(singleTarget => {
            if (singleTarget) {
              const displayTarget = singleTarget.replace(/\s*\([^)]*\)/g, '').trim()
              if (displayTarget) uniqueTargets.add(displayTarget)
            }
          })
        }
      })
    })

    setLocales(Array.from(uniqueLocales).sort())
    setTargets(Array.from(uniqueTargets).sort())
  }

  const checkURLParams = () => {
    const search = searchParams.get('search')
    const locale = searchParams.get('locale')
    const target = searchParams.get('target')
    const sort = searchParams.get('sort')

    const newFilters = { ...currentFilters }
    
    if (search !== null) {
      newFilters.search = search
    }
    if (locale !== null) {
      newFilters.locale = locale
    }
    if (target !== null) {
      newFilters.target = target
    }
    if (sort !== null) {
      newFilters.sort = sort
    }

    setCurrentFilters(newFilters)
  }

  // Optimize filter application
  const applyFilters = useCallback(() => {
    if (hosts.length === 0) return

    let filtered = hosts.filter(host => {
      // Search filter with debounced value
      if (debouncedSearch) {
        const searchText = `${host.name} ${host.description || ''} ${host.info || ''} ${host.type || ''} ${(host.locale || []).join(' ')} ${(host.targets || []).join(' ')}`.toLowerCase()
        if (!searchText.includes(debouncedSearch.toLowerCase())) return false
      }

      if (currentFilters.locale && !(host.locale || []).includes(currentFilters.locale)) {
        return false
      }

      if (currentFilters.target) {
        let hasMatchingTarget = false
        ;(host.targets || []).forEach(target => {
          if (target) {
            const targetList = target.split(',').map(t => t.trim().replace(/\s*\([^)]*\)/g, '').trim())
            if (targetList.includes(currentFilters.target)) hasMatchingTarget = true
          }
        })
        if (!hasMatchingTarget) return false
      }

      return true
    })

    // Sort hosts
    filtered = sortHosts(filtered, currentFilters.sort)
    setFilteredHosts(filtered)
    setCurrentPage(1)
    updatePagination(filtered)
  }, [hosts, debouncedSearch, currentFilters.locale, currentFilters.target, currentFilters.sort])

  const sortHosts = (hostsToSort: Host[], sortBy: string): Host[] => {
    return [...hostsToSort].sort((a, b) => {
      switch (sortBy) {
        case 'random':
          return Math.random() - 0.5
        case 'recent':
          if (a.created_at && b.created_at) return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          return (b.id || 0) - (a.id || 0)
        case 'name':
          return (a.name || '').localeCompare(b.name || '')
        case 'cpu':
          return parseCPUValue(b.cpu) - parseCPUValue(a.cpu)
        case 'ram':
          return parseMemoryToMB(b.ram, b.ramMB) - parseMemoryToMB(a.ram, a.ramMB)
        case 'storage':
          return parseMemoryToMB(b.disk, b.diskMB) - parseMemoryToMB(a.disk, a.diskMB)
        default:
          return Math.random() - 0.5
      }
    })
  }

  const updatePagination = (hostsList: Host[]) => {
    const newTotalPages = Math.ceil(hostsList.length / pageSize)
    setTotalPages(newTotalPages)
    setCurrentPage(prev => Math.min(prev, Math.max(1, newTotalPages)))
  }

  // Optimize URL updates
  const updateURL = useCallback(() => {
    const params = new URLSearchParams()
    if (debouncedSearch) params.set('search', debouncedSearch)
    if (currentFilters.locale) params.set('locale', currentFilters.locale)
    if (currentFilters.target) params.set('target', currentFilters.target)
    if (currentFilters.sort && currentFilters.sort !== 'random') params.set('sort', currentFilters.sort)

    const newURL = params.toString() ? `/hosts?${params.toString()}` : '/hosts'
    window.history.replaceState({}, '', newURL)
  }, [debouncedSearch, currentFilters.locale, currentFilters.target, currentFilters.sort])

  const handleFilterChange = (filter: keyof typeof currentFilters, value: string) => {
    setCurrentFilters(prev => ({
      ...prev,
      [filter]: value
    }))
  }

  const handleSortChange = (sort: string) => {
    setCurrentFilters(prev => ({
      ...prev,
      sort
    }))
  }

  const clearFilters = () => {
    setCurrentFilters({
      search: '',
      locale: '',
      target: '',
      sort: 'random'
    })
  }

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    // Scroll to top of results
    document.getElementById('hosts-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Helper functions
  const parseCPUValue = (cpuStr?: string): number => {
    if (!cpuStr) return 0
    const percentMatch = cpuStr.match(/(\d+(\.\d+)?)%/)
    if (percentMatch) return parseFloat(percentMatch[1]) / 100
    const coreMatch = cpuStr.match(/(\d+(\.\d+)?)\s*(vCores|cores|core)/i)
    if (coreMatch) return parseFloat(coreMatch[1])
    const numberMatch = cpuStr.match(/(\d+(\.\d+)?)/)
    return numberMatch ? parseFloat(numberMatch[1]) : 0
  }

  const parseMemoryToMB = (memoryStr?: string, memoryMB?: number): number => {
    if (memoryMB) return memoryMB
    if (!memoryStr) return 0
    const match = memoryStr.match(/(\d+(\.\d+)?)\s*(GB|MB|TB)/i)
    if (!match) return 0
    const value = parseFloat(match[1])
    const unit = match[3].toUpperCase()
    switch (unit) {
      case 'TB': return value * 1024 * 1024
      case 'GB': return value * 1024
      case 'MB': return value
      default: return value
    }
  }

  const isHostNew = (host: Host): boolean => {
    if (!host.created_at) return false
    const createdDate = new Date(host.created_at)
    const currentDate = new Date()
    const diffTime = Math.abs(currentDate.getTime() - createdDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 15
  }

  const formatSize = (mb?: number): string => {
    if (!mb) return 'Unknown'
    if (mb >= 1024) return (mb / 1024).toFixed(1) + 'GB'
    return Math.round(mb) + 'MB'
  }

  const getLanguageName = (locale: string): string => {
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

  // Memoize expensive operations
  const currentPageHosts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, filteredHosts.length)
    return filteredHosts.slice(startIndex, endIndex)
  }, [filteredHosts, currentPage, pageSize])

  const hasActiveFilters = useMemo(() => 
    currentFilters.search || currentFilters.locale || currentFilters.target,
    [currentFilters.search, currentFilters.locale, currentFilters.target]
  )

  return (
    <main id="main-content">
      <div id="hosts-page">
        <div className="wrap">
          {/* Hero Section */}
          <section className="hero centered-hero" id="home" aria-labelledby="hero-title">
            <div className="blobs" aria-hidden="true">
              <div className="blob b1"></div>
              <div className="blob b2"></div>
              <div className="blob b3"></div>
            </div>
            <div className="hero-inner">
              <div className="hero-left">
                <h1 id="hero-title">Free Hosting Directory</h1>
                <p className="lead">Discover and compare the best free hosting providers for your projects.</p>
              </div>
            </div>
          </section>

          {/* Search Section */}
          <div className="search-section">
            <div className="search-grid">
              <input
                type="text"
                id="search"
                className="search-input"
                placeholder="🔍 Search for a host..."
                value={currentFilters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
              <select
                id="locale"
                className="search-select"
                value={currentFilters.locale}
                onChange={(e) => handleFilterChange('locale', e.target.value)}
              >
                <option value="">All Languages</option>
                {locales.map(locale => (
                  <option key={locale} value={locale}>
                    {getLanguageName(locale)} ({locale})
                  </option>
                ))}
              </select>
              <select
                id="target-filter"
                className="search-select"
                value={currentFilters.target}
                onChange={(e) => handleFilterChange('target', e.target.value)}
              >
                <option value="">All Targets</option>
                {targets.map(target => (
                  <option key={target} value={target}>
                    {target}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="results-info" id="results-info">
            {hasActiveFilters ? (
              `Showing ${filteredHosts.length} of ${hosts.length} hosts`
            ) : (
              `Showing all ${hosts.length} hosts`
            )}
          </div>

          {/* Sort Bar */}
          <div className="sort-bar">
            <div className="sort-left">
              <div className="sort-label">Sort by:</div>
              <div className="sort-buttons">
                {['random', 'name', 'cpu', 'ram', 'storage', 'recent'].map(sortType => (
                  <button
                    key={sortType}
                    className={`sort-btn ${currentFilters.sort === sortType ? 'active' : ''}`}
                    onClick={() => handleSortChange(sortType)}
                  >
                    <i className={`fas fa-${getSortIcon(sortType)}`}></i> {getSortLabel(sortType)}
                  </button>
                ))}
              </div>
            </div>
            <button 
              className={`clear-filters-btn ${hasActiveFilters ? 'active' : ''}`}
              onClick={clearFilters}
            >
              <i className="fas fa-times"></i> Clear Filters
            </button>
          </div>

          {/* Hosts Grid */}
          <div id="hosts-container" className="hosts-grid">
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p style={{ color: 'var(--muted)' }}>Loading hosts...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <div className="error-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="error-title">Error</div>
                <p style={{ color: 'var(--muted)' }}>{error}</p>
              </div>
            ) : filteredHosts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <i className="fas fa-search"></i>
                </div>
                <div className="empty-title">No hosts found</div>
                <p style={{ color: 'var(--muted)' }}>Try adjusting your filters to find more results</p>
              </div>
            ) : (
              currentPageHosts.map(host => (
                <HostCard 
                  key={host.id} 
                  host={host} 
                  isNew={isHostNew(host)}
                  formatSize={formatSize}
                  getLanguageName={getLanguageName}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          {filteredHosts.length > pageSize && (
            <div className="pagination" id="pagination">
              <button 
                className="pagination-btn" 
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
              >
                <i className="fas fa-angle-double-left"></i> First
              </button>
              <button 
                className="pagination-btn" 
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fas fa-angle-left"></i> Previous
              </button>
              
              <div className="pagination-pages" id="page-numbers">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const startPage = Math.max(1, currentPage - 2)
                  const pageNum = startPage + i
                  if (pageNum > totalPages) return null
                  
                  return (
                    <button
                      key={pageNum}
                      className={`page-btn ${pageNum === currentPage ? 'active' : ''}`}
                      onClick={() => goToPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>
              
              <button 
                className="pagination-btn" 
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next <i className="fas fa-angle-right"></i>
              </button>
              <button 
                className="pagination-btn" 
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last <i className="fas fa-angle-double-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

// Host Card Component
interface HostCardProps {
  host: Host
  isNew: boolean
  formatSize: (mb?: number) => string
  getLanguageName: (locale: string) => string
}

function HostCard({ host, isNew, formatSize, getLanguageName }: HostCardProps) {
  const ramDisplay = host.ramMB ? formatSize(host.ramMB) : host.ram || 'Unknown'
  const storageDisplay = host.diskMB ? formatSize(host.diskMB) : host.disk || 'Unknown'
  const totalReviews = (host.approvals || 0) + (host.disapprovals || 0)
  const rating = totalReviews > 0 ? Math.round(((host.approvals || 0) / totalReviews) * 100) : 0
  const iconLetter = host.name ? host.name.charAt(0).toUpperCase() : '?'
  const statusClass = host.status && host.status.toLowerCase() === 'online' ? 'online' : 'closed'
  const typeDisplay = host.type ? host.type.split(',').map(t => t.trim().replace(/\s*\([^)]*\)/g, '').trim()) : []

  const targetBadges = (host.targets || []).flatMap(target => 
    target.split(',').map(t => {
      const displayTarget = t.trim()
      return displayTarget ? (
        <span key={displayTarget} className="target-badge">
          {displayTarget}
        </span>
      ) : null
    }).filter(Boolean)
  )

  const languageBadges = (host.locale || []).map(locale => (
    <span key={locale} className="language-badge">
      {getLanguageName(locale)}
    </span>
  ))

  return (
    <div className="host-card">
      {isNew && (
        <div className="host-badge">NEW</div>
      )}
      
      <div className="host-icon">{iconLetter}</div>
      
      <div className="host-info">
        <div className="host-header">
          <div className="host-name">{host.name}</div>
        </div>
        
        <div className="badges-container">
          <span className={`status-badge ${statusClass}`}>
            {host.status || 'Unknown'}
          </span>
          {typeDisplay.map(type => (
            <span key={type} className="host-type-badge">
              {type}
            </span>
          ))}
          {languageBadges}
          {targetBadges}
        </div>
        
        <div className="host-specs">
          <div className="spec">
            <div className="spec-value">{host.cpu || 'Unknown'}</div>
            <div className="spec-label">CPU</div>
          </div>
          <div className="spec">
            <div className="spec-value">{ramDisplay}</div>
            <div className="spec-label">Memory</div>
          </div>
          <div className="spec">
            <div className="spec-value">{storageDisplay}</div>
            <div className="spec-label">Storage</div>
          </div>
        </div>
      </div>
      
      <div className="host-rating">
        <div className="rating-value">{rating}%</div>
        <div className="rating-label">{totalReviews} reviews</div>
        <div className="rating-bar">
          <div className="rating-fill" style={{ width: `${rating}%` }}></div>
        </div>
      </div>
      
      <a 
        href={`/hosts/${host.id}`} 
        className="view-details-btn"
        onClick={(e) => {
         
          window.location.href = `/hosts/${host.id}`;
        }}
      >
        View Details
      </a>
    </div>
    
  )
}

// Helper functions for sort icons and labels
function getSortIcon(sortType: string): string {
  switch (sortType) {
    case 'random': return 'random'
    case 'name': return 'sort-alpha-down'
    case 'cpu': return 'microchip'
    case 'ram': return 'memory'
    case 'storage': return 'hdd'
    case 'recent': return 'clock'
    default: return 'random'
  }
}

function getSortLabel(sortType: string): string {
  switch (sortType) {
    case 'random': return 'Random'
    case 'name': return 'Name (A-Z)'
    case 'cpu': return 'Most CPU'
    case 'ram': return 'Most Memory'
    case 'storage': return 'Most Storage'
    case 'recent': return 'Recently Added'
    default: return 'Random'
  }
}