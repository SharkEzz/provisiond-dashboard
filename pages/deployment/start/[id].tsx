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
import HostType from '../../../types/Host';
import loadDeployment from '../../../utils/loadDeployment';
import loadHosts from '../../../utils/loadHosts';

export default function StartDeployment({
  deployment,
  hosts,
}: {
  deployment: DeploymentType;
  hosts: Pick<HostType, 'name' | 'slug'>[];
}) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: unknown) => {
    console.log(data);
  };

  return (
    <Layout title={`Start deployment : ${deployment.name}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack align="flex-start" spacing={6}>
          <Text fontSize="xl">Variables</Text>
          {deployment.variables.map((variable, index) => (
            <FormControl key={`variable_${variable.name}`}>
              <FormLabel>{variable.name}</FormLabel>
              <Input
                {...register(`variables.${index}`)}
                defaultValue={variable.defaultValue}
              />
            </FormControl>
          ))}
          <Divider />
          <Text fontSize="xl">Hosts</Text>
          <HStack>
            {hosts.map((host) => (
              <Checkbox
                key={`host.${host.slug}`}
                {...register(`hosts.${host.slug}`)}
              >
                {host.name}
              </Checkbox>
            ))}
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

  const hosts = await loadHosts();
  const filteredHosts = hosts?.map((host) => ({
    name: host.name,
    slug: host.slug,
  }));

  const deployment = await loadDeployment(Number(id));
  if (!deployment) {
    throw new Error('Deployment not found');
  }

  return {
    props: {
      deployment,
      hosts: filteredHosts,
    },
  };
}
