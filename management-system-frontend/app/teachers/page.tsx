'use client';

import { Card, Flex, Button, Text, Heading } from "@radix-ui/themes";
import SideBar from "@/components/side-bar";
import Image from "next/image";
import imgUndrawEducator from "@/assets/undraw-educator.svg"

export default function TeachersPage() {
    return (
        <Card mx="4">
            <Flex>
                <SideBar>
                    <Flex direction="column" gap="4">
                        <Button variant="outline" style={{ cursor: "pointer" }}>Manage Students</Button>
                        <Button variant="outline" style={{ cursor: "pointer" }}>Manage Labs</Button>
                    </Flex>
                </SideBar>
                <Flex p="6" direction="column" justify="between" gap="8">
                    <Flex direction="column" gap="2">
                        <Heading as="h2" size="4">
                            Welcome!
                        </Heading>
                        <Text>
                            Select the content you want to manage on the left
                        </Text>
                    </Flex>
                    <Image src={imgUndrawEducator} alt="Educator" width={400} />
                </Flex>
            </Flex>
        </Card>
    );
}