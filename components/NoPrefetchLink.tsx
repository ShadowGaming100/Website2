"use client";

import { useRouter } from "next/navigation";
import { ComponentProps, useCallback } from "react";

type LinkProps = ComponentProps<"a"> & {
  href: string;
};

export default function NoPrefetchLink({ href, onClick, ...props }: LinkProps) {
  const router = useRouter();

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    router.push(href);
  }, [href, onClick, router]);

  return <a href={href} onClick={handleClick} {...props} />;
}