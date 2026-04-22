'use client';

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

function buildTargetUrl(raw: string): string {
  try {
    const urlObj = new URL(raw);
    urlObj.searchParams.append('ref', 'freehosts.space');
    return urlObj.toString();
  } catch {
    return raw + (raw.includes('?') ? '&ref=freehosts.space' : '?ref=freehosts.space');
  }
}

export default function Page() {
  const params = useParams() || {};
  const searchParams = useSearchParams();

  const urlParam = params.url ?? '';
  const url = urlParam ? atob(decodeURIComponent(urlParam as string)) : '';

  const hostName = searchParams?.get('hostName') || 'Host';
  const linkType = searchParams?.get('linkType') || 'Website';
  const returnTo = searchParams?.get('returnTo');

  const [countdown, setCountdown] = useState(5);
  const [isCancelled, setIsCancelled] = useState(false);



  // Countdown redirect back
  useEffect(() => {
    if (isCancelled || !url) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = returnTo ? `/hosts/${returnTo}` : '/hosts';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCancelled, returnTo, url]);

  const progress = (countdown / 5) * 100;
  const targetUrl = url ? buildTargetUrl(url) : '#';

  return (
    <main id="main-content">
      <div className="redirect-container">
        <div className="redirect-box">
          <div className="redirect-icon">
            <i className="fas fa-arrow-right"></i>
          </div>

          <h2 className="redirect-title">Redirecting...</h2>
          <p className="redirect-text">Connecting to</p>

          <div className="redirect-host">
            {hostName} - {linkType}
          </div>

          <div className="redirect-url">{url}</div>

          <div className="redirect-timer">
            <span
              className="redirect-timer-number"
              style={{ opacity: isCancelled ? 0.6 : 1 }}
            >
              {isCancelled ? '✓ Stopped' : countdown}
            </span>
          </div>

          <div className="redirect-progress">
            <div
              className="redirect-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="redirect-actions">
            <a
              href={targetUrl}
              className="redirect-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-external-link-alt"></i> Open Link
            </a>

            <button
              className="redirect-cancel-btn"
              onClick={() => {
                window.location.href = returnTo
                  ? `/hosts/${returnTo}`
                  : '/hosts';
              }}
            >
              <i className="fas fa-arrow-left"></i> Back
            </button>

            <button
              className="redirect-cancel-btn"
              onClick={() => setIsCancelled(true)}
              disabled={isCancelled}
            >
              <i className="fas fa-times"></i> Cancel
            </button>
          </div>

          {isCancelled && (
            <div id="redirect-focus-error">
              <div
                style={{
                  color: '#10b981',
                  fontWeight: 600,
                  marginBottom: 'var(--space-sm)',
                }}
              >
                <i className="fas fa-check-circle"></i> Redirect Completed
              </div>

              <p
                style={{
                  color: 'var(--muted)',
                  fontSize: 'var(--font-size-sm)',
                  margin: 0,
                }}
              >
                The link has been opened in a new tab. You can now return to
                the hosts list.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}