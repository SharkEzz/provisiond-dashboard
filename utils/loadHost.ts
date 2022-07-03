import fs from 'fs/promises';
import type HostType from '../types/Host';

export default async function loadHost(slug: string) {
  try {
    const fileContent = await fs.readFile(`./data/hosts.json`, 'utf8');

    const hosts = JSON.parse(fileContent) as HostType[];

    let host: HostType | null = null;
    hosts.forEach((currentHost, index) => {
      if (!host && currentHost.slug === slug) {
        host = hosts[index];
      }
    });

    return host;
  } catch {
    return null;
  }
}
