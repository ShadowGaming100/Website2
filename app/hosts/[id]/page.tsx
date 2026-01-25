'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Host } from '@/types/host';
import countries from 'i18n-iso-countries';
import en from "i18n-iso-countries/langs/en.json";
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
              const commonTargets = h.targets.filter(t => foundHost.targets.includes(t));
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

    if (params.id) {
      fetchHost();
    }
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
            <FontAwesomeIcon icon={['fas', 'magnifying-glass']} className="text-3xl text-[rgb(var(--muted))]" />
          </div>
          <h1 className="heading-3 text-[rgb(var(--text))] mb-2">Host Not Found</h1>
          <p className="text-[rgb(var(--muted))] mb-6">The hosting provider you&apos;re looking for doesn&apos;t exist.</p>
          <Button href="/hosts" variant="primary">Browse All Hosts</Button>
        </div>
      </div>
    );
  }

  const formatResource = (value: number) => {
    if (value >= 1024) return `${(value / 1024).toFixed(1).replace(/\.0$/, '')} GB`;
    return `${value} MB`;
  };

  const totalVotes = host.approvals + host.disapprovals;
  const approvalRating = totalVotes > 0 ? Math.round((host.approvals / totalVotes) * 100) : 0;
  const websiteUrl = host.links?.website;

  const formatAttributeKey = (key: string) => {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const tabs: { id: TabType; label: string; icon: IconProp }[] = [
    { id: 'overview', label: 'Overview', icon: ['fas', 'circle-info'] },
    { id: 'features', label: 'Features', icon: ['fas', 'star'] },
    { id: 'resources', label: 'Resources', icon: ['fas', 'server'] },
    { id: 'links', label: 'Links', icon: ['fas', 'link'] },
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Hero Banner */}
      <section className="relative">
        {/* Banner Image */}
        <div className="h-48 md:h-64 lg:h-72 relative overflow-hidden">
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

        {/* Host Info Card */}
        <div className="container-default relative -mt-20 md:-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] shadow-large p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Host Icon */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[rgb(var(--bg))] border border-[rgb(var(--border))] overflow-hidden flex-shrink-0">
                {host.icon ? (
                  <Image src={host.icon} alt={host.name} width={96} height={96} className="object-contain p-2" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center gradient-bg text-white">
                    <FontAwesomeIcon icon={['fas', 'server']} className="text-3xl" />
                  </div>
                )}
              </div>

              {/* Host Details */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h1 className="heading-2 text-[rgb(var(--text))] mb-2">{host.name}</h1>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="primary">{host.type} Hosting</Badge>
                      <Badge variant="warning" icon={['fas', 'star']}>
                        {host.rating.toFixed(1)}
                      </Badge>
                      <Badge variant="default">
                        {totalVotes} votes
                      </Badge>
                    </div>
                  </div>

                  {/* CTA Button */}
                  {websiteUrl && (
                    <Button 
                      href={websiteUrl} 
                      variant="primary" 
                      size="lg"
                      icon={['fas', 'arrow-up-right-from-square']}
                      className="shrink-0"
                    >
                      Visit Website
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-6 pt-6 border-t border-[rgb(var(--border))]">
              <Link 
                href="/hosts" 
                className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors"
              >
                <FontAwesomeIcon icon={['fas', 'arrow-left']} />
                Back to all hosts
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-default py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-[rgb(var(--muted)/0.05)] rounded-xl overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-[rgb(var(--card))] text-[rgb(var(--text))] shadow-soft'
                      : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]'
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} className="text-xs" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Description */}
                  <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6">
                    <h2 className="heading-4 text-[rgb(var(--text))] mb-4">About {host.name}</h2>
                    <p className="body-default text-[rgb(var(--muted))] whitespace-pre-line">
                      {host.description}
                    </p>
                  </div>

                  {/* Targets */}
                  {host.targets && host.targets.length > 0 && (
                    <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6">
                      <h2 className="heading-4 text-[rgb(var(--text))] mb-4">Perfect For</h2>
                      <div className="flex flex-wrap gap-2">
                        {host.targets.map(target => (
                          <Badge key={target} variant="primary" size="md">
                            {target}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {host.notes && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                      <div className="flex items-start gap-3">
                        <FontAwesomeIcon icon={['fas', 'circle-info']} className="text-amber-500 mt-1" />
                        <div>
                          <h3 className="font-semibold text-[rgb(var(--text))] mb-2">Important Notes</h3>
                          <p className="body-small text-[rgb(var(--muted))]">{host.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-6">
                  {/* Detailed Features */}
                  {host.features_detailed && host.features_detailed.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {host.features_detailed.map((feature, idx) => (
                        <div 
                          key={idx} 
                          className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-5 hover:border-[rgb(var(--accent)/0.3)] transition-colors"
                        >
                          <h3 className="font-semibold text-[rgb(var(--text))] mb-2">{feature.title}</h3>
                          <p className="body-small text-[rgb(var(--muted))]">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Attributes */}
                  {host.attributes && Object.keys(host.attributes).length > 0 && (
                    <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6">
                      <h2 className="heading-4 text-[rgb(var(--text))] mb-4">Service Details</h2>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {Object.entries(host.attributes).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between py-2 px-3 rounded-xl bg-[rgb(var(--muted)/0.05)]">
                            <span className="text-sm text-[rgb(var(--muted))]">{formatAttributeKey(key)}</span>
                            {value ? (
                              <Badge variant="success" size="xs">Yes</Badge>
                            ) : (
                              <Badge variant="danger" size="xs">No</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-6">
                  {/* Resources Grid */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {host.ram !== undefined && (
                      <ResourceCard icon={['fas', 'memory']} label="RAM" value={formatResource(host.ram)} color="blue" />
                    )}
                    {host.storage !== undefined && (
                      <ResourceCard icon={['fas', 'hard-drive']} label="Storage" value={formatResource(host.storage)} color="amber" />
                    )}
                    {host.cores !== undefined && (
                      <ResourceCard icon={['fas', 'microchip']} label="CPU Cores" value={`${host.cores} vCPU`} color="violet" />
                    )}
                  </div>

                  {/* Locations */}
                  {host.location && host.location.length > 0 && (
                    <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6">
                      <h2 className="heading-4 text-[rgb(var(--text))] mb-4">Server Locations</h2>
                      <div className="flex flex-wrap gap-3">
                        {host.location.map(loc => (
                          <div 
                            key={loc} 
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[rgb(var(--muted)/0.05)] border border-[rgb(var(--border))]"
                          >
                            <Image
                              src={getFlagUrl(loc)}
                              alt={loc}
                              width={24}
                              height={18}
                              className="w-6 h-auto rounded shadow-sm"
                              unoptimized
                            />
                            <span className="font-medium text-[rgb(var(--text))]">{loc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Renewal */}
                  {host.renewal && (
                    <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={['fas', 'clock']} className="text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[rgb(var(--text))] mb-1">Renewal Policy</h3>
                          <p className="body-small text-[rgb(var(--muted))]">{host.renewal}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'links' && (
                <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6">
                  {host.links && Object.keys(host.links).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(host.links).map(([key, url]) => (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 p-4 rounded-xl hover:bg-[rgb(var(--muted)/0.05)] transition-colors group"
                        >
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 ${
                            key === 'website' ? 'bg-blue-500' :
                            key === 'discord' ? 'bg-[#5865F2]' :
                            key === 'github' ? 'bg-[#24292e]' :
                            key === 'panel' ? 'bg-violet-500' :
                            'bg-emerald-500'
                          }`}>
                            <FontAwesomeIcon
                              icon={
                                key === 'discord' ? ['fab', 'discord'] :
                                key === 'github' ? ['fab', 'github'] :
                                ['fas', key === 'website' ? 'globe' : key === 'panel' ? 'columns' : 'link']
                              }
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-[rgb(var(--text))]">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </div>
                            <div className="text-sm text-[rgb(var(--muted))] truncate group-hover:text-[rgb(var(--accent))] transition-colors">
                              {url}
                            </div>
                          </div>
                          <FontAwesomeIcon icon={['fas', 'arrow-up-right-from-square']} className="text-[rgb(var(--muted))] group-hover:text-[rgb(var(--accent))] transition-colors" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[rgb(var(--muted))] text-center py-8">No links available</p>
                  )}
                </div>
              )}
            </motion.div>

            {/* Similar Hosts */}
            {similarHosts.length > 0 && (
              <div className="pt-6">
                <h2 className="heading-4 text-[rgb(var(--text))] mb-4">Similar Hosts</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {similarHosts.map(sh => (
                    <Link key={sh.id} href={`/hosts/${sh.id}`} className="group">
                      <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-4 hover:border-[rgb(var(--accent)/0.5)] hover:shadow-medium transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[rgb(var(--muted)/0.08)] overflow-hidden flex-shrink-0">
                            {sh.icon ? (
                              <Image src={sh.icon} alt={sh.name} width={48} height={48} className="object-contain p-1" unoptimized />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center gradient-bg text-white">
                                <FontAwesomeIcon icon={['fas', 'server']} />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-[rgb(var(--text))] truncate group-hover:text-[rgb(var(--accent))] transition-colors">
                              {sh.name}
                            </h3>
                            <p className="text-xs text-[rgb(var(--muted))]">{sh.type}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Voting Card */}
            <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold gradient-text mb-1">{approvalRating}%</div>
                <div className="text-sm text-[rgb(var(--muted))]">Approval Rating</div>
                <div className="text-xs text-[rgb(var(--muted))] mt-1">{totalVotes} total votes</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 rounded-xl bg-emerald-500/10">
                  <div className="text-2xl font-bold text-emerald-500">{host.approvals}</div>
                  <div className="text-xs text-[rgb(var(--muted))]">Upvotes</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-red-500/10">
                  <div className="text-2xl font-bold text-red-500">{host.disapprovals}</div>
                  <div className="text-xs text-[rgb(var(--muted))]">Downvotes</div>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => setShowVoteModal(true)}
                  variant="primary"
                  fullWidth
                  icon={['fas', 'thumbs-up']}
                >
                  Vote
                </Button>
              </div>
            </div>

            {/* Languages */}
            {host.locale && host.locale.length > 0 && (
              <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6">
                <h3 className="font-semibold text-[rgb(var(--text))] mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {host.locale.map(lang => (
                    <div key={lang} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgb(var(--muted)/0.05)] text-sm">
                      <Image
                        src={getFlagUrl(lang)}
                        alt={lang}
                        width={16}
                        height={12}
                        className="w-4 h-auto rounded-sm"
                        unoptimized
                      />
                      <span className="text-[rgb(var(--text))]">{lang}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Discord Widget */}
            <DiscordWidget />
          </div>
        </div>
      </div>

      {/* Vote Modal */}
      <Modal
        isOpen={showVoteModal}
        onClose={() => setShowVoteModal(false)}
        title="Join Discord to Vote"
        icon={['fab', 'discord']}
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowVoteModal(false)}>Close</Button>
            <Button
              href="https://discord.gg/QbeZ3b5CQd"
              variant="primary"
              icon={['fab', 'discord']}
            >
              Join Server
            </Button>
          </>
        }
      >
        <div className="text-center py-4">
          <p className="text-[rgb(var(--muted))]">
            Join our Discord community to vote and review hosting providers!
          </p>
        </div>
      </Modal>
    </div>
  );
}

// Resource Card Component
function ResourceCard({ icon, label, value, color }: { icon: IconProp; label: string; value: string; color: 'blue' | 'amber' | 'violet' | 'emerald' }) {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-500',
    amber: 'bg-amber-500/10 text-amber-500',
    violet: 'bg-violet-500/10 text-violet-500',
    emerald: 'bg-emerald-500/10 text-emerald-500',
  };

  return (
    <div className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-5">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
          <FontAwesomeIcon icon={icon} className="text-xl" />
        </div>
        <div>
          <p className="text-sm text-[rgb(var(--muted))] mb-1">{label}</p>
          <div className="text-2xl font-bold text-[rgb(var(--text))]">{value}</div>
        </div>
      </div>
    </div>
  );
}

// Discord Widget Component
function DiscordWidget() {
  return (
    <div className="bg-[#2f3136] rounded-2xl p-6">
      <div className="text-[10px] font-bold text-[#b9bbbe] uppercase tracking-wider mb-4">
        Join Our Community
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#5865F2] flex items-center justify-center shrink-0">
          <span className="text-xl font-bold text-white">FH</span>
        </div>
        <div>
          <div className="font-bold text-white mb-1">FreeHosts</div>
          <div className="flex items-center gap-3 text-xs text-[#b9bbbe]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Online
            </span>
            <span>1,200+ members</span>
          </div>
        </div>
      </div>
      <a
        href="https://discord.gg/QbeZ3b5CQd"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold text-center transition-colors"
      >
        Join Server
      </a>
    </div>
  );
}

// Flag URL helper
function getFlagUrl(codeOrName: string) {
  if (!codeOrName) return 'https://flagcdn.com/w40/un.png';

  const cleanInput = codeOrName.trim();

  if (cleanInput.length === 2) {
    const upper = cleanInput.toUpperCase();
    try {
      const locale = new Intl.Locale(upper).maximize();
      if (locale.region) {
        return `https://flagcdn.com/w40/${locale.region.toLowerCase()}.png`;
      }
    } catch {
      // Continue with fallback
    }
    return `https://flagcdn.com/w40/${upper.toLowerCase()}.png`;
  }

  const codeFromName = countries.getAlpha2Code(cleanInput, 'en');
  if (codeFromName) {
    return `https://flagcdn.com/w40/${codeFromName.toLowerCase()}.png`;
  }

  return 'https://flagcdn.com/w40/un.png';
}
