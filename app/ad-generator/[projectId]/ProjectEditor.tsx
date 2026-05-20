'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdGenProvider, useAdGen } from '@/components/ad-generator/context';
import AdWizard from '@/components/ad-generator/AdWizard';
import { ArrowLeft } from 'lucide-react';

function EditorInner({ projectId }: { projectId: string }) {
  const router = useRouter();
  const { state } = useAdGen();

  if (!state.project) {
    return (
      <div className="min-h-screen bg-[#070711] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-white/50 text-sm">Loading project…</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Minimal back nav */}
      <div className="fixed top-0 left-0 z-50 p-4">
        <button
          onClick={() => router.push('/ad-generator')}
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10"
        >
          <ArrowLeft size={12} /> All Projects
        </button>
      </div>
      <AdWizard />
    </div>
  );
}

export default function ProjectEditor({ projectId }: { projectId: string }) {
  return (
    <AdGenProvider projectId={projectId}>
      <EditorInner projectId={projectId} />
    </AdGenProvider>
  );
}
