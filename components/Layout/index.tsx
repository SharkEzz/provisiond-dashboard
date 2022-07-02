import { Box, Flex, Heading } from '@chakra-ui/react';

export default function Layout({
  title,
  elements,
  children,
}: {
  title: string;
  elements?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <Flex align="center" mb={3} justify="space-between">
        <Heading fontSize="2xl">{title}</Heading>
        <Box>{elements}</Box>
      </Flex>
      {children}
    </>
  );
}

Layout.defaultProps = {
  elements: null,
};
