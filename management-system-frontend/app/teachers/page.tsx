import { Flex, Text, Heading } from "@radix-ui/themes";
import Image from "next/image";
import imgUndrawEducator from "@/assets/undraw-educator.svg"

export default function TeachersPage() {
    return (
        <Flex direction="column" justify="between" gap="8" height="100%">
            <Flex direction="column" gap="2">
                <Heading as="h2" size="4">
                    Welcome!
                </Heading>
                <Text>
                    Please select the content you want to manage on the left
                </Text>
            </Flex>
            <Image src={imgUndrawEducator} alt="Educator" width={400} />
        </Flex>
    );
}