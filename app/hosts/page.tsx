'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Host, SortOption } from '@/types/host';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { fetchHosts } from '@/lib/cache';

export const runtime = 'edge';
const ITEMS_PER_PAGE = 12;

const getLanguageName = (code: string) => {
  try {
    return new Intl.DisplayNames(['en'], { type: 'language' }).of(code) || code;
  } catch {
    return code;
  }
};

// Sort options configuration
const sortOptions: { value: SortOption; label: string; icon: IconProp }[] = [
  { value: 'random', label: 'Random', icon: ['fas', 'shuffle'] },
  { value: 'name_asc', label: 'Name', icon: ['fas', 'arrow-down-a-z'] },
  { value: 'date_newest', label: 'Newest', icon: ['fas', 'clock'] },
  { value: 'ram_desc', label: 'RAM', icon: ['fas', 'memory'] },
  { value: 'cpu_desc', label: 'CPU', icon: ['fas', 'microchip'] },
  { value: 'storage_desc', label: 'Storage', icon: ['fas', 'hard-drive'] },
];

// Check if host is new (added within 15 days)
const isNew = (dateStr: string) => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 15;
};

// Host Card Component
function HostCard({ host }: { host: Host }) {
  const formatResource = (value: number) => {
    if (value >= 1024) return `${(value / 1024).toFixed(1).replace(/\.0$/, '')} GB`;
    return `${value} MB`;
  };

  const websiteUrl = host.links?.website;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group h-full"
    >
      <div className="h-full flex flex-col bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] overflow-hidden hover:border-[rgb(var(--accent)/0.5)] hover:shadow-large transition-all duration-300">
        {/* Banner */}
        <div className="relative h-36 w-full overflow-hidden">
          {host.banner ? (
            <Image
              src={host.banner}
              alt={`${host.name} banner`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          ) : (
            <div className="w-full h-full gradient-bg opacity-80" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            {host.created_at && isNew(host.created_at) && (
              <Badge variant="success" size="sm">
                <FontAwesomeIcon icon={['fas', 'star']} className="text-[10px]" />
                New
              </Badge>
            )}
            <Badge variant="warning" size="sm">
              <FontAwesomeIcon icon={['fas', 'star']} className="text-[10px]" />
              {host.rating.toFixed(1)}
            </Badge>
          </div>
        </div>

        {/* Host Icon moved outside banner overflow to prevent cropping */}
        <div className="relative">
          <div className="absolute -top-6 left-5 z-10">
            <div className="w-14 h-14 rounded-xl bg-[rgb(var(--card))] border-2 border-[rgb(var(--card))] shadow-medium overflow-hidden">
              {host.icon ? (
                <Image
                  src={host.icon}
                  alt={`${host.name} icon`}
                  width={56}
                  height={56}
                  className="object-contain p-1"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center gradient-bg text-white">
                  <FontAwesomeIcon icon={['fas', 'server']} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-5 pt-9">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-[rgb(var(--text))] mb-1 line-clamp-1">
              {host.name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="subtle" size="xs">
                {host.type}
              </Badge>
              {host.locale?.slice(0, 2).map(lang => (
                <Badge key={lang} variant="subtle" size="xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-sm text-[rgb(var(--muted))] line-clamp-2 mb-4 flex-1">
            {host.description}
          </p>

          {/* Resources */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {host.ram !== undefined && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={['fas', 'memory']} className="text-xs text-blue-500" />
                </div>
                <span className="font-medium text-[rgb(var(--text))]">{formatResource(host.ram)}</span>
              </div>
            )}
            {host.storage !== undefined && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={['fas', 'hard-drive']} className="text-xs text-amber-500" />
                </div>
                <span className="font-medium text-[rgb(var(--text))]">{formatResource(host.storage)}</span>
              </div>
            )}
            {host.cores !== undefined && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={['fas', 'microchip']} className="text-xs text-violet-500" />
                </div>
                <span className="font-medium text-[rgb(var(--text))]">{host.cores} vCPU</span>
              </div>
            )}
            {host.location && host.location.length > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={['fas', 'globe']} className="text-xs text-emerald-500" />
                </div>
                <span className="font-medium text-[rgb(var(--text))]">{host.location.length} region{host.location.length > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          {/* Attribute Tags */}
          {(host.attributes?.free_subdomain || host.attributes?.custom_domain || host.attributes?.no_ads) && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {host.attributes?.free_subdomain && (
                <Badge variant="primary" size="xs">Subdomain</Badge>
              )}
              {host.attributes?.custom_domain && (
                <Badge variant="info" size="xs">Custom Domain</Badge>
              )}
              {host.attributes?.no_ads && (
                <Badge variant="success" size="xs">No Ads</Badge>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 mt-auto pt-4 border-t border-[rgb(var(--border))]">
            <Button href={`/hosts/${host.id}`} variant="ghost" size="sm" className="flex-1">
              Details
            </Button>
            {websiteUrl && (
              <Button href={websiteUrl} variant="primary" size="sm" icon={['fas', 'arrow-up-right-from-square']} className="flex-1">
                Visit
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HostsPage() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocale, setSelectedLocale] = useState<string>('all');
  const [selectedTarget, setSelectedTarget] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('random');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadHosts = async () => {
      try {
        const fetchedHosts = await fetchHosts();
        setHosts(fetchedHosts);
      } catch (error) {
        console.error('Failed to fetch hosts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHosts();
  }, []);

  const availableLocales = useMemo(() => {
    return Array.from(new Set(hosts.flatMap(h => h.locale || []))).sort();
  }, [hosts]);

  const availableTargets = useMemo(() => {
    return Array.from(new Set(hosts.flatMap(h => h.targets || []))).sort();
  }, [hosts]);

  const filteredHosts = useMemo(() => {
    if (loading) return [];

    let result = [...hosts];

    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(host =>
        host.name.toLowerCase().includes(query) ||
        host.description.toLowerCase().includes(query) ||
        host.type.toLowerCase().includes(query)
      );
    }

    if (selectedLocale && selectedLocale !== 'all') {
      result = result.filter(host => host.locale?.includes(selectedLocale));
    }

    if (selectedTarget && selectedTarget !== 'all') {
      result = result.filter(host => host.targets && host.targets.includes(selectedTarget));
    }

    if (sortBy !== 'random') {
      result.sort((a, b) => {
        switch (sortBy) {
          case 'rating_desc': return b.rating - a.rating;
          case 'rating_asc': return a.rating - b.rating;
          case 'name_asc': return a.name.localeCompare(b.name);
          case 'name_desc': return b.name.localeCompare(a.name);
          case 'date_newest': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          case 'cpu_desc': return (b.cores || 0) - (a.cores || 0);
          case 'ram_desc': return (b.ram || 0) - (a.ram || 0);
          case 'storage_desc': return (b.storage || 0) - (a.storage || 0);
          default: return 0;
        }
      });
    }

    return result;
  }, [hosts, loading, searchQuery, selectedLocale, selectedTarget, sortBy]);

  const totalItems = filteredHosts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedHosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredHosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredHosts, currentPage]);

  const prevFilters = useRef({ searchQuery, selectedLocale, selectedTarget, sortBy });
  useEffect(() => {
    const filtersChanged =
      prevFilters.current.searchQuery !== searchQuery ||
      prevFilters.current.selectedLocale !== selectedLocale ||
      prevFilters.current.selectedTarget !== selectedTarget ||
      prevFilters.current.sortBy !== sortBy;

    if (filtersChanged) {
      prevFilters.current = { searchQuery, selectedLocale, selectedTarget, sortBy };
      setCurrentPage(1);
    }
  }, [searchQuery, selectedLocale, selectedTarget, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocale('all');
    setSelectedTarget('all');
    setSortBy('random');
  };

  const hasActiveFilters = searchQuery || selectedLocale !== 'all' || selectedTarget !== 'all';

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Hero Banner */}
      <section className="relative">
        {/* Banner Gradient */}
        <div className="h-48 md:h-64 lg:h-72 relative overflow-hidden">
          <div className="w-full h-full gradient-bg" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-[rgb(var(--bg)/0.5)] to-transparent" />
        </div>

        {/* Overlapping Card */}
        <div className="container-default relative -mt-20 md:-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] shadow-large p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h1 className="heading-2 text-[rgb(var(--text))] mb-2">Hosting Directory</h1>
                <p className="body-default text-[rgb(var(--muted))]">
                  Browse {hosts.length}+ verified free hosting providers
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button href="/submit-host" variant="primary" icon={['fas', 'plus']}>
                  Submit Host
                </Button>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="p-4 bg-[rgb(var(--muted)/0.05)] rounded-2xl border border-[rgb(var(--border))]">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <FontAwesomeIcon
                    icon={['fas', 'magnifying-glass']}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))]"
                  />
                  <input
                    type="text"
                    placeholder="Search hosts..."
                    className="w-full bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl py-3 pl-11 pr-4 text-[rgb(var(--text))] placeholder-[rgb(var(--muted)/0.6)] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:border-transparent transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors"
                    >
                      <FontAwesomeIcon icon={['fas', 'xmark']} />
                    </button>
                  )}
                </div>

                {/* Language Filter */}
                <div className="relative md:w-44">
                  <select
                    value={selectedLocale}
                    onChange={(e) => setSelectedLocale(e.target.value)}
                    className="w-full appearance-none bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl py-3 px-4 pr-9 text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:border-transparent transition-all cursor-pointer text-sm"
                  >
                    <option value="all">All Languages</option>
                    {availableLocales.map(l => <option key={l} value={l}>{getLanguageName(l)}</option>)}
                  </select>
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-down']}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))] text-xs pointer-events-none"
                  />
                </div>

                {/* Target Filter */}
                <div className="relative md:w-44">
                  <select
                    value={selectedTarget}
                    onChange={(e) => setSelectedTarget(e.target.value)}
                    className="w-full appearance-none bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl py-3 px-4 pr-9 text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:border-transparent transition-all cursor-pointer text-sm"
                  >
                    <option value="all">All Types</option>
                    {availableTargets.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-down']}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))] text-xs pointer-events-none"
                  />
                </div>
              </div>

              {/* Active filters indicator */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[rgb(var(--border))]">
                  <span className="text-xs text-[rgb(var(--muted))]">Active filters:</span>
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[rgb(var(--accent))] hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-default py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-[rgb(var(--accent)/0.2)] border-t-[rgb(var(--accent))] animate-spin mb-4" />
            <p className="text-[rgb(var(--muted))]">Loading hosts...</p>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <p className="text-[rgb(var(--muted))]">
                Showing <span className="font-semibold text-[rgb(var(--text))]">{totalItems}</span> {totalItems === 1 ? 'host' : 'hosts'}
              </p>

              {/* Sort Options */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                <span className="text-sm text-[rgb(var(--muted))] whitespace-nowrap">Sort:</span>
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${sortBy === option.value
                      ? 'bg-[rgb(var(--accent))] text-white'
                      : 'bg-[rgb(var(--muted)/0.08)] text-[rgb(var(--muted))] hover:bg-[rgb(var(--muted)/0.12)]'
                      }`}
                  >
                    <FontAwesomeIcon icon={option.icon} className="text-xs" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hosts Grid */}
            <AnimatePresence mode="wait">
              {paginatedHosts.length > 0 ? (
                <motion.div
                  layout
                  className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {paginatedHosts.map((host) => (
                    <HostCard key={host.id} host={host} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[rgb(var(--muted)/0.08)] flex items-center justify-center">
                    <FontAwesomeIcon icon={['fas', 'magnifying-glass']} className="text-3xl text-[rgb(var(--muted))]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[rgb(var(--text))] mb-2">No hosts found</h3>
                  <p className="text-[rgb(var(--muted))] mb-6">
                    Try adjusting your search or filters
                  </p>
                  <Button onClick={clearFilters} variant="secondary">
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-[rgb(var(--muted))] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[rgb(var(--accent))] transition-all"
                >
                  <FontAwesomeIcon icon={['fas', 'chevron-left']} className="text-sm" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      if (totalPages <= 7) return true;
                      if (page === 1 || page === totalPages) return true;
                      if (Math.abs(page - currentPage) <= 1) return true;
                      return false;
                    })
                    .map((page, idx, arr) => {
                      const showEllipsis = idx > 0 && page - arr[idx - 1] > 1;
                      return (
                        <div key={page} className="flex items-center gap-1">
                          {showEllipsis && (
                            <span className="w-10 text-center text-[rgb(var(--muted))]">...</span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-medium transition-all ${currentPage === page
                              ? 'gradient-bg text-white shadow-glow'
                              : 'bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-[rgb(var(--muted))] hover:border-[rgb(var(--accent))]'
                              }`}
                          >
                            {page}
                          </button>
                        </div>
                      );
                    })}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-[rgb(var(--muted))] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[rgb(var(--accent))] transition-all"
                >
                  <FontAwesomeIcon icon={['fas', 'chevron-right']} className="text-sm" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
