export type ElementType =
  | 'headline'
  | 'subheadline'
  | 'cta_button'
  | 'body_text'
  | 'offer_badge'
  | 'background_image'
  | 'background_shape'
  | 'logo'
  | 'product_image'
  | 'divider';

export type FontWeight = 'normal' | '500' | '600' | '700' | '800' | '900';
export type TextAlign = 'left' | 'center' | 'right';
export type ObjectFit = 'cover' | 'contain' | 'fill';
export type AdStyle = 'modern' | 'luxury' | 'minimal' | 'ecommerce' | 'startup' | 'performance';
export type Platform = 'meta' | 'google' | 'both';
export type Objective = 'lead_gen' | 'sales' | 'app_install' | 'awareness';

export interface GradientStop {
  color: string;
  position: number;
}

export interface BackgroundGradient {
  type: 'linear' | 'radial';
  angle?: number;
  stops: GradientStop[];
}

export interface CanvasBackground {
  color?: string;
  gradient?: BackgroundGradient;
  imageUrl?: string;
}

export interface CanvasElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  // Text properties
  text?: string;
  fontSize?: number;
  fontWeight?: FontWeight;
  fontFamily?: string;
  color?: string;
  textAlign?: TextAlign;
  letterSpacing?: number;
  lineHeight?: number;
  // Shape/container properties
  backgroundColor?: string;
  backgroundGradient?: BackgroundGradient;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  opacity?: number;
  // Image properties
  src?: string;
  objectFit?: ObjectFit;
  // Shadow
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  // Layer
  zIndex: number;
  visible?: boolean;
  // Padding (for CTA buttons, badges)
  paddingX?: number;
  paddingY?: number;
}

export interface CanvasLayout {
  canvas: {
    width: number;
    height: number;
    background: CanvasBackground;
  };
  elements: CanvasElement[];
  safeZone: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  style: AdStyle;
  hierarchyScore?: number;
}

export interface BrandAssets {
  brandName: string;
  logoDataUrl?: string;
  productImageDataUrls: string[];
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
}

export interface TemplateAnalysis {
  layoutStyle: string;
  typographyHierarchy: string;
  ctaPlacement: string;
  spacingPattern: string;
  visualBalance: string;
  styleDirection: string;
  dominantColors: string[];
  suggestedLayout: string;
}

export interface TemplateAsset {
  imageDataUrl?: string;
  analysis?: TemplateAnalysis;
}

export interface AdContent {
  headline: string;
  subheadline: string;
  cta: string;
  offer?: string;
  description?: string;
  platform: Platform;
  objective: Objective;
  style: AdStyle;
}

export interface EditRequest {
  type: 'resize_element' | 'change_color' | 'change_text' | 'reposition' | 'change_cta' | 'regenerate';
  elementId?: string;
  instruction: string;
}

export const AD_SIZES: Record<string, { name: string; width: number; height: number; platform: Platform }> = {
  meta_portrait: { name: 'Portrait (4:5)', width: 1080, height: 1350, platform: 'meta' },
  meta_square: { name: 'Square (1:1)', width: 1080, height: 1080, platform: 'meta' },
  meta_story: { name: 'Story (9:16)', width: 1080, height: 1920, platform: 'meta' },
  meta_landscape: { name: 'Landscape (1.91:1)', width: 1200, height: 628, platform: 'meta' },
  google_medium_rect: { name: 'Medium Rectangle', width: 300, height: 250, platform: 'google' },
  google_large_rect: { name: 'Large Rectangle', width: 336, height: 280, platform: 'google' },
  google_leaderboard: { name: 'Leaderboard', width: 728, height: 90, platform: 'google' },
  google_half_page: { name: 'Half Page', width: 300, height: 600, platform: 'google' },
  google_wide_sky: { name: 'Wide Skyscraper', width: 160, height: 600, platform: 'google' },
};

export interface AdaptationSet {
  [sizeKey: string]: CanvasLayout;
}

export interface AdProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  brandAssets: BrandAssets;
  templateAsset: TemplateAsset;
  adContent: AdContent;
  masterLayout?: CanvasLayout;
  adaptations: AdaptationSet;
  status: 'draft' | 'generating' | 'review' | 'adapting' | 'approved' | 'exported';
  currentStep: number;
}

export type WizardStep = 1 | 2 | 3 | 4;

export const STYLE_PRESETS: Record<AdStyle, {
  label: string;
  description: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
}> = {
  modern: {
    label: 'Modern',
    description: 'Clean lines, bold typography, high contrast',
    bgColor: '#0A0A0A',
    textColor: '#FFFFFF',
    accentColor: '#6366F1',
  },
  luxury: {
    label: 'Luxury',
    description: 'Elegant serif fonts, gold accents, premium feel',
    bgColor: '#1A1208',
    textColor: '#F5E6C8',
    accentColor: '#C9A84C',
  },
  minimal: {
    label: 'Minimal',
    description: 'Lots of white space, subtle tones, refined',
    bgColor: '#F8F8F8',
    textColor: '#1A1A1A',
    accentColor: '#2D2D2D',
  },
  ecommerce: {
    label: 'Ecommerce',
    description: 'Product-focused, bright CTAs, price prominence',
    bgColor: '#FFFFFF',
    textColor: '#1A1A2E',
    accentColor: '#FF6B35',
  },
  startup: {
    label: 'Startup',
    description: 'Gradient backgrounds, tech feel, dynamic layout',
    bgColor: '#0F0F23',
    textColor: '#FFFFFF',
    accentColor: '#00D9FF',
  },
  performance: {
    label: 'Performance',
    description: 'High-contrast, urgency-focused, direct response',
    bgColor: '#FF3B30',
    textColor: '#FFFFFF',
    accentColor: '#FFD60A',
  },
};
