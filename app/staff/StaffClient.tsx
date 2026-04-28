"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Award, Code, Crown, Globe, GraduationCap, HandHeart, HandMetal, Heart, LayoutGrid, Newspaper, Server, Shield, ShieldCheck, Terminal, Upload, UserCheck, Users, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faDiscord, faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { staffData, type StaffJsonMember } from "./data";

type FilterKey =
  | "all"
  | "owner"
  | "administrator"
  | "developer"
  | "moderator"
  | "helper"
  | "host-publisher"
  | "hosting-provider";

type RoleInfo = {
  icon: LucideIcon;
  className: string;
  priority: number;
  displayName: string;
  filterKey: Exclude<FilterKey, "all">;
};

type StaffMember = {
  username: string;
  name: string;
  roles: RoleInfo[];
  primaryRole: RoleInfo;
  about?: string;
  links?: Record<string, string>;
};

const roleConfig: Record<string, RoleInfo> = {
  owner: { icon: Crown, className: "owner", priority: 1, displayName: "Owner", filterKey: "owner" },
  "co-owner": { icon: Crown, className: "owner", priority: 1, displayName: "Owner", filterKey: "owner" },
  administrator: { icon: ShieldCheck, className: "admin", priority: 2, displayName: "Administrator", filterKey: "administrator" },
  admin: { icon: ShieldCheck, className: "admin", priority: 2, displayName: "Administrator", filterKey: "administrator" },
  developer: { icon: Terminal, className: "developer", priority: 3, displayName: "Developer", filterKey: "developer" },
  dev: { icon: Terminal, className: "developer", priority: 3, displayName: "Developer", filterKey: "developer" },
  moderator: { icon: Shield, className: "moderator", priority: 4, displayName: "Moderator", filterKey: "moderator" },
  helper: { icon: HandHeart, className: "helper", priority: 5, displayName: "Helper", filterKey: "helper" },
  "host publisher": { icon: Newspaper, className: "publisher", priority: 6, displayName: "Host Publisher", filterKey: "host-publisher" },
  publisher: { icon: Newspaper, className: "publisher", priority: 6, displayName: "Host Publisher", filterKey: "host-publisher" },
  "hosting provider": { icon: Server, className: "hosting-provider", priority: 7, displayName: "Hosting Provider", filterKey: "hosting-provider" },
  provider: { icon: Server, className: "hosting-provider", priority: 7, displayName: "Hosting Provider", filterKey: "hosting-provider" },
};

const sections: Record<Exclude<FilterKey, "all">, { title: string; desc: string; iconClass: string; icon: LucideIcon }> = {
  owner: { title: "Owners", desc: "Founders and leaders of FreeHosts", iconClass: "leadership", icon: Crown },
  administrator: { title: "Administrators", desc: "Team administrators managing operations", iconClass: "leadership", icon: UserCheck },
  developer: { title: "Developers", desc: "Building and maintaining our platform", iconClass: "development", icon: Code },
  moderator: { title: "Moderators", desc: "Community moderators keeping things safe", iconClass: "community", icon: Shield },
  helper: { title: "Helpers", desc: "Support team helping our community", iconClass: "community", icon: HandHeart },
  "host-publisher": { title: "Host Publishers", desc: "Contributors managing host listings", iconClass: "hosting", icon: Upload },
  "hosting-provider": { title: "Hosting Providers", desc: "Partners providing hosting services", iconClass: "hosting", icon: Server },
};

const filters: { key: FilterKey; icon: LucideIcon; label: string }[] = [
  { key: "all", icon: LayoutGrid, label: "All Team" },
  { key: "owner", icon: Crown, label: "Owner" },
  { key: "administrator", icon: UserCheck, label: "Administrator" },
  { key: "developer", icon: Code, label: "Developer" },
  { key: "moderator", icon: Shield, label: "Moderator" },
  { key: "helper", icon: HandHeart, label: "Helper" },
  { key: "host-publisher", icon: Upload, label: "Host Publisher" },
  { key: "hosting-provider", icon: Server, label: "Hosting Provider" },
];

const linkIcons: Record<string, { icon: LucideIcon | IconDefinition; label: string; isBrand?: boolean }> = {
  github: { icon: faGithub, label: "GitHub Profile", isBrand: true },
  website: { icon: Globe, label: "Website" },
  discord: { icon: faDiscord, label: "Discord", isBrand: true },
  twitter: { icon: faTwitter, label: "Twitter", isBrand: true },
  linkedin: { icon: faLinkedin, label: "LinkedIn", isBrand: true },
};

function categorizeRole(role: string) {
  const lower = role.trim().toLowerCase();
  const hit = Object.entries(roleConfig).find(([key]) => lower.includes(key));
  return hit?.[1] ?? null;
}

function processStaff(data: Record<string, StaffJsonMember>) {
  return Object.entries(data)
    .map<StaffMember | null>(([username, member]) => {
      const rawRoles = Array.isArray(member.roles) ? member.roles : [member.roles];
      const roles = rawRoles
        .map((role: string) => categorizeRole(String(role)))
        .filter((role): role is RoleInfo => Boolean(role))
        .sort((a: RoleInfo, b: RoleInfo) => a.priority - b.priority);

      if (roles.length === 0) return null;

      return {
        username,
        name: member.name || username,
        roles,
        primaryRole: roles[0],
        about: member.about,
        links: member.links,
      };
    })
    .filter((member): member is StaffMember => Boolean(member))
    .sort((a: StaffMember, b: StaffMember) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
}

export default function StaffClient() {
  const [members] = useState<StaffMember[]>(() => processStaff(staffData));
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);

  useEffect(() => {
    if (!selectedMember) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedMember(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedMember]);

  const grouped = useMemo(() => {
    const result = Object.keys(sections).reduce(
      (acc, key) => ({ ...acc, [key]: [] }),
      {} as Record<Exclude<FilterKey, "all">, StaffMember[]>,
    );

    members.forEach((member) => {
      if (activeFilter === "all") {
        result[member.primaryRole.filterKey].push(member);
      } else if (member.roles.some((role) => role.filterKey === activeFilter)) {
        result[activeFilter].push(member);
      }
    });

    return result;
  }, [activeFilter, members]);

  return (
    <main className="wrap staff-page">
      <section className="staff-hero">
        <div className="staff-hero-icon">
          <Users size={24} aria-hidden="true" />
        </div>
        <h1>Meet Our Team</h1>
        <p>Dedicated volunteers who help run, maintain, and grow the FreeHosts community.</p>
      </section>

      <div className="staff-filters">
        {filters.map((filter) => (
          <button
            className={`filter-btn ${activeFilter === filter.key ? "active" : ""}`}
            type="button"
            onClick={() => setActiveFilter(filter.key)}
            key={filter.key}
          >
            {React.createElement(filter.icon, { size: 14, "aria-hidden": "true" })}
            {filter.label}
          </button>
        ))}
      </div>

      <StaffSections grouped={grouped} onSelect={setSelectedMember} />

      <section className="join-team-section">
        <div className="join-icon">
          <HandMetal size={24} aria-hidden="true" />
        </div>
        <h2>Want to Join the Team?</h2>
        <p>
          We&apos;re always looking for passionate volunteers to help grow and improve
          FreeHosts. Whether you&apos;re interested in curation, moderation,
          development, or community support, there&apos;s a place for you here.
        </p>

        <div className="join-benefits">
          <Benefit icon={Heart} title="Make an Impact" text="Help thousands find the right hosting" />
          <Benefit icon={Users} title="Join Community" text="Work with passionate volunteers" />
          <Benefit icon={GraduationCap} title="Learn & Grow" text="Gain experience and skills" />
          <Benefit icon={Award} title="Recognition" text="Get credited for your work" />
        </div>

        <a href="https://discord.gg/QbeZ3b5CQd" className="join-cta" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faDiscord} aria-hidden="true" />
          Join Our Discord
        </a>
      </section>

      {selectedMember ? (
        <StaffModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      ) : null}
    </main>
  );
}

function StaffSections({
  grouped,
  onSelect,
}: {
  grouped: Record<Exclude<FilterKey, "all">, StaffMember[]>;
  onSelect: (member: StaffMember) => void;
}) {
  const visible = Object.entries(sections).filter(([key]) => grouped[key as Exclude<FilterKey, "all">].length > 0);

  if (visible.length === 0) {
    return <div className="error-state"><p className="muted">No staff members found in this category.</p></div>;
  }

  return (
    <>
      {visible.map(([key, section]) => {
        const members = grouped[key as Exclude<FilterKey, "all">];
        return (
          <section className="staff-section" key={key}>
            <div className="staff-section-header">
              <div className={`staff-section-icon ${section.iconClass}`}>
                {React.createElement(section.icon, { size: 20, "aria-hidden": "true" })}
              </div>
              <div className="staff-section-title">
                <h2>{section.title}</h2>
                <p>{section.desc}</p>
              </div>
            </div>
            <div className="staff-grid">
              {members.map((member) => (
                <button className="staff-card" type="button" onClick={() => onSelect(member)} key={member.username}>
                  <div className={`staff-avatar ${member.primaryRole.className}`}>
                    {React.createElement(member.primaryRole.icon, { size: 20, "aria-hidden": "true" })}
                  </div>
                  <div className="staff-info">
                    <h3>{member.name}</h3>
                    <RoleBadges roles={member.roles} />
                  </div>
                </button>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

function RoleBadges({ roles }: { roles: RoleInfo[] }) {
  return (
    <div className="staff-roles">
      {roles.map((role) => (
        <span className={`staff-role role-${role.className}`} key={`${role.filterKey}-${role.displayName}`}>
          {React.createElement(role.icon, { size: 14, "aria-hidden": "true" })}
          {role.displayName}
        </span>
      ))}
    </div>
  );
}

function StaffModal({ member, onClose }: { member: StaffMember; onClose: () => void }) {
  const links = Object.entries(member.links || {}).filter(([, value]) => Boolean(value));

  return (
    <div className="staff-modal" onClick={onClose}>
      <div className="staff-modal-content" onClick={(event) => event.stopPropagation()}>
        <div className="staff-modal-header">
          <button className="staff-modal-close" type="button" aria-label="Close" onClick={onClose}>
            <X size={20} aria-hidden="true" />
          </button>
          <div className="staff-modal-avatar">
            {React.createElement(member.primaryRole.icon, { size: 20, "aria-hidden": "true" })}
          </div>
          <div className="staff-modal-info">
            <h2>{member.name}</h2>
            <RoleBadges roles={member.roles} />
          </div>
        </div>
        <div className="staff-modal-body">
          {member.about ? (
            <div className="staff-modal-section">
              <h3>About</h3>
              <p className="staff-modal-about">{member.about}</p>
            </div>
          ) : null}

          {links.length > 0 ? (
            <div className="staff-modal-section">
              <h3>Links</h3>
              <div className="staff-modal-links">
                {links.map(([key, value]) => {
                  const info = linkIcons[key] || { icon: Globe, label: key };
                  return (
                    <a className="staff-modal-link" href={value} target="_blank" rel="noopener noreferrer" key={key}>
                      <div className="staff-modal-link-icon">
                        {info.isBrand
                          ? <FontAwesomeIcon icon={info.icon as IconDefinition} aria-hidden="true" />
                          : React.createElement(info.icon as LucideIcon, { size: 20, "aria-hidden": "true" })
                        }
                      </div>
                      <div className="staff-modal-link-text">
                        <strong>{info.label}</strong>
                        <span>{value}</span>
                      </div>
                      <ArrowUpRight size={20} aria-hidden="true" style={{ color: "var(--muted)" }} />
                    </a>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Benefit({ icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="benefit-item">
      <div className="benefit-icon">
        {React.createElement(icon, { size: 20, "aria-hidden": "true" })}
      </div>
      <div className="benefit-text">
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}
