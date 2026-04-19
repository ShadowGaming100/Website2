"use client";

import { FormEvent, useMemo, useState } from "react";

type SpecType = "same" | "different";
type RenewalStatus = "" | "yes" | "no";

type FormState = {
  hostName: string;
  plans: string;
  targets: string;
  locales: string;
  specType: SpecType;
  sameRam: string;
  sameCpu: string;
  sameDisk: string;
  tosLink: string;
  privacyLink: string;
  planLink: string;
  websiteLink: string;
  discordLink: string;
  otherLinks: string;
  renewalStatus: RenewalStatus;
  renewalDuration: string;
  coinsNeeded: string;
  notes: string;
  checkToS: boolean;
  checkPrivacy: boolean;
};

type PlanSpec = {
  originalName: string;
  name: string;
  ram: string;
  cpu: string;
  disk: string;
};

const initialForm: FormState = {
  hostName: "",
  plans: "",
  targets: "",
  locales: "",
  specType: "same",
  sameRam: "",
  sameCpu: "",
  sameDisk: "",
  tosLink: "",
  privacyLink: "",
  planLink: "",
  websiteLink: "",
  discordLink: "",
  otherLinks: "",
  renewalStatus: "",
  renewalDuration: "",
  coinsNeeded: "",
  notes: "",
  checkToS: true,
  checkPrivacy: true,
};

const emptyPreview = "Fill in the form to see the message preview here...";

function splitPlans(plans: string) {
  return plans
    .split(",")
    .map((plan) => plan.trim())
    .filter(Boolean);
}

function renewalDisplay(status: RenewalStatus) {
  if (status === "yes") return "YES";
  if (status === "no") return "NO";
  return "[Select an option]";
}

function buildMessage(form: FormState, planSpecs: PlanSpec[], otherSpec: PlanSpec | null) {
  const lines: string[] = [];

  lines.push("Host Submission");
  lines.push("");
  lines.push("Host Name");
  lines.push(form.hostName || "[Host Name]");
  lines.push("Plans");
  lines.push(form.plans || "[Plans]");
  lines.push("Targets");
  lines.push(form.targets || "[Targets]");
  lines.push("Locales / Languages");
  lines.push(form.locales || "[Locales]");
  lines.push("------------------------------------------------------------");
  lines.push("");
  lines.push("Specifications");

  if (form.specType === "same") {
    if (form.sameRam || form.sameCpu || form.sameDisk) {
      if (form.sameRam) lines.push(`- RAM: ${form.sameRam}`);
      if (form.sameCpu) lines.push(`- CPU: ${form.sameCpu}`);
      if (form.sameDisk) lines.push(`- Disk: ${form.sameDisk}`);
    } else {
      lines.push("- [Specs will appear here]");
    }
  } else {
    const hasSpecs = planSpecs.length > 0 || otherSpec;
    if (!hasSpecs) {
      lines.push('- [Add plans using the "Add Plan" button above]');
    }

    planSpecs.forEach((spec) => {
      lines.push(`${spec.name || spec.originalName}:`);
      if (spec.ram) lines.push(`- RAM: ${spec.ram}`);
      if (spec.cpu) lines.push(`- CPU: ${spec.cpu}`);
      if (spec.disk) lines.push(`- Disk: ${spec.disk}`);
    });

    if (otherSpec) {
      lines.push(`${otherSpec.name}:`);
      if (otherSpec.ram) lines.push(`- RAM: ${otherSpec.ram}`);
      if (otherSpec.cpu) lines.push(`- CPU: ${otherSpec.cpu}`);
      if (otherSpec.disk) lines.push(`- Disk: ${otherSpec.disk}`);
    }
  }

  lines.push("------------------------------------------------------------");
  lines.push("");
  lines.push("Links");
  lines.push(`ToS: ${form.tosLink || "[ToS Link]"}`);
  lines.push(`Privacy Policy: ${form.privacyLink || "[Privacy Policy Link]"}`);
  if (form.planLink) lines.push(`Plan Link: ${form.planLink}`);
  if (form.websiteLink) lines.push(`Website Link: ${form.websiteLink}`);
  if (form.discordLink) lines.push(`Discord Invite: ${form.discordLink}`);
  form.otherLinks
    .split("\n")
    .map((link) => link.trim())
    .filter(Boolean)
    .forEach((link) => lines.push(link));

  lines.push("------------------------------------------------------------");
  lines.push("");
  lines.push("Information");
  lines.push(`- Renewal Required: ${renewalDisplay(form.renewalStatus)}`);
  if (form.renewalStatus === "yes") {
    if (form.renewalDuration) lines.push(`- Renewal Duration: ${form.renewalDuration}`);
    if (form.coinsNeeded) lines.push(`- Coins Needed: ${form.coinsNeeded}`);
  }
  if (form.notes) lines.push(`- Notes: ${form.notes}`);

  lines.push("------------------------------------------------------------");
  lines.push("");
  lines.push("Verification");
  lines.push(`[${form.checkToS ? "x" : " "}] I have included the ToS`);
  lines.push(`[${form.checkPrivacy ? "x" : " "}] I have included the Privacy Policy`);

  return lines.join("\n");
}

export default function SubmitLayoutClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [planSpecs, setPlanSpecs] = useState<PlanSpec[]>([]);
  const [otherSpec, setOtherSpec] = useState<PlanSpec | null>(null);
  const [showRenewalDetails, setShowRenewalDetails] = useState(false);
  const [notification, setNotification] = useState<{ message: string; error: boolean } | null>(null);

  const allPlans = useMemo(() => splitPlans(form.plans), [form.plans]);
  const addedPlanNames = useMemo(
    () => new Set(planSpecs.map((spec) => spec.originalName)),
    [planSpecs],
  );
  const availablePlans = allPlans.filter((plan) => !addedPlanNames.has(plan));
  const otherPlans = allPlans.filter((plan) => !addedPlanNames.has(plan));

  const missingFields = useMemo(() => {
    const missing: string[] = [];
    if (!form.hostName.trim()) missing.push("Host Name");
    if (!form.plans.trim()) missing.push("Plans");
    if (!form.targets.trim()) missing.push("Targets");
    if (!form.locales.trim()) missing.push("Locales");
    if (!form.tosLink.trim()) missing.push("ToS Link");
    if (!form.privacyLink.trim()) missing.push("Privacy Policy Link");
    if (!form.renewalStatus) missing.push("Renewal Required");
    if (form.renewalStatus === "yes") {
      if (!form.renewalDuration.trim()) missing.push("Renewal Duration");
      if (!form.coinsNeeded.trim()) missing.push("Coins Needed");
    }
    return missing;
  }, [form]);

  const canCopy = missingFields.length === 0;
  const rawMessage = useMemo(
    () => buildMessage(form, planSpecs, otherSpec),
    [form, planSpecs, otherSpec],
  );

  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === "specType" && value === "same") {
        setPlanSpecs([]);
        setOtherSpec(null);
      }
      if (key === "plans") {
        const nextPlans = new Set(splitPlans(String(value)));
        setPlanSpecs((specs) => specs.filter((spec) => nextPlans.has(spec.originalName)));
        setSelectedPlan("");
      }
      if (key === "renewalStatus" && value !== "yes") {
        next.renewalDuration = "";
        next.coinsNeeded = "";
      }
      return next;
    });
  };

  const addPlan = () => {
    if (!selectedPlan || addedPlanNames.has(selectedPlan)) return;
    setPlanSpecs((specs) => [
      ...specs,
      { originalName: selectedPlan, name: selectedPlan, ram: "", cpu: "", disk: "" },
    ]);
    setSelectedPlan("");
  };

  const updatePlanSpec = (originalName: string, patch: Partial<PlanSpec>) => {
    setPlanSpecs((specs) =>
      specs.map((spec) =>
        spec.originalName === originalName ? { ...spec, ...patch } : spec,
      ),
    );
  };

  const removePlan = (originalName: string) => {
    setPlanSpecs((specs) => specs.filter((spec) => spec.originalName !== originalName));
  };

  const showMessage = (message: string, error = false) => {
    setNotification({ message, error });
    window.setTimeout(() => setNotification(null), 2500);
  };

  const copyMessage = async () => {
    if (!canCopy) {
      showMessage("Please fill in all required fields first!", true);
      return;
    }

    try {
      await navigator.clipboard.writeText(rawMessage);
      showMessage("Message copied to clipboard!");
    } catch {
      showMessage("Failed to copy message", true);
    }
  };

  const resetForm = (event: FormEvent) => {
    event.preventDefault();
    setForm(initialForm);
    setSelectedPlan("");
    setPlanSpecs([]);
    setOtherSpec(null);
    setShowRenewalDetails(false);
  };

  const renderSpecInputs = (spec: PlanSpec, onChange: (patch: Partial<PlanSpec>) => void) => (
    <div className="spec-grid">
      <div className="form-group">
        <label className="form-label">RAM</label>
        <input
          className="form-input"
          value={spec.ram}
          placeholder="e.g., 4GB"
          onChange={(event) => onChange({ ram: event.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label">CPU</label>
        <input
          className="form-input"
          value={spec.cpu}
          placeholder="e.g., 2 vCores"
          onChange={(event) => onChange({ cpu: event.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Disk</label>
        <input
          className="form-input"
          value={spec.disk}
          placeholder="e.g., 40GB SSD"
          onChange={(event) => onChange({ disk: event.target.value })}
        />
      </div>
    </div>
  );

  return (
    <main>
      <div className="builder-container">
        <section className="builder-hero">
          <h1 className="builder-title">
            <i className="fa-solid fa-wand-magic-sparkles" /> Discord Layout Builder
          </h1>
          <p className="builder-subtitle">
            Create Discord-formatted hosting layouts instantly. Perfect formatting
            for Discord submissions with a live preview and one-click copy.
          </p>
          <div className="builder-stats">
            <div className="builder-stat">
              <i className="fa-solid fa-bolt" />
              <span>Instant Generation</span>
            </div>
            <div className="builder-stat">
              <i className="fa-solid fa-copy" />
              <span>One-Click Copy</span>
            </div>
          </div>
        </section>

        <div className="builder-layout">
          <section className="form-card">
            <div className="form-header">
              <div className="form-icon">
                <i className="fa-solid fa-edit" />
              </div>
              <div>
                <h2 className="form-title">Build Your Layout</h2>
                <p className="form-subtitle">Fill in the information below</p>
              </div>
            </div>

            <form id="layoutBuilderForm" onReset={resetForm}>
              <div className="form-section">
                <div className="section-label">
                  <i className="fa-solid fa-thumbtack" />
                  <span>Basic Information</span>
                </div>

                <div className="form-group">
                  <label htmlFor="hostName" className="form-label">
                    Host Name <span className="required">*</span>
                  </label>
                  <input
                    id="hostName"
                    className="form-input"
                    value={form.hostName}
                    placeholder="e.g., Example Host"
                    onChange={(event) => updateForm("hostName", event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="plans" className="form-label">
                    Plans <span className="required">*</span>
                  </label>
                  <input
                    id="plans"
                    className="form-input"
                    value={form.plans}
                    placeholder="e.g., Nextjs, Javascript, Python, Node.js"
                    onChange={(event) => updateForm("plans", event.target.value)}
                  />
                  <div className="help-text">
                    <i className="fa-solid fa-circle-info" />
                    <span>Comma separated list of plan names</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="targets" className="form-label">
                    Targets <span className="required">*</span>
                  </label>
                  <input
                    id="targets"
                    className="form-input"
                    value={form.targets}
                    placeholder="e.g., Coding, Gaming"
                    onChange={(event) => updateForm("targets", event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="locales" className="form-label">
                    Locales / Languages <span className="required">*</span>
                  </label>
                  <input
                    id="locales"
                    className="form-input"
                    value={form.locales}
                    placeholder="e.g., en, es"
                    onChange={(event) => updateForm("locales", event.target.value)}
                  />
                </div>
              </div>

              <div className="form-section">
                <div className="section-label">
                  <i className="fa-solid fa-cubes" />
                  <span>Specifications</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Spec Type <span className="required">*</span></label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="specType"
                        value="same"
                        checked={form.specType === "same"}
                        onChange={() => updateForm("specType", "same")}
                      />
                      <span>Same specs for all plans</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="specType"
                        value="different"
                        checked={form.specType === "different"}
                        onChange={() => updateForm("specType", "different")}
                      />
                      <span>Different specs per target/plan</span>
                    </label>
                  </div>
                </div>

                {form.specType === "same" ? (
                  <div className="spec-plan-card">
                    <div className="spec-grid">
                      <div className="form-group">
                        <label htmlFor="sameRam" className="form-label">RAM</label>
                        <input
                          id="sameRam"
                          className="form-input"
                          value={form.sameRam}
                          placeholder="e.g., 4GB"
                          onChange={(event) => updateForm("sameRam", event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="sameCpu" className="form-label">CPU</label>
                        <input
                          id="sameCpu"
                          className="form-input"
                          value={form.sameCpu}
                          placeholder="e.g., 2 vCores"
                          onChange={(event) => updateForm("sameCpu", event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="sameDisk" className="form-label">Disk</label>
                        <input
                          id="sameDisk"
                          className="form-input"
                          value={form.sameDisk}
                          placeholder="e.g., 40GB SSD"
                          onChange={(event) => updateForm("sameDisk", event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label className="checkbox-option">
                        <input
                          type="checkbox"
                          checked={Boolean(otherSpec)}
                          onChange={(event) =>
                            setOtherSpec(
                              event.target.checked
                                ? { originalName: "other", name: "All Other Plans", ram: "", cpu: "", disk: "" }
                                : null,
                            )
                          }
                        />
                        <span>All other plans not listed above share the same specs</span>
                      </label>
                    </div>

                    <div className="add-plan-container">
                      <select
                        className="form-select"
                        value={selectedPlan}
                        onChange={(event) => setSelectedPlan(event.target.value)}
                      >
                        <option value="">Select a plan to add specs...</option>
                        {availablePlans.map((plan) => (
                          <option value={plan} key={plan}>{plan}</option>
                        ))}
                      </select>
                      <button type="button" className="btn-add" onClick={addPlan}>
                        <i className="fa-solid fa-plus" /> Add Plan
                      </button>
                    </div>

                    <div className="spec-plans">
                      {planSpecs.map((spec) => (
                        <div className="spec-plan-card" key={spec.originalName}>
                          <div className="spec-plan-header">
                            <div className="spec-plan-name">{spec.originalName}</div>
                            <button
                              type="button"
                              className="btn-remove"
                              onClick={() => removePlan(spec.originalName)}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Display Name</label>
                            <input
                              className="form-input"
                              value={spec.name}
                              onChange={(event) =>
                                updatePlanSpec(spec.originalName, { name: event.target.value })
                              }
                            />
                          </div>
                          {renderSpecInputs(spec, (patch) => updatePlanSpec(spec.originalName, patch))}
                        </div>
                      ))}

                      {otherSpec ? (
                        <div className="spec-plan-card other-plans-card">
                          <div className="spec-plan-header">
                            <div>
                              <div className="spec-plan-name">All Other Plans</div>
                              <div className="help-text">
                                {otherPlans.length > 0
                                  ? otherPlans.join(", ")
                                  : "No unlisted plans yet"}
                              </div>
                            </div>
                          </div>
                          {renderSpecInputs(otherSpec, (patch) =>
                            setOtherSpec((current) => (current ? { ...current, ...patch } : current)),
                          )}
                        </div>
                      ) : null}
                    </div>
                  </>
                )}
              </div>

              <div className="form-section">
                <div className="section-label">
                  <i className="fa-solid fa-link" />
                  <span>Links</span>
                </div>

                <TextInput id="tosLink" label="ToS Link" required value={form.tosLink} onChange={(value) => updateForm("tosLink", value)} placeholder="https://example.com/tos" />
                <TextInput id="privacyLink" label="Privacy Policy Link" required value={form.privacyLink} onChange={(value) => updateForm("privacyLink", value)} placeholder="https://example.com/privacy" />
                <TextInput id="planLink" label="Plan Link" value={form.planLink} onChange={(value) => updateForm("planLink", value)} placeholder="https://example.com/plan" />
                <TextInput id="websiteLink" label="Website Link" value={form.websiteLink} onChange={(value) => updateForm("websiteLink", value)} placeholder="https://example.com" />
                <TextInput id="discordLink" label="Discord Invite" value={form.discordLink} onChange={(value) => updateForm("discordLink", value)} placeholder="https://discord.gg/invite" />

                <div className="form-group">
                  <label htmlFor="otherLinks" className="form-label">Other Links</label>
                  <textarea
                    id="otherLinks"
                    className="form-textarea"
                    value={form.otherLinks}
                    placeholder={"One per line, e.g.:\nDocumentation: https://docs.example.com\nSupport: https://support.example.com"}
                    onChange={(event) => updateForm("otherLinks", event.target.value)}
                  />
                  <div className="help-text">
                    <i className="fa-solid fa-circle-info" />
                    <span>Format: Label: URL, one per line</span>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="section-label">
                  <i className="fa-solid fa-file-lines" />
                  <span>Information</span>
                </div>

                <div className="form-group">
                  <label htmlFor="renewalStatus" className="form-label">
                    Renewal Required <span className="required">*</span>
                  </label>
                  <select
                    id="renewalStatus"
                    className="form-select"
                    value={form.renewalStatus}
                    onChange={(event) => updateForm("renewalStatus", event.target.value as RenewalStatus)}
                  >
                    <option value="">Select an option</option>
                    <option value="yes">This host requires renewal</option>
                    <option value="no">This host does not require renewal</option>
                  </select>
                </div>

                {form.renewalStatus === "yes" ? (
                  <div className="conditional-fields">
                    <TextInput id="renewalDuration" label="Renewal Duration" required value={form.renewalDuration} onChange={(value) => updateForm("renewalDuration", value)} placeholder="e.g., 30 days" />
                    <TextInput id="coinsNeeded" label="Coins Needed" required value={form.coinsNeeded} onChange={(value) => updateForm("coinsNeeded", value)} placeholder="e.g., 300 coins" />
                  </div>
                ) : null}

                <div className="form-group">
                  <label htmlFor="notes" className="form-label">Notes</label>
                  <textarea
                    id="notes"
                    className="form-textarea"
                    value={form.notes}
                    placeholder="Add any important notes about the host"
                    onChange={(event) => updateForm("notes", event.target.value)}
                  />
                </div>
              </div>

              <div className="form-section">
                <div className="section-label">
                  <i className="fa-solid fa-square-check" />
                  <span>Verification</span>
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={form.checkToS}
                      onChange={(event) => updateForm("checkToS", event.target.checked)}
                    />
                    <span>I have included the ToS</span>
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={form.checkPrivacy}
                      onChange={(event) => updateForm("checkPrivacy", event.target.checked)}
                    />
                    <span>I have included the Privacy Policy</span>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button type="reset" className="btn btn-reset">
                  <i className="fa-solid fa-rotate-left" /> Reset Form
                </button>
                <button
                  type="button"
                  className="btn primary btn-generate"
                  disabled={!canCopy}
                  onClick={copyMessage}
                >
                  <i className="fa-solid fa-copy" /> Copy Message
                </button>
              </div>

              <div className="preview-container">
                <div className="message-preview">
                  <div className="message-preview-title">
                    <i className="fa-solid fa-code" />
                    <span>Message Preview (Raw Text)</span>
                  </div>
                  <div className="message-preview-content">
                    {rawMessage.trim() ? rawMessage : emptyPreview}
                  </div>
                </div>
              </div>
            </form>
          </section>

          <section className="builder-preview-card">
            <div className="preview-header">
              <h3 className="preview-title">
                <i className="fa-brands fa-discord" />
                Discord Message Preview
              </h3>
              <span className="preview-badge">
                <i className="fa-solid fa-circle" />
                Live
              </span>
            </div>
            <DiscordPreview
              form={form}
              planSpecs={planSpecs}
              otherSpec={otherSpec}
              otherPlans={otherPlans}
              missingFields={missingFields}
              showRenewalDetails={showRenewalDetails}
              setShowRenewalDetails={setShowRenewalDetails}
            />
          </section>
        </div>
      </div>

      {notification ? (
        <div className={`copy-notification ${notification.error ? "error" : "success"}`}>
          <i className={`fa-solid ${notification.error ? "fa-circle-exclamation" : "fa-circle-check"}`} />
          <span>{notification.message}</span>
        </div>
      ) : null}
    </main>
  );
}

function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label} {required ? <span className="required">*</span> : null}
      </label>
      <input
        id={id}
        className="form-input"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function DiscordPreview({
  form,
  planSpecs,
  otherSpec,
  otherPlans,
  missingFields,
  showRenewalDetails,
  setShowRenewalDetails,
}: {
  form: FormState;
  planSpecs: PlanSpec[];
  otherSpec: PlanSpec | null;
  otherPlans: string[];
  missingFields: string[];
  showRenewalDetails: boolean;
  setShowRenewalDetails: (show: boolean) => void;
}) {
  return (
    <div className="discord-preview">
      <div className="discord-message">
        <div className="discord-avatar">FH</div>
        <div className="discord-message-content">
          <div className="discord-message-header">
            <span className="discord-username">FreeHosts Bot</span>
            <span className="discord-timestamp">Today at 12:00 PM</span>
          </div>
          <div className="discord-message-text">
            <span className="discord-bold">Host Submission</span>
            <br />
            <br />
            <span className="discord-bold">Host Name</span>
            <div className="discord-blockquote">{form.hostName || "[Host Name]"}</div>
            <span className="discord-bold">Plans</span>
            <div className="discord-blockquote">{form.plans || "[Plans]"}</div>
            <span className="discord-bold">Targets</span>
            <div className="discord-blockquote">{form.targets || "[Targets]"}</div>
            <span className="discord-bold">Locales / Languages</span>
            <div className="discord-blockquote">{form.locales || "[Locales]"}</div>
            <div className="discord-divider" />

            <span className="discord-bold">Specifications</span>
            <br />
            <SpecPreview form={form} planSpecs={planSpecs} otherSpec={otherSpec} otherPlans={otherPlans} />

            <div className="discord-divider" />
            <br />
            <span className="discord-bold">Links</span>
            <br />
            <span className="discord-bold">ToS:</span> {form.tosLink || "[ToS Link]"}
            <br />
            <span className="discord-bold">Privacy Policy:</span>{" "}
            {form.privacyLink || "[Privacy Policy Link]"}
            <br />
            {form.planLink ? <Line label="Plan Link" value={form.planLink} /> : null}
            {form.websiteLink ? <Line label="Website Link" value={form.websiteLink} /> : null}
            {form.discordLink ? <Line label="Discord Invite" value={form.discordLink} /> : null}
            {form.otherLinks
              .split("\n")
              .map((link) => link.trim())
              .filter(Boolean)
              .map((link) => (
                <span key={link}>
                  {link}
                  <br />
                </span>
              ))}

            <div className="discord-divider" />
            <span className="discord-bold">Information</span>
            <br />
            - Renewal Required: {renewalDisplay(form.renewalStatus)}
            <br />
            {form.renewalStatus === "yes" ? (
              <>
                <button
                  className="discord-renewal-toggle"
                  type="button"
                  onClick={() => setShowRenewalDetails(!showRenewalDetails)}
                >
                  {showRenewalDetails
                    ? "[Click to hide renewal details]"
                    : "[Click to show renewal details]"}
                </button>
                {showRenewalDetails ? (
                  <div className="discord-renewal-content">
                    This host requires renewal
                    <br />
                    {form.renewalDuration ? (
                      <>
                        - Renewal Duration: {form.renewalDuration}
                        <br />
                      </>
                    ) : null}
                    {form.coinsNeeded ? (
                      <>
                        - Coins Needed: {form.coinsNeeded}
                        <br />
                      </>
                    ) : null}
                  </div>
                ) : null}
              </>
            ) : null}
            {form.notes ? (
              <>
                - Notes: {form.notes}
                <br />
              </>
            ) : null}

            <div className="discord-divider" />
            <span className="discord-bold">Verification</span>
            <br />
            <span className={`discord-checkbox ${form.checkToS ? "checked" : ""}`}>
              {form.checkToS ? "x" : ""}
            </span>
            I have included the ToS
            <br />
            <span className={`discord-checkbox ${form.checkPrivacy ? "checked" : ""}`}>
              {form.checkPrivacy ? "x" : ""}
            </span>
            I have included the Privacy Policy
            <br />

            {missingFields.length > 0 ? (
              <div className="discord-blockquote" style={{ color: "#faa81a", marginTop: "16px" }}>
                <span className="discord-bold">Missing required fields:</span>{" "}
                {missingFields.join(", ")}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span className="discord-bold">{label}:</span> {value}
      <br />
    </>
  );
}

function SpecPreview({
  form,
  planSpecs,
  otherSpec,
  otherPlans,
}: {
  form: FormState;
  planSpecs: PlanSpec[];
  otherSpec: PlanSpec | null;
  otherPlans: string[];
}) {
  if (form.specType === "same") {
    if (!form.sameRam && !form.sameCpu && !form.sameDisk) {
      return (
        <>
          - [Specs will appear here]
          <br />
        </>
      );
    }

    return (
      <>
        {form.sameRam ? <>- RAM: {form.sameRam}<br /></> : null}
        {form.sameCpu ? <>- CPU: {form.sameCpu}<br /></> : null}
        {form.sameDisk ? <>- Disk: {form.sameDisk}<br /></> : null}
      </>
    );
  }

  if (planSpecs.length === 0 && !otherSpec) {
    return (
      <>
        - [Add plans using the Add Plan button above]
        <br />
      </>
    );
  }

  return (
    <>
      {planSpecs.map((spec) => (
        <span key={spec.originalName}>
          <span className="discord-bold">{spec.name || spec.originalName}:</span>
          <br />
          {spec.ram ? <>- RAM: {spec.ram}<br /></> : null}
          {spec.cpu ? <>- CPU: {spec.cpu}<br /></> : null}
          {spec.disk ? <>- Disk: {spec.disk}<br /></> : null}
        </span>
      ))}
      {otherSpec ? (
        <span>
          <span className="discord-bold">
            All Other Plans{otherPlans.length > 0 ? ` (${otherPlans.join(", ")})` : ""}:
          </span>
          <br />
          {otherSpec.ram ? <>- RAM: {otherSpec.ram}<br /></> : null}
          {otherSpec.cpu ? <>- CPU: {otherSpec.cpu}<br /></> : null}
          {otherSpec.disk ? <>- Disk: {otherSpec.disk}<br /></> : null}
        </span>
      ) : null}
    </>
  );
}
