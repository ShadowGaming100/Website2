"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Host, SortOption } from "@/types/host";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchHosts } from "@/lib/cache";

export const runtime = "edge";
const ITEMS_PER_PAGE = 12;

const getLanguageName = (code: string) => {
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(code) || code;
  } catch {
    return code;
  }
};

// Sort options configuration
const sortOptions: { value: SortOption; label: string; icon: IconProp }[] = [
  { value: "random", label: "Random", icon: ["fas", "shuffle"] },
  { value: "name_asc", label: "Name", icon: ["fas", "arrow-down-a-z"] },
  { value: "date_newest", label: "Newest", icon: ["fas", "clock"] },
  { value: "ram_desc", label: "RAM", icon: ["fas", "memory"] },
  { value: "cpu_desc", label: "CPU", icon: ["fas", "microchip"] },
  { value: "storage_desc", label: "Storage", icon: ["fas", "hard-drive"] },
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
    if (value >= 1024)
      return `${(value / 1024).toFixed(1).replace(/\.0$/, "")} GB`;
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
      <div className="h-full flex flex-col bg-[rgb(var(--card))] rounded-xl border border-[rgb(var(--border))] overflow-hidden hover:border-[rgb(var(--accent)/0.5)] transition-all duration-300 card-hover">
        {/* Banner */}
        <div className="relative h-36 w-full overflow-hidden bg-[rgb(var(--muted)/0.05)]">
          {host.banner ? (
            <Image
              src={host.banner}
              alt={`${host.name} banner`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[rgb(var(--muted)/0.2)]">
              <FontAwesomeIcon icon={["fas", "image"]} className="text-4xl" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            {host.created_at && isNew(host.created_at) && (
              <Badge variant="success" size="sm">
                <FontAwesomeIcon
                  icon={["fas", "star"]}
                  className="text-[10px]"
                />
                New
              </Badge>
            )}
            <Badge variant="warning" size="sm">
              <FontAwesomeIcon icon={["fas", "star"]} className="text-[10px]" />
              {host.rating.toFixed(1)}
            </Badge>
          </div>
        </div>

        {/* Host Icon moved outside banner overflow to prevent cropping */}
        <div className="relative">
          <div className="absolute -top-6 left-5 z-10">
            <div className="w-14 h-14 rounded-lg bg-[rgb(var(--card))] border border-[rgb(var(--border))] shadow-sm overflow-hidden flex items-center justify-center">
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
                <div className="text-[rgb(var(--text))]">
                  <FontAwesomeIcon icon={["fas", "server"]} />
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
              {host.locale?.slice(0, 2).map((lang) => (
                <Badge key={lang} variant="subtle" size="xs">
                  {getLanguageName(lang.toLowerCase())}
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
                <div className="w-7 h-7 rounded-md bg-blue-500/10 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={["fas", "memory"]}
                    className="text-xs text-blue-500"
                  />
                </div>
                <span className="font-medium text-[rgb(var(--text))]">
                  {formatResource(host.ram)}
                </span>
              </div>
            )}
            {host.storage !== undefined && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 rounded-md bg-amber-500/10 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={["fas", "hard-drive"]}
                    className="text-xs text-amber-500"
                  />
                </div>
                <span className="font-medium text-[rgb(var(--text))]">
                  {formatResource(host.storage)}
                </span>
              </div>
            )}
            {host.cores !== undefined && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 rounded-md bg-violet-500/10 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={["fas", "microchip"]}
                    className="text-xs text-violet-500"
                  />
                </div>
                <span className="font-medium text-[rgb(var(--text))]">
                  {host.cores} vCPU
                </span>
              </div>
            )}
            {host.location && host.location.length > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 rounded-md bg-emerald-500/10 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={["fas", "globe"]}
                    className="text-xs text-emerald-500"
                  />
                </div>
                <span className="font-medium text-[rgb(var(--text))]">
                  {host.location.length} region
                  {host.location.length > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>

          {/* Attribute Tags */}
          {(host.attributes?.free_subdomain ||
            host.attributes?.custom_domain ||
            host.attributes?.no_ads) && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {host.attributes?.free_subdomain && (
                <Badge variant="primary" size="xs">
                  Subdomain
                </Badge>
              )}
              {host.attributes?.custom_domain && (
                <Badge variant="info" size="xs">
                  Custom Domain
                </Badge>
              )}
              {host.attributes?.no_ads && (
                <Badge variant="success" size="xs">
                  No Ads
                </Badge>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 mt-auto pt-4 border-t border-[rgb(var(--border))]">
            <Button
              href={`/hosts/${host.id}`}
              variant="ghost"
              size="sm"
              className="flex-1"
            >
              Details
            </Button>
            {websiteUrl && (
              <Button
                href={websiteUrl}
                variant="primary"
                size="sm"
                icon={["fas", "arrow-up-right-from-square"]}
                className="flex-1"
              >
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocale, setSelectedLocale] = useState<string>("all");
  const [selectedTarget, setSelectedTarget] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("random");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadHosts = async () => {
      try {
        const fetchedHosts = await fetchHosts();
        setHosts(fetchedHosts);
      } catch (error) {
        console.error("Failed to fetch hosts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHosts();
  }, []);

  const availableLocales = useMemo(() => {
    return Array.from(
      new Set(
        hosts.flatMap((h) => h.locale?.map((l) => l.toLowerCase()) || []),
      ),
    ).sort();
  }, [hosts]);

  const availableTargets = useMemo(() => {
    return Array.from(new Set(hosts.flatMap((h) => h.targets || []))).sort();
  }, [hosts]);

  const filteredHosts = useMemo(() => {
    if (loading) return [];

    let result = [...hosts];

    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (host) =>
          host.name.toLowerCase().includes(query) ||
          host.description.toLowerCase().includes(query) ||
          host.type.toLowerCase().includes(query),
      );
    }

    if (selectedLocale && selectedLocale !== "all") {
      result = result.filter((host) =>
        host.locale?.some(
          (lang) => lang.toLowerCase() === selectedLocale.toLowerCase(),
        ),
      );
    }

    if (selectedTarget && selectedTarget !== "all") {
      result = result.filter(
        (host) => host.targets && host.targets.includes(selectedTarget),
      );
    }

    if (sortBy !== "random") {
      result.sort((a, b) => {
        switch (sortBy) {
          case "rating_desc":
            return b.rating - a.rating;
          case "rating_asc":
            return a.rating - b.rating;
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          case "date_newest":
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          case "cpu_desc":
            return (b.cores || 0) - (a.cores || 0);
          case "ram_desc":
            return (b.ram || 0) - (a.ram || 0);
          case "storage_desc":
            return (b.storage || 0) - (a.storage || 0);
          default:
            return 0;
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

  const prevFilters = useRef({
    searchQuery,
    selectedLocale,
    selectedTarget,
    sortBy,
  });
  useEffect(() => {
    const filtersChanged =
      prevFilters.current.searchQuery !== searchQuery ||
      prevFilters.current.selectedLocale !== selectedLocale ||
      prevFilters.current.selectedTarget !== selectedTarget ||
      prevFilters.current.sortBy !== sortBy;

    if (filtersChanged) {
      prevFilters.current = {
        searchQuery,
        selectedLocale,
        selectedTarget,
        sortBy,
      };
      setCurrentPage(1);
    }
  }, [searchQuery, selectedLocale, selectedTarget, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocale("all");
    setSelectedTarget("all");
    setSortBy("random");
  };

  const hasActiveFilters =
    searchQuery || selectedLocale !== "all" || selectedTarget !== "all";

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Hero Section */}
      <section className="pt-24 pb-12 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
        <div className="container-default">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgb(var(--accent)/0.1)] border border-[rgb(var(--accent)/0.2)] mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[rgb(var(--accent))]"></span>
              </span>
              <span className="text-sm font-medium text-[rgb(var(--accent))]">
                Direct Access
              </span>
            </div>
            <h1 className="heading-1 text-[rgb(var(--text))] mb-6 text-balance">
              Verified{" "}
              <span className="text-[rgb(var(--accent))]">Free Hosting</span>{" "}
              Directory
            </h1>
            <p className="body-large text-[rgb(var(--muted))] max-w-2xl text-balance">
              Browse {hosts.length > 0 ? `${hosts.length}+` : "our"} verified
              free hosting providers. Filter by technology, resources, or
              location to find the perfect home for your project.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-default py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar (Mobile: Top, Desktop: Left) */}
          <div className="lg:w-64 flex-shrink-0 space-y-6">
            {/* Search */}
            <div className="bg-[rgb(var(--card))] rounded-xl border border-[rgb(var(--border))] p-4">
              <label className="text-xs font-semibold text-[rgb(var(--muted))] uppercase tracking-wider mb-3 block">
                Search
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={["fas", "magnifying-glass"]}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))]"
                />
                <input
                  type="text"
                  placeholder="Find a host..."
                  className="w-full bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-lg py-2 pl-9 pr-3 text-sm text-[rgb(var(--text))] placeholder-[rgb(var(--muted)/0.6)] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:border-transparent transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
                  >
                    <FontAwesomeIcon icon={["fas", "xmark"]} size="sm" />
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-[rgb(var(--card))] rounded-xl border border-[rgb(var(--border))] p-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[rgb(var(--muted))] uppercase tracking-wider mb-3 block">
                  Language
                </label>
                <div className="relative">
                  <select
                    value={selectedLocale}
                    onChange={(e) => setSelectedLocale(e.target.value)}
                    className="w-full appearance-none bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-lg py-2 px-3 pr-8 text-sm text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="all">All Languages</option>
                    {availableLocales.map((l) => (
                      <option key={l} value={l}>
                        {getLanguageName(l)}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon
                    icon={["fas", "chevron-down"]}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))] text-xs pointer-events-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[rgb(var(--muted))] uppercase tracking-wider mb-3 block">
                  Type
                </label>
                <div className="relative">
                  <select
                    value={selectedTarget}
                    onChange={(e) => setSelectedTarget(e.target.value)}
                    className="w-full appearance-none bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-lg py-2 px-3 pr-8 text-sm text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="all">All Types</option>
                    {availableTargets.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon
                    icon={["fas", "chevron-down"]}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))] text-xs pointer-events-none"
                  />
                </div>
              </div>

              {hasActiveFilters && (
                <div className="pt-4 border-t border-[rgb(var(--border))]">
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-[rgb(var(--card))] rounded-xl border border-[rgb(var(--border))]">
                <div className="w-10 h-10 rounded-full border-2 border-[rgb(var(--accent)/0.2)] border-t-[rgb(var(--accent))] animate-spin mb-4" />
                <p className="text-[rgb(var(--muted))] text-sm">
                  Loading directory...
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-[rgb(var(--muted))]">
                    Showing{" "}
                    <span className="font-semibold text-[rgb(var(--text))]">
                      {totalItems}
                    </span>{" "}
                    results
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[rgb(var(--muted))] hidden sm:inline">
                      Sort:
                    </span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) =>
                          setSortBy(e.target.value as SortOption)
                        }
                        className="appearance-none bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-lg py-1.5 px-3 pr-8 text-sm text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:border-transparent transition-all cursor-pointer hover:border-[rgb(var(--accent)/0.5)]"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <FontAwesomeIcon
                        icon={["fas", "chevron-down"]}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted))] text-xs pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {paginatedHosts.length > 0 ? (
                    <motion.div
                      layout
                      className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                      {paginatedHosts.map((host) => (
                        <HostCard key={host.id} host={host} />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-20 bg-[rgb(var(--card))] rounded-xl border border-[rgb(var(--border))] text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-[rgb(var(--muted)/0.1)] flex items-center justify-center mb-4">
                        <FontAwesomeIcon
                          icon={["fas", "magnifying-glass"]}
                          className="text-2xl text-[rgb(var(--muted))]"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-[rgb(var(--text))] mb-1">
                        No hosts found
                      </h3>
                      <p className="text-sm text-[rgb(var(--muted))] mb-6 max-w-xs mx-auto">
                        We couldn&apos;t find any hosts matching your criteria.
                        Try adjusting your filters.
                      </p>
                      <Button
                        onClick={clearFilters}
                        variant="secondary"
                        size="sm"
                      >
                        Clear Filters
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="w-9 h-9 rounded-lg flex items-center justify-center bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-[rgb(var(--muted))] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--text))] transition-all"
                    >
                      <FontAwesomeIcon
                        icon={["fas", "chevron-left"]}
                        className="text-xs"
                      />
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((page) => {
                          if (totalPages <= 7) return true;
                          if (page === 1 || page === totalPages) return true;
                          if (Math.abs(page - currentPage) <= 1) return true;
                          return false;
                        })
                        .map((page, idx, arr) => {
                          const showEllipsis =
                            idx > 0 && page - arr[idx - 1] > 1;
                          return (
                            <div key={page} className="flex items-center gap-1">
                              {showEllipsis && (
                                <span className="w-8 text-center text-[rgb(var(--muted))] text-sm">
                                  ...
                                </span>
                              )}
                              <button
                                onClick={() => setCurrentPage(page)}
                                className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                                  currentPage === page
                                    ? "bg-[rgb(var(--accent))] text-white shadow-sm"
                                    : "bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-[rgb(var(--muted))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--text))]"
                                }`}
                              >
                                {page}
                              </button>
                            </div>
                          );
                        })}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="w-9 h-9 rounded-lg flex items-center justify-center bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-[rgb(var(--muted))] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--text))] transition-all"
                    >
                      <FontAwesomeIcon
                        icon={["fas", "chevron-right"]}
                        className="text-xs"
                      />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
