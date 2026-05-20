import type { AdContent, BrandAssets, TemplateAnalysis, CanvasLayout, AdStyle } from './types';

const LAYOUT_JSON_SCHEMA = `{
  "canvas": {
    "width": number,
    "height": number,
    "background": {
      "color": string (hex),
      "gradient": { "type": "linear"|"radial", "angle": number, "stops": [{"color": string, "position": number}] }
    }
  },
  "elements": [
    {
      "id": string (unique, e.g. "headline_1"),
      "type": "headline"|"subheadline"|"cta_button"|"body_text"|"offer_badge"|"background_shape"|"divider",
      "x": number, "y": number, "width": number, "height": number,
      "text": string (for text elements),
      "fontSize": number, "fontWeight": "700"|"800"|"900"|"600"|"500"|"normal",
      "fontFamily": string,
      "color": string (hex),
      "textAlign": "left"|"center"|"right",
      "letterSpacing": number,
      "lineHeight": number,
      "backgroundColor": string (hex, for buttons/badges),
      "borderRadius": number,
      "opacity": number (0-1),
      "shadowColor": string, "shadowBlur": number, "shadowOffsetX": number, "shadowOffsetY": number,
      "zIndex": number
    }
  ],
  "safeZone": { "top": number, "right": number, "bottom": number, "left": number },
  "style": string,
  "hierarchyScore": number (1-100)
}`;

export function buildLayoutPrompt(params: {
  width: number;
  height: number;
  brandAssets: BrandAssets;
  adContent: AdContent;
  templateAnalysis?: TemplateAnalysis;
  editInstruction?: string;
  existingLayout?: CanvasLayout;
}): string {
  const { width, height, brandAssets, adContent, templateAnalysis, editInstruction, existingLayout } = params;
  const aspectRatio = (width / height).toFixed(2);

  const styleGuide = getStyleGuide(adContent.style);

  const baseContext = `You are an expert ad creative designer specializing in high-converting digital ads.

CANVAS: ${width}x${height}px (aspect ratio: ${aspectRatio})

BRAND:
- Name: ${brandAssets.brandName || 'Brand'}
- Primary color: ${brandAssets.primaryColor}
- Secondary color: ${brandAssets.secondaryColor}
- Accent color: ${brandAssets.accentColor}
- Font family: ${brandAssets.fontFamily || 'Inter, sans-serif'}

AD CONTENT:
- Headline: "${adContent.headline}"
- Subheadline: "${adContent.subheadline}"
- CTA: "${adContent.cta}"
${adContent.offer ? `- Offer/Promotion: "${adContent.offer}"` : ''}
${adContent.description ? `- Description: "${adContent.description}"` : ''}
- Platform: ${adContent.platform}
- Objective: ${adContent.objective}
- Style: ${adContent.style}

STYLE GUIDE (${adContent.style}):
${styleGuide}

DESIGN RULES:
1. Safe zone margins: minimum 48px from all edges (for ${adContent.platform === 'meta' ? 'Meta text overlays' : 'Google display borders'})
2. Visual hierarchy: headline (largest) → subheadline → offer badge → CTA button → body text
3. CTA button must be prominent: min 20% of canvas width, high contrast background
4. Headline font size: ${Math.round(width * 0.055)}–${Math.round(width * 0.08)}px
5. Subheadline: ${Math.round(width * 0.03)}–${Math.round(width * 0.045)}px
6. CTA text: ${Math.round(width * 0.025)}–${Math.round(width * 0.04)}px
7. All text must have sufficient contrast (WCAG AA minimum)
8. No element should overflow the canvas
9. Use the brand's primary/secondary/accent colors strategically`;

  if (editInstruction && existingLayout) {
    return `${baseContext}

EDIT REQUEST: "${editInstruction}"

CURRENT LAYOUT:
${JSON.stringify(existingLayout, null, 2)}

Apply ONLY the requested change. Keep all other elements identical.
Return the complete updated layout JSON.

${templateAnalysis ? `ORIGINAL TEMPLATE STYLE: ${templateAnalysis.styleDirection}` : ''}

Return ONLY valid JSON matching this exact schema (no markdown, no explanation):
${LAYOUT_JSON_SCHEMA}`;
  }

  return `${baseContext}
${templateAnalysis ? `
TEMPLATE ANALYSIS (match this design direction):
- Layout: ${templateAnalysis.layoutStyle}
- Typography hierarchy: ${templateAnalysis.typographyHierarchy}
- CTA placement: ${templateAnalysis.ctaPlacement}
- Spacing: ${templateAnalysis.spacingPattern}
- Visual balance: ${templateAnalysis.visualBalance}
- Style direction: ${templateAnalysis.styleDirection}
- Dominant colors to reference: ${templateAnalysis.dominantColors.join(', ')}
- Suggested layout: ${templateAnalysis.suggestedLayout}
` : ''}

TASK: Generate a complete, production-ready ad layout JSON for a ${width}x${height} ad.

Design decisions to make:
1. Background: solid color, gradient, or combination — must fit the ${adContent.style} aesthetic
2. Headline placement: typically upper 40% of canvas
3. Offer badge: if offer exists, make it visually pop (badge/pill shape)
4. CTA button: positioned in lower 30% of canvas, high contrast
5. Ensure the overall composition is balanced and visually compelling

Return ONLY valid JSON matching this exact schema (no markdown, no explanation):
${LAYOUT_JSON_SCHEMA}`;
}

export function buildAdaptationPrompt(params: {
  sourceLayout: CanvasLayout;
  targetWidth: number;
  targetHeight: number;
  targetSizeKey: string;
  adContent: AdContent;
}): string {
  const { sourceLayout, targetWidth, targetHeight, targetSizeKey, adContent } = params;
  const sourceWidth = sourceLayout.canvas.width;
  const sourceHeight = sourceLayout.canvas.height;
  const scaleX = targetWidth / sourceWidth;
  const scaleY = targetHeight / sourceHeight;
  const isWiderAspect = targetWidth / targetHeight > sourceWidth / sourceHeight;
  const isLeaderboard = targetHeight <= 100;
  const isMobileStory = targetHeight >= 1800;

  return `You are an expert responsive ad designer. Adapt this ${sourceWidth}x${sourceHeight} layout to ${targetWidth}x${targetHeight}.

SOURCE LAYOUT:
${JSON.stringify(sourceLayout, null, 2)}

TARGET: ${targetWidth}x${targetHeight} (${targetSizeKey})

ADAPTATION RULES:
1. Scale factor X: ${scaleX.toFixed(3)}, Y: ${scaleY.toFixed(3)}
2. Safe zone: ${Math.max(24, Math.round(targetWidth * 0.05))}px all sides
3. All elements must stay within canvas bounds
4. Maintain visual hierarchy: headline > subheadline > body > CTA
${isLeaderboard ? `5. LEADERBOARD LAYOUT: Horizontal flow. Left-align logo/headline, center key message, right-align CTA. Reduce font sizes significantly. Max font size: ${Math.round(targetHeight * 0.45)}px` : ''}
${isMobileStory ? `5. STORY LAYOUT: Vertical flow. Extra padding top/bottom. Elements spread vertically for scroll-stopping impact.` : ''}
${isWiderAspect ? '5. WIDER FORMAT: Reposition elements for horizontal flow where appropriate.' : ''}
6. CTA button must remain clearly visible and clickable
7. Adjust font sizes proportionally but ensure readability (min 11px for body, min 16px for headline)
8. Preserve brand colors and style aesthetic

Return ONLY valid JSON for the ${targetWidth}x${targetHeight} canvas (same schema as source):
{
  "canvas": { "width": ${targetWidth}, "height": ${targetHeight}, "background": {...} },
  "elements": [...],
  "safeZone": {...},
  "style": "${adContent.style}",
  "hierarchyScore": number
}

Return ONLY valid JSON, no explanation.`;
}

export function buildTemplateAnalysisPrompt(imageDescription: string): string {
  return `Analyze this ad template and extract its design characteristics.

Image: ${imageDescription}

Provide a JSON analysis:
{
  "layoutStyle": "describe the overall layout pattern",
  "typographyHierarchy": "describe text sizing and weight relationships",
  "ctaPlacement": "where the CTA is positioned",
  "spacingPattern": "describe the spacing and padding approach",
  "visualBalance": "symmetric|asymmetric|rule-of-thirds",
  "styleDirection": "describe the visual style and mood",
  "dominantColors": ["#hex1", "#hex2", "#hex3"],
  "suggestedLayout": "brief description of what makes this layout effective"
}

Return ONLY valid JSON.`;
}

function getStyleGuide(style: AdStyle): string {
  const guides: Record<AdStyle, string> = {
    modern: `- Background: very dark (#0A0A0A or deep navy) or high-contrast solid
- Headlines: white, extra-bold (800-900 weight), tight tracking
- Accent elements: vibrant purple/blue gradient (#6366F1 to #8B5CF6)
- CTA: bright gradient button, white text, medium border radius (8-12px)
- Overall: high contrast, geometric shapes, minimal decoration`,
    luxury: `- Background: deep black or rich dark brown, possibly with subtle texture overlay
- Headlines: cream/gold (#F5E6C8 or #C9A84C), serif or elegant sans-serif
- Accents: gold tones, thin divider lines, refined spacing
- CTA: gold or cream button, elegant with slight border radius (4-6px)
- Overall: understated elegance, generous whitespace, premium feel`,
    minimal: `- Background: near-white (#F8F8F8) or pure white
- Headlines: near-black (#1A1A1A), medium-bold weight, clean sans-serif
- Accents: single dark accent color, no gradients
- CTA: solid dark button, white text, subtle border radius (6px)
- Overall: abundant whitespace, typography-first, no unnecessary decoration`,
    ecommerce: `- Background: white or very light, product-forward
- Headlines: dark navy (#1A1A2E), bold, attention-grabbing
- Offer badge: bright red or orange (#FF6B35), white text, pill shape
- CTA: bright contrasting color (orange/red), white text, rounded (8px)
- Overall: price-forward, product benefit clarity, urgency elements`,
    startup: `- Background: deep dark with gradient overlay (navy to purple or teal)
- Headlines: white, bold, possibly with gradient text highlight
- Accent: electric blue/cyan (#00D9FF) or green highlights
- CTA: electric color button, dark text, modern border radius (8-16px)
- Overall: tech-forward, dynamic diagonals or gradients, growth messaging`,
    performance: `- Background: high-energy red (#FF3B30) or deep orange
- Headlines: white or bright yellow, maximum contrast, urgent
- Offer badge: yellow (#FFD60A), dark text, bold pill shape
- CTA: yellow/white button, dark text, rounded (6-8px)
- Overall: directional urgency, large bold numbers/percentages, action-first`,
  };
  return guides[style] || guides.modern;
}
