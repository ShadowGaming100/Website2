// ─── HostDetailClient.tsx (relevant excerpt) ─────────────────────────────────
//
// When a user clicks a host link, open the target URL in a new tab FIRST
// (inside the click handler = a real user gesture → never blocked),
// then navigate the current tab to the redirect/countdown page.
//
// If you call window.open() later in useEffect or a setTimeout it fires
// outside the gesture and popup blockers kill it.

import { useRouter } from 'next/navigation';

// inside your component:
const router = useRouter();

function handleLinkClick(
  e: React.MouseEvent,
  rawUrl: string,
  hostId: number,
  hostName: string,
  linkType: string,
) {
  e.preventDefault();

  // ✅ Step 1 — open the tab RIGHT HERE, synchronously within the click event.
  //    Browsers allow window.open() when it is called during a user gesture.
  const encoded = encodeURIComponent(btoa(rawUrl));
  const targetUrl = buildTargetUrl(rawUrl);   // your existing helper
  window.open(targetUrl, '_blank', 'noopener,noreferrer');

  // ✅ Step 2 — navigate the current page to the countdown/redirect page.
  const params = new URLSearchParams({
    hostName,
    linkType,
    returnTo: String(hostId),
  });
  router.push(`/redirect/${hostId}/${encoded}?${params}`);
}

// Then in JSX, replace any plain <a> tags that go through the redirect route:
//
//   <a
//     href={`/redirect/${host.id}/${encoded}?...`}
//     onClick={(e) => handleLinkClick(e, rawUrl, host.id, host.name, 'Website')}
//   >
//     Visit site
//   </a>