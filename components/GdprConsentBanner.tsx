'use client';

import Link from 'next/link';
import { useConsent } from '@/contexts/ConsentContext';
import { useEffect } from 'react';

export default function GdprConsentBanner() {
  const { showBanner, acceptConsent, declineConsent, consentState } = useConsent();

  // If we haven't checked the cookie yet, or if they accepted, hide
  // BUT if they declined, we show the blocking overlay.
  if (!showBanner && consentState !== 'declined') {
    return null;
  }

  if (consentState === 'declined') {
    return (
      <>
        <div className="gdpr-backdrop" aria-hidden="true" style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9998, backdropFilter: 'blur(4px)'
        }} />
        <div
          className="gdpr-banner"
          role="region"
          aria-label="Access Denied"
          style={{ zIndex: 9999 }}
        >
          <p className="gdpr-banner-text">
            You must agree to the Terms of Service and Privacy Policy to use this website. Access is currently restricted.
          </p>
          <div className="gdpr-banner-actions" style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <button
              className="btn primary small gdpr-accept-btn"
              onClick={acceptConsent}
              type="button"
            >
              I Agree
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Optional: Add a backdrop to block interaction until they accept */}
      <div className="gdpr-backdrop" aria-hidden="true" style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9998, backdropFilter: 'blur(2px)'
      }} />
      <div
        className="gdpr-banner"
        role="region"
        aria-label="Terms of Service Agreement"
        style={{ zIndex: 9999 }}
      >
        <p className="gdpr-banner-text">
          By continuing to use this website, you agree to our{' '}
          <Link href="/tos" className="gdpr-banner-link">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy-policy" className="gdpr-banner-link">
            Privacy Policy
          </Link>
          . You must agree to use the website.
        </p>
        <div className="gdpr-banner-actions" style={{ display: 'flex', gap: '1rem', width: '100%' }}>
          <button
            className="btn ghost small gdpr-decline-btn"
            onClick={declineConsent}
            type="button"
          >
            I Disagree
          </button>
          <button
            className="btn primary small gdpr-accept-btn"
            onClick={acceptConsent}
            type="button"
          >
            I Agree
          </button>
        </div>
      </div>
    </>
  );
}
