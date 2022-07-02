/* eslint-disable react/jsx-props-no-spreading */
import { DeleteIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export type JobType = {
  name: string;
  shell: string;
};

export default function Job({
  index,
  job,
  remove,
}: {
  index: number;
  job: JobType;
  remove: () => void;
}) {
  const { register } = useFormContext();

  return (
    <VStack w="full" align="flex-end">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          {...register(`jobs.${index}.name`, {
            required: true,
          })}
          defaultValue={job.name}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Shell</FormLabel>
        <Textarea
          {...register(`jobs.${index}.shell`, {
            required: true,
          })}
          defaultValue={job.shell}
        />
      </FormControl>
      <IconButton
        icon={<DeleteIcon />}
        aria-label="Delete job"
        colorScheme="red"
        onClick={remove}
      />
    </VStack>
  );
}
