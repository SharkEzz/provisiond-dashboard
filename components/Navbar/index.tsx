import {
  Box,
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
        <Flex align="center" gap={8}>
          <Link href="/">
            <Text fontWeight={600} cursor="pointer" fontSize="xl">
              provisiond
            </Text>
          </Link>
          <Flex flexGrow={1} gap={3}>
            <Link href="/">Dashboard</Link>
            <Link href="/hosts">Hosts</Link>
          </Flex>
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
