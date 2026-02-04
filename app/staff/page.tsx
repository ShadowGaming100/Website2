'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import STAFF_DATA from '@/data/staff.json';

interface Social {
  github?: string;
  discord?: string;
  twitter?: string;
}

interface Member {
  name: string;
  role: string;
  avatar: string;
  description: string;
  social: Social;
  badges?: string[];
}

interface StaffGroup {
  category: string;
  icon: IconProp;
  color: 'amber' | 'blue' | 'emerald';
  members: Member[];
}

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Hero Section */}
      <section className="pt-12 pb-16 lg:pt-24 lg:pb-20">
        <div className="container-default text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl gradient-bg mb-6">
              <FontAwesomeIcon icon={['fas', 'users-gear']} className="text-2xl text-white" />
            </div>

            <h1 className="heading-1 text-[rgb(var(--text))] mb-4">
              Meet the <span className="text-[rgb(var(--accent))]">Team</span>
            </h1>

            <p className="body-large text-[rgb(var(--muted))] max-w-2xl mx-auto">
              The dedicated people who work hard to keep FreeHosts verified, safe, and up-to-date.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="pb-16">
        <div className="container-default space-y-16">
          {(STAFF_DATA as StaffGroup[]).map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1, duration: 0.5 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[rgb(var(--accent)/0.1)] flex items-center justify-center">
                  <FontAwesomeIcon icon={group.icon} className="text-xl text-[rgb(var(--accent))]" />
                </div>
                <h2 className="heading-3 text-[rgb(var(--text))]">{group.category}</h2>
              </div>

              {/* Members Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.members.map((member, memberIndex) => (
                  <motion.div
                    key={memberIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: memberIndex * 0.05, duration: 0.3 }}
                    className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] p-6 hover:border-[rgb(var(--accent)/0.3)] transition-all card-hover"
                  >
                    {/* Avatar */}
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-20 h-20 mb-4 rounded-xl overflow-hidden border-2 border-[rgb(var(--border))]">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <h3 className="font-semibold text-lg text-[rgb(var(--text))] mb-1">
                        {member.name}
                      </h3>

                      <p className="text-sm text-[rgb(var(--muted))] mb-3">{member.role}</p>

                      {/* Badges */}
                      {member.badges && member.badges.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          {member.badges.map((badge: string) => (
                            <span
                              key={badge}
                              className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-lg bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))] border border-[rgb(var(--accent)/0.2)]"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-sm text-[rgb(var(--muted))] text-center leading-relaxed">
                        {member.description}
                      </p>
                    </div>

                    {/* Social Links */}
                    <div className="pt-4 border-t border-[rgb(var(--border))] flex items-center justify-center gap-2">
                      {member.social.github && member.social.github !== "#" && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-[rgb(var(--muted)/0.08)] hover:bg-[rgb(var(--muted)/0.15)] flex items-center justify-center text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-all active:scale-95"
                          aria-label={`${member.name}'s GitHub`}
                        >
                          <FontAwesomeIcon icon={['fab', 'github']} />
                        </a>
                      )}
                      {member.social.discord && member.social.discord !== "#" && (
                        <a
                          href={member.social.discord}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-[rgb(var(--muted)/0.08)] hover:bg-[rgb(var(--muted)/0.15)] flex items-center justify-center text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-all active:scale-95"
                          aria-label={`${member.name}'s Discord`}
                        >
                          <FontAwesomeIcon icon={['fab', 'discord']} />
                        </a>
                      )}
                      {member.social.twitter && member.social.twitter !== "#" && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-[rgb(var(--muted)/0.08)] hover:bg-[rgb(var(--muted)/0.15)] flex items-center justify-center text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-all active:scale-95"
                          aria-label={`${member.name}'s Twitter`}
                        >
                          <FontAwesomeIcon icon={['fab', 'x-twitter']} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recruitment CTA */}
      <section className="pb-16">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl gradient-bg p-8 md:p-12 text-center"
          >
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-white/20 flex items-center justify-center">
                <FontAwesomeIcon icon={['fas', 'hand']} className="text-2xl text-white" />
              </div>

              <h2 className="heading-2 text-white mb-4">
                Want to Join the Team?
              </h2>

              <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
                We're always looking for passionate people to help moderate, verify hosts, and grow our community.
              </p>

              <a
                href="https://discord.gg/QbeZ3b5CQd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[rgb(var(--accent))] font-semibold shadow-large hover:opacity-90 transition-all active:scale-98"
              >
                <FontAwesomeIcon icon={['fab', 'discord']} />
                Apply on Discord
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
