'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Download, PackageOpen, ChevronDown } from 'lucide-react';
import { useAdGen } from '../context';
import { AD_SIZES } from '@/lib/ad-generator/types';
import { exportCanvasAsPng } from './CanvasRenderer';
import type { CanvasLayout } from '@/lib/ad-generator/types';

const CanvasRenderer = dynamic(() => import('./CanvasRenderer'), {
  ssr: false,
  loading: () => <div className="bg-white/5 rounded-xl animate-pulse w-full aspect-square" />,
});

type ExportFormat = 'png' | 'jpg';

async function downloadBlob(blob: Blob, filename: string, format: ExportFormat) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.${format}`;
  a.click();
  URL.revokeObjectURL(url);
}

function getSizeDisplayScale(width: number, height: number): number {
  const MAX_DIM = 200;
  const scale = Math.min(MAX_DIM / width, MAX_DIM / height, 1);
  return Math.round(scale * 100) / 100;
}

interface AdaptationCardProps {
  sizeKey: string;
  layout: CanvasLayout;
  projectName: string;
}

function AdaptationCard({ sizeKey, layout, projectName }: AdaptationCardProps) {
  const [exporting, setExporting] = useState(false);
  const [format, setFormat] = useState<ExportFormat>('png');
  const [showFormatPicker, setShowFormatPicker] = useState(false);

  const sizeConfig = AD_SIZES[sizeKey];
  if (!sizeConfig) return null;

  const { width, height } = sizeConfig;
  const scale = getSizeDisplayScale(width, height);

  const handleExport = useCallback(async () => {
    setExporting(true);
    try {
      const blob = await exportCanvasAsPng(layout, 2); // 2x for quality
      await downloadBlob(blob, `${projectName}_${sizeKey}`, format);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExporting(false);
    }
  }, [layout, projectName, sizeKey, format]);

  const isLeaderboard = height <= 100;

  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 transition-all group">
      {/* Canvas Preview Area */}
      <div
        className="flex items-center justify-center bg-[#080808] border-b border-white/8 p-4"
        style={{ minHeight: isLeaderboard ? '80px' : '180px' }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
          <CanvasRenderer layout={layout} scale={1} />
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-white/80">{sizeConfig.name}</p>
            <p className="text-xs text-white/35 mt-0.5 font-mono">{width}×{height}</p>
            <span className={`text-xs px-1.5 py-0.5 rounded mt-1 inline-block
              ${sizeConfig.platform === 'meta' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}>
              {sizeConfig.platform}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Format picker */}
            <div className="relative">
              <button
                onClick={() => setShowFormatPicker((v) => !v)}
                className="text-xs px-2 py-1.5 bg-white/5 hover:bg-white/10 text-white/50 rounded-lg flex items-center gap-1 transition-colors"
              >
                {format.toUpperCase()} <ChevronDown size={10} />
              </button>
              {showFormatPicker && (
                <div className="absolute bottom-full mb-1 right-0 bg-[#1a1a2e] border border-white/10 rounded-lg overflow-hidden z-10">
                  {(['png', 'jpg'] as ExportFormat[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => { setFormat(f); setShowFormatPicker(false); }}
                      className={`w-full text-left text-xs px-3 py-2 hover:bg-white/10 transition-colors
                        ${format === f ? 'text-indigo-300' : 'text-white/60'}`}
                    >
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleExport}
              disabled={exporting}
              className="p-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-lg transition-colors"
              title={`Export ${width}×${height} as ${format.toUpperCase()}`}
            >
              {exporting ? (
                <div className="w-3.5 h-3.5 border border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Download size={14} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdaptationGrid() {
  const { state } = useAdGen();
  const [exportingAll, setExportingAll] = useState(false);

  const project = state.project;
  if (!project) return null;

  const adaptations = project.adaptations;
  const adaptationKeys = Object.keys(adaptations);

  if (adaptationKeys.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageOpen className="w-12 h-12 text-white/20 mb-4" />
        <p className="text-white/50 font-medium">No adaptations yet</p>
        <p className="text-white/30 text-sm mt-1">Go back to the preview and generate ad sizes</p>
      </div>
    );
  }

  const metaKeys = adaptationKeys.filter((k) => k.startsWith('meta_'));
  const googleKeys = adaptationKeys.filter((k) => k.startsWith('google_'));

  async function handleExportAll() {
    setExportingAll(true);
    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      await Promise.all(
        adaptationKeys.map(async (key) => {
          try {
            const blob = await exportCanvasAsPng(adaptations[key], 2);
            zip.file(`${project!.name}_${key}.png`, blob);
          } catch (err) {
            console.warn(`Export failed for ${key}:`, err);
          }
        })
      );

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project!.name}_all_sizes.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('ZIP export error:', err);
    } finally {
      setExportingAll(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white text-xl">All Ad Sizes</h3>
          <p className="text-white/40 text-sm mt-0.5">
            {adaptationKeys.length} creatives ready to export
          </p>
        </div>
        <button
          onClick={handleExportAll}
          disabled={exportingAll}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2"
        >
          {exportingAll ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Exporting…
            </>
          ) : (
            <>
              <PackageOpen size={15} /> Export All (ZIP)
            </>
          )}
        </button>
      </div>

      {/* Meta Group */}
      {metaKeys.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <h4 className="text-sm font-semibold text-white/70">Meta Ads</h4>
            <span className="text-xs text-white/30">{metaKeys.length} sizes</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {metaKeys.map((key) => (
              <AdaptationCard
                key={key}
                sizeKey={key}
                layout={adaptations[key]}
                projectName={project.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Google Group */}
      {googleKeys.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <h4 className="text-sm font-semibold text-white/70">Google Display Ads</h4>
            <span className="text-xs text-white/30">{googleKeys.length} sizes</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {googleKeys.map((key) => (
              <AdaptationCard
                key={key}
                sizeKey={key}
                layout={adaptations[key]}
                projectName={project.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
