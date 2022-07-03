/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import Job from '../../components/DeploymentForm/Jobs/Job';
import Variable from '../../components/DeploymentForm/Variables/Variable';
import Layout from '../../components/Layout';
import DeploymentType from '../../types/Deployment';

export default function CreateDeployment() {
  const router = useRouter();
  const toast = useToast();
  const methods = useForm<DeploymentType>();

  const {
    fields: variableFields,
    append: appendVariable,
    remove: removeVariable,
  } = useFieldArray({
    control: methods.control,
    name: 'variables',
  });

  const {
    fields: jobFields,
    append: appendJob,
    remove: removeJob,
  } = useFieldArray({
    control: methods.control,
    name: 'jobs',
  });

  const onSubmit = async (data: DeploymentType) => {
    const res = await fetch('/api/deployments/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        id: Math.ceil(Math.random() * 10000),
      }),
    });
    if (res.status === 200) {
      toast({
        title: 'Success',
        description: 'Deployment created successfully',
        status: 'success',
        duration: 5000,
        position: 'bottom-right',
      });
      router.push('/');
    }
  };

  return (
    <Layout title="Add deployment">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <VStack align="flex-start">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...methods.register('name', {
                  required: true,
                })}
              />
            </FormControl>
            <Divider />
            <Text fontSize="lg">Variables</Text>
            {variableFields.map((field, index) => (
              <Variable
                index={index}
                variable={field}
                key={field.id}
                remove={() => removeVariable(index)}
              />
            ))}
            <Button
              onClick={() =>
                appendVariable({
                  defaultValue: '',
                  name: '',
                  type: 'string',
                })
              }
            >
              Add
            </Button>
            <Divider />
            <Text fontSize="lg">Jobs</Text>
            {jobFields.map((field, index) => (
              <Job
                index={index}
                job={field}
                key={field.id}
                remove={() => removeJob(index)}
              />
            ))}
            <Button
              onClick={() =>
                appendJob({
                  name: '',
                  shell: '',
                })
              }
            >
              Add
            </Button>
            <Divider />
            <Button type="submit" colorScheme="green">
              Save
            </Button>
          </VStack>
        </form>
      </FormProvider>
    </Layout>
  );
}
