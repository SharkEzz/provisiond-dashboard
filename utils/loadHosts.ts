import fs from 'fs/promises';
import type HostType from '../types/Host';

export default async function loadHosts() {
  try {
    const fileContent = await fs.readFile(`./data/hosts.json`, 'utf8');

    return JSON.parse(fileContent) as HostType[];
  } catch {
    return null;
  }
}
