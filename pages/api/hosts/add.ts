import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import slug from 'slug';
import HostType from '../../../types/Host';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const currentHosts = await fs.readFile('./data/hosts.json');
    const hosts = JSON.parse(currentHosts.toString()) as HostType[];

    const host = req.body as HostType;
    host.slug = slug(host.name);

    hosts.push(req.body as HostType);

    await fs.writeFile('./data/hosts.json', JSON.stringify(hosts), {
      encoding: 'utf-8',
    });

    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
}
