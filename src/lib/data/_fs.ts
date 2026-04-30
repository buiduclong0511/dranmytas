import fs from 'node:fs';
import path from 'node:path';

export const DATA_DIR = path.join(process.cwd(), 'data');

export function readJson<T>(relPath: string, fallback?: T): T {
  const full = path.join(DATA_DIR, relPath);
  if (!fs.existsSync(full)) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Data file not found: ${relPath}`);
  }
  const raw = fs.readFileSync(full, 'utf8');
  return JSON.parse(raw) as T;
}

export function fileExists(relPath: string): boolean {
  return fs.existsSync(path.join(DATA_DIR, relPath));
}
