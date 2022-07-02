/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { NextPageContext } from 'next';
import { useForm } from 'react-hook-form';
import Layout from '../../../components/Layout';
import DeploymentType from '../../../types/Deployment';
import loadDeployment from '../../../utils/loadDeployment';

export default function StartDeployment({
  deployment,
}: {
  deployment: DeploymentType;
}) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: unknown) => console.log(data);

  return (
    <Layout title={`Start deployment : ${deployment.name}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack align="flex-start" spacing={6}>
          <Text fontSize="xl">Variables</Text>
          {deployment.variables.map((variable) => (
            <FormControl key={`variable_${variable.name}`}>
              <FormLabel>{variable.name}</FormLabel>
              <Input
                {...register(`variables.${variable.name}`)}
                defaultValue={variable.defaultValue}
              />
            </FormControl>
          ))}
          <Divider />
          <Text fontSize="xl">Hosts</Text>
          <HStack>
            <Checkbox {...register('hosts.prod')}>Prod</Checkbox>
            <Checkbox {...register('hosts.develop')}>Develop</Checkbox>
          </HStack>
          <Divider />
          <Button alignSelf="flex-end" type="submit" colorScheme="green">
            Launch deployment
          </Button>
        </VStack>
      </form>
    </Layout>
  );
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
