import Anthropic from '@anthropic-ai/sdk';
import { buildLayoutPrompt } from '@/lib/ad-generator/claude-prompts';
import { scoreHierarchy } from '@/lib/ad-generator/adaptation-engine';
import type { AdContent, BrandAssets, TemplateAnalysis, CanvasLayout } from '@/lib/ad-generator/types';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface GenerateLayoutRequest {
  width: number;
  height: number;
  brandAssets: BrandAssets;
  adContent: AdContent;
  templateAnalysis?: TemplateAnalysis;
  editInstruction?: string;
  existingLayout?: CanvasLayout;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body: GenerateLayoutRequest = await request.json();
    const { width, height, brandAssets, adContent, templateAnalysis, editInstruction, existingLayout } = body;

    if (!width || !height || !brandAssets || !adContent) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const prompt = buildLayoutPrompt({
      width,
      height,
      brandAssets,
      adContent,
      templateAnalysis,
      editInstruction,
      existingLayout,
    });

    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const rawText = message.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { type: 'text'; text: string }).text)
      .join('');

    // Extract JSON from response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json({ error: 'AI returned invalid JSON', raw: rawText }, { status: 422 });
    }

    const layout: CanvasLayout = JSON.parse(jsonMatch[0]);

    // Validate and score the layout
    if (!layout.canvas || !layout.elements) {
      return Response.json({ error: 'Invalid layout structure from AI' }, { status: 422 });
    }

    layout.hierarchyScore = scoreHierarchy(layout);

    // Ensure all elements have visible:true by default
    layout.elements = layout.elements.map((el) => ({
      ...el,
      visible: el.visible !== false,
    }));

    return Response.json({ layout, usage: message.usage });
  } catch (error: unknown) {
    console.error('Layout generation error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
