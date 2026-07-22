'use client';

import { useConsent } from '@/contexts/ConsentContext';
import { ShieldCheck, Lock, ChevronRight, X, FileText, AlertTriangle } from 'lucide-react';

export default function GdprConsentBanner({className}: {className: string}) {
  const { acceptConsent, declineConsent, consentState } = useConsent();

  // Only hide when the user has EXPLICITLY accepted — nothing else hides this
  if (consentState === 'accepted') return null;

  const isRestricted = consentState === 'declined';

  return (
    <>
      {/* Backdrop — blocks interaction with page below */}
      <div
        className={`gdpr-backdrop ${className} ${isRestricted ? 'restricted' : ''}`}
        aria-hidden="true"
        onClick={(e) => e.stopPropagation()}
      />

      <div
        className="gdpr-banner-container"
        role="dialog"
        aria-modal="true"
        aria-label={isRestricted ? 'Access Restricted' : 'Terms of Service Agreement'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gdpr-banner-content">

          {/* Header */}
          <div className="gdpr-header">
            <div className={`gdpr-icon-wrap ${isRestricted ? 'restricted' : ''}`}>
              {isRestricted
                ? <AlertTriangle size={22} aria-hidden="true" />
                : <ShieldCheck size={22} aria-hidden="true" />}
            </div>
            <div className="gdpr-title-area">
              <h3>{isRestricted ? 'Access Restricted' : 'Before You Continue'}</h3>
              <p>
                {isRestricted
                  ? 'You declined our Terms of Service. Access is blocked until you agree.'
                  : 'We care about your privacy and want to be transparent.'}
              </p>
            </div>
          </div>

          <div className="gdpr-divider" />

          {/* Body — links open in new tab so the banner stays visible */}
          <div className="gdpr-body">
            <p className="gdpr-description">
              {isRestricted ? 'To use FreeHosts, you must accept our ' : 'By continuing, you agree to our '}
              <a href="/tos" className="gdpr-link" target="_blank" rel="noopener noreferrer">
                <FileText size={13} aria-hidden="true" />
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="/privacy-policy" className="gdpr-link" target="_blank" rel="noopener noreferrer">
                <Lock size={13} aria-hidden="true" />
                Privacy Policy
              </a>
              .{' '}
              {isRestricted
                ? 'Please read them carefully and accept to regain access.'
                : 'These outline how we handle your data and your responsibilities.'}
            </p>
          </div>

          {/* Buttons */}
          <div className="gdpr-footer">
            <button
              className="btn-gdpr secondary"
              onClick={declineConsent}
              type="button"
            >
              <X size={15} aria-hidden="true" />
              <span>{isRestricted ? 'Keep Declined' : 'Decline'}</span>
            </button>
            <button
              className="btn-gdpr primary"
              onClick={acceptConsent}
              type="button"
            >
              <span>{isRestricted ? 'Accept & Unlock' : 'Accept & Continue'}</span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>

          {/* Quick legal links */}
          <div className="gdpr-legal-links">
            <a href="/tos" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            <span aria-hidden="true">·</span>
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </div>

        </div>
      </div>
    </>
  );
}
