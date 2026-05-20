'use client';

import { usePathname } from 'next/navigation';

const TOOL_PATHS = ['/ad-generator'];

export function ConditionalNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isToolPage = TOOL_PATHS.some((p) => pathname.startsWith(p));
  if (isToolPage) return null;
  return <>{children}</>;
}

export function ConditionalMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isToolPage = TOOL_PATHS.some((p) => pathname.startsWith(p));
  if (isToolPage) return <>{children}</>;
  return <main className="flex-1">{children}</main>;
}
