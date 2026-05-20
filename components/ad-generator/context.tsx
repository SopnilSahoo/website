'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type {
  AdProject,
  BrandAssets,
  TemplateAsset,
  AdContent,
  CanvasLayout,
  AdaptationSet,
  WizardStep,
} from '@/lib/ad-generator/types';
import { saveProject, loadProject } from '@/lib/ad-generator/storage';

interface AdGenState {
  project: AdProject | null;
  wizardStep: WizardStep;
  isGenerating: boolean;
  isAdapting: boolean;
  generationError: string | null;
  adaptationProgress: number;
}

type AdGenAction =
  | { type: 'INIT_PROJECT'; payload: AdProject }
  | { type: 'LOAD_PROJECT'; payload: AdProject }
  | { type: 'SET_STEP'; payload: WizardStep }
  | { type: 'UPDATE_BRAND_ASSETS'; payload: Partial<BrandAssets> }
  | { type: 'UPDATE_TEMPLATE'; payload: TemplateAsset }
  | { type: 'UPDATE_AD_CONTENT'; payload: Partial<AdContent> }
  | { type: 'SET_MASTER_LAYOUT'; payload: CanvasLayout }
  | { type: 'SET_ADAPTATIONS'; payload: AdaptationSet }
  | { type: 'SET_ADAPTATION'; payload: { key: string; layout: CanvasLayout } }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'SET_ADAPTING'; payload: boolean }
  | { type: 'SET_GENERATION_ERROR'; payload: string | null }
  | { type: 'SET_ADAPTATION_PROGRESS'; payload: number }
  | { type: 'SET_STATUS'; payload: AdProject['status'] }
  | { type: 'RESET' };

const defaultBrandAssets: BrandAssets = {
  brandName: '',
  logoDataUrl: undefined,
  productImageDataUrls: [],
  primaryColor: '#6366F1',
  secondaryColor: '#1A1A2E',
  accentColor: '#FFFFFF',
  fontFamily: 'Inter, sans-serif',
};

const defaultAdContent: AdContent = {
  headline: '',
  subheadline: '',
  cta: '',
  offer: '',
  description: '',
  platform: 'meta',
  objective: 'sales',
  style: 'modern',
};

function createNewProject(name: string): AdProject {
  return {
    id: uuidv4(),
    name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    brandAssets: { ...defaultBrandAssets },
    templateAsset: {},
    adContent: { ...defaultAdContent },
    adaptations: {},
    status: 'draft',
    currentStep: 1,
  };
}

function reducer(state: AdGenState, action: AdGenAction): AdGenState {
  switch (action.type) {
    case 'INIT_PROJECT':
    case 'LOAD_PROJECT':
      return {
        ...state,
        project: action.payload,
        wizardStep: (action.payload.currentStep as WizardStep) || 1,
        generationError: null,
      };

    case 'SET_STEP':
      if (!state.project) return state;
      return {
        ...state,
        wizardStep: action.payload,
        project: { ...state.project, currentStep: action.payload, updatedAt: new Date().toISOString() },
      };

    case 'UPDATE_BRAND_ASSETS':
      if (!state.project) return state;
      return {
        ...state,
        project: {
          ...state.project,
          brandAssets: { ...state.project.brandAssets, ...action.payload },
          updatedAt: new Date().toISOString(),
        },
      };

    case 'UPDATE_TEMPLATE':
      if (!state.project) return state;
      return {
        ...state,
        project: {
          ...state.project,
          templateAsset: { ...state.project.templateAsset, ...action.payload },
          updatedAt: new Date().toISOString(),
        },
      };

    case 'UPDATE_AD_CONTENT':
      if (!state.project) return state;
      return {
        ...state,
        project: {
          ...state.project,
          adContent: { ...state.project.adContent, ...action.payload },
          updatedAt: new Date().toISOString(),
        },
      };

    case 'SET_MASTER_LAYOUT':
      if (!state.project) return state;
      return {
        ...state,
        project: {
          ...state.project,
          masterLayout: action.payload,
          status: 'review',
          updatedAt: new Date().toISOString(),
        },
      };

    case 'SET_ADAPTATIONS':
      if (!state.project) return state;
      return {
        ...state,
        project: {
          ...state.project,
          adaptations: action.payload,
          status: 'approved',
          updatedAt: new Date().toISOString(),
        },
      };

    case 'SET_ADAPTATION':
      if (!state.project) return state;
      return {
        ...state,
        project: {
          ...state.project,
          adaptations: {
            ...state.project.adaptations,
            [action.payload.key]: action.payload.layout,
          },
          updatedAt: new Date().toISOString(),
        },
      };

    case 'SET_GENERATING':
      return { ...state, isGenerating: action.payload, generationError: action.payload ? null : state.generationError };

    case 'SET_ADAPTING':
      return { ...state, isAdapting: action.payload };

    case 'SET_GENERATION_ERROR':
      return { ...state, generationError: action.payload, isGenerating: false };

    case 'SET_ADAPTATION_PROGRESS':
      return { ...state, adaptationProgress: action.payload };

    case 'SET_STATUS':
      if (!state.project) return state;
      return {
        ...state,
        project: { ...state.project, status: action.payload, updatedAt: new Date().toISOString() },
      };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

const initialState: AdGenState = {
  project: null,
  wizardStep: 1,
  isGenerating: false,
  isAdapting: false,
  generationError: null,
  adaptationProgress: 0,
};

interface AdGenContextValue {
  state: AdGenState;
  initProject: (name: string) => void;
  loadProjectById: (id: string) => boolean;
  goToStep: (step: WizardStep) => void;
  updateBrandAssets: (assets: Partial<BrandAssets>) => void;
  updateTemplate: (template: TemplateAsset) => void;
  updateAdContent: (content: Partial<AdContent>) => void;
  generateMasterLayout: () => Promise<void>;
  requestEdit: (instruction: string) => Promise<void>;
  generateAdaptations: (sizes: string[]) => Promise<void>;
  setMasterLayout: (layout: CanvasLayout) => void;
  persistProject: () => void;
}

const AdGenContext = createContext<AdGenContextValue | null>(null);

export function AdGenProvider({ children, projectId }: { children: React.ReactNode; projectId?: string }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load existing project on mount
  useEffect(() => {
    if (projectId) {
      const project = loadProject(projectId);
      if (project) {
        dispatch({ type: 'LOAD_PROJECT', payload: project });
      }
    }
  }, [projectId]);

  // Auto-save on project changes
  useEffect(() => {
    if (state.project) {
      saveProject(state.project);
    }
  }, [state.project]);

  const initProject = useCallback((name: string) => {
    const project = createNewProject(name || 'Untitled Ad Creative');
    dispatch({ type: 'INIT_PROJECT', payload: project });
  }, []);

  const loadProjectById = useCallback((id: string): boolean => {
    const project = loadProject(id);
    if (project) {
      dispatch({ type: 'LOAD_PROJECT', payload: project });
      return true;
    }
    return false;
  }, []);

  const goToStep = useCallback((step: WizardStep) => {
    dispatch({ type: 'SET_STEP', payload: step });
  }, []);

  const updateBrandAssets = useCallback((assets: Partial<BrandAssets>) => {
    dispatch({ type: 'UPDATE_BRAND_ASSETS', payload: assets });
  }, []);

  const updateTemplate = useCallback((template: TemplateAsset) => {
    dispatch({ type: 'UPDATE_TEMPLATE', payload: template });
  }, []);

  const updateAdContent = useCallback((content: Partial<AdContent>) => {
    dispatch({ type: 'UPDATE_AD_CONTENT', payload: content });
  }, []);

  const setMasterLayout = useCallback((layout: CanvasLayout) => {
    dispatch({ type: 'SET_MASTER_LAYOUT', payload: layout });
  }, []);

  const persistProject = useCallback(() => {
    if (state.project) saveProject(state.project);
  }, [state.project]);

  const generateMasterLayout = useCallback(async () => {
    if (!state.project) return;

    dispatch({ type: 'SET_GENERATING', payload: true });
    dispatch({ type: 'SET_STATUS', payload: 'generating' });

    try {
      const res = await fetch('/api/ad-generator/generate-layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          width: 1080,
          height: 1350,
          brandAssets: state.project.brandAssets,
          adContent: state.project.adContent,
          templateAnalysis: state.project.templateAsset?.analysis,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Generation failed');
      }

      dispatch({ type: 'SET_MASTER_LAYOUT', payload: data.layout });
      dispatch({ type: 'SET_STEP', payload: 4 });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Layout generation failed';
      dispatch({ type: 'SET_GENERATION_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_GENERATING', payload: false });
    }
  }, [state.project]);

  const requestEdit = useCallback(async (instruction: string) => {
    if (!state.project?.masterLayout) return;

    dispatch({ type: 'SET_GENERATING', payload: true });

    try {
      const res = await fetch('/api/ad-generator/generate-layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          width: 1080,
          height: 1350,
          brandAssets: state.project.brandAssets,
          adContent: state.project.adContent,
          templateAnalysis: state.project.templateAsset?.analysis,
          editInstruction: instruction,
          existingLayout: state.project.masterLayout,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Edit failed');
      }

      dispatch({ type: 'SET_MASTER_LAYOUT', payload: data.layout });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Edit request failed';
      dispatch({ type: 'SET_GENERATION_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_GENERATING', payload: false });
    }
  }, [state.project]);

  const generateAdaptations = useCallback(async (targetSizes: string[]) => {
    if (!state.project?.masterLayout) return;

    dispatch({ type: 'SET_ADAPTING', payload: true });
    dispatch({ type: 'SET_ADAPTATION_PROGRESS', payload: 0 });
    dispatch({ type: 'SET_STATUS', payload: 'adapting' });

    try {
      const res = await fetch('/api/ad-generator/adapt-sizes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          masterLayout: state.project.masterLayout,
          adContent: state.project.adContent,
          targetSizes,
          useAI: true,
        }),
      });

      dispatch({ type: 'SET_ADAPTATION_PROGRESS', payload: 80 });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Adaptation failed');
      }

      dispatch({ type: 'SET_ADAPTATIONS', payload: data.adaptations });
      dispatch({ type: 'SET_ADAPTATION_PROGRESS', payload: 100 });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Adaptation failed';
      dispatch({ type: 'SET_GENERATION_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_ADAPTING', payload: false });
    }
  }, [state.project]);

  return (
    <AdGenContext.Provider
      value={{
        state,
        initProject,
        loadProjectById,
        goToStep,
        updateBrandAssets,
        updateTemplate,
        updateAdContent,
        generateMasterLayout,
        requestEdit,
        generateAdaptations,
        setMasterLayout,
        persistProject,
      }}
    >
      {children}
    </AdGenContext.Provider>
  );
}

export function useAdGen(): AdGenContextValue {
  const ctx = useContext(AdGenContext);
  if (!ctx) throw new Error('useAdGen must be used within AdGenProvider');
  return ctx;
}
