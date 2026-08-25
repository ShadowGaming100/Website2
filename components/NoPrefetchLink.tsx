"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Link>, "prefetch">;

export default function NoPrefetchLink({ children, ...props }: Props) {
  return (
    <Link {...props} prefetch={false}>
      {children}
    </Link>
  );
}
