import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import HostType from '../../../../types/Host';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ ok: false });
    return;
  }

  const { slug } = req.query;
  const hosts = JSON.parse(
    await fs.readFile('./data/hosts.json', 'utf-8'),
  ) as HostType[];

  const filteredHosts = hosts.filter((i) => i.slug !== slug);

  await fs.writeFile('./data/hosts.json', JSON.stringify(filteredHosts));

  res.status(200).json({ ok: true });
}
