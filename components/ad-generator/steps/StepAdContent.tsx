'use client';

import React from 'react';
import { Sparkles, ChevronLeft, Zap, Target, TrendingUp, Users, ShoppingBag, AppWindow } from 'lucide-react';
import { useAdGen } from '../context';
import type { Platform, Objective, AdStyle } from '@/lib/ad-generator/types';
import { STYLE_PRESETS } from '@/lib/ad-generator/types';

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: 'meta', label: 'Meta (Facebook/Instagram)' },
  { value: 'google', label: 'Google Display' },
  { value: 'both', label: 'Both Platforms' },
];

const OBJECTIVES: { value: Objective; label: string; icon: React.ReactNode }[] = [
  { value: 'sales', label: 'Sales / Conversion', icon: <ShoppingBag size={14} /> },
  { value: 'lead_gen', label: 'Lead Generation', icon: <Target size={14} /> },
  { value: 'awareness', label: 'Brand Awareness', icon: <TrendingUp size={14} /> },
  { value: 'app_install', label: 'App Install', icon: <AppWindow size={14} /> },
];

export default function StepAdContent() {
  const { state, updateAdContent, generateMasterLayout, goToStep } = useAdGen();
  const { adContent } = state.project!;
  const { isGenerating, generationError } = state;

  const canGenerate =
    adContent.headline.trim().length > 0 &&
    adContent.subheadline.trim().length > 0 &&
    adContent.cta.trim().length > 0;

  async function handleGenerate() {
    await generateMasterLayout();
  }

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-2xl font-bold text-white">Ad Content</h2>
        <p className="text-white/50 mt-1">Enter your ad copy and targeting details. Claude will craft the perfect layout.</p>
      </div>

      {/* Headline */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">
          Headline <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={adContent.headline}
          onChange={(e) => updateAdContent({ headline: e.target.value })}
          placeholder="e.g. Boost Your ROAS by 300%"
          maxLength={60}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-all"
        />
        <p className="text-xs text-white/30 text-right">{adContent.headline.length}/60</p>
      </div>

      {/* Subheadline */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">
          Subheadline <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={adContent.subheadline}
          onChange={(e) => updateAdContent({ subheadline: e.target.value })}
          placeholder="e.g. AI-Powered Performance Marketing for Growing Brands"
          maxLength={90}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-all"
        />
      </div>

      {/* CTA */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">
          Call to Action <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={adContent.cta}
          onChange={(e) => updateAdContent({ cta: e.target.value })}
          placeholder="e.g. Get Free Audit →"
          maxLength={30}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-all"
        />
      </div>

      {/* Offer + Description */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Offer / Promotion</label>
          <input
            type="text"
            value={adContent.offer || ''}
            onChange={(e) => updateAdContent({ offer: e.target.value })}
            placeholder="e.g. 30% OFF Today Only"
            maxLength={40}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Short Description</label>
          <input
            type="text"
            value={adContent.description || ''}
            onChange={(e) => updateAdContent({ description: e.target.value })}
            placeholder="e.g. No contracts. Cancel anytime."
            maxLength={80}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Platform */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">Target Platform</label>
        <div className="grid grid-cols-3 gap-2">
          {PLATFORMS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateAdContent({ platform: value })}
              className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all border
                ${adContent.platform === value
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Objective */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">Campaign Objective</label>
        <div className="grid grid-cols-2 gap-2">
          {OBJECTIVES.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => updateAdContent({ objective: value })}
              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border flex items-center gap-2
                ${adContent.objective === value
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80'
                }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Style Preset */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-white/70">Creative Style</label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.entries(STYLE_PRESETS) as [AdStyle, typeof STYLE_PRESETS[AdStyle]][]).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => updateAdContent({ style: key })}
              className={`relative p-3 rounded-xl text-left transition-all border
                ${adContent.style === key
                  ? 'border-indigo-500 ring-1 ring-indigo-500/50'
                  : 'border-white/10 hover:border-white/30'
                }`}
              style={{
                background: adContent.style === key
                  ? `linear-gradient(135deg, ${preset.bgColor}dd, ${preset.bgColor})`
                  : `${preset.bgColor}66`,
              }}
            >
              <div
                className="w-4 h-4 rounded-full mb-2"
                style={{ backgroundColor: preset.accentColor }}
              />
              <p className="text-xs font-semibold text-white">{preset.label}</p>
              <p className="text-xs text-white/50 mt-0.5 leading-tight">{preset.description}</p>
              {adContent.style === key && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {generationError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-300">
          <strong>Generation failed:</strong> {generationError}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button
          onClick={() => goToStep(2)}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white/70 font-medium rounded-xl transition-all flex items-center gap-2"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <button
          onClick={handleGenerate}
          disabled={!canGenerate || isGenerating}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Generating with Claude...
            </>
          ) : (
            <>
              <Sparkles size={16} /> Generate Ad Creative
            </>
          )}
        </button>
      </div>
    </div>
  );
}
