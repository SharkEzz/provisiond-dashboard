/* eslint-disable react/jsx-props-no-spreading */
import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import HostType from '../../types/Host';
import loadHosts from '../../utils/loadHosts';

export default function HostsPage({ hosts }: { hosts: HostType[] }) {
  const [authType, setAuthType] = useState<'password' | 'key'>('password');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: unknown) => console.log(data);

  return (
    <>
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
                  <Tr key={`host_${host.host}`}>
                    <Td>{host.name}</Td>
                    <Td>{host.type}</Td>
                    <Td>actions</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Layout>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          reset();
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add host</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <VStack>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    {...register('name', {
                      required: true,
                    })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Host</FormLabel>
                  <Input
                    {...register('host', {
                      required: true,
                    })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Port</FormLabel>
                  <Input
                    type="number"
                    min={0}
                    max={65565}
                    {...register('port', {
                      required: true,
                    })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...register('username', {
                      required: true,
                    })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Type</FormLabel>
                  <Select
                    {...register('type', {
                      required: true,
                      onChange: (e) =>
                        setAuthType(e.target.value as 'password' | 'key'),
                    })}
                  >
                    <option value="password">Password</option>
                    <option value="key">Private key</option>
                  </Select>
                </FormControl>
                {authType === 'password' ? (
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      {...register('password', {
                        required: true,
                      })}
                    />
                  </FormControl>
                ) : (
                  <>
                    <FormControl>
                      <FormLabel>Private key</FormLabel>
                      <Textarea
                        rows={10}
                        {...register('privateKey', {
                          required: true,
                        })}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Private key passphrase</FormLabel>
                      <Input
                        {...register('keyPassphrase', {
                          required: true,
                        })}
                      />
                    </FormControl>
                  </>
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Add
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export async function getServerSideProps() {
  const hosts = (await loadHosts()) ?? [];

  return {
    props: {
      hosts,
    },
  };
}
