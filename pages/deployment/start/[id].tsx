import { NextPageContext } from 'next';
import DeploymentType from '../../../types/Deployment';
import loadDeployment from '../../../utils/loadDeployment';

export default function StartDeployment({
  deployment,
}: {
  deployment: DeploymentType;
}) {
  console.log(deployment);
  return <div>start</div>;
}

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  const deployment = await loadDeployment(Number(id));
  if (!deployment) {
    throw new Error('Deployment not found');
  }

  return {
    props: {
      deployment,
    },
  };
}
