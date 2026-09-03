import Breadcrumbs from "@/components/Breadcrumbs";
import { safeJsonLd } from "../lib/safeJsonLd";
import { webPageJsonLd } from "../lib/pageMeta";

// Shared wrapper for the legal/prose pages (was identical script +
// Breadcrumbs + main in tos, privacy-policy, server-rules, submission-rules).
export default function ProsePage({
  path,
  crumb,
  name,
  description,
  mainClassName,
  children,
}: {
  path: string;
  crumb: string;
  name: string;
  description: string;
  mainClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(webPageJsonLd(path, name, description)) }}
      />
      <Breadcrumbs siteUrl={process.env.APP_URL} items={[{ name: crumb, path }]} />
      <main className={mainClassName}>{children}</main>
    </>
  );
}
