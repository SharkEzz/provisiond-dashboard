import fs from 'fs/promises';
import DeploymentType from '../types/Deployment';

export default async function loadDeployments() {
  const rawDeployments = await fs.readdir('./deployments');

  const deployments: DeploymentType[] = [];

  await Promise.all(
    rawDeployments.map(async (deploymentFileName) => {
      if (!deploymentFileName.endsWith('.json')) {
        return;
      }
      const data = await fs.readFile(
        `./deployments/${deploymentFileName}`,
        'utf8',
      );
      deployments.push(JSON.parse(data));
    }),
  );

  return deployments;
}
