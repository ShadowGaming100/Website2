'use client'

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

export default function Page() {
  const params = useParams() || {};
  const searchParams = useSearchParams();

  const urlParam = params.url ?? '';
  const url = urlParam ? atob(decodeURIComponent(urlParam as string)) : '';

  const hostName = searchParams?.get('hostName') || 'Host';
  const linkType = searchParams?.get('linkType') || 'Website';
  const returnTo = searchParams?.get('returnTo');

  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(true);

  const handleAutoRedirect = useCallback(() => {
    // Automatically open in new tab after countdown
    let targetUrl = url;
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.append('ref', 'freehosts.space');
      targetUrl = urlObj.toString();
    } catch {
      targetUrl = url + (url.includes('?') ? '&ref=freehosts.space' : '?ref=freehosts.space');
    }

    // Open in new tab (should work since it's triggered by timer from user-initiated page load)
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    
    // Also provide fallback navigation to hosts page
    setTimeout(() => {
      if (returnTo) {
        window.location.href = `/hosts/${returnTo}`;
      } else {
        window.location.href = '/hosts';
      }
    }, 1000);
  }, [url, returnTo]);

  useEffect(() => {
    if (!isRedirecting) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Automatically redirect after countdown finishes
          handleAutoRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRedirecting, handleAutoRedirect]);


  function handleCancel() {
    setIsRedirecting(false);
  }

  const progress = (countdown / 5) * 100;

  return (
    <main id="main-content">
      <div className="redirect-container">
        <div className="redirect-box">
          <div className="redirect-icon">
            <i className="fas fa-arrow-right"></i>
          </div>
          <h2 className="redirect-title">Redirecting...</h2>
          <p className="redirect-text">Connecting to</p>
          <div className="redirect-host">{hostName} - {linkType}</div>
          <div className="redirect-url">{url}</div>

          <div className="redirect-timer">
            <span className="redirect-timer-number" style={{ opacity: isRedirecting ? 1 : 0.6 }}>
              {isRedirecting ? countdown : '✓ Stopped'}
            </span>
          </div>

          <div className="redirect-progress">
            <div className="redirect-progress-bar" style={{ width: `${progress}%` }} />
          </div>

          <div className="redirect-actions">
            <a
              href={url}
              className="redirect-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleAutoRedirect()}
            >
              <i className="fas fa-external-link-alt"></i> Open Link
            </a>

            <button
              className="redirect-cancel-btn"
              onClick={() => {
                if (returnTo) {
                  // Force a full page reload to ensure proper data fetching
                  window.location.href = `/hosts/${returnTo}`;
                } else {
                  // Force a full page reload to ensure proper state reset
                  window.location.href = '/hosts';
                }
              }}
            >
              <i className="fas fa-arrow-left"></i> Back
            </button>

            <button
              className="redirect-cancel-btn"
              onClick={handleCancel}
              disabled={!isRedirecting}
            >
              <i className="fas fa-times"></i> Cancel
            </button>
          </div>

          {!isRedirecting && (
            <div id="redirect-focus-error">
              <div style={{ color: '#10b981', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
                <i className="fas fa-check-circle"></i> Redirect Completed
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
                The link has been opened in a new tab. You can now return to the hosts list.
              </p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
