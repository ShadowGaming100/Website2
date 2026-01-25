'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from '@/components/ui/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type SpecPlan = {
  id: string;
  name: string;
  originalName: string;
  ram: string;
  cpu: string;
  disk: string;
};

export default function SubmitLayoutPage() {
  const [hostName, setHostName] = useState('');
  const [plans, setPlans] = useState('');
  const [targets, setTargets] = useState('');
  const [locales, setLocales] = useState('');

  const [specType, setSpecType] = useState<'same' | 'different'>('same');

  const [sameRam, setSameRam] = useState('');
  const [sameCpu, setSameCpu] = useState('');
  const [sameDisk, setSameDisk] = useState('');

  const [selectedPlanToAdd, setSelectedPlanToAdd] = useState('');
  const [specPlans, setSpecPlans] = useState<SpecPlan[]>([]);
  const [otherPlansChecked, setOtherPlansChecked] = useState(false);
  const [otherPlansRam, setOtherPlansRam] = useState('');
  const [otherPlansCpu, setOtherPlansCpu] = useState('');
  const [otherPlansDisk, setOtherPlansDisk] = useState('');

  const [tosLink, setTosLink] = useState('');
  const [privacyLink, setPrivacyLink] = useState('');
  const [planLink, setPlanLink] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [discordLink, setDiscordLink] = useState('');
  const [otherLinks, setOtherLinks] = useState('');

  const [renewalStatus, setRenewalStatus] = useState('');
  const [renewalDuration, setRenewalDuration] = useState('');
  const [coinsNeeded, setCoinsNeeded] = useState('');
  const [notes, setNotes] = useState('');

  const [checkToS, setCheckToS] = useState(true);
  const [checkPrivacy, setCheckPrivacy] = useState(true);

  const [copyNotification, setCopyNotification] = useState<{ message: string, isError: boolean } | null>(null);
  const [showRenewalDetailsInPreview, setShowRenewalDetailsInPreview] = useState(false);
  const [generatedRawText, setGeneratedRawText] = useState('');

  const availablePlans = React.useMemo(() =>
    plans.split(',').map(p => p.trim()).filter(p => p.length > 0)
    , [plans]);

  useEffect(() => {
    const generatePreview = () => {
      let rawText = "============================================================\n";
      rawText += "📌 Host Submission\n";
      rawText += "**Host Name**\n";
      rawText += `> ${hostName || "[Host Name]"}\n`;
      rawText += "**Plans**\n";
      rawText += `> ${plans || "[Plans]"}\n`;
      rawText += "**Targets**\n";
      rawText += `> ${targets || "[Targets]"}\n`;
      rawText += "**Locales / Languages**\n";
      rawText += `> ${locales || "[Locales]"}\n`;
      rawText += "------------------------------------------------------------\n";

      rawText += "🧩 Specifications\n";
      if (specType === 'same') {
        if (sameRam || sameCpu || sameDisk) {
          if (sameRam) rawText += `• RAM: ${sameRam}\n`;
          if (sameCpu) rawText += `• CPU: ${sameCpu}\n`;
          if (sameDisk) rawText += `• Disk: ${sameDisk}\n`;
        } else {
          rawText += "• [Specs will appear here]\n";
        }
      } else {
        if (specPlans.length === 0 && !otherPlansChecked) {
          rawText += '• [Add plans using the "Add Plan" button above]\n';
        } else {
          specPlans.forEach(plan => {
            rawText += `**${plan.name}:**\n`;
            if (plan.ram) rawText += `• RAM: ${plan.ram}\n`;
            if (plan.cpu) rawText += `• CPU: ${plan.cpu}\n`;
            if (plan.disk) rawText += `• Disk: ${plan.disk}\n`;
          });

          if (otherPlansChecked) {
            const addedPlanNames = new Set(specPlans.map(p => p.originalName));
            const remainingPlans = availablePlans.filter(p => !addedPlanNames.has(p));

            if (remainingPlans.length > 0) {
              rawText += `**All Other Plans (${remainingPlans.join(', ')}):**\n`;
              if (otherPlansRam) rawText += `• RAM: ${otherPlansRam}\n`;
              if (otherPlansCpu) rawText += `• CPU: ${otherPlansCpu}\n`;
              if (otherPlansDisk) rawText += `• Disk: ${otherPlansDisk}\n`;
            }
          }
        }
      }

      rawText += "------------------------------------------------------------\n\n";
      rawText += "🔗 Links\n";
      rawText += `**ToS:** ${tosLink || "[ToS Link]"}\n`;
      rawText += `**Privacy Policy:** ${privacyLink || "[Privacy Policy Link]"}\n`;
      if (planLink) rawText += `**Plan Link:** ${planLink}\n`;
      if (websiteLink) rawText += `**Website Link:** ${websiteLink}\n`;
      if (discordLink) rawText += `**Discord Invite:** ${discordLink}\n`;

      if (otherLinks) {
        const links = otherLinks.split('\n').filter(l => l.trim());
        links.forEach(link => {
          rawText += `${link}\n`;
        });
      }

      rawText += "------------------------------------------------------------\n";
      rawText += "📄 Information\n";

      let renewalStatusDisplay = "[Select an option]";
      if (renewalStatus === "yes") renewalStatusDisplay = "YES";
      else if (renewalStatus === "no") renewalStatusDisplay = "NO";

      rawText += `• Renewal Required: ${renewalStatusDisplay}\n`;

      if (renewalStatus === "yes") {
        if (renewalDuration) rawText += `• Renewal Duration: ${renewalDuration}\n`;
        if (coinsNeeded) rawText += `• Coins Needed: ${coinsNeeded}\n`;
      }

      if (notes) rawText += `• Notes: ${notes}\n`;

      rawText += "------------------------------------------------------------\n";
      rawText += "☑️ Verification\n";
      rawText += `[${checkToS ? "✔" : " "}] I have included the ToS\n`;
      rawText += `[${checkPrivacy ? "✔" : " "}] I have included the Privacy Policy\n`;

      setGeneratedRawText(rawText);
    };

    const timeout = setTimeout(generatePreview, 300);
    return () => clearTimeout(timeout);
  }, [
    hostName, plans, targets, locales, specType, sameRam, sameCpu, sameDisk,
    specPlans, otherPlansChecked, otherPlansRam, otherPlansCpu, otherPlansDisk, availablePlans,
    tosLink, privacyLink, planLink, websiteLink, discordLink, otherLinks,
    renewalStatus, renewalDuration, coinsNeeded, notes, checkToS, checkPrivacy
  ]);


  const handleAddPlan = () => {
    if (!selectedPlanToAdd) {
      showNotification("Please select a plan first!", true);
      return;
    }

    if (specPlans.some(p => p.originalName === selectedPlanToAdd)) {
      showNotification("Plan already added!", true);
      return;
    }

    setSpecPlans([...specPlans, {
      id: crypto.randomUUID(),
      name: selectedPlanToAdd,
      originalName: selectedPlanToAdd,
      ram: '',
      cpu: '',
      disk: ''
    }]);

    showNotification(`Added ${selectedPlanToAdd} spec card`, false);
    setSelectedPlanToAdd('');
  };

  const removePlan = (id: string, name: string) => {
    setSpecPlans(specPlans.filter(p => p.id !== id));
    showNotification(`Removed ${name} spec card`, false);
  };

  const updateSpecPlan = (id: string, field: keyof SpecPlan, value: string) => {
    setSpecPlans(specPlans.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const showNotification = (message: string, isError: boolean) => {
    setCopyNotification({ message, isError });
    setTimeout(() => setCopyNotification(null), 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedRawText).then(() => {
      showNotification("Layout copied to clipboard!", false);
    }).catch(() => {
      showNotification("Failed to copy to clipboard", true);
    });
  };

  const resetForm = () => {
    setHostName('');
    setPlans('');
    setTargets('');
    setLocales('');
    setSpecType('same');
    setSameRam('');
    setSameCpu('');
    setSameDisk('');
    setSpecPlans([]);
    setOtherPlansChecked(false);
    setOtherPlansRam('');
    setOtherPlansCpu('');
    setOtherPlansDisk('');
    setTosLink('');
    setPrivacyLink('');
    setPlanLink('');
    setWebsiteLink('');
    setDiscordLink('');
    setOtherLinks('');
    setRenewalStatus('');
    setRenewalDuration('');
    setCoinsNeeded('');
    setNotes('');
    setCheckToS(true);
    setCheckPrivacy(true);
    showNotification("Form reset successfully", false);
  };

  const getMissingFields = () => {
    const missing = [];
    if (!hostName) missing.push("Host Name");
    if (!plans) missing.push("Plans");
    if (!targets) missing.push("Targets");
    if (!locales) missing.push("Locales");
    if (!tosLink) missing.push("ToS Link");
    if (!privacyLink) missing.push("Privacy Policy Link");
    if (!renewalStatus) missing.push("Renewal Required");

    if (renewalStatus === 'yes') {
      if (!renewalDuration) missing.push("Renewal Duration");
      if (!coinsNeeded) missing.push("Coins Needed");
    }
    return missing;
  };

  const missingFields = getMissingFields();
  const isFormValid = missingFields.length === 0;

  const renderSpecInput = (label: string, icon: string, value: string, onChange: (val: string) => void, placeholder: string) => {
    const iconName = icon.replace('fa-', '');
    return (
      <div className="mb-4">
        <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">
          <Icon icon={['fas', iconName as never] as IconProp} className="text-muted-foreground text-xs" />
          {label}
        </label>
        <input
          type="text"
          className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground text-base focus:outline-none focus:border-blue-500 focus:bg-card transition-all placeholder:text-muted-foreground"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Hero Banner Section */}
      <section className="relative">
        <div className="h-48 md:h-64 lg:h-72 relative overflow-hidden">
          <div className="w-full h-full gradient-bg" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-[rgb(var(--bg)/0.5)] to-transparent" />
        </div>

        {/* Overlapping Card */}
        <div className="container-default relative -mt-20 md:-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] shadow-large p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h1 className="heading-2 text-[rgb(var(--text))] mb-2 flex items-center gap-3">
                  <FontAwesomeIcon icon={['fas', 'wand-magic-sparkles'] as IconProp} className="text-[rgb(var(--accent))]" />
                  <span>Discord Layout <span className="gradient-text">Builder</span></span>
                </h1>
                <p className="body-default text-[rgb(var(--muted))] text-balance">
                  Create professional Discord-formatted hosting layouts instantly with emojis and proper structure.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <div className="text-xs font-bold text-[rgb(var(--accent))] uppercase tracking-wider">Instant</div>
                  <div className="text-[10px] text-[rgb(var(--muted))]">Generation</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[rgb(var(--accent)/0.1)] flex items-center justify-center text-[rgb(var(--accent))]">
                  <FontAwesomeIcon icon={['fas', 'bolt'] as IconProp} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-default py-12">

        <div className="flex flex-col gap-12 mx-4 sm:mx-12">
          <section className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] shadow-large p-6 sm:p-8">
            <div className="flex items-center mb-8 pb-6 border-b-2 border-border">
              <div className="text-2xl mr-6 w-14 h-14 flex items-center justify-center gradient-bg rounded-xl text-white shadow-medium">
                <Icon icon={['fas', 'edit'] as IconProp} />
              </div>
              <div>
                <h2 className="heading-4 text-[rgb(var(--text))] m-0">Build Your Layout</h2>
                <p className="body-small text-[rgb(var(--muted))] mt-1">Fill in the information below</p>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-12">
                <div className="flex items-center gap-3 font-bold text-lg text-foreground mb-6 pb-2 border-b-2 border-border">
                  <span>📌</span>
                  <span>Basic Information</span>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">Host Name <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground focus:border-blue-500 focus:bg-card transition-all placeholder:text-muted-foreground" placeholder="e.g., Example Host" value={hostName} onChange={e => setHostName(e.target.value)} required />
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">Plans <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground focus:border-blue-500 focus:bg-card transition-all placeholder:text-muted-foreground" placeholder="e.g., Nextjs, Javascript, Python, Node.js" value={plans} onChange={e => setPlans(e.target.value)} required />
                  <div className="text-xs text-[rgb(var(--muted))] mt-1 flex items-start gap-1"><Icon icon={['fas', 'circle-info'] as IconProp} className="mt-[2px] text-[10px]" /><span>Comma separated list of plan names</span></div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">Targets <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground focus:border-blue-500 focus:bg-card transition-all placeholder:text-muted-foreground" placeholder="e.g., Coding, Gaming" value={targets} onChange={e => setTargets(e.target.value)} required />
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">Locales / Languages <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground focus:border-blue-500 focus:bg-card transition-all placeholder:text-muted-foreground" placeholder="e.g., en, es" value={locales} onChange={e => setLocales(e.target.value)} required />
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-3 font-bold text-lg text-foreground mb-6 pb-2 border-b-2 border-border">
                  <span>🧩</span>
                  <span>Specifications</span>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">Spec Type <span className="text-red-500">*</span></label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center p-3 bg-secondary border-2 border-border rounded cursor-pointer transition-all hover:border-blue-500 hover:bg-card">
                      <input type="radio" name="specType" value="same" checked={specType === 'same'} onChange={() => setSpecType('same')} className="mr-2 cursor-pointer" />
                      <span className={specType === 'same' ? 'text-blue-500 font-semibold' : 'text-foreground'}>Same specs for all plans</span>
                    </label>
                    <label className="flex items-center p-3 bg-secondary border-2 border-border rounded cursor-pointer transition-all hover:border-blue-500 hover:bg-card">
                      <input type="radio" name="specType" value="different" checked={specType === 'different'} onChange={() => setSpecType('different')} className="mr-2 cursor-pointer" />
                      <span className={specType === 'different' ? 'text-blue-500 font-semibold' : 'text-foreground'}>Different specs per target/plan</span>
                    </label>
                  </div>
                </div>

                {specType === 'same' ? (
                  <div className="bg-gradient-to-br from-blue-400/5 to-indigo-500/5 rounded border border-border p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {renderSpecInput('RAM', 'fa-memory', sameRam, setSameRam, 'e.g., 4GB')}
                      {renderSpecInput('CPU', 'fa-microchip', sameCpu, setSameCpu, 'e.g., 2 vCores')}
                      {renderSpecInput('Disk', 'fa-hard-drive', sameDisk, setSameDisk, 'e.g., 40GB SSD')}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <label className="flex items-center p-3 bg-secondary border-2 border-border rounded cursor-pointer transition-all hover:border-blue-500 hover:bg-card">
                        <input type="checkbox" checked={otherPlansChecked} onChange={(e) => setOtherPlansChecked(e.target.checked)} className="mr-2 w-[18px] h-[18px] cursor-pointer" />
                        <span className={otherPlansChecked ? 'text-blue-500 font-semibold' : 'text-foreground'}>All other plans not listed above share the same specs</span>
                      </label>
                    </div>

                    <div className="flex gap-2 mb-6">
                      <select
                        className="flex-1 p-3 border-2 border-border rounded bg-secondary text-foreground focus:border-blue-500 focus:bg-card focus:outline-none"
                        value={selectedPlanToAdd}
                        onChange={(e) => setSelectedPlanToAdd(e.target.value)}
                      >
                        <option value="">Select a plan to add specs...</option>
                        {availablePlans.filter(p => !specPlans.some(sp => sp.originalName === p)).map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={handleAddPlan}
                        className="bg-green-500/10 text-green-500 border-2 border-green-500/30 px-6 py-3 rounded font-semibold hover:bg-green-500/20 hover:-translate-y-[2px] transition-all flex items-center gap-2"
                      >
                        <Icon icon={['fas', 'plus'] as IconProp} /> Add Plan
                      </button>
                    </div>

                    <div className="flex flex-col gap-6">
                      {specPlans.map(plan => (
                        <div key={plan.id} className="bg-gradient-to-br from-blue-400/5 to-indigo-500/5 rounded border border-border p-6">
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex-1">
                              <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">
                                <Icon icon={['fas', 'tag'] as IconProp} className="text-muted-foreground text-xs" /> Plan Name
                              </label>
                              <input
                                type="text"
                                className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground focus:border-blue-500 focus:bg-card transition-all placeholder:text-muted-foreground"
                                value={plan.name}
                                onChange={(e) => updateSpecPlan(plan.id, 'name', e.target.value)}
                              />
                              <div className={`text-xs mt-1 ${plan.name !== plan.originalName ? 'text-orange-500' : 'text-muted-foreground'}`}>
                                {plan.name !== plan.originalName ? `Originally: ${plan.originalName}` : `Plan from: ${plan.originalName}`}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removePlan(plan.id, plan.name)}
                              className="ml-4 bg-red-500/10 text-red-500 border border-red-500/30 px-3 py-1 rounded text-xs hover:bg-red-500/20 transition-all cursor-pointer"
                            >
                              <Icon icon={['fas', 'trash'] as IconProp} /> Remove
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {renderSpecInput('RAM', 'fa-memory', plan.ram, (v) => updateSpecPlan(plan.id, 'ram', v), 'e.g., 4GB')}
                            {renderSpecInput('CPU', 'fa-microchip', plan.cpu, (v) => updateSpecPlan(plan.id, 'cpu', v), 'e.g., 2 vCores')}
                            {renderSpecInput('Disk', 'fa-hard-drive', plan.disk, (v) => updateSpecPlan(plan.id, 'disk', v), 'e.g., 40GB SSD')}
                          </div>
                        </div>
                      ))}

                      {otherPlansChecked && (
                        <div className="bg-gradient-to-br from-amber-400/5 to-orange-500/5 rounded border border-amber-500/30 p-6">
                          <div className="flex items-center mb-4">
                            <div className="flex-1">
                              <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">
                                <Icon icon={['fas', 'layer-group'] as IconProp} className="text-muted-foreground text-xs" />
                                <span className="text-amber-500 font-semibold">All Other Plans</span>
                              </label>
                              <div className="text-xs text-muted-foreground">
                                Includes: {availablePlans.filter(p => !specPlans.some(sp => sp.originalName === p)).join(', ')}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {renderSpecInput('RAM', 'fa-memory', otherPlansRam, setOtherPlansRam, 'e.g., 4GB')}
                            {renderSpecInput('CPU', 'fa-microchip', otherPlansCpu, setOtherPlansCpu, 'e.g., 2 vCores')}
                            {renderSpecInput('Disk', 'fa-hard-drive', otherPlansDisk, setOtherPlansDisk, 'e.g., 40GB SSD')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-3 font-bold text-lg text-foreground mb-6 pb-2 border-b-2 border-border">
                  <span>🔗</span>
                  <span>Links</span>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">ToS Link <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground focus:border-blue-500 focus:bg-card transition-all placeholder:text-muted-foreground" placeholder="https://example.com/tos" value={tosLink} onChange={e => setTosLink(e.target.value)} required />
                </div>
                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">Privacy Policy Link <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground focus:border-blue-500 focus:bg-card transition-all placeholder:text-muted-foreground" placeholder="https://example.com/privacy" value={privacyLink} onChange={e => setPrivacyLink(e.target.value)} required />
                </div>
                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">Plan Link</label>
                  <input type="text" className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground focus:border-blue-500 focus:bg-card transition-all placeholder:text-muted-foreground" placeholder="https://example.com/plan" value={planLink} onChange={e => setPlanLink(e.target.value)} />
                </div>
                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">Website Link</label>
                  <input type="text" className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground focus:border-blue-500 focus:bg-card transition-all placeholder:text-muted-foreground" placeholder="https://example.com" value={websiteLink} onChange={e => setWebsiteLink(e.target.value)} />
                </div>
                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">Discord Invite</label>
                  <input type="text" className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground focus:border-blue-500 focus:bg-card transition-all placeholder:text-muted-foreground" placeholder="https://discord.gg/invite" value={discordLink} onChange={e => setDiscordLink(e.target.value)} />
                </div>
                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">Other Links</label>
                  <textarea className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground min-h-[100px] font-mono focus:border-blue-500 focus:bg-card transition-all placeholder:text-muted-foreground" placeholder={`One per line, e.g.:\nDocumentation: https://docs.example.com\nSupport: https://support.example.com`} value={otherLinks} onChange={e => setOtherLinks(e.target.value)}></textarea>
                  <div className="text-xs text-muted-foreground mt-1 flex items-start gap-1"><Icon icon={['fas', 'circle-info']} className="mt-[2px] text-[10px]" /><span>Format: Label: URL (one per line)</span></div>
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-3 font-bold text-lg text-foreground mb-6 pb-2 border-b-2 border-border">
                  <span>📄</span>
                  <span>Information</span>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">Renewal Required <span className="text-red-500">*</span></label>
                  <select className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground focus:border-blue-500 focus:bg-card focus:outline-none" value={renewalStatus} onChange={e => setRenewalStatus(e.target.value)} required>
                    <option value="">Select an option</option>
                    <option value="yes">This host requires renewal</option>
                    <option value="no">This host does not require renewal</option>
                  </select>
                </div>

                {renewalStatus === 'yes' && (
                  <div className="bg-gradient-to-br from-amber-400/5 to-orange-500/5 rounded border border-amber-500/30 p-6 mb-6">
                    <div className="mb-6">
                      <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-amber-500">Renewal Duration <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(255,152,0,0.1)] transition-all placeholder:text-muted-foreground" placeholder="e.g., 30 days" value={renewalDuration} onChange={e => setRenewalDuration(e.target.value)} />
                    </div>
                    <div className="mb-0">
                      <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-amber-500">Coins Needed <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground focus:border-amber-500 focus:shadow-[0_0_0_3px_rgba(255,152,0,0.1)] transition-all placeholder:text-muted-foreground" placeholder="e.g., 300 coins" value={coinsNeeded} onChange={e => setCoinsNeeded(e.target.value)} />
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-foreground">Notes</label>
                  <textarea className="w-full p-3 border-2 border-border rounded bg-secondary text-foreground min-h-[100px] font-mono focus:border-blue-500 focus:bg-card transition-all placeholder:text-muted-foreground" placeholder="Add any important notes about the host" value={notes} onChange={e => setNotes(e.target.value)}></textarea>
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-3 font-bold text-lg text-foreground mb-6 pb-2 border-b-2 border-border">
                  <span>☑️</span>
                  <span>Verification</span>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="flex items-center p-3 bg-secondary border-2 border-border rounded cursor-pointer transition-all hover:border-blue-500 hover:bg-card">
                    <input type="checkbox" checked={checkToS} onChange={e => setCheckToS(e.target.checked)} className="mr-2 w-[18px] h-[18px] cursor-pointer" />
                    <span className={checkToS ? 'text-blue-500 font-semibold' : 'text-foreground'}>I have included the ToS</span>
                  </label>
                  <label className="flex items-center p-3 bg-secondary border-2 border-border rounded cursor-pointer transition-all hover:border-blue-500 hover:bg-card">
                    <input type="checkbox" checked={checkPrivacy} onChange={e => setCheckPrivacy(e.target.checked)} className="mr-2 w-[18px] h-[18px] cursor-pointer" />
                    <span className={checkPrivacy ? 'text-blue-500 font-semibold' : 'text-foreground'}>I have included the Privacy Policy</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t-2 border-border">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-secondary text-foreground border-2 border-border py-3 rounded font-semibold hover:bg-border hover:-translate-y-[2px] transition-transform flex justify-center items-center gap-2"
                >
                  <Icon icon={['fas', 'rotate-left'] as IconProp} /> Reset Form
                </button>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  disabled={!isFormValid}
                  className={`flex-[2] py-3 rounded font-semibold flex justify-center items-center gap-2 transition-transform ${isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-[2px] cursor-pointer' : 'bg-secondary text-muted-foreground opacity-50 cursor-not-allowed'}`}
                >
                  <Icon icon={['fas', 'copy'] as IconProp} /> Copy Message
                </button>
              </div>

              <div className="mt-8">
                <div className="bg-[#2f3136] rounded-lg p-4 border border-[#40444b] overflow-hidden">
                  <div className="text-[14px] font-semibold text-[#b9bbbe] mb-3 flex items-center gap-2">
                    <Icon icon={['fas', 'code'] as IconProp} className="text-[#7289da]" />
                    <span>Message Preview (Raw Text)</span>
                  </div>
                  <div className="font-mono text-[13px] leading-relaxed text-[#dcddde] whitespace-pre-wrap break-words max-h-[300px] overflow-y-auto">
                    {generatedRawText}
                  </div>
                </div>
              </div>

            </form>
          </section>

          <section className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] shadow-large overflow-hidden mt-12">
            <div className="flex justify-between items-center p-6 border-b border-[rgb(var(--border))] bg-[rgb(var(--accent)/0.02)]">
              <h3 className="flex items-center gap-3 font-bold text-lg text-[rgb(var(--text))] m-0">
                <FontAwesomeIcon icon={['fab', 'discord'] as IconProp} className="text-[#5865F2]" />
                <span>Discord Message Preview</span>
              </h3>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <FontAwesomeIcon icon={['fas', 'circle'] as IconProp} className="text-[6px]" /> Live
                </span>
                <div className="text-xs text-[rgb(var(--accent))] flex items-center gap-1">
                  <FontAwesomeIcon icon={['fas', 'sync-alt'] as IconProp} className="text-[10px]" />
                  <span>Real-time</span>
                </div>
              </div>
            </div>

            <div className="font-sans text-[16px] leading-[1.375] text-[#dcddde] bg-[#36393f] p-4 min-h-[200px] overflow-y-auto max-h-[500px]">
              <div className="flex pr-[16px] relative">
                <div className="w-[40px] h-[40px] rounded-full mr-[16px] shrink-0 bg-[#5865f2] flex items-center justify-center text-white font-bold text-[18px]">FH</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline mb-1">
                    <span className="font-medium text-white text-[1rem]">FreeHosts Bot</span>
                    <span className="text-[#72767d] text-[0.75rem] ml-2">Today at 12:00 PM</span>
                  </div>
                  <div className="whitespace-pre-wrap break-words">
                    <span className="text-[1.375rem] mr-1 align-middle">📌</span> <span className="font-bold text-white">Host Submission</span><br /><br />

                    <span className="font-bold text-white">Host Name</span><br />
                    <div className="border-l-4 border-[#4f545c] my-1 pl-3 text-[#b9bbbe]">{hostName || "[Host Name]"}</div>

                    <span className="font-bold text-white">Plans</span><br />
                    <div className="border-l-4 border-[#4f545c] my-1 pl-3 text-[#b9bbbe]">{plans || "[Plans]"}</div>

                    <span className="font-bold text-white">Targets</span><br />
                    <div className="border-l-4 border-[#4f545c] my-1 pl-3 text-[#b9bbbe]">{targets || "[Targets]"}</div>

                    <span className="font-bold text-white">Locales / Languages</span><br />
                    <div className="border-l-4 border-[#4f545c] my-1 pl-3 text-[#b9bbbe]">{locales || "[Locales]"}</div>

                    <div className="h-[1px] bg-[#42454a] my-2"></div>

                    <span className="text-[1.375rem] mr-1 align-middle">🧩</span> <span className="font-bold text-white">Specifications</span><br />
                    {specType === 'same' ? (
                      <>
                        {(sameRam || sameCpu || sameDisk) ? (
                          <>
                            {sameRam && <>• RAM: {sameRam}<br /></>}
                            {sameCpu && <>• CPU: {sameCpu}<br /></>}
                            {sameDisk && <>• Disk: {sameDisk}<br /></>}
                          </>
                        ) : (
                          <>• [Specs will appear here]<br /></>
                        )}
                      </>
                    ) : (
                      <>
                        {specPlans.length === 0 && !otherPlansChecked ? (
                          <>• [Add plans using the &quot;Add Plan&quot; button above]<br /></>
                        ) : (
                          <>
                            {specPlans.map(plan => (
                              <React.Fragment key={plan.id}>
                                <span className="font-bold text-white">{plan.name}:</span><br />
                                {plan.ram && <>• RAM: {plan.ram}<br /></>}
                                {plan.cpu && <>• CPU: {plan.cpu}<br /></>}
                                {plan.disk && <>• Disk: {plan.disk}<br /></>}
                              </React.Fragment>
                            ))}
                            {otherPlansChecked && (() => {
                              const addedPlanNames = new Set(specPlans.map(p => p.originalName));
                              const remainingPlans = availablePlans.filter(p => !addedPlanNames.has(p));
                              if (remainingPlans.length > 0) {
                                return (
                                  <>
                                    <span className="font-bold text-white">All Other Plans ({remainingPlans.join(', ')}):</span><br />
                                    {otherPlansRam && <>• RAM: {otherPlansRam}<br /></>}
                                    {otherPlansCpu && <>• CPU: {otherPlansCpu}<br /></>}
                                    {otherPlansDisk && <>• Disk: {otherPlansDisk}<br /></>}
                                  </>
                                );
                              }
                              return null;
                            })()}
                          </>
                        )}
                      </>
                    )}

                    <div className="h-[1px] bg-[#42454a] my-2"></div><br />

                    <span className="text-[1.375rem] mr-1 align-middle">🔗</span> <span className="font-bold text-white">Links</span><br />
                    <span className="font-bold text-white">ToS:</span> {tosLink || "[ToS Link]"}<br />
                    <span className="font-bold text-white">Privacy Policy:</span> {privacyLink || "[Privacy Policy Link]"}<br />
                    {planLink && <><span className="font-bold text-white">Plan Link:</span> {planLink}<br /></>}
                    {websiteLink && <><span className="font-bold text-white">Website Link:</span> {websiteLink}<br /></>}
                    {discordLink && <><span className="font-bold text-white">Discord Invite:</span> {discordLink}<br /></>}

                    {otherLinks && otherLinks.split('\n').filter(l => l.trim()).map((link, i) => (
                      <React.Fragment key={i}>{link}<br /></React.Fragment>
                    ))}

                    <br /><div className="h-[1px] bg-[#42454a] my-2"></div>

                    <span className="text-[1.375rem] mr-1 align-middle">📄</span> <span className="font-bold text-white">Information</span><br />
                    • Renewal Required: {renewalStatus === "yes" ? "YES" : (renewalStatus === "no" ? "NO" : "[Select an option]")}<br />

                    {renewalStatus === "yes" && (
                      <>
                        <div
                          className="text-[#00aff4] cursor-pointer font-medium mt-1 inline-block hover:underline"
                          onClick={() => setShowRenewalDetailsInPreview(!showRenewalDetailsInPreview)}
                        >
                          [{showRenewalDetailsInPreview ? "Click to hide renewal details" : "Click to show renewal details"}]
                        </div>
                        <div className={`mt-2 pl-2 border-l-2 border-[#4f545c] ${showRenewalDetailsInPreview ? 'block' : 'hidden'}`}>
                          This host requires renewal<br />
                          {renewalDuration && <>• Renewal Duration: {renewalDuration}<br /></>}
                          {coinsNeeded && <>• Coins Needed: {coinsNeeded}<br /></>}
                        </div>
                      </>
                    )}

                    {notes && <>• Notes: {notes}<br /></>}

                    <br /><div className="h-[1px] bg-[#42454a] my-2"></div>

                    <span className="text-[1.375rem] mr-1 align-middle">☑️</span> <span className="font-bold text-white">Verification</span><br />

                    <span className={`inline-block w-[16px] h-[16px] border-2 border-[#72767d] rounded-[3px] mr-[6px] text-center leading-[12px] text-[12px] align-middle ${checkToS ? 'bg-[#3ba55c] border-[#3ba55c] text-white' : ''}`}>{checkToS ? '✓' : ''}</span> I have included the ToS<br />
                    <span className={`inline-block w-[16px] h-[16px] border-2 border-[#72767d] rounded-[3px] mr-[6px] text-center leading-[12px] text-[12px] align-middle ${checkPrivacy ? 'bg-[#3ba55c] border-[#3ba55c] text-white' : ''}`}>{checkPrivacy ? '✓' : ''}</span> I have included the Privacy Policy<br />

                    {missingFields.length > 0 && (
                      <div className="border-l-4 border-[#4f545c] my-1 pl-3 text-[#faa81a] mt-4">
                        ⚠️ <span className="font-bold text-white">Missing required fields:</span> {missingFields.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>

      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-6 shadow-large z-[10000] flex items-center gap-4 font-bold transition-all duration-300 ${copyNotification ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} ${copyNotification?.isError ? 'text-red-500' : 'text-emerald-500'}`}>
        {copyNotification?.isError ? <FontAwesomeIcon icon={['fas', 'circle-xmark'] as IconProp} className="text-2xl" /> : <FontAwesomeIcon icon={['fas', 'circle-check'] as IconProp} className="text-2xl" />}
        <span>{copyNotification?.message}</span>
      </div>
    </div>
  );
}
