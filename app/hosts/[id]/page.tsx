'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Host } from '@/types/host';
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { fetchHostById, fetchHosts } from '@/lib/cache';

export const runtime = 'edge';
countries.registerLocale(en);

type TabType = 'overview' | 'features' | 'resources' | 'links';

export default function HostDetailsPage() {
  const params = useParams();
  const [host, setHost] = useState<Host | null>(null);
  const [similarHosts, setSimilarHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  useEffect(() => {
    const fetchHost = async () => {
      if (!params.id) return;

      setLoading(true);
      try {
        const hostId = Array.isArray(params.id) ? params.id[0] : params.id;
        const foundHost = await fetchHostById(hostId);

        if (foundHost) {
          setHost(foundHost);

          const allHosts = await fetchHosts();
          const similar = allHosts
            .filter(h => h.id !== foundHost.id)
            .map(h => {
              let score = 0;
              if (h.type === foundHost.type) score += 5;
              const commonTargets = h.targets.filter(t =>
                foundHost.targets.includes(t)
              );
              score += commonTargets.length * 2;
              return { host: h, score };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(item => item.host);

          setSimilarHosts(similar);
        }
      } catch (error) {
        console.error('Error fetching host data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchHost();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-[rgb(var(--accent)/0.2)] border-t-[rgb(var(--accent))] animate-spin mb-4" />
          <p className="text-[rgb(var(--muted))]">Loading host details...</p>
        </div>
      </div>
    );
  }

  if (!host) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[rgb(var(--muted)/0.08)] flex items-center justify-center">
            <FontAwesomeIcon
              icon={['fas', 'magnifying-glass']}
              className="text-3xl text-[rgb(var(--muted))]"
            />
          </div>
          <h1 className="heading-3 text-[rgb(var(--text))] mb-2">
            Host Not Found
          </h1>
          <p className="text-[rgb(var(--muted))] mb-6">
            The hosting provider you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button href="/hosts" variant="primary">
            Browse All Hosts
          </Button>
        </div>
      </div>
    );
  }

  const formatResource = (value: number) =>
    value >= 1024
      ? `${(value / 1024).toFixed(1).replace(/\.0$/, '')} GB`
      : `${value} MB`;

  const totalVotes = host.approvals + host.disapprovals;
  const approvalRating =
    totalVotes > 0 ? Math.round((host.approvals / totalVotes) * 100) : 0;

  const websiteUrl = host.links?.website;

  const formatAttributeKey = (key: string) =>
    key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const tabs: { id: TabType; label: string; icon: IconProp }[] = [
    { id: 'overview', label: 'Overview', icon: ['fas', 'circle-info'] },
    { id: 'features', label: 'Features', icon: ['fas', 'star'] },
    { id: 'resources', label: 'Resources', icon: ['fas', 'server'] },
    { id: 'links', label: 'Links', icon: ['fas', 'link'] },
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] overflow-x-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="h-52 md:h-64 lg:h-72 relative overflow-hidden">
          {host.banner ? (
            <Image
              src={host.banner}
              alt={host.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full gradient-bg" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-[rgb(var(--bg)/0.5)] to-transparent" />
        </div>

        <div className="container-default relative -mt-8 sm:-mt-12 md:-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border)/0.35)] sm:border-[rgb(var(--border)/0.6)] shadow-large p-5 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[rgb(var(--bg))] border border-[rgb(var(--border)/0.35)] overflow-hidden flex-shrink-0">
                {host.icon ? (
                  <Image
                    src={host.icon}
                    alt={host.name}
                    width={96}
                    height={96}
                    className="object-contain p-2"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center gradient-bg text-white">
                    <FontAwesomeIcon icon={['fas', 'server']} className="text-3xl" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="heading-2 mb-2">{host.name}</h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <Badge variant="primary">{host.type} Hosting</Badge>
                      <Badge variant="warning" icon={['fas', 'star']}>
                        {host.rating.toFixed(1)}
                      </Badge>
                      <Badge>{totalVotes} votes</Badge>
                    </div>
                  </div>

                  {websiteUrl && (
                    <Button
                      href={websiteUrl}
                      variant="primary"
                      size="lg"
                      icon={['fas', 'arrow-up-right-from-square']}
                      className="w-full md:w-auto"
                    >
                      Visit Website
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[rgb(var(--border)/0.35)]">
              <Link
                href="/hosts"
                className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
              >
                <FontAwesomeIcon icon={['fas', 'arrow-left']} />
                Back to all hosts
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container-default py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide px-4 sm:px-0">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-[rgb(var(--accent))] text-white shadow-soft'
                    : 'bg-[rgb(var(--muted)/0.08)] text-[rgb(var(--muted))]'
                    }`}
                >
                  <FontAwesomeIcon icon={tab.icon} className="text-xs" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8"
                  >
                    {/* About & Languages */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-2 space-y-6">
                        <section>
                          <h2 className="heading-4 mb-3">About {host.name}</h2>
                          <p className="text-[rgb(var(--muted))] leading-relaxed text-lg">
                            {host.description}
                          </p>
                        </section>

                        {/* Perfect For */}
                        {host.targets && host.targets.length > 0 && (
                          <section>
                            <h3 className="text-sm font-bold text-[rgb(var(--muted))] uppercase tracking-wider mb-3">Perfect For</h3>
                            <div className="flex flex-wrap gap-2">
                              {host.targets.map(target => (
                                <Badge key={target} variant="secondary">{target}</Badge>
                              ))}
                            </div>
                          </section>
                        )}
                      </div>

                      {/* Languages Card */}
                      {host.locale && host.locale.length > 0 && (
                        <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border)/0.35)] p-5 h-fit">
                          <h3 className="font-semibold mb-4">Languages</h3>
                          <div className="flex flex-wrap gap-2">
                            {host.locale.map(code => (
                              <div key={code} className="flex items-center gap-2 px-3 py-1.5 bg-[rgb(var(--muted)/0.08)] rounded-lg">
                                <Image src={getFlagUrl(code)} alt={code} width={20} height={15} className="w-5 h-auto rounded-sm md:w-6" unoptimized />
                                <span className="text-sm font-medium uppercase text-[rgb(var(--muted))]">{code}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Service Details (Attributes) */}
                    {host.attributes && (
                      <section className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border)/0.35)] p-6 md:p-8">
                        <h3 className="heading-4 mb-6">Service Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                          {Object.entries(host.attributes).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between py-3 border-b border-[rgb(var(--border)/0.3)] last:border-0">
                              <span className="text-[rgb(var(--muted))] font-medium">{formatAttributeKey(key)}</span>
                              {typeof value === 'boolean' ? (
                                value ?
                                  <span className="flex items-center gap-1.5 text-emerald-500 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full text-xs">
                                    <FontAwesomeIcon icon={['fas', 'check']} /> Yes
                                  </span> :
                                  <span className="flex items-center gap-1.5 text-red-500 font-semibold bg-red-500/10 px-2.5 py-0.5 rounded-full text-xs">
                                    <FontAwesomeIcon icon={['fas', 'xmark']} /> No
                                  </span>
                              ) : (
                                <span className="font-semibold">{String(value)}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Important Notes */}
                    {host.notes && (
                      <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 text-amber-500">
                          <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} />
                        </div>
                        <div>
                          <h3 className="font-bold text-amber-500 mb-1">Important Notes</h3>
                          <p className="text-amber-500/90 text-sm leading-relaxed">{host.notes}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {host.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border)/0.35)]">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={['fas', 'check']} className="text-sm" />
                        </div>
                        <span className="font-medium text-[rgb(var(--text))]">{feature}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'resources' && (
                  <motion.div
                    key="resources"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                  >
                    {host.ram && <ResourceCard icon={['fas', 'memory']} label="RAM" value={formatResource(host.ram)} color="blue" />}
                    {host.storage && <ResourceCard icon={['fas', 'hard-drive']} label="Storage" value={formatResource(host.storage)} color="amber" />}
                    {host.cores && <ResourceCard icon={['fas', 'microchip']} label="CPU" value={`${host.cores} vCores`} color="violet" />}
                    <ResourceCard icon={['fas', 'network-wired']} label="Bandwidth" value="Unlimited" color="emerald" />
                  </motion.div>
                )}

                {activeTab === 'links' && (
                  <motion.div
                    key="links"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {host.links && Object.entries(host.links).map(([key, url]) => (
                      <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border)/0.35)] hover:border-[rgb(var(--accent)/0.5)] hover:shadow-medium transition-all group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[rgb(var(--muted)/0.08)] flex items-center justify-center text-xl group-hover:bg-[rgb(var(--accent)/0.1)] group-hover:text-[rgb(var(--accent))] transition-colors">
                            <FontAwesomeIcon icon={['fas', 'link']} className="text-lg" />
                          </div>
                          <div>
                            <h3 className="font-bold capitalize">{key.replace('_', ' ')}</h3>
                            <p className="text-sm text-[rgb(var(--muted))] line-clamp-1">{url}</p>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[rgb(var(--muted)/0.08)] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FontAwesomeIcon icon={['fas', 'arrow-right']} className="text-xs" />
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Similar Hosts */}
            {similarHosts.length > 0 && (
              <div className="pt-6">
                <h2 className="heading-4 mb-4">Similar Hosts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {similarHosts.map(sh => (
                    <Link key={sh.id} href={`/hosts/${sh.id}`}>
                      <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border)/0.35)] p-4 hover:border-[rgb(var(--accent)/0.5)] transition-all">
                        <h3 className="font-semibold">{sh.name}</h3>
                        <p className="text-xs text-[rgb(var(--muted))]">{sh.type}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6 order-last lg:order-none">
            <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border)/0.35)] p-6 text-center">
              <div className="text-5xl font-bold gradient-text mb-1">
                {approvalRating}%
              </div>
              <div className="text-sm text-[rgb(var(--muted))]">
                Approval Rating
              </div>
              <div className="text-xs text-[rgb(var(--muted))] mb-4">
                {totalVotes} total votes
              </div>

              <Button
                onClick={() => setShowVoteModal(true)}
                variant="primary"
                fullWidth
                icon={['fas', 'thumbs-up']}
              >
                Vote
              </Button>
            </div>

            <DiscordWidget />
          </div>
        </div>
      </div>

      <Modal
        isOpen={showVoteModal}
        onClose={() => setShowVoteModal(false)}
        title="Join Discord to Vote"
        icon={['fab', 'discord']}
      >
        <Button href="https://discord.gg/QbeZ3b5CQd" variant="primary" fullWidth>
          Join Server
        </Button>
      </Modal>
    </div>
  );
}

/* ===== Helpers (UNCHANGED) ===== */

function ResourceCard({
  icon,
  label,
  value,
  color,
}: {
  icon: IconProp;
  label: string;
  value: string;
  color: 'blue' | 'amber' | 'violet' | 'emerald';
}) {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-500',
    amber: 'bg-amber-500/10 text-amber-500',
    violet: 'bg-violet-500/10 text-violet-500',
    emerald: 'bg-emerald-500/10 text-emerald-500',
  };

  return (
    <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border)/0.35)] p-5">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}
        >
          <FontAwesomeIcon icon={icon} className="text-xl" />
        </div>
        <div>
          <p className="text-sm text-[rgb(var(--muted))] mb-1">{label}</p>
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </div>
    </div>
  );
}

function DiscordWidget() {
  return (
    <div className="bg-[#2f3136] rounded-2xl p-6">
      <div className="text-[10px] font-bold text-[#b9bbbe] uppercase mb-4">
        Join Our Community
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#5865F2] flex items-center justify-center">
          <span className="text-xl font-bold text-white">FH</span>
        </div>
        <div>
          <div className="font-bold text-white">FreeHosts</div>
          <div className="text-xs text-[#b9bbbe]">1,200+ members</div>
        </div>
      </div>
      <a
        href="https://discord.gg/QbeZ3b5CQd"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold text-center"
      >
        Join Server
      </a>
    </div>
  );
}

function getFlagUrl(codeOrName: string) {
  if (!codeOrName) return 'https://flagcdn.com/w40/un.png';

  const clean = codeOrName.trim();
  if (clean.length === 2) {
    return `https://flagcdn.com/w40/${clean.toLowerCase()}.png`;
  }

  const code = countries.getAlpha2Code(clean, 'en');
  return code
    ? `https://flagcdn.com/w40/${code.toLowerCase()}.png`
    : 'https://flagcdn.com/w40/un.png';
}
