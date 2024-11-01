'use client';

import { Card, Flex, Button, Box } from "@radix-ui/themes";
import SideBar from "@/components/side-bar";
import { useRouter } from "next/navigation";
import * as motion from "framer-motion/client";

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
      <Box width="768px" maxWidth="768px">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card mx="4">
            <Flex height="512px">
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
        </motion.div>
      </Box>
    </Flex>
  );
}

