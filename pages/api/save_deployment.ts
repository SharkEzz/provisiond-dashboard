import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const deployment = req.body;

  await fs.writeFile(
    `./deployments/deployment_${deployment.id}.json`,
    JSON.stringify(deployment),
  );

  res.status(200).json({ saved: true });
}
