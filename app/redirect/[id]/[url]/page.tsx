'use client'

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';

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
    let targetUrl = url;
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.append('ref', 'freehosts.space');
      targetUrl = urlObj.toString();
    } catch {
      targetUrl = url + (url.includes('?') ? '&ref=freehosts.space' : '?ref=freehosts.space');
    }

    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    
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
          handleAutoRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRedirecting, handleAutoRedirect]);

  function handleRedirect(e?: React.MouseEvent) {
    if (e) {
      e.preventDefault();
      
      let targetUrl = url;
      try {
        const urlObj = new URL(url);
        urlObj.searchParams.append('ref', 'freehosts.space');
        targetUrl = urlObj.toString();
      } catch {
        targetUrl = url + (url.includes('?') ? '&ref=freehosts.space' : '?ref=freehosts.space');
      }

      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }

    setIsRedirecting(false);
  }


  function handleCancel() {
    setIsRedirecting(false);
  }

  const progress = (countdown / 5) * 100;

  return (
    <main id="main-content">
      <div className="redirect-container">
        <div className="redirect-box">
          <div className="redirect-icon">
            <Icon icon={['fas', 'arrow-right']} />
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
              onClick={(e) => handleRedirect(e)}
            >
              <Icon icon={['fas', 'external-link-alt']} /> Open Link
            </a>

            <button
              className="redirect-cancel-btn"
              onClick={() => {
                if (returnTo) {
                  window.location.href = `/hosts/${returnTo}`;
                } else {
                  window.location.href = '/hosts';
                }
              }}
            >
              <Icon icon={['fas', 'arrow-left']} /> Back
            </button>

            <button
              className="redirect-cancel-btn"
              onClick={handleCancel}
              disabled={!isRedirecting}
            >
              <Icon icon={['fas', 'times']} /> Cancel
            </button>
          </div>

          {!isRedirecting && (
            <div id="redirect-focus-error">
              <div style={{ color: '#10b981', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
                <Icon icon={['fas', 'check-circle']} /> Redirect Completed
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
