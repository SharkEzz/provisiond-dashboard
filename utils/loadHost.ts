import fs from 'fs/promises';
import type HostType from '../types/Host';

export default async function loadHost(id: string) {
  try {
    const fileContent = await fs.readFile(`./data/hosts.json`, 'utf8');

    const hosts = JSON.parse(fileContent);

    return hosts?.[id] as HostType | null;
  } catch {
    return null;
  }
}
