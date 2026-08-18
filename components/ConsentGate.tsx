'use client';

import React, { useContext } from 'react';
import { ConsentContext } from '@/contexts/ConsentContext';
import { usePathname } from 'next/navigation';

export default function ConsentGate({ children }: { children: React.ReactNode }) {
  const context = useContext(ConsentContext);
  const consentState = context?.consentState ?? 'unknown';

  // Always allow crawlers full access
  const isCrawler = React.useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes('googlebot') || ua.includes('bingbot') || ua.includes('yandexbot') || 
           ua.includes('duckduckbot') || ua.includes('baiduspider') || ua.includes('slackbot') ||
           ua.includes('discordbot') || ua.includes('twitterbot') || ua.includes('telegrambot') ||
           ua.includes('anthropic-ai') || ua.includes('claude') || ua.includes('gptbot') ||
           ua.includes('chatgpt') || ua.includes('bot') || ua.includes('spider') || ua.includes('crawl');
  }, []);

  const pathname = usePathname();

  // Accepted will be the conditions that we'll use to show absolutely everything
  const accepted = 
        consentState === 'accepted' ||
        isCrawler;
        
  // Skippable will be used for items that shuold show without trackers, example ToS page that needs to be displayed without being consented
  const skippable = !accepted && (pathname === '/tos' || pathname === '/privacy-policy');

  const displayChildren = React.Children.toArray(children).filter((child) => {
    if (!React.isValidElement<{ className?: string }>(child)) {
      return accepted;
    }

    const className = child.props.className ?? "";

    if (accepted) {
      return !className.includes("fh-gate");
    }

    if (skippable) {
      return className.includes("skippable");
    }

    return className.includes("fh-gate");
  });

  // Fake background page for human visitors
  return (
    <>
    {displayChildren}

    {!accepted ? 
      <div style={{ 
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(12px) saturate(0.8)',
        transform: 'scale(1.1)',
        opacity: 0.7,
        pointerEvents: 'none'
      }} />
    : ''}
    </>
  );
}
