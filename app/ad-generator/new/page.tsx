'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AdGenProvider, useAdGen } from '@/components/ad-generator/context';

function Spinner() {
  return (
    <div className="min-h-screen bg-[#070711] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white/50 text-sm">Setting up your project…</p>
      </div>
    </div>
  );
}

function NewProjectInitializer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, initProject } = useAdGen();

  const name = searchParams.get('name') || 'Untitled Campaign';

  useEffect(() => {
    if (!state.project) {
      initProject(name);
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (state.project) {
      router.replace(`/ad-generator/${state.project.id}`);
    }
  }, [state.project, router]);

  return <Spinner />;
}

export default function NewProjectPage() {
  return (
    <AdGenProvider>
      <Suspense fallback={<Spinner />}>
        <NewProjectInitializer />
      </Suspense>
    </AdGenProvider>
  );
}
