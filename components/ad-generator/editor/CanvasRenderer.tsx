'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import type { CanvasLayout, CanvasElement } from '@/lib/ad-generator/types';

interface CanvasRendererProps {
  layout: CanvasLayout;
  scale?: number;
  interactive?: boolean;
  onElementSelect?: (elementId: string | null) => void;
  onElementMove?: (elementId: string, x: number, y: number) => void;
  className?: string;
}

export default function CanvasRenderer({
  layout,
  scale = 1,
  interactive = false,
  onElementSelect,
  onElementMove,
  className = '',
}: CanvasRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<unknown>(null);
  const [fabricLoaded, setFabricLoaded] = useState(false);

  const { canvas: canvasConfig, elements } = layout;
  const displayWidth = Math.round(canvasConfig.width * scale);
  const displayHeight = Math.round(canvasConfig.height * scale);

  // Load Fabric.js dynamically (browser-only)
  useEffect(() => {
    let cancelled = false;
    import('fabric').then((mod) => {
      if (!cancelled) {
        // Store Fabric constructor reference
        (window as Window & { _fabricModule?: unknown })._fabricModule = mod;
        setFabricLoaded(true);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const renderLayout = useCallback(async () => {
    if (!canvasRef.current || !fabricLoaded) return;

    const fabricMod = (window as Window & { _fabricModule?: { Canvas: unknown; Rect: unknown; IText: unknown; Image: unknown; Group: unknown; FabricText: unknown } })._fabricModule;
    if (!fabricMod) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fabric = fabricMod as any;

    // Dispose existing canvas
    if (fabricRef.current) {
      try { (fabricRef.current as { dispose: () => void }).dispose(); } catch { /* ignore */ }
    }

    const fc = new fabric.Canvas(canvasRef.current, {
      width: displayWidth,
      height: displayHeight,
      selection: interactive,
      renderOnAddRemove: false,
    });

    fabricRef.current = fc;

    // Background
    const bg = layout.canvas.background;
    if (bg.gradient) {
      const grad = new fabric.Gradient({
        type: bg.gradient.type,
        coords: bg.gradient.type === 'linear'
          ? { x1: 0, y1: 0, x2: bg.gradient.angle === 90 ? displayWidth : 0, y2: bg.gradient.angle !== 90 ? displayHeight : 0 }
          : { x1: displayWidth / 2, y1: displayHeight / 2, r1: 0, x2: displayWidth / 2, y2: displayHeight / 2, r2: displayWidth / 2 },
        colorStops: bg.gradient.stops.map((s) => ({ color: s.color, offset: s.position })),
      });
      fc.backgroundColor = grad;
    } else {
      fc.backgroundColor = bg.color || '#FFFFFF';
    }

    // Sort by zIndex
    const sorted = [...elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

    for (const el of sorted) {
      if (el.visible === false) continue;
      await addElementToCanvas(fc, fabric, el, scale, interactive);
    }

    fc.renderAll();

    if (interactive) {
      fc.on('selection:created', (e: { selected: Array<{ id?: string }> }) => {
        const obj = e.selected?.[0];
        if (obj && onElementSelect) onElementSelect((obj as { id?: string }).id ?? null);
      });
      fc.on('selection:cleared', () => onElementSelect?.(null));
      fc.on('object:modified', (e: { target: { id?: string; left?: number; top?: number } }) => {
        const obj = e.target;
        if (obj && obj.id && onElementMove) {
          onElementMove(obj.id, Math.round((obj.left ?? 0) / scale), Math.round((obj.top ?? 0) / scale));
        }
      });
    }
  }, [layout, scale, interactive, fabricLoaded, displayWidth, displayHeight, elements, onElementSelect, onElementMove]);

  useEffect(() => {
    renderLayout();
    return () => {
      if (fabricRef.current) {
        try { (fabricRef.current as { dispose: () => void }).dispose(); } catch { /* ignore */ }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout, fabricLoaded, scale]);

  return (
    <div
      className={`overflow-hidden rounded-lg shadow-2xl ${className}`}
      style={{ width: displayWidth, height: displayHeight }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function addElementToCanvas(fc: any, fabric: any, el: CanvasElement, scale: number, interactive: boolean): Promise<void> {
  const sx = (v: number) => Math.round(v * scale);

  const baseOptions = {
    id: el.id,
    left: sx(el.x),
    top: sx(el.y),
    selectable: interactive,
    evented: interactive,
    opacity: el.opacity ?? 1,
  };

  try {
    switch (el.type) {
      case 'headline':
      case 'subheadline':
      case 'body_text': {
        const textObj = new fabric.FabricText(el.text || '', {
          ...baseOptions,
          width: sx(el.width),
          fontSize: sx(el.fontSize || 32),
          fontWeight: el.fontWeight || 'normal',
          fontFamily: el.fontFamily || 'Inter, Arial, sans-serif',
          fill: el.color || '#FFFFFF',
          textAlign: el.textAlign || 'left',
          charSpacing: (el.letterSpacing || 0) * 10,
          lineHeight: el.lineHeight || 1.2,
          shadow: el.shadowColor ? new fabric.Shadow({
            color: el.shadowColor,
            blur: sx(el.shadowBlur || 0),
            offsetX: sx(el.shadowOffsetX || 0),
            offsetY: sx(el.shadowOffsetY || 0),
          }) : undefined,
          lockMovementX: !interactive,
          lockMovementY: !interactive,
        });
        fc.add(textObj);
        break;
      }

      case 'cta_button': {
        const btnWidth = sx(el.width);
        const btnHeight = sx(el.height);
        const rect = new fabric.Rect({
          width: btnWidth,
          height: btnHeight,
          fill: el.backgroundColor || '#6366F1',
          rx: sx(el.borderRadius || 8),
          ry: sx(el.borderRadius || 8),
          stroke: el.borderColor,
          strokeWidth: el.borderWidth ? sx(el.borderWidth) : 0,
          shadow: el.shadowColor ? new fabric.Shadow({
            color: el.shadowColor,
            blur: sx(el.shadowBlur || 8),
            offsetX: 0,
            offsetY: sx(2),
          }) : undefined,
        });
        const text = new fabric.FabricText(el.text || 'Click Here', {
          fontSize: sx(el.fontSize || 18),
          fontWeight: el.fontWeight || '700',
          fontFamily: el.fontFamily || 'Inter, Arial, sans-serif',
          fill: el.color || '#FFFFFF',
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
          left: btnWidth / 2,
          top: btnHeight / 2,
        });
        const group = new fabric.Group([rect, text], {
          ...baseOptions,
          selectable: interactive,
        });
        fc.add(group);
        break;
      }

      case 'offer_badge': {
        const badgeW = sx(el.width);
        const badgeH = sx(el.height);
        const pill = new fabric.Rect({
          width: badgeW,
          height: badgeH,
          fill: el.backgroundColor || '#FFD60A',
          rx: badgeH / 2,
          ry: badgeH / 2,
        });
        const badgeText = new fabric.FabricText(el.text || '', {
          fontSize: sx(el.fontSize || 16),
          fontWeight: el.fontWeight || '700',
          fontFamily: el.fontFamily || 'Inter, Arial, sans-serif',
          fill: el.color || '#000000',
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
          left: badgeW / 2,
          top: badgeH / 2,
        });
        const group = new fabric.Group([pill, badgeText], {
          ...baseOptions,
          selectable: interactive,
        });
        fc.add(group);
        break;
      }

      case 'background_shape': {
        const shape = new fabric.Rect({
          ...baseOptions,
          width: sx(el.width),
          height: sx(el.height),
          fill: el.backgroundColor || 'transparent',
          rx: sx(el.borderRadius || 0),
          ry: sx(el.borderRadius || 0),
          stroke: el.borderColor,
          strokeWidth: el.borderWidth ? sx(el.borderWidth) : 0,
        });
        fc.add(shape);
        break;
      }

      case 'divider': {
        const line = new fabric.Line(
          [sx(el.x), sx(el.y), sx(el.x + el.width), sx(el.y + el.height)],
          {
            stroke: el.color || '#FFFFFF',
            strokeWidth: sx(el.height || 1),
            selectable: interactive,
            evented: interactive,
            opacity: el.opacity ?? 1,
          }
        );
        fc.add(line);
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.warn(`Failed to render element ${el.id}:`, err);
  }
}

export async function exportCanvasAsPng(layout: CanvasLayout, scale = 1): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = layout.canvas.width * scale;
    offscreenCanvas.height = layout.canvas.height * scale;

    import('fabric').then((fabric) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fc = new (fabric as any).Canvas(offscreenCanvas, {
        width: layout.canvas.width * scale,
        height: layout.canvas.height * scale,
        renderOnAddRemove: false,
      });

      const bg = layout.canvas.background;
      fc.backgroundColor = bg.color || '#FFFFFF';

      const sorted = [...layout.elements]
        .filter((e) => e.visible !== false)
        .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

      Promise.all(sorted.map((el) => addElementToCanvas(fc, fabric, el, scale, false)))
        .then(() => {
          fc.renderAll();
          offscreenCanvas.toBlob((blob) => {
            fc.dispose();
            if (blob) resolve(blob);
            else reject(new Error('Canvas export returned null'));
          }, 'image/png');
        })
        .catch(reject);
    }).catch(reject);
  });
}
