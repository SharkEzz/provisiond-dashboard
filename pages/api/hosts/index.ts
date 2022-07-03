import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const hosts = await fs.readFile('./data/hosts.json', 'utf8');

    res.status(200).json({ hosts: JSON.parse(hosts) });
  } catch {
    res.status(500).json({ error: 'error while reading hosts file' });
  }
}
