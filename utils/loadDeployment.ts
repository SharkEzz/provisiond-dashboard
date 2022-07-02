import fs from 'fs/promises';

export default async function loadDeployment(id: number) {
  try {
    const file = await fs.readFile(
      `./deployments/deployment_${id}.json`,
      'utf8',
    );

    return JSON.parse(file);
  } catch (error) {
    return null;
  }
}
