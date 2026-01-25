'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface MemberWithColor extends Member {
  color: 'amber' | 'blue' | 'emerald';
}

interface StaffGroup {
  category: string;
  icon: IconProp;
  color: 'amber' | 'blue' | 'emerald';
  members: Member[];
}

const roleColors: Record<'amber' | 'blue' | 'emerald', {
  gradient: string;
  border: string;
  bg: string;
  text: string;
  hover: string;
  glow: string;
}> = {
  amber: {
    gradient: 'from-[rgb(var(--accent)/0.1)] via-[rgb(var(--accent)/0.05)] to-transparent',
    border: 'border-[rgb(var(--accent)/0.1)]',
    bg: 'bg-[rgb(var(--accent)/0.05)]',
    text: 'text-[rgb(var(--accent))]',
    hover: 'hover:border-[rgb(var(--accent)/0.2)]',
    glow: 'shadow-[rgb(var(--accent)/0.1)]'
  },
  blue: {
    gradient: 'from-[rgb(var(--accent)/0.1)] via-[rgb(var(--accent)/0.05)] to-transparent',
    border: 'border-[rgb(var(--accent)/0.1)]',
    bg: 'bg-[rgb(var(--accent)/0.05)]',
    text: 'text-[rgb(var(--accent))]',
    hover: 'hover:border-[rgb(var(--accent)/0.2)]',
    glow: 'shadow-[rgb(var(--accent)/0.1)]'
  },
  emerald: {
    gradient: 'from-[rgb(var(--accent)/0.1)] via-[rgb(var(--accent)/0.05)] to-transparent',
    border: 'border-[rgb(var(--accent)/0.1)]',
    bg: 'bg-[rgb(var(--accent)/0.05)]',
    text: 'text-[rgb(var(--accent))]',
    hover: 'hover:border-[rgb(var(--accent)/0.2)]',
    glow: 'shadow-[rgb(var(--accent)/0.1)]'
  }
};

export default function ModernStaffPage() {
  const [selectedMember, setSelectedMember] = useState<MemberWithColor | null>(null);

  return (
    <div className="min-h-screen">
      {/* Animated background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-bg mb-8 shadow-2xl shadow-[rgb(var(--accent)/0.3)]"
          >
            <FontAwesomeIcon icon={['fas', 'users-gear']} className="text-4xl text-white" />
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
            Meet the Team
          </h1>

          <p className="text-xl md:text-2xl text-[rgb(var(--muted))] max-w-3xl mx-auto leading-relaxed">
            The dedicated people who work hard to keep FreeHosts verified, safe, and up-to-date.
          </p>
        </motion.div>
      </section>

      {/* Staff Grid */}
      <section className="relative z-10 px-4 pb-24">
        <div className="max-w-7xl mx-auto space-y-24">
          {(STAFF_DATA as StaffGroup[]).map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: groupIndex * 0.1, duration: 0.6 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-12">
                <div className={`w-14 h-14 rounded-xl ${roleColors[group.color].bg} flex items-center justify-center border ${roleColors[group.color].border} backdrop-blur-sm`}>
                  <FontAwesomeIcon icon={group.icon} className={`text-2xl ${roleColors[group.color].text}`} />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))]">{group.category}</h2>
                  <div className={`h-1 w-16 ${roleColors[group.color].bg} rounded-full mt-2`} />
                </div>
              </div>

              {/* Members Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.members.map((member, memberIndex) => (
                  <motion.div
                    key={memberIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: memberIndex * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => setSelectedMember({ ...member, color: group.color })}
                    className="cursor-pointer group relative"
                  >
                    {/* Glow effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${roleColors[group.color].gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500`} />
                    
                    <div className={`relative h-full bg-[rgb(var(--card)/0.5)] backdrop-blur-xl rounded-2xl border ${roleColors[group.color].border} ${roleColors[group.color].hover} p-8 transition-all duration-300`}>
                      {/* Avatar */}
                      <div className="flex flex-col items-center mb-6">
                        <div className="relative w-24 h-24 mb-4">
                          <div className={`absolute inset-0 ${roleColors[group.color].bg} rounded-2xl blur-md group-hover:blur-lg transition-all`} />
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="relative w-full h-full rounded-2xl object-cover border-2 border-[rgb(var(--border))] group-hover:border-[rgb(var(--accent))] transition-colors"
                          />
                        </div>

                        <h3 className="text-xl font-bold text-[rgb(var(--text))] mb-1 group-hover:text-[rgb(var(--accent))] transition-colors">
                          {member.name}
                        </h3>

                        <p className="text-sm text-[rgb(var(--muted))] mb-3">{member.role}</p>

                        {/* Badges */}
                        {member.badges && member.badges.length > 0 && (
                          <div className="flex flex-wrap justify-center gap-2 mb-4">
                            {member.badges.map((badge: string) => (
                              <span
                                key={badge}
                                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${roleColors[group.color].bg} ${roleColors[group.color].text} border ${roleColors[group.color].border}`}
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
                      <div className="pt-6 border-t border-[rgb(var(--border))] flex items-center justify-center gap-3">
                        {member.social.github && member.social.github !== "#" && (
                          <a
                            href={member.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 rounded-lg bg-[rgb(var(--card)/0.5)] hover:bg-[rgb(var(--card))] flex items-center justify-center text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-all"
                          >
                            <FontAwesomeIcon icon={['fab', 'github']} className="text-lg" />
                          </a>
                        )}
                        {member.social.discord && member.social.discord !== "#" && (
                          <a
                            href={member.social.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 rounded-lg bg-[rgb(var(--card)/0.5)] hover:bg-[rgb(var(--card))] flex items-center justify-center text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-all"
                          >
                            <FontAwesomeIcon icon={['fab', 'discord']} className="text-lg" />
                          </a>
                        )}
                        {member.social.twitter && member.social.twitter !== "#" && (
                          <a
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 rounded-lg bg-[rgb(var(--card)/0.5)] hover:bg-[rgb(var(--card))] flex items-center justify-center text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-all"
                          >
                            <FontAwesomeIcon icon={['fab', 'x-twitter']} className="text-lg" />
                          </a>
                        )}
                      </div>

                      {/* View Details Hint */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-[rgb(var(--muted))]">Click for details →</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recruitment CTA */}
      <section className="relative z-10 px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-1 gradient-bg-subtle rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition duration-500" />
            <div className="relative bg-[rgb(var(--card)/0.9)] backdrop-blur-xl rounded-3xl border border-[rgb(var(--border))] p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg mb-6">
                <FontAwesomeIcon icon={['fas', 'hand']} className="text-3xl text-white" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--text))] mb-4">
                Want to Join the Team?
              </h2>

              <p className="text-lg text-[rgb(var(--muted))] mb-8 max-w-2xl mx-auto">
                We're always looking for passionate people to help moderate, verify hosts, and grow our community.
              </p>

              <a
                href="https://discord.gg/QbeZ3b5CQd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 gradient-bg text-white font-semibold rounded-xl hover:shadow-2xl shadow-glow transition-all duration-300 hover:scale-105"
              >
                <FontAwesomeIcon icon={['fab', 'discord']} className="text-xl" />
                Apply on Discord
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Member Detail Popup */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-hide"
              >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${roleColors[selectedMember.color].gradient} rounded-3xl blur-xl opacity-75`} />
              
              <div className="relative bg-[rgb(var(--card))] rounded-3xl border border-[rgb(var(--border))] overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[rgb(var(--card))] hover:bg-[rgb(var(--border))] flex items-center justify-center text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-all"
                >
                  <FontAwesomeIcon icon={['fas', 'xmark']} className="text-xl" />
                </button>

                {/* Header with Avatar */}
                <div className={`relative bg-gradient-to-br ${roleColors[selectedMember.color].gradient} p-8 pb-20`}>
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className={`absolute inset-0 ${roleColors[selectedMember.color].bg} rounded-3xl blur-xl`} />
                      <img
                        src={selectedMember.avatar}
                        alt={selectedMember.name}
                        className="relative w-full h-full rounded-3xl object-cover border-4 border-[rgb(var(--border))]"
                      />
                    </div>

                    <h2 className="text-3xl font-bold text-[rgb(var(--text))] mb-2">{selectedMember.name}</h2>
                    <p className="text-lg text-[rgb(var(--muted))] mb-4">{selectedMember.role}</p>

                    {selectedMember.badges && selectedMember.badges.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2">
                        {selectedMember.badges.map((badge: string) => (
                          <span
                            key={badge}
                            className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-full ${roleColors[selectedMember.color].bg} ${roleColors[selectedMember.color].text} border ${roleColors[selectedMember.color].border}`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 -mt-12 relative z-10">
                  <div className="bg-[rgb(var(--card))] backdrop-blur-sm rounded-2xl p-6 mb-6 border border-[rgb(var(--border))]">
                    <h3 className="text-lg font-bold text-[rgb(var(--text))] mb-3">About</h3>
                    <p className="text-[rgb(var(--muted))] leading-relaxed">
                      {selectedMember.description}
                    </p>
                  </div>

                  <div className="bg-[rgb(var(--card))] backdrop-blur-sm rounded-2xl p-6 mb-6 border border-[rgb(var(--border))]">
                    <h3 className="text-lg font-bold text-[rgb(var(--text))] mb-4">Role</h3>
                    <p className="text-[rgb(var(--muted))]">{selectedMember.role}</p>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-3">
                    {selectedMember.social.github && selectedMember.social.github !== "#" && (
                      <a
                        href={selectedMember.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[rgb(var(--card))] hover:bg-[rgb(var(--border))] rounded-xl text-[rgb(var(--text))] transition-all"
                      >
                        <FontAwesomeIcon icon={['fab', 'github']} className="text-xl" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {selectedMember.social.discord && selectedMember.social.discord !== "#" && (
                      <a
                        href={selectedMember.social.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[rgb(var(--card))] hover:bg-[rgb(var(--border))] rounded-xl text-[rgb(var(--text))] transition-all"
                      >
                        <FontAwesomeIcon icon={['fab', 'discord']} className="text-xl" />
                        <span>Discord</span>
                      </a>
                    )}
                    {selectedMember.social.twitter && selectedMember.social.twitter !== "#" && (
                      <a
                        href={selectedMember.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[rgb(var(--card))] hover:bg-[rgb(var(--border))] rounded-xl text-[rgb(var(--text))] transition-all"
                      >
                        <FontAwesomeIcon icon={['fab', 'x-twitter']} className="text-xl" />
                        <span>Twitter</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
