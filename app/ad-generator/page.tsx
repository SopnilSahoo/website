import type { Metadata } from 'next';
import Dashboard from '@/components/ad-generator/Dashboard';

export const metadata: Metadata = {
  title: 'AI Ad Creative Generator | Reach Digitally',
  description: 'Generate high-converting ad creatives for Meta and Google using AI. Upload brand assets, enter copy, and get pixel-perfect ad layouts in minutes.',
};

export default function AdGeneratorPage() {
  return <Dashboard />;
}
