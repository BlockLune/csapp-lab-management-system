import { Flex, Heading, Text } from "@radix-ui/themes";

export default function SideBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex direction="column" p="6" justify="between">
      <Flex direction="column" flexGrow="1" gap="6">
        <Heading>CSAPP Management System</Heading>
        {children}
      </Flex>
      <Text>
        Built by BlockLune
      </Text>
    </Flex >
  );
}

