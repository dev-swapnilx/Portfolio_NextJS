import { promises as fs } from 'fs';
import path from 'path';

export interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
}

// This function will be used in a server component
export async function getProjects(): Promise<Project[]> {
  const projectsDir = path.join(process.cwd(), 'data/projects');
  const fileNames = await fs.readdir(projectsDir);
  
  const projects = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.json'))
      .map(async (fileName) => {
        const filePath = path.join(projectsDir, fileName);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const id = fileName.replace(/\.json$/, '');
        const { name, url, description } = JSON.parse(fileContent);
        return { id, name, url, description };
      })
  );

  return projects;
}

// For client-side usage (if needed)
export async function importProjects(): Promise<Project[]> {
  const response = await fetch('/api/projects');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}
