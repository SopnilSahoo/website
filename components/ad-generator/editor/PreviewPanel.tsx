'use client';

import React, { useState, useCallback } from 'react';
import { CheckCircle, RefreshCw, MessageSquarePlus, ZapIcon, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useAdGen } from '../context';

const CanvasRenderer = dynamic(() => import('./CanvasRenderer'), {
  ssr: false,
  loading: () => <CanvasPlaceholder />,
});

function CanvasPlaceholder() {
  return (
    <div className="w-full aspect-[4/5] max-h-[600px] bg-white/5 rounded-2xl animate-pulse flex items-center justify-center">
      <p className="text-white/30 text-sm">Loading canvas…</p>
    </div>
  );
}

const EDIT_SUGGESTIONS = [
  'Make the headline larger and bolder',
  'Move the CTA button to the bottom center',
  'Add more whitespace around elements',
  'Make the background darker with a gradient',
  'Increase CTA button size and contrast',
  'Change the color scheme to match brand colors better',
  'Add a subtle shadow to the headline',
  'Make the offer badge more prominent',
];

const HIERARCHY_LABELS: Record<number, { label: string; color: string }> = {
  90: { label: 'Excellent', color: 'text-emerald-400' },
  75: { label: 'Good', color: 'text-green-400' },
  60: { label: 'Fair', color: 'text-yellow-400' },
  0: { label: 'Needs Work', color: 'text-red-400' },
};

function getHierarchyLabel(score: number) {
  const threshold = Object.keys(HIERARCHY_LABELS)
    .map(Number)
    .sort((a, b) => b - a)
    .find((t) => score >= t);
  return HIERARCHY_LABELS[threshold ?? 0];
}

export default function PreviewPanel() {
  const { state, requestEdit, generateAdaptations, goToStep } = useAdGen();
  const [editText, setEditText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([
    'meta_portrait', 'meta_square', 'meta_story', 'meta_landscape',
  ]);

  const { project, isGenerating, isAdapting, generationError, adaptationProgress } = state;
  const layout = project?.masterLayout;

  const handleEdit = useCallback(async () => {
    if (!editText.trim()) return;
    await requestEdit(editText);
    setEditText('');
  }, [editText, requestEdit]);

  const handleAdapt = useCallback(async () => {
    await generateAdaptations(selectedSizes);
    goToStep(4);
  }, [generateAdaptations, goToStep, selectedSizes]);

  const toggleSize = (key: string) => {
    setSelectedSizes((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const ALL_SIZES = {
    meta: [
      { key: 'meta_portrait', label: 'Portrait (1080×1350)' },
      { key: 'meta_square', label: 'Square (1080×1080)' },
      { key: 'meta_story', label: 'Story (1080×1920)' },
      { key: 'meta_landscape', label: 'Landscape (1200×628)' },
    ],
    google: [
      { key: 'google_medium_rect', label: 'Med Rectangle (300×250)' },
      { key: 'google_large_rect', label: 'Lg Rectangle (336×280)' },
      { key: 'google_leaderboard', label: 'Leaderboard (728×90)' },
      { key: 'google_half_page', label: 'Half Page (300×600)' },
      { key: 'google_wide_sky', label: 'Wide Skyscraper (160×600)' },
    ],
  };

  const hierarchyInfo = layout?.hierarchyScore ? getHierarchyLabel(layout.hierarchyScore) : null;

  if (!layout) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 h-full">
      {/* Canvas Preview */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 self-stretch">
          <div className="flex-1">
            <h3 className="font-semibold text-white">Master Creative — 1080×1350</h3>
            <p className="text-xs text-white/40">Portrait format (Meta default)</p>
          </div>
          {hierarchyInfo && (
            <div className="flex items-center gap-1.5 bg-white/5 rounded-lg px-3 py-1.5">
              <Layers size={12} className={hierarchyInfo.color} />
              <span className={`text-xs font-medium ${hierarchyInfo.color}`}>
                {layout.hierarchyScore}% — {hierarchyInfo.label}
              </span>
            </div>
          )}
        </div>

        <div className="w-full flex justify-center">
          <CanvasRenderer
            layout={layout}
            scale={0.35}
            interactive={false}
          />
        </div>

        {/* Approve & Adapt */}
        <div className="self-stretch space-y-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/50">Select sizes to generate</label>

            {(['meta', 'google'] as const).map((platform) => (
              <div key={platform}>
                <p className="text-xs text-white/40 mb-1.5 uppercase tracking-wider">
                  {platform === 'meta' ? 'Meta' : 'Google Display'}
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {ALL_SIZES[platform].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => toggleSize(key)}
                      className={`text-xs py-1.5 px-2.5 rounded-lg border transition-all text-left
                        ${selectedSizes.includes(key)
                          ? 'bg-indigo-600/30 border-indigo-500/60 text-indigo-200'
                          : 'bg-white/3 border-white/10 text-white/50 hover:bg-white/8'
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAdapt}
            disabled={isAdapting || selectedSizes.length === 0}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isAdapting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Generating {selectedSizes.length} sizes… {adaptationProgress > 0 ? `${adaptationProgress}%` : ''}
              </>
            ) : (
              <>
                <ZapIcon size={16} /> Generate {selectedSizes.length} Ad Sizes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Edit Panel */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-white">Edit & Refine</h3>
          <p className="text-xs text-white/40 mt-0.5">Describe what to change — Claude will update the layout</p>
        </div>

        {generationError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs text-red-300">
            {generationError}
          </div>
        )}

        {/* AI Edit Input */}
        <div className="space-y-2">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="e.g. Make the headline 20% larger and move the CTA button to the bottom center…"
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-all resize-none"
          />
          <button
            onClick={handleEdit}
            disabled={!editText.trim() || isGenerating}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Updating…
              </>
            ) : (
              <>
                <MessageSquarePlus size={14} /> Apply Edit
              </>
            )}
          </button>
        </div>

        {/* Quick Suggestions */}
        <div>
          <button
            onClick={() => setShowSuggestions((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            <RefreshCw size={11} />
            Quick suggestions
            {showSuggestions ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>
          {showSuggestions && (
            <div className="mt-2 space-y-1">
              {EDIT_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setEditText(s); setShowSuggestions(false); }}
                  className="w-full text-left text-xs px-3 py-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/80 rounded-lg transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Layout Summary */}
        <div className="bg-white/3 border border-white/8 rounded-xl p-4 space-y-3">
          <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">Layout Summary</p>
          <div className="space-y-2">
            {layout.elements.filter((e) => e.visible !== false).map((el) => (
              <div key={el.id} className="flex items-center gap-2 text-xs">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: el.color || el.backgroundColor || '#6366F1' }}
                />
                <span className="text-white/50 capitalize">{el.type.replace('_', ' ')}</span>
                {el.text && (
                  <span className="text-white/30 truncate ml-auto max-w-[120px]">{el.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Approve */}
        <button
          onClick={handleAdapt}
          disabled={isAdapting || selectedSizes.length === 0}
          className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-medium rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle size={15} /> Approve & Generate Sizes
        </button>
      </div>
    </div>
  );
}
