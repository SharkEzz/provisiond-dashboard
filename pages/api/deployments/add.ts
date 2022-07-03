import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import DeploymentType from '../../../types/Deployment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }

  const deployment = req.body as DeploymentType;

  await fs.writeFile(
    `./data/deployments/deployment_${deployment.id}.json`,
    JSON.stringify(deployment),
  );

  res.status(200).json({ ok: true });
}
