import type { CanvasLayout, CanvasElement, AdContent } from './types';

export function adaptLayoutToSize(
  sourceLayout: CanvasLayout,
  targetWidth: number,
  targetHeight: number,
  adContent: AdContent
): CanvasLayout {
  const { canvas, elements, style } = sourceLayout;
  const scaleX = targetWidth / canvas.width;
  const scaleY = targetHeight / canvas.height;
  const isLeaderboard = targetHeight <= 100;
  const safeMargin = isLeaderboard ? 8 : Math.max(24, Math.round(targetWidth * 0.044));

  const adaptedElements: CanvasElement[] = elements.map((el) => {
    return adaptElement(el, scaleX, scaleY, targetWidth, targetHeight, safeMargin, isLeaderboard);
  });

  const clampedElements = adaptedElements.map((el) => clampToCanvas(el, targetWidth, targetHeight, safeMargin));

  return {
    canvas: {
      width: targetWidth,
      height: targetHeight,
      background: sourceLayout.canvas.background,
    },
    elements: clampedElements,
    safeZone: {
      top: safeMargin,
      right: safeMargin,
      bottom: safeMargin,
      left: safeMargin,
    },
    style,
    hierarchyScore: sourceLayout.hierarchyScore,
  };
}

function adaptElement(
  el: CanvasElement,
  scaleX: number,
  scaleY: number,
  targetWidth: number,
  targetHeight: number,
  safeMargin: number,
  isLeaderboard: boolean
): CanvasElement {
  const adapted = { ...el };

  if (isLeaderboard) {
    return adaptForLeaderboard(el, targetWidth, targetHeight, safeMargin);
  }

  // Scale position proportionally
  adapted.x = Math.round(el.x * scaleX);
  adapted.y = Math.round(el.y * scaleY);
  adapted.width = Math.round(el.width * scaleX);
  adapted.height = Math.round(el.height * scaleY);

  // Scale font sizes with minimum constraints
  if (el.fontSize) {
    const rawScale = Math.min(scaleX, scaleY);
    const minFontSize = getMinFontSize(el.type);
    adapted.fontSize = Math.max(minFontSize, Math.round(el.fontSize * rawScale));
  }

  return adapted;
}

function adaptForLeaderboard(
  el: CanvasElement,
  targetWidth: number,
  targetHeight: number,
  safeMargin: number
): CanvasElement {
  const adapted = { ...el };
  const usableHeight = targetHeight - safeMargin * 2;

  // In leaderboard, distribute elements horizontally
  switch (el.type) {
    case 'headline':
      adapted.x = safeMargin + Math.round(targetWidth * 0.02);
      adapted.y = safeMargin;
      adapted.width = Math.round(targetWidth * 0.35);
      adapted.height = usableHeight;
      adapted.fontSize = Math.min(Math.round(usableHeight * 0.55), 28);
      adapted.textAlign = 'left';
      break;
    case 'subheadline':
      adapted.x = Math.round(targetWidth * 0.38);
      adapted.y = safeMargin;
      adapted.width = Math.round(targetWidth * 0.3);
      adapted.height = usableHeight;
      adapted.fontSize = Math.min(Math.round(usableHeight * 0.38), 18);
      adapted.textAlign = 'center';
      break;
    case 'cta_button':
      adapted.width = Math.round(targetWidth * 0.18);
      adapted.height = Math.min(usableHeight, Math.round(usableHeight * 0.7));
      adapted.x = targetWidth - safeMargin - adapted.width;
      adapted.y = Math.round((targetHeight - adapted.height) / 2);
      adapted.fontSize = Math.min(Math.round(usableHeight * 0.3), 14);
      break;
    case 'offer_badge':
      adapted.x = Math.round(targetWidth * 0.68);
      adapted.y = safeMargin;
      adapted.width = Math.round(targetWidth * 0.1);
      adapted.height = usableHeight;
      adapted.fontSize = Math.min(Math.round(usableHeight * 0.32), 14);
      break;
    default:
      // Hide body text and decorative elements in leaderboard
      adapted.visible = false;
      adapted.x = 0;
      adapted.y = 0;
      adapted.width = 1;
      adapted.height = 1;
  }

  return adapted;
}

function clampToCanvas(
  el: CanvasElement,
  canvasWidth: number,
  canvasHeight: number,
  safeMargin: number
): CanvasElement {
  const clamped = { ...el };

  // Ensure element stays within canvas
  clamped.x = Math.max(0, Math.min(clamped.x, canvasWidth - clamped.width));
  clamped.y = Math.max(0, Math.min(clamped.y, canvasHeight - clamped.height));
  clamped.width = Math.min(clamped.width, canvasWidth - clamped.x);
  clamped.height = Math.min(clamped.height, canvasHeight - clamped.y);

  return clamped;
}

function getMinFontSize(type: CanvasElement['type']): number {
  switch (type) {
    case 'headline': return 16;
    case 'subheadline': return 12;
    case 'cta_button': return 11;
    case 'body_text': return 10;
    case 'offer_badge': return 10;
    default: return 8;
  }
}

export function scoreHierarchy(layout: CanvasLayout): number {
  const elements = layout.elements.filter((e) => e.visible !== false);
  let score = 100;

  const headline = elements.find((e) => e.type === 'headline');
  const subheadline = elements.find((e) => e.type === 'subheadline');
  const cta = elements.find((e) => e.type === 'cta_button');

  // Headline must be largest text
  if (headline && subheadline) {
    if ((headline.fontSize ?? 0) <= (subheadline.fontSize ?? 0)) score -= 20;
  }

  // CTA must exist
  if (!cta) score -= 25;

  // Check safe zone compliance
  const safe = layout.safeZone;
  elements.forEach((el) => {
    if (el.x < safe.left) score -= 3;
    if (el.y < safe.top) score -= 3;
    if (el.x + el.width > layout.canvas.width - safe.right) score -= 3;
    if (el.y + el.height > layout.canvas.height - safe.bottom) score -= 3;
  });

  return Math.max(0, Math.min(100, score));
}
