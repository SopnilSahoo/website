import type { Metadata } from 'next';
import ProjectEditor from './ProjectEditor';

export const metadata: Metadata = {
  title: 'Ad Creative Editor | Reach Digitally',
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return <ProjectEditor projectId={projectId} />;
}
