"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 bg-[rgb(var(--glass))] rounded-full flex items-center justify-center text-4xl text-[rgb(var(--accent))] mb-8">
        <Icon icon={["fas", "search"]} />
      </div>

      <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
      <h2 className="text-2xl font-bold mb-4 text-[rgb(var(--text))]">
        Page Not Found
      </h2>
      <p className="text-[rgb(var(--muted))] max-w-md mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist. It might have
        been moved or deleted.
      </p>

      <div className="flex gap-4">
        <Button href="/" variant="primary" icon={["fas", "home"]}>
          Go Home
        </Button>
        <Button href="/hosts" variant="secondary" icon={["fas", "server"]}>
          Browse Hosts
        </Button>
      </div>
    </div>
  );
}
