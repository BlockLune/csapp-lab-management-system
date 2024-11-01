'use client';

import { Card, Flex, Button, Box } from "@radix-ui/themes";
import SideBar from "@/components/side-bar";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <Flex width="100vw" height="100vh"
      align="center" justify="center"
      className="heropattern"
    >
      <Box maxWidth="768px">
        <Card mx="4">
          <Flex>
            <SideBar>
              <Flex direction="column" gap="4">
                <Button
                  variant="outline"
                  style={{ cursor: "pointer" }}
                  onClick={() => { router.push("/teachers") }}
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  style={{ cursor: "pointer" }}
                  onClick={() => { router.push("/teachers/students") }}
                >
                  Manage Students
                </Button>
                <Button
                  variant="outline"
                  style={{ cursor: "pointer" }}
                  onClick={() => { router.push("/teachers/labs") }}
                >
                  Manage Labs
                </Button>
              </Flex>
            </SideBar>
            <Box p="6">
              {children}
            </Box>
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
}

