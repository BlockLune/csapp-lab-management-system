import SideBar from "@/components/side-bar";
import { Flex, Box, Button } from "@radix-ui/themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex width="100vw" height="100vh">
      <SideBar>
        <Flex direction="column" style={{ flex: 1 }} gap="2">
          <Button variant="outline" style={{ cursor: "pointer" }}>Manage Students</Button>
          <Button variant="outline" style={{ cursor: "pointer" }}>Manage Labs</Button>
        </Flex>
      </SideBar>
      <Box as="div" flexGrow="1" flexShrink="1">
        {children}
      </Box>
    </Flex>
  );
}

