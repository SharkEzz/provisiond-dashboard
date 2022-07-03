/* eslint-disable react/jsx-props-no-spreading */
import {
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
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import HostType from '../../types/Host';

export default function HostModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [authType, setAuthType] = useState<'password' | 'key'>('password');
  const toast = useToast();
  const { register, handleSubmit } = useForm<HostType>();

  const onSubmit: SubmitHandler<HostType> = async (data) => {
    const res = await fetch('/api/hosts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.status !== 200) {
      toast({
        title: 'Error',
        description: 'Failed to add host',
        position: 'bottom-right',
        status: 'error',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Host added successfully',
      position: 'bottom-right',
      status: 'success',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
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
                      {...register('privateKeyPassphrase', {
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
  );
}
