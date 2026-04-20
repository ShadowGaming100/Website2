import React from "react";

const rules = [
  {
    icon: "fa-users",
    title: "Respect Everyone",
    description:
      "Treat all members with courtesy and professionalism. Harassment, hate speech, discrimination, or any toxic behavior (insults, slurs, personal attacks) is strictly prohibited and will result in immediate action.",
  },
  {
    icon: "fa-ban",
    title: "No Spam, Ads, or Mass Mentions",
    description:
      "Avoid flooding channels with repeated messages, excessive emojis, or unsolicited links. Advertising, self-promotion, or mass-mentions (@everyone/@here) is not allowed.",
  },
  {
    icon: "fa-eye-slash",
    title: "Keep Content Safe for Work",
    description:
      "No NSFW, violent, or illegal content. All images, videos, and links must comply with Discord Terms of Service and Guidelines.",
  },
  {
    icon: "fa-bullseye",
    title: "Stay On Topic",
    description:
      "Post only relevant content in each channel. Off-topic discussions should be moved to appropriate channels or threads to avoid clutter.",
  },
  {
    icon: "fa-user-secret",
    title: "No Evasion or Alternate Accounts",
    description:
      "Using alternate accounts to avoid mutes, timeouts, or bans is forbidden. Impersonating or creating alt accounts will lead to permanent removal.",
  },
  {
    icon: "fa-id-card",
    title: "Clean Usernames and Avatars",
    description:
      "Your username, nickname, and avatar must not contain offensive language, hate symbols, or disruptive formatting. Please choose names and images that are easy to read and non-controversial.",
  },
  {
    icon: "fa-shield-halved",
    title: "Respect Staff Authority",
    description:
      "All staff decisions (warnings, timeouts, bans) are final. If you disagree, contact a senior staff member privately—do not argue publicly or rally others against staff.",
  },
  {
    icon: "fa-lock",
    title: "Privacy and Doxxing",
    description:
      "Never share someone else’s personal data (real name, address, phone, private messages, etc) without explicit permission. Violations will result in an immediate ban.",
  },
  {
    icon: "fa-language",
    title: "Language Use",
    description:
      "Please use English in all channels except 🌐︱global-chat. Non-English posts elsewhere may be removed to ensure clear communication.",
  },
  {
    icon: "fa-person-circle-exclamation",
    title: "Hate, Harassment, or Threats = Ban",
    description:
      "Zero tolerance for threats, stalking, doxxing, or hateful language against any protected class. Even ‘jokes’ or memes can be punished.",
  },
  {
    icon: "fa-flag",
    title: "Report Issues, Don’t Escalate",
    description:
      "If you witness rule-breaking or conflicts, report them directly to a moderator. Do not argue or escalate issues.",
  },
  {
    icon: "fa-brands fa-discord",
    title: "Follow Discord Terms & Guidelines",
    description:
      "All server activity must adhere to Discord’s Terms of Service and Community Guidelines. We will report any violations.",
  },
  {
    icon: "fa-bell-slash",
    title: "No Ghost Pings or Trick Mentions",
    description:
      "Ping‑and‑delete (ghost pings) or pinging large groups to troll is disruptive. Unauthorized @role or @usergroup mentions will lead to timeouts or bans.",
  },
  {
    icon: "fa-mask",
    title: "No Impersonation",
    description:
      "Do not pretend to be staff, bots, or other members by copying usernames, avatars, or using misleading nicknames.",
  },
  {
    icon: "fa-brain",
    title: "Use Common Sense",
    description:
      "If your action could be harmful, disruptive, or disrespectful, don’t do it. Staff will consider intent and impact when enforcing rules.",
  },
  {
    icon: "fa-robot",
    title: "Don’t Abuse Bots or Exploits",
    description:
      "Mass‑run commands, spam features, or exploit bugs in bots. Report any bugs to staff instead of taking advantage.",
  },
  {
    icon: "fa-virus",
    title: "No Harmful or Malicious Content",
    description:
      "Sharing malware, phishing links, token grabbers, or any files/scripts that harm others’ security is strictly forbidden.",
  },
  {
    icon: "fa-gavel",
    title: "Final Say Belongs to Staff",
    description:
      "Staff may issue enforcement actions beyond these rules to protect the community. All decisions are non-negotiable.",
  },
];

export default function ServerRulesContent() {
  return (
    <div className="rules-page-container">
      <section className="rules-header-section">
        <div className="rules-icon-main">
          <i className="fa-solid fa-shield-halved"></i>
        </div>
        <h1 className="rules-page-title">Discord Server Rules</h1>
        <p className="rules-page-subtitle">
          To maintain a safe and productive environment for all members, we
          enforce the following guidelines.
        </p>
      </section>

      <div className="rules-grid-layout">
        {rules.map((rule, index) => (
          <article className="rule-item-card" key={index}>
            <div className="rule-card-header">
              <span className="rule-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="rule-icon-box">
                <i className={`fa-solid ${rule.icon}`}></i>
              </div>
            </div>
            <div className="rule-card-body">
              <h3 className="rule-card-title">{rule.title}</h3>
              <p className="rule-card-text">{rule.description}</p>
            </div>
          </article>
        ))}
      </div>

      <footer className="rules-footer-info">
        <p>
          <i className="fa-solid fa-clock-rotate-left"></i> Last Updated: 24/07/2025,
          01:33 am
        </p>
      </footer>
    </div>
  );
}
