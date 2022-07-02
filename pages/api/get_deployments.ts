import type { NextApiRequest, NextApiResponse } from 'next';
import loadDeployments from '../../utils/loadDeployments';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const deployments = await loadDeployments();

  res.status(200).json({ deployments });
}
