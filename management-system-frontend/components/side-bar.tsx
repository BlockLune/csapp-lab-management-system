import { Flex, Heading, Text, Box, Link, IconButton } from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function SideBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      direction="column"
      p="6"
      justify="between"
      gap="6"
      style={{ borderRight: "1px solid #e5e5e5" }}
    >
      <Flex direction="column" flexGrow="1" gap="6">
        <Heading>
          <Box>
            <Box as="span">CSAPP</Box>
            <Box as="span">Lab</Box>
            <Box as="span">Management</Box>
            <Box as="span">System</Box>
          </Box>
        </Heading>
        <Box>{children}</Box>
      </Flex>
      <Flex justify="between" align="end">
        <Flex direction="column">
          <Text size="1">Powered by</Text>
          <Text size="1">
            <Link href="https://nextjs.org/" target="_blank" rel="nofollow">
              NextJS
            </Link>
            {" & "}
            <Link
              href="https://www.radix-ui.com/"
              target="_blank"
              rel="nofollow"
            >
              Radix UI
            </Link>
          </Text>
        </Flex>
        <Link
          href="https://github.com/BlockLune/csapp-lab-management-system"
          target="_blank"
          rel="nofollow"
        >
          <IconButton variant="ghost">
            <GitHubLogoIcon />
          </IconButton>
        </Link>
      </Flex>
    </Flex>
  );
}
