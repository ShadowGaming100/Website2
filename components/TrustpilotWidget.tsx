'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

const TRUSTPILOT_SCRIPT_URL = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';

interface TrustpilotWidgetProps {
  businessId?: string;
  templateId?: string;
  theme?: 'light' | 'dark';
  className?: string;
}

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, force?: boolean) => void;
    };
  }
}

export default function TrustpilotWidget({
  businessId = 'YOUR_BUSINESS_UNIT_ID', 
  templateId = '5419b6a8b0d04a076446a9ad',
  theme = 'dark',
  className = '',
}: TrustpilotWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.Trustpilot && ref.current) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  }, [businessId, templateId, theme]);

  return (
    <>
      <Script
        src={TRUSTPILOT_SCRIPT_URL}
        strategy="lazyOnload"
        onLoad={() => {
          if (window.Trustpilot && ref.current) {
            window.Trustpilot.loadFromElement(ref.current, true);
          }
        }}
      />
      <div
        ref={ref}
        className={`trustpilot-widget ${className}`}
        data-locale="en-US"
        data-template-id={templateId}
        data-businessunit-id={businessId}
        data-style-height="24px"
        data-style-width="100%"
        data-theme={theme}
      >
        <a
          href="https://www.trustpilot.com/review/freehosts.space"
          target="_blank"
          rel="noopener"
        >
          Trustpilot
        </a>
      </div>
    </>
  );
}
