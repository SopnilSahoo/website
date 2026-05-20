'use client';

import React from 'react';
import { Check, Layers, LayoutTemplate, FileText, Eye } from 'lucide-react';
import { useAdGen } from './context';
import StepBrandAssets from './steps/StepBrandAssets';
import StepTemplate from './steps/StepTemplate';
import StepAdContent from './steps/StepAdContent';
import PreviewPanel from './editor/PreviewPanel';
import AdaptationGrid from './editor/AdaptationGrid';
import type { WizardStep } from '@/lib/ad-generator/types';

const STEPS: { step: WizardStep; label: string; icon: React.ReactNode; desc: string }[] = [
  { step: 1, label: 'Brand', icon: <Layers size={14} />, desc: 'Assets & colors' },
  { step: 2, label: 'Template', icon: <LayoutTemplate size={14} />, desc: 'Reference design' },
  { step: 3, label: 'Content', icon: <FileText size={14} />, desc: 'Copy & platform' },
  { step: 4, label: 'Review', icon: <Eye size={14} />, desc: 'Edit & export' },
];

export default function AdWizard() {
  const { state, goToStep } = useAdGen();
  const { wizardStep, project } = state;

  if (!project) return null;

  const hasAdaptations = Object.keys(project.adaptations).length > 0;

  return (
    <div className="min-h-screen bg-[#070711] flex flex-col">
      {/* Top Progress Bar */}
      <div className="bg-[#0d0d1a] border-b border-white/8 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-white/40">
              Project: <span className="text-white/70">{project.name}</span>
            </p>
            <p className="text-xs text-white/30">
              Step {wizardStep} of {STEPS.length}
            </p>
          </div>

          {/* Step indicators */}
          <div className="flex items-center gap-1">
            {STEPS.map(({ step, label, icon }, idx) => {
              const isDone = wizardStep > step;
              const isCurrent = wizardStep === step;
              const isClickable = wizardStep > step || (step <= 3) || (step === 4 && project.masterLayout);

              return (
                <React.Fragment key={step}>
                  <button
                    onClick={() => isClickable ? goToStep(step) : undefined}
                    disabled={!isClickable}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                      ${isCurrent ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : ''}
                      ${isDone ? 'text-emerald-400 hover:bg-emerald-500/10 cursor-pointer' : ''}
                      ${!isCurrent && !isDone ? 'text-white/25 cursor-default' : ''}
                    `}
                  >
                    {isDone ? <Check size={12} /> : icon}
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                  {idx < STEPS.length - 1 && (
                    <div className={`flex-1 h-px max-w-[60px] transition-colors ${isDone ? 'bg-emerald-500/40' : 'bg-white/8'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {wizardStep === 1 && <StepBrandAssets />}
          {wizardStep === 2 && <StepTemplate />}
          {wizardStep === 3 && <StepAdContent />}
          {wizardStep === 4 && (
            <div className="space-y-8">
              {project.masterLayout && (
                <>
                  <PreviewPanel />
                  {hasAdaptations && (
                    <div className="border-t border-white/8 pt-8">
                      <AdaptationGrid />
                    </div>
                  )}
                </>
              )}
              {!project.masterLayout && (
                <div className="flex flex-col items-center justify-center py-24">
                  <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-white/50">Generating your ad creative with Claude…</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
