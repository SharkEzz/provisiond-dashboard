import { AddIcon, DeleteIcon, InfoIcon } from '@chakra-ui/icons';
import {
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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import HostModal from '../../components/HostForm/HostModal';
import Layout from '../../components/Layout';
import HostType from '../../types/Host';
import loadHosts from '../../utils/loadHosts';

export default function HostsPage({
  hosts,
}: {
  hosts: Pick<HostType, 'type' | 'name' | 'slug'>[];
}) {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = async (slug: string) => {
    const res = await fetch(`/api/hosts/delete/${slug}`, {
      method: 'DELETE',
    });

    if (res.status !== 200) {
      toast({
        title: 'Error',
        description: 'Failed to delete host',
        position: 'bottom-right',
        status: 'error',
      });
      return;
    }
    router.reload();
  };

  return (
    <Layout
      title="Hosts"
      elements={
        <Button leftIcon={<AddIcon />} colorScheme="green" onClick={onOpen}>
          Add
        </Button>
      }
    >
      <Box boxShadow="md">
        <TableContainer>
          <Table variant="striped">
            <TableCaption>Hosts list</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {hosts.map((host) => (
                <Tr key={`host_${host.slug}`}>
                  <Td>{host.name}</Td>
                  <Td>{host.type}</Td>
                  <Td>
                    <HStack>
                      <IconButton
                        icon={<InfoIcon />}
                        aria-label="Edit host"
                        colorScheme="blue"
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Delete host"
                        colorScheme="red"
                        onClick={() => onDelete(host.slug)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <HostModal isOpen={isOpen} onClose={onClose} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const hosts = (await loadHosts()) ?? [];
  const filteredHosts = hosts.map((host) => ({
    name: host.name,
    slug: host.slug,
    type: host.type,
  }));

  return {
    props: {
      hosts: filteredHosts,
    },
  };
}
