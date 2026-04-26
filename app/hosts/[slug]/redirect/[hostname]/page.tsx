'use client';

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, ExternalLink, X } from 'lucide-react';

function buildTargetUrl(hostname: string): string {
  return `https://${hostname}?ref=freehosts.space`;
}

export default function Page() {
  const params = useParams() || {};
  const hostname = (params.hostname as string) ?? '';
  const targetUrl = hostname ? buildTargetUrl(hostname) : '#';

  const [countdown, setCountdown] = useState(5);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (isCancelled || !hostname) return;
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          history.back();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isCancelled, hostname]);

  const progress = (countdown / 5) * 100;

  return (
    <main id="main-content">
      <div className="redirect-container">
        <div className="redirect-box">
          <div className="redirect-icon">
            <ArrowRight size={24} aria-hidden="true" />
          </div>
          <h2 className="redirect-title">Redirecting...</h2>
          <p className="redirect-text">You are being redirected to</p>
          <div className="redirect-url">{hostname}</div>
          <div className="redirect-timer">
            <span className="redirect-timer-number" style={{ opacity: isCancelled ? 0.6 : 1 }}>
              {isCancelled ? '✓ Stopped' : countdown}
            </span>
          </div>
          <div className="redirect-progress">
            <div className="redirect-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="redirect-actions">
            <a href={targetUrl} className="redirect-link" target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} aria-hidden="true" /> Open Link
            </a>
            <button className="redirect-cancel-btn" onClick={() => history.back()}>
              <ArrowLeft size={14} aria-hidden="true" /> Back
            </button>
            <button className="redirect-cancel-btn" onClick={() => setIsCancelled(true)} disabled={isCancelled}>
              <X size={14} aria-hidden="true" /> Cancel
            </button>
          </div>
          {isCancelled && (
            <div id="redirect-focus-error">
              <div style={{ color: '#10b981', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
                <CheckCircle size={14} aria-hidden="true" /> Redirect Completed
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
                The link has been opened in a new tab. You can now go back.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
