'use client';

import React from 'react';
import { Palette, Type, Image as ImageIcon, Plus, X } from 'lucide-react';
import { useAdGen } from '../context';
import DropZone from '../shared/DropZone';

const FONT_OPTIONS = [
  'Inter, sans-serif',
  'Roboto, sans-serif',
  'Poppins, sans-serif',
  'Montserrat, sans-serif',
  'Playfair Display, serif',
  'DM Sans, sans-serif',
  'Space Grotesk, sans-serif',
  'Outfit, sans-serif',
];

export default function StepBrandAssets() {
  const { state, updateBrandAssets, goToStep } = useAdGen();
  const { brandAssets } = state.project!;

  function handleProductImageAdd(dataUrl: string) {
    updateBrandAssets({
      productImageDataUrls: [...brandAssets.productImageDataUrls, dataUrl],
    });
  }

  function handleProductImageRemove(idx: number) {
    const updated = brandAssets.productImageDataUrls.filter((_, i) => i !== idx);
    updateBrandAssets({ productImageDataUrls: updated });
  }

  const canProceed = brandAssets.brandName.trim().length > 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Brand Assets</h2>
        <p className="text-white/50 mt-1">Upload your brand identity elements to personalize the ad creatives.</p>
      </div>

      {/* Brand Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70 flex items-center gap-2">
          <Type size={14} /> Brand Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={brandAssets.brandName}
          onChange={(e) => updateBrandAssets({ brandName: e.target.value })}
          placeholder="e.g. Reach Digitally"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
        />
      </div>

      {/* Logo */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70 flex items-center gap-2">
          <ImageIcon size={14} /> Logo
        </label>
        <DropZone
          onFile={(dataUrl) => updateBrandAssets({ logoDataUrl: dataUrl })}
          onRemove={() => updateBrandAssets({ logoDataUrl: undefined })}
          preview={brandAssets.logoDataUrl}
          label="Drop your logo (PNG/SVG recommended)"
          className="h-32"
        />
      </div>

      {/* Product Images */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70 flex items-center gap-2">
          <ImageIcon size={14} /> Product Images
        </label>
        <div className="grid grid-cols-3 gap-3">
          {brandAssets.productImageDataUrls.map((url, idx) => (
            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={() => handleProductImageRemove(idx)}
                className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5 hover:bg-black transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {brandAssets.productImageDataUrls.length < 5 && (
            <DropZone
              onFile={(dataUrl) => handleProductImageAdd(dataUrl)}
              label=""
              className="aspect-square"
            />
          )}
        </div>
        <p className="text-xs text-white/30">Up to 5 product images (used as references for AI layout)</p>
      </div>

      {/* Brand Colors */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70 flex items-center gap-2">
          <Palette size={14} /> Brand Colors
        </label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { key: 'primaryColor' as const, label: 'Primary' },
            { key: 'secondaryColor' as const, label: 'Secondary' },
            { key: 'accentColor' as const, label: 'Accent' },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-1">
              <p className="text-xs text-white/50">{label}</p>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2">
                <input
                  type="color"
                  value={brandAssets[key]}
                  onChange={(e) => updateBrandAssets({ [key]: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <input
                  type="text"
                  value={brandAssets[key]}
                  onChange={(e) => {
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                      updateBrandAssets({ [key]: e.target.value });
                    }
                  }}
                  className="flex-1 bg-transparent text-sm text-white/80 font-mono focus:outline-none"
                  maxLength={7}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Font */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70 flex items-center gap-2">
          <Type size={14} /> Font Family
        </label>
        <select
          value={brandAssets.fontFamily}
          onChange={(e) => updateBrandAssets({ fontFamily: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f} value={f} className="bg-[#111]">
              {f.split(',')[0]}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => goToStep(2)}
          disabled={!canProceed}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2"
        >
          Next: Template <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
