import { JobType } from '../components/DeploymentForm/Jobs/Job';
import { VariableType } from '../components/DeploymentForm/Variables/Variable';

type DeploymentType = {
  id: number;
  name: string;
  variables: VariableType[];
  jobs: JobType[];
};

export default DeploymentType;
