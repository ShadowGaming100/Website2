'use client';

import Link from 'next/link';
import { useConsent } from '@/contexts/ConsentContext';

export default function GdprConsentBanner() {
  const { showBanner, acceptConsent, declineConsent } = useConsent();

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className="gdpr-banner"
      role="region"
      aria-label="Cookie consent"
    >
      <p className="gdpr-banner-text">
        We use cookies to save your favorite hosts and remember your preferences.
        See our{' '}
        <Link href="/privacy-policy" className="gdpr-banner-link">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="gdpr-banner-actions">
        <button
          className="btn primary small gdpr-accept-btn"
          onClick={acceptConsent}
          type="button"
        >
          Accept All
        </button>
        <button
          className="btn ghost small gdpr-decline-btn"
          onClick={declineConsent}
          type="button"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
