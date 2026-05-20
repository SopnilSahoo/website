'use client';

import React, { useState } from 'react';
import { Sparkles, ChevronLeft, ArrowRight, Layers } from 'lucide-react';
import { useAdGen } from '../context';
import DropZone from '../shared/DropZone';

export default function StepTemplate() {
  const { state, updateTemplate, goToStep } = useAdGen();
  const { templateAsset } = state.project!;
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const STYLE_DESCRIPTIONS = [
    { label: 'Modern', desc: 'Dark, bold, high-contrast', value: 'modern' },
    { label: 'Luxury', desc: 'Elegant, gold accents, premium', value: 'luxury' },
    { label: 'Minimal', desc: 'Clean, whitespace-focused', value: 'minimal' },
    { label: 'Ecommerce', desc: 'Product-forward, bright CTA', value: 'ecommerce' },
    { label: 'Startup', desc: 'Tech, gradient, dynamic', value: 'startup' },
    { label: 'Performance', desc: 'Urgent, high-energy, direct', value: 'performance' },
  ];

  async function analyzeTemplate(dataUrl: string) {
    setIsAnalyzing(true);
    updateTemplate({ imageDataUrl: dataUrl });

    // Mock analysis — in production this would call Claude's vision API
    await new Promise((r) => setTimeout(r, 1500));

    updateTemplate({
      imageDataUrl: dataUrl,
      analysis: {
        layoutStyle: 'Centered hero layout with product focal point',
        typographyHierarchy: 'Large bold headline, medium subheadline, small body',
        ctaPlacement: 'Lower center, prominent button',
        spacingPattern: 'Generous padding, balanced whitespace',
        visualBalance: 'symmetric',
        styleDirection: 'Modern and dynamic with strong visual hierarchy',
        dominantColors: ['#1A1A2E', '#FFFFFF', '#6366F1'],
        suggestedLayout: 'Bold headline at top, product image center, CTA at bottom with strong contrast',
      },
    });

    setIsAnalyzing(false);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Design Template</h2>
        <p className="text-white/50 mt-1">
          Upload an existing ad as inspiration. The AI will analyze its layout and style to inform your new creatives.
        </p>
      </div>

      {/* Upload */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-white/70">Reference Ad Template (optional)</label>
        {!templateAsset?.imageDataUrl ? (
          <DropZone
            onFile={(dataUrl) => analyzeTemplate(dataUrl)}
            label="Drop your reference ad image here"
            className="h-48"
          />
        ) : (
          <div className="relative">
            <div className="rounded-xl overflow-hidden border border-white/10 max-h-64 flex items-center justify-center bg-black/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={templateAsset.imageDataUrl}
                alt="Template"
                className="max-h-64 object-contain"
              />
            </div>
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/60 rounded-xl flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-white/70">Analyzing template with AI...</p>
              </div>
            )}
          </div>
        )}

        {templateAsset?.imageDataUrl && (
          <button
            onClick={() => updateTemplate({ imageDataUrl: undefined, analysis: undefined })}
            className="text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            Remove template
          </button>
        )}
      </div>

      {/* Analysis result */}
      {templateAsset?.analysis && (
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">AI Template Analysis</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { label: 'Layout', value: templateAsset.analysis.layoutStyle },
              { label: 'Typography', value: templateAsset.analysis.typographyHierarchy },
              { label: 'CTA', value: templateAsset.analysis.ctaPlacement },
              { label: 'Style', value: templateAsset.analysis.styleDirection },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 rounded-lg p-2">
                <p className="text-white/40">{label}</p>
                <p className="text-white/80 mt-0.5">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40">Dominant colors:</span>
            <div className="flex gap-1">
              {templateAsset.analysis.dominantColors.map((c) => (
                <div
                  key={c}
                  className="w-5 h-5 rounded-full border border-white/20"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skip option with style hint */}
      {!templateAsset?.imageDataUrl && (
        <div className="bg-white/3 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={14} className="text-white/50" />
            <span className="text-sm text-white/60">No template? You can choose a style preset in the next step instead.</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {STYLE_DESCRIPTIONS.map(({ label, desc }) => (
              <div key={label} className="bg-white/5 rounded-lg p-2">
                <p className="text-xs font-medium text-white/80">{label}</p>
                <p className="text-xs text-white/40 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button
          onClick={() => goToStep(1)}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white/70 font-medium rounded-xl transition-all flex items-center gap-2"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <button
          onClick={() => goToStep(3)}
          disabled={isAnalyzing}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
        >
          Next: Ad Content <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
