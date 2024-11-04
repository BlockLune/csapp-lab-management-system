'use client';

import { Card, Flex, Button, Box } from "@radix-ui/themes";
import SideBar from "@/components/side-bar";
import Logout from "@/components/logout";
import * as motion from "framer-motion/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "@/scripts/auth";

export default function TeachersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    const auth = getAuth();
    if (!auth || !auth.roles.includes("ROLE_TEACHER")) {
      router.push("/")
    }
  }, []);

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
                    onClick={() => { window.location.href = "/teachers"; }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    style={{ cursor: "pointer" }}
                    onClick={() => { window.location.href = "/teachers/students"; }}
                  >
                    Manage Students
                  </Button>
                  <Button
                    variant="outline"
                    style={{ cursor: "pointer" }}
                    onClick={() => { window.location.href = "/teachers/labs"; }}
                  >
                    Manage Labs
                  </Button>
                  <Logout />
                </Flex>
              </SideBar>
              <Box p="6" style={{ flex: 1 }}>
                {children}
              </Box>
            </Flex>
          </Card>
        </motion.div>
      </Box>
    </Flex>
  );
}

