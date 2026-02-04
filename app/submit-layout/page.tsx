'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from '@/components/ui/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';

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
        <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">
          <Icon icon={['fas', iconName as never] as IconProp} className="text-[rgb(var(--muted))] text-xs" />
          {label}
        </label>
        <input
          type="text"
          className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:border-transparent transition-all placeholder-[rgb(var(--muted)/0.5)]"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))]">
      {/* Header Section */}
      <section className="pt-24 pb-12">
        <div className="container-default text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Link
              href="/submit-host"
              className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] transition-colors mb-6"
            >
              <FontAwesomeIcon icon={['fas', 'arrow-left'] as IconProp} />
              Back to submission
            </Link>

            <h1 className="heading-1 text-[rgb(var(--text))] mb-4">
              Layout <span className="text-[rgb(var(--accent))]">Builder</span>
            </h1>
            <p className="body-large text-[rgb(var(--muted))]">
              Create professional Discord-formatted hosting layouts instantly.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-default pb-24">
        <div className="max-w-5xl mx-auto">
          <section className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] shadow-soft p-6 sm:p-8 mb-12">
            <div className="flex items-center mb-8 pb-6 border-b border-[rgb(var(--border))]">
              <div className="text-xl mr-4 w-12 h-12 flex items-center justify-center bg-[rgb(var(--accent)/0.1)] rounded-lg text-[rgb(var(--accent))]">
                <Icon icon={['fas', 'pen-to-square'] as IconProp} />
              </div>
              <div>
                <h2 className="heading-4 text-[rgb(var(--text))] m-0">Build Your Layout</h2>
                <p className="body-small text-[rgb(var(--muted))] mt-1">Fill in the information below</p>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-12">
                <div className="flex items-center gap-3 font-bold text-lg text-[rgb(var(--text))] mb-6 pb-2 border-b border-[rgb(var(--border))]">
                  <span>📌</span>
                  <span>Basic Information</span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="mb-2">
                    <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">Host Name <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] transition-all placeholder-[rgb(var(--muted)/0.5)]" placeholder="e.g., Example Host" value={hostName} onChange={e => setHostName(e.target.value)} required />
                  </div>

                  <div className="mb-2">
                    <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">Plans <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] transition-all placeholder-[rgb(var(--muted)/0.5)]" placeholder="e.g., Nextjs, Javascript, Python" value={plans} onChange={e => setPlans(e.target.value)} required />
                    <div className="text-xs text-[rgb(var(--muted))] mt-1 flex items-start gap-1"><Icon icon={['fas', 'circle-info'] as IconProp} className="mt-[2px] text-[10px]" /><span>Comma separated list</span></div>
                  </div>

                  <div className="mb-2">
                    <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">Targets <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] transition-all placeholder-[rgb(var(--muted)/0.5)]" placeholder="e.g., Coding, Gaming" value={targets} onChange={e => setTargets(e.target.value)} required />
                  </div>

                  <div className="mb-2">
                    <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">Locales / Languages <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] transition-all placeholder-[rgb(var(--muted)/0.5)]" placeholder="e.g., en, es" value={locales} onChange={e => setLocales(e.target.value)} required />
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-3 font-bold text-lg text-[rgb(var(--text))] mb-6 pb-2 border-b border-[rgb(var(--border))]">
                  <span>🧩</span>
                  <span>Specifications</span>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">Spec Type <span className="text-red-500">*</span></label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="flex-1 flex items-center p-3 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl cursor-pointer transition-all hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--accent)/0.02)]">
                      <input type="radio" name="specType" value="same" checked={specType === 'same'} onChange={() => setSpecType('same')} className="mr-2 cursor-pointer accent-[rgb(var(--accent))]" />
                      <span className={specType === 'same' ? 'text-[rgb(var(--accent))] font-semibold' : 'text-[rgb(var(--text))]'}>Same specs for all plans</span>
                    </label>
                    <label className="flex-1 flex items-center p-3 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl cursor-pointer transition-all hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--accent)/0.02)]">
                      <input type="radio" name="specType" value="different" checked={specType === 'different'} onChange={() => setSpecType('different')} className="mr-2 cursor-pointer accent-[rgb(var(--accent))]" />
                      <span className={specType === 'different' ? 'text-[rgb(var(--accent))] font-semibold' : 'text-[rgb(var(--text))]'}>Different specs per target/plan</span>
                    </label>
                  </div>
                </div>

                {specType === 'same' ? (
                  <div className="bg-[rgb(var(--muted)/0.03)] rounded-xl border border-[rgb(var(--border))] p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {renderSpecInput('RAM', 'fa-memory', sameRam, setSameRam, 'e.g., 4GB')}
                      {renderSpecInput('CPU', 'fa-microchip', sameCpu, setSameCpu, 'e.g., 2 vCores')}
                      {renderSpecInput('Disk', 'fa-hard-drive', sameDisk, setSameDisk, 'e.g., 40GB SSD')}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <label className="flex items-center p-3 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl cursor-pointer transition-all hover:border-[rgb(var(--accent))]">
                        <input type="checkbox" checked={otherPlansChecked} onChange={(e) => setOtherPlansChecked(e.target.checked)} className="mr-2 w-[18px] h-[18px] cursor-pointer accent-[rgb(var(--accent))]" />
                        <span className={otherPlansChecked ? 'text-[rgb(var(--accent))] font-semibold' : 'text-[rgb(var(--text))]'}>All other plans not listed above share the same specs</span>
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mb-6">
                      <select
                        className="flex-1 p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
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
                        className="bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))] border border-[rgb(var(--accent)/0.2)] px-6 py-3 rounded-xl font-semibold hover:bg-[rgb(var(--accent)/0.2)] transition-all flex items-center justify-center gap-2"
                      >
                        <Icon icon={['fas', 'plus'] as IconProp} /> Add Plan
                      </button>
                    </div>

                    <div className="flex flex-col gap-6">
                      {specPlans.map(plan => (
                        <div key={plan.id} className="bg-[rgb(var(--muted)/0.03)] rounded-xl border border-[rgb(var(--border))] p-6">
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex-1">
                              <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">
                                <Icon icon={['fas', 'tag'] as IconProp} className="text-[rgb(var(--muted))] text-xs" /> Plan Name
                              </label>
                              <input
                                type="text"
                                className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]"
                                value={plan.name}
                                onChange={(e) => updateSpecPlan(plan.id, 'name', e.target.value)}
                              />
                              <div className={`text-xs mt-1 ${plan.name !== plan.originalName ? 'text-amber-500' : 'text-[rgb(var(--muted))]'}`}>
                                {plan.name !== plan.originalName ? `Originally: ${plan.originalName}` : `Plan from: ${plan.originalName}`}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removePlan(plan.id, plan.name)}
                              className="ml-4 bg-red-500/10 text-red-500 border border-red-500/30 px-3 py-1.5 rounded-lg text-xs hover:bg-red-500/20 transition-all cursor-pointer font-medium"
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
                        <div className="bg-amber-500/5 rounded-xl border border-amber-500/20 p-6">
                          <div className="flex items-center mb-4">
                            <div className="flex-1">
                              <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">
                                <Icon icon={['fas', 'layer-group'] as IconProp} className="text-[rgb(var(--muted))] text-xs" />
                                <span className="text-amber-500 font-semibold">All Other Plans</span>
                              </label>
                              <div className="text-xs text-[rgb(var(--muted))]">
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
                <div className="flex items-center gap-3 font-bold text-lg text-[rgb(var(--text))] mb-6 pb-2 border-b border-[rgb(var(--border))]">
                  <span>🔗</span>
                  <span>Links</span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="mb-2">
                    <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">ToS Link <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]" placeholder="https://example.com/tos" value={tosLink} onChange={e => setTosLink(e.target.value)} required />
                  </div>
                  <div className="mb-2">
                    <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">Privacy Policy Link <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]" placeholder="https://example.com/privacy" value={privacyLink} onChange={e => setPrivacyLink(e.target.value)} required />
                  </div>
                  <div className="mb-2">
                    <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">Plan Link</label>
                    <input type="text" className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]" placeholder="https://example.com/plan" value={planLink} onChange={e => setPlanLink(e.target.value)} />
                  </div>
                  <div className="mb-2">
                    <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">Website Link</label>
                    <input type="text" className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]" placeholder="https://example.com" value={websiteLink} onChange={e => setWebsiteLink(e.target.value)} />
                  </div>
                </div>
                <div className="mt-6 mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">Discord Invite</label>
                  <input type="text" className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]" placeholder="https://discord.gg/invite" value={discordLink} onChange={e => setDiscordLink(e.target.value)} />
                </div>
                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">Other Links</label>
                  <textarea className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] min-h-[100px] font-mono focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]" placeholder={`One per line, e.g.:\nDocumentation: https://docs.example.com\nSupport: https://support.example.com`} value={otherLinks} onChange={e => setOtherLinks(e.target.value)}></textarea>
                  <div className="text-xs text-[rgb(var(--muted))] mt-1 flex items-start gap-1"><Icon icon={['fas', 'circle-info']} className="mt-[2px] text-[10px]" /><span>Format: Label: URL (one per line)</span></div>
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-3 font-bold text-lg text-[rgb(var(--text))] mb-6 pb-2 border-b border-[rgb(var(--border))]">
                  <span>📄</span>
                  <span>Information</span>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">Renewal Required <span className="text-red-500">*</span></label>
                  <select className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]" value={renewalStatus} onChange={e => setRenewalStatus(e.target.value)} required>
                    <option value="">Select an option</option>
                    <option value="yes">This host requires renewal</option>
                    <option value="no">This host does not require renewal</option>
                  </select>
                </div>

                {renewalStatus === 'yes' && (
                  <div className="bg-amber-500/5 rounded-xl border border-amber-500/20 p-6 mb-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="mb-2">
                        <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-amber-500">Renewal Duration <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="e.g., 30 days" value={renewalDuration} onChange={e => setRenewalDuration(e.target.value)} />
                      </div>
                      <div className="mb-0">
                        <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-amber-500">Coins Needed <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="e.g., 300 coins" value={coinsNeeded} onChange={e => setCoinsNeeded(e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label className="flex items-center gap-2 font-semibold text-sm mb-2 text-[rgb(var(--text))]">Notes</label>
                  <textarea className="w-full p-3 border border-[rgb(var(--border))] rounded-xl bg-[rgb(var(--bg))] text-[rgb(var(--text))] min-h-[100px] font-mono focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]" placeholder="Add any important notes about the host" value={notes} onChange={e => setNotes(e.target.value)}></textarea>
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-center gap-3 font-bold text-lg text-[rgb(var(--text))] mb-6 pb-2 border-b border-[rgb(var(--border))]">
                  <span>☑️</span>
                  <span>Verification</span>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="flex items-center p-4 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl cursor-pointer transition-all hover:border-[rgb(var(--accent))]">
                    <input type="checkbox" checked={checkToS} onChange={e => setCheckToS(e.target.checked)} className="mr-3 w-5 h-5 cursor-pointer accent-[rgb(var(--accent))]" />
                    <span className={checkToS ? 'text-[rgb(var(--accent))] font-semibold' : 'text-[rgb(var(--text))]'}>I have included the ToS</span>
                  </label>
                  <label className="flex items-center p-4 bg-[rgb(var(--bg))] border border-[rgb(var(--border))] rounded-xl cursor-pointer transition-all hover:border-[rgb(var(--accent))]">
                    <input type="checkbox" checked={checkPrivacy} onChange={e => setCheckPrivacy(e.target.checked)} className="mr-3 w-5 h-5 cursor-pointer accent-[rgb(var(--accent))]" />
                    <span className={checkPrivacy ? 'text-[rgb(var(--accent))] font-semibold' : 'text-[rgb(var(--text))]'}>I have included the Privacy Policy</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-[rgb(var(--border))]">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-[rgb(var(--bg))] text-[rgb(var(--text))] border border-[rgb(var(--border))] py-3.5 rounded-xl font-semibold hover:bg-[rgb(var(--muted)/0.05)] transition-all flex justify-center items-center gap-2"
                >
                  <Icon icon={['fas', 'rotate-left'] as IconProp} /> Reset Form
                </button>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  disabled={!isFormValid}
                  className={`flex-[2] py-3.5 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all ${isFormValid ? 'bg-[rgb(var(--accent))] text-white hover:opacity-90 shadow-soft cursor-pointer' : 'bg-[rgb(var(--muted)/0.2)] text-[rgb(var(--muted))] cursor-not-allowed'}`}
                >
                  <Icon icon={['fas', 'copy'] as IconProp} /> Copy Message
                </button>
              </div>

              <div className="mt-12">
                <div className="bg-[#2f3136] rounded-xl p-4 border border-[#202225] overflow-hidden shadow-inner">
                  <div className="text-[14px] font-semibold text-[#b9bbbe] mb-3 flex items-center gap-2 border-b border-[#202225] pb-2">
                    <Icon icon={['fas', 'code'] as IconProp} className="text-[#7289da]" />
                    <span>Message Preview (Raw Text)</span>
                  </div>
                  <div className="font-mono text-[13px] leading-relaxed text-[#dcddde] whitespace-pre-wrap break-words max-h-[300px] overflow-y-auto custom-scrollbar">
                    {generatedRawText}
                  </div>
                </div>
              </div>

            </form>
          </section>

          <section className="bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] shadow-soft overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-[rgb(var(--border))] bg-[rgb(var(--muted)/0.02)]">
              <h3 className="flex items-center gap-3 font-bold text-lg text-[rgb(var(--text))] m-0">
                <FontAwesomeIcon icon={['fab', 'discord'] as IconProp} className="text-[#5865F2]" />
                <span>Discord Message Preview</span>
              </h3>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live
                </span>
              </div>
            </div>

            <div className="font-sans text-[16px] leading-[1.375] text-[#dcddde] bg-[#36393f] p-6 min-h-[300px] overflow-y-auto max-h-[600px] custom-scrollbar">
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
                          <>• [Add plans using the "Add Plan" button above]<br /></>
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
