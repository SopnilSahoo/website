import Anthropic from '@anthropic-ai/sdk';
import { buildAdaptationPrompt } from '@/lib/ad-generator/claude-prompts';
import { adaptLayoutToSize, scoreHierarchy } from '@/lib/ad-generator/adaptation-engine';
import { AD_SIZES } from '@/lib/ad-generator/types';
import type { CanvasLayout, AdContent, AdaptationSet } from '@/lib/ad-generator/types';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface AdaptSizesRequest {
  masterLayout: CanvasLayout;
  adContent: AdContent;
  targetSizes: string[];
  useAI?: boolean;
}

async function adaptWithAI(
  sourceLayout: CanvasLayout,
  targetWidth: number,
  targetHeight: number,
  targetSizeKey: string,
  adContent: AdContent
): Promise<CanvasLayout> {
  const prompt = buildAdaptationPrompt({ sourceLayout, targetWidth, targetHeight, targetSizeKey, adContent });

  const message = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 3000,
    messages: [{ role: 'user', content: prompt }],
  });

  const rawText = message.content
    .filter((b) => b.type === 'text')
    .map((b) => (b as { type: 'text'; text: string }).text)
    .join('');

  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI returned invalid JSON for adaptation');

  const layout: CanvasLayout = JSON.parse(jsonMatch[0]);
  layout.hierarchyScore = scoreHierarchy(layout);
  return layout;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body: AdaptSizesRequest = await request.json();
    const { masterLayout, adContent, targetSizes, useAI = true } = body;

    if (!masterLayout || !adContent || !targetSizes?.length) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const adaptations: AdaptationSet = {};
    const errors: Record<string, string> = {};

    await Promise.allSettled(
      targetSizes.map(async (sizeKey) => {
        const sizeConfig = AD_SIZES[sizeKey];
        if (!sizeConfig) {
          errors[sizeKey] = 'Unknown size key';
          return;
        }

        try {
          if (useAI) {
            adaptations[sizeKey] = await adaptWithAI(
              masterLayout,
              sizeConfig.width,
              sizeConfig.height,
              sizeKey,
              adContent
            );
          } else {
            adaptations[sizeKey] = adaptLayoutToSize(
              masterLayout,
              sizeConfig.width,
              sizeConfig.height,
              adContent
            );
          }
        } catch (err) {
          console.error(`Adaptation error for ${sizeKey}:`, err);
          // Fallback to algorithmic adaptation
          adaptations[sizeKey] = adaptLayoutToSize(
            masterLayout,
            sizeConfig.width,
            sizeConfig.height,
            adContent
          );
        }
      })
    );

    return Response.json({ adaptations, errors });
  } catch (error: unknown) {
    console.error('Adapt sizes error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
