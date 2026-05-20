'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Sparkles, Clock, CheckCircle, Trash2, ArrowRight, LayoutGrid, Zap, Target, TrendingUp } from 'lucide-react';
import { loadProjects, deleteProject } from '@/lib/ad-generator/storage';
import type { AdProject } from '@/lib/ad-generator/types';

const STATUS_CONFIG: Record<AdProject['status'], { label: string; color: string; icon: React.ReactNode }> = {
  draft: { label: 'Draft', color: 'text-white/40', icon: <Clock size={11} /> },
  generating: { label: 'Generating', color: 'text-yellow-400', icon: <div className="w-2.5 h-2.5 border border-yellow-400 border-t-transparent rounded-full animate-spin" /> },
  review: { label: 'Review', color: 'text-indigo-400', icon: <Sparkles size={11} /> },
  adapting: { label: 'Adapting', color: 'text-purple-400', icon: <Zap size={11} /> },
  approved: { label: 'Ready', color: 'text-emerald-400', icon: <CheckCircle size={11} /> },
  exported: { label: 'Exported', color: 'text-teal-400', icon: <CheckCircle size={11} /> },
};

const FEATURES = [
  { icon: <Sparkles size={20} className="text-indigo-400" />, title: 'AI Layout Generation', desc: 'Claude generates pixel-perfect ad layouts from your content and brand' },
  { icon: <Target size={20} className="text-purple-400" />, title: '9 Format Adaptations', desc: 'Automatically resize to all Meta and Google Display ad formats' },
  { icon: <LayoutGrid size={20} className="text-emerald-400" />, title: 'Smart Hierarchy', desc: 'AI scores and optimizes visual hierarchy for maximum impact' },
  { icon: <TrendingUp size={20} className="text-pink-400" />, title: 'Style Presets', desc: 'Modern, Luxury, Minimal, Ecommerce, Startup, Performance Marketing' },
];

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<AdProject[]>([]);
  const [projectName, setProjectName] = useState('');
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  function handleCreate() {
    if (!projectName.trim()) return;
    // Navigate to /ad-generator/new with the name as query param
    router.push(`/ad-generator/new?name=${encodeURIComponent(projectName.trim())}`);
  }

  function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    deleteProject(id);
    setProjects(loadProjects());
  }

  function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  return (
    <div className="min-h-screen bg-[#070711] text-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-transparent to-purple-900/20" />
        <div className="relative max-w-5xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-sm font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
              Powered by Claude AI
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            AI Ad Creative Generator
          </h1>
          <p className="text-white/50 text-lg max-w-2xl">
            Generate high-converting ad creatives for Meta and Google Display in minutes.
            Upload your brand assets, enter your copy, and let Claude design the perfect layout.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {!showNew ? (
              <button
                onClick={() => setShowNew(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20"
              >
                <PlusCircle size={18} /> Create New Campaign
              </button>
            ) : (
              <div className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                  placeholder="Campaign name (e.g. Summer Sale 2026)"
                  autoFocus
                  className="flex-1 bg-white/8 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 transition-all"
                />
                <button
                  onClick={handleCreate}
                  disabled={!projectName.trim()}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold rounded-xl transition-all flex items-center gap-1.5"
                >
                  Start <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => { setShowNew(false); setProjectName(''); }}
                  className="px-3 py-2.5 bg-white/5 hover:bg-white/10 text-white/50 rounded-xl transition-all"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        {/* Existing Projects */}
        {projects.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Your Campaigns</h2>
              <span className="text-xs text-white/30">{projects.length} project{projects.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => {
                const statusCfg = STATUS_CONFIG[project.status];
                const adaptCount = Object.keys(project.adaptations).length;
                return (
                  <div
                    key={project.id}
                    onClick={() => router.push(`/ad-generator/${project.id}`)}
                    className="group bg-white/3 hover:bg-white/6 border border-white/8 hover:border-white/20 rounded-2xl p-5 cursor-pointer transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-indigo-500/20 rounded-xl flex items-center justify-center">
                        <Sparkles size={16} className="text-indigo-400" />
                      </div>
                      <button
                        onClick={(e) => handleDelete(project.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1">{project.name}</h3>
                    <p className="text-xs text-white/40 mb-3">{formatDate(project.updatedAt)}</p>

                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-1 text-xs font-medium ${statusCfg.color}`}>
                        {statusCfg.icon}
                        {statusCfg.label}
                      </div>
                      {adaptCount > 0 && (
                        <span className="text-xs text-white/30">{adaptCount} sizes</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Features Grid */}
        <section>
          <h2 className="text-lg font-bold text-white mb-5">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/3 border border-white/8 rounded-2xl p-5 flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{title}</h3>
                  <p className="text-xs text-white/40 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow Steps */}
        <section>
          <h2 className="text-lg font-bold text-white mb-5">The workflow</h2>
          <div className="relative">
            <div className="absolute left-5 top-8 bottom-8 w-px bg-white/8" />
            <div className="space-y-4">
              {[
                { step: '01', title: 'Upload Brand Assets', desc: 'Logo, product images, brand colors, and font preferences' },
                { step: '02', title: 'Add Reference Template', desc: 'Optional: upload an existing ad for style analysis' },
                { step: '03', title: 'Enter Your Copy', desc: 'Headline, subheadline, CTA, offer, platform target' },
                { step: '04', title: 'AI Generates Layout', desc: 'Claude creates optimized JSON layout with perfect hierarchy' },
                { step: '05', title: 'Review & Refine', desc: 'Edit via natural language instructions, approve when ready' },
                { step: '06', title: 'Export All Sizes', desc: 'Download PNG/JPG individually or all as ZIP' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-5 pl-1">
                  <div className="w-9 h-9 bg-[#0d0d1a] border border-white/10 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                    <span className="text-xs font-mono text-indigo-400">{step}</span>
                  </div>
                  <div className="pb-1">
                    <p className="font-medium text-white text-sm">{title}</p>
                    <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
