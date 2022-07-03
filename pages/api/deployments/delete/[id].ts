import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ ok: false });
    return;
  }
  const { id } = req.query;

  await fs.rm(`./data/deployments/deployment_${id}.json`);

  res.status(200).json({ ok: true });
}
