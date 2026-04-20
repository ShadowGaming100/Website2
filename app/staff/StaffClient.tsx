"use client";

import { useEffect, useMemo, useState } from "react";
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
  icon: string;
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
  owner: { icon: "fa-solid fa-crown", className: "owner", priority: 1, displayName: "Owner", filterKey: "owner" },
  "co-owner": { icon: "fa-solid fa-crown", className: "owner", priority: 1, displayName: "Owner", filterKey: "owner" },
  administrator: { icon: "fa-solid fa-user-shield", className: "admin", priority: 2, displayName: "Administrator", filterKey: "administrator" },
  admin: { icon: "fa-solid fa-user-shield", className: "admin", priority: 2, displayName: "Administrator", filterKey: "administrator" },
  developer: { icon: "fa-solid fa-terminal", className: "developer", priority: 3, displayName: "Developer", filterKey: "developer" },
  dev: { icon: "fa-solid fa-terminal", className: "developer", priority: 3, displayName: "Developer", filterKey: "developer" },
  moderator: { icon: "fa-solid fa-shield-halved", className: "moderator", priority: 4, displayName: "Moderator", filterKey: "moderator" },
  helper: { icon: "fa-solid fa-hands-helping", className: "helper", priority: 5, displayName: "Helper", filterKey: "helper" },
  "host publisher": { icon: "fa-solid fa-newspaper", className: "publisher", priority: 6, displayName: "Host Publisher", filterKey: "host-publisher" },
  publisher: { icon: "fa-solid fa-newspaper", className: "publisher", priority: 6, displayName: "Host Publisher", filterKey: "host-publisher" },
  "hosting provider": { icon: "fa-solid fa-server", className: "hosting-provider", priority: 7, displayName: "Hosting Provider", filterKey: "hosting-provider" },
  provider: { icon: "fa-solid fa-server", className: "hosting-provider", priority: 7, displayName: "Hosting Provider", filterKey: "hosting-provider" },
};

const sections: Record<Exclude<FilterKey, "all">, { title: string; desc: string; iconClass: string; icon: string }> = {
  owner: { title: "Owners", desc: "Founders and leaders of FreeHosts", iconClass: "leadership", icon: "fa-solid fa-crown" },
  administrator: { title: "Administrators", desc: "Team administrators managing operations", iconClass: "leadership", icon: "fa-solid fa-user-tie" },
  developer: { title: "Developers", desc: "Building and maintaining our platform", iconClass: "development", icon: "fa-solid fa-code" },
  moderator: { title: "Moderators", desc: "Community moderators keeping things safe", iconClass: "community", icon: "fa-solid fa-shield-halved" },
  helper: { title: "Helpers", desc: "Support team helping our community", iconClass: "community", icon: "fa-solid fa-hands-helping" },
  "host-publisher": { title: "Host Publishers", desc: "Contributors managing host listings", iconClass: "hosting", icon: "fa-solid fa-upload" },
  "hosting-provider": { title: "Hosting Providers", desc: "Partners providing hosting services", iconClass: "hosting", icon: "fa-solid fa-server" },
};

const filters: { key: FilterKey; icon: string; label: string }[] = [
  { key: "all", icon: "fa-solid fa-th", label: "All Team" },
  { key: "owner", icon: "fa-solid fa-crown", label: "Owner" },
  { key: "administrator", icon: "fa-solid fa-user-tie", label: "Administrator" },
  { key: "developer", icon: "fa-solid fa-code", label: "Developer" },
  { key: "moderator", icon: "fa-solid fa-shield-halved", label: "Moderator" },
  { key: "helper", icon: "fa-solid fa-hands-helping", label: "Helper" },
  { key: "host-publisher", icon: "fa-solid fa-upload", label: "Host Publisher" },
  { key: "hosting-provider", icon: "fa-solid fa-server", label: "Hosting Provider" },
];

const linkIcons: Record<string, { icon: string; label: string }> = {
  github: { icon: "fa-brands fa-github", label: "GitHub Profile" },
  website: { icon: "fa-solid fa-globe", label: "Website" },
  discord: { icon: "fa-brands fa-discord", label: "Discord" },
  twitter: { icon: "fa-brands fa-twitter", label: "Twitter" },
  linkedin: { icon: "fa-brands fa-linkedin", label: "LinkedIn" },
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
          <i className="fa-solid fa-users" />
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
            <i className={filter.icon} />
            {filter.label}
          </button>
        ))}
      </div>

      <StaffSections grouped={grouped} onSelect={setSelectedMember} />

      <section className="join-team-section">
        <div className="join-icon">
          <i className="fa-solid fa-hand-sparkles" />
        </div>
        <h2>Want to Join the Team?</h2>
        <p>
          We&apos;re always looking for passionate volunteers to help grow and improve
          FreeHosts. Whether you&apos;re interested in curation, moderation,
          development, or community support, there&apos;s a place for you here.
        </p>

        <div className="join-benefits">
          <Benefit icon="fa-heart" title="Make an Impact" text="Help thousands find the right hosting" />
          <Benefit icon="fa-users" title="Join Community" text="Work with passionate volunteers" />
          <Benefit icon="fa-graduation-cap" title="Learn & Grow" text="Gain experience and skills" />
          <Benefit icon="fa-award" title="Recognition" text="Get credited for your work" />
        </div>

        <a href="https://discord.gg/QbeZ3b5CQd" className="join-cta" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-discord" />
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
                <i className={section.icon} />
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
                    <i className={member.primaryRole.icon} />
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
          <i className={role.icon} />
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
            <i className="fa-solid fa-xmark" />
          </button>
          <div className="staff-modal-avatar">
            <i className={member.primaryRole.icon} />
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
                  const info = linkIcons[key] || { icon: "fa-solid fa-link", label: key };
                  return (
                    <a className="staff-modal-link" href={value} target="_blank" rel="noopener noreferrer" key={key}>
                      <div className="staff-modal-link-icon">
                        <i className={info.icon} />
                      </div>
                      <div className="staff-modal-link-text">
                        <strong>{info.label}</strong>
                        <span>{value}</span>
                      </div>
                      <i className="fa-solid fa-arrow-up-right-from-square" style={{ color: "var(--muted)" }} />
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

function Benefit({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="benefit-item">
      <div className="benefit-icon">
        <i className={`fa-solid ${icon}`} />
      </div>
      <div className="benefit-text">
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}
