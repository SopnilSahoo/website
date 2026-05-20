import type { AdProject } from './types';

const STORAGE_KEY = 'ad_generator_projects';

export function loadProjects(): AdProject[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveProject(project: AdProject): void {
  if (typeof window === 'undefined') return;
  const projects = loadProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = project;
  } else {
    projects.unshift(project);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadProject(id: string): AdProject | null {
  const projects = loadProjects();
  return projects.find((p) => p.id === id) ?? null;
}

export function deleteProject(id: string): void {
  if (typeof window === 'undefined') return;
  const projects = loadProjects().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}
