import { Flex, Heading, Text, Box } from "@radix-ui/themes";

export default function SideBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex direction="column" p="6" justify="between" gap="6"
      style={{ borderRight: "1px solid #e5e5e5" }}
    >
      <Flex direction="column" flexGrow="1" gap="6">
        <Heading>
          <Box>
            <Box as="span">CSAPP</Box>
            <Box as="span">Management</Box>
            <Box as="span">System</Box>
          </Box>
        </Heading>
        <Box>
          {children}
        </Box>
      </Flex>
      <Text>
        Built by BlockLune
      </Text>
    </Flex >
  );
}

