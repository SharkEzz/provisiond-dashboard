/* eslint-disable react/jsx-props-no-spreading */
import { DeleteIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export type VariableType = {
  name: string;
  type: 'string' | 'select';
  defaultValue: string;
};

export default function Variable({
  index,
  variable,
  remove,
}: {
  index: number;
  variable: VariableType;
  remove: () => void;
}) {
  const { register } = useFormContext();

  return (
    <HStack w="full" align="flex-end">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          {...register(`variables.${index}.name`, {
            required: true,
          })}
          defaultValue={variable.name}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Type</FormLabel>
        <Input
          {...register(`variables.${index}.type`, {
            required: true,
          })}
          defaultValue={variable.type}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Default value</FormLabel>
        <Input
          {...register(`variables.${index}.defaultValue`)}
          defaultValue={variable.defaultValue}
        />
      </FormControl>
      <IconButton
        icon={<DeleteIcon />}
        colorScheme="red"
        aria-label="Delete variable"
        onClick={remove}
      />
    </HStack>
  );
}
