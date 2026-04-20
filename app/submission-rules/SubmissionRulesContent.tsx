import React from "react";

export default function SubmissionRulesContent() {
  return (
    <div className="rules-container">
      <section className="rules-hero">
        <h1 className="rules-title">Hosting Submission Rules</h1>
        <p className="rules-subtitle">
          All hosts must follow the rules below to be listed on FreeHosts.
        </p>
      </section>

      <section className="rule-category">
        <div className="category-header">
          <div className="category-icon">
            <i className="fa-solid fa-lock"></i>
          </div>
          <h2 className="category-title">Security</h2>
        </div>
        <div className="category-content">
          <ul>
            <li>Passwords encrypted & stored safely.</li>
            <li>Anti-DDoS, and secure authentication.</li>
          </ul>
        </div>
      </section>

      <section className="rule-category">
        <div className="category-header">
          <div className="category-icon">
            <i className="fa-solid fa-table-layout"></i>
          </div>
          <h2 className="category-title">Layout</h2>
        </div>
        <div className="category-content">
          <ul>
            <li>
              If a host has multiple targets, you must list the specs for each
              target separately.
            </li>
            <li>
              All hosts must follow the required layout:
              <div className="layout-example">
                Host Submission
                <br />
                <br />
                Host Name
                <br />
                [Host Name]
                <br />
                Plans
                <br />
                [Plans]
                <br />
                Targets
                <br />
                [Targets]
                <br />
                Locales / Languages
                <br />
                [Locales]
                <br />
                ------------------------------------------------------------
                <br />
                <br />
                Specifications
                <br />
                - RAM: [RAM]
                <br />
                - CPU: [CPU]
                <br />
                - Disk: [Disk]
                <br />
                ------------------------------------------------------------
                <br />
                <br />
                Links
                <br />
                ToS: [URL]
                <br />
                Privacy Policy: [URL]
                <br />
                ------------------------------------------------------------
                <br />
                <br />
                Information
                <br />
                - Renewal Required: [YES/NO]
                <br />
                - Renewal Duration: [Days]
                <br />
                - Coins Needed: [Amount]
                <br />
                - Notes: [Notes]
                <br />
                ------------------------------------------------------------
                <br />
                <br />
                Verification
                <br />
                [x] I have included the ToS
                <br />
                [x] I have included the Privacy Policy
              </div>
            </li>
            <li>
              If you cannot format it correctly, use the Layout Builder instead.
            </li>
            <li>Submissions not following this layout will be ignored.</li>
          </ul>
        </div>
      </section>

      <section className="rule-category">
        <div className="category-header">
          <div className="category-icon">
            <i className="fa-solid fa-toolbox"></i>
          </div>
          <h2 className="category-title">Service</h2>
        </div>
        <div className="category-content">
          <ul>
            <li>Stable performance & normal uptime.</li>
            <li>Free service must be provided for at least 2 months.</li>
            <li>Signup must be simple with no restrictions.</li>
            <li>Must offer real free plans, not trials.</li>
            <li>
              Coin-based plans are allowed (earning systems allowed); invite
              requirements are NOT allowed.
            </li>
            <li>Provide full specs (RAM, vCores, disk).</li>
            <li>
              If different targets have different specs, you must list specs
              per target.
            </li>
            <li>Include target use cases (gaming, coding, bots, etc).</li>
            <li>Provide direct links showing the free plan.</li>
          </ul>
        </div>
      </section>

      <section className="rule-category">
        <div className="category-header">
          <div className="category-icon">
            <i className="fa-solid fa-file-contract"></i>
          </div>
          <h2 className="category-title">Policies</h2>
        </div>
        <div className="category-content">
          <ul>
            <li>Public ToS and Privacy Policy required.</li>
            <li>Must follow Discord's Terms of Service.</li>
            <li>Must follow all local and international laws.</li>
            <li>Must follow server rules.</li>
          </ul>
        </div>
      </section>

      <section className="rule-category">
        <div className="category-header">
          <div className="category-icon">
            <i className="fa-solid fa-code"></i>
          </div>
          <h2 className="category-title">Software</h2>
        </div>
        <div className="category-content">
          <ul>
            <li>No nulled/cracked themes, plugins, or dashboards.</li>
            <li>No malware or illegal content.</li>
          </ul>
        </div>
      </section>

      <section className="rule-category">
        <div className="category-header">
          <div className="category-icon">
            <i className="fa-solid fa-handshake"></i>
          </div>
          <h2 className="category-title">Conduct</h2>
        </div>
        <div className="category-content">
          <ul>
            <li>No scams, harassment, or black advertising.</li>
            <li>No lying or falsifying specs, uptime, or plan details.</li>
            <li>
              No host shaming, attacking, or starting drama with other hosts.
            </li>
            <li>No stealing customers from other hosts (poaching).</li>
            <li>No false reports or trying to sabotage other submissions.</li>
            <li>Hosts must respond to staff politely and respectfully.</li>
            <li>
              Must not engage in unprofessional behavior, arguments, or
              hostility in chat.
            </li>
            <li>
              Treat users and other hosts with respect and fairness at all
              times.
            </li>
          </ul>
        </div>
      </section>

      <section className="rule-category">
        <div className="category-header">
          <div className="category-icon">
            <i className="fa-solid fa-repeat"></i>
          </div>
          <h2 className="category-title">Renewal</h2>
        </div>
        <div className="category-content">
          <ul>
            <li>
              State if plans auto-renew, manual renew, or don't renew.
            </li>
            <li>
              Include renewal frequency (how often renewals are allowed).
            </li>
          </ul>
        </div>
      </section>

      <section className="rule-category">
        <div className="category-header">
          <div className="category-icon">
            <i className="fa-solid fa-exclamation-triangle"></i>
          </div>
          <h2 className="category-title">Enforcement</h2>
        </div>
        <div className="category-content">
          <ul>
            <li>
              Rule violations may result in removal, blacklisting until fixed
              (BH/SH &mdash; Bad Host/Scam Host)
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
