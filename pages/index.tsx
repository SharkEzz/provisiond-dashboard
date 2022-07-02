import { AddIcon, CheckIcon, CloseIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  HStack,
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Link from '../components/Link';
import DeploymentType from '../types/Deployment';
import loadDeployments from '../utils/loadDeployments';

export default function IndexPage({
  deployments,
}: {
  deployments: DeploymentType[];
}) {
  const router = useRouter();
  const toast = useToast();
  const deleteDeployment = async (id: number) => {
    const deleteRes = await fetch(`/api/delete_deployment/${id}`, {
      method: 'DELETE',
    });
    if (deleteRes.status !== 200) {
      toast({
        title: 'Error',
        description: 'Failed to delete deployment',
        status: 'error',
        duration: 5000,
        position: 'bottom-right',
      });
      return;
    }

    router.reload();
  };

  return (
    <Layout
      title="Dashboard"
      elements={
        <Link href="/deployment/create">
          <Button leftIcon={<AddIcon />} colorScheme="green">
            Add
          </Button>
        </Link>
      }
    >
      <Box boxShadow="md">
        <TableContainer>
          <Table variant="striped">
            <TableCaption>Deployments list</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Variables count</Th>
                <Th>Jobs count</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {deployments.map((deployment) => (
                <Tr key={`deployment_${deployment.id}`}>
                  <Td>{deployment.name}</Td>
                  <Td>
                    <Badge colorScheme="purple">
                      {deployment.variables.length}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme="purple">{deployment.jobs.length}</Badge>
                  </Td>
                  <Td>
                    <HStack>
                      <Link href={`/deployment/start/${deployment.id}`}>
                        <IconButton
                          icon={<CheckIcon />}
                          aria-label="Launch deployment"
                          colorScheme="green"
                        />
                      </Link>
                      <IconButton
                        icon={<SettingsIcon />}
                        aria-label="Launch deployment"
                        colorScheme="blue"
                      />
                      <IconButton
                        icon={<CloseIcon />}
                        aria-label="Launch deployment"
                        colorScheme="red"
                        onClick={() => deleteDeployment(deployment.id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps() {
  const deployments = await loadDeployments();

  return {
    props: {
      deployments,
    },
  };
}
