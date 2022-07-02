import {
  Container,
  Flex,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { SunIcon } from '@chakra-ui/icons';
import Link from '../Link';

export default function Navbar() {
  const { toggleColorMode } = useColorMode();

  return (
    <Flex as="nav" h={16} align="center" bg="green.500" color="white">
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between">
          <Link href="/">
            <Text fontWeight={600} cursor="pointer" fontSize="xl">
              provisiond
            </Text>
          </Link>
          <IconButton
            aria-label="Theme toggle"
            icon={<SunIcon />}
            onClick={toggleColorMode}
            variant="unstyled"
          />
        </Flex>
      </Container>
    </Flex>
  );
}
