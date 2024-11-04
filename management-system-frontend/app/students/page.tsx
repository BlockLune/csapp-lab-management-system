import { Flex, Text, Heading } from "@radix-ui/themes";
import Image from "next/image";
import imgUndrawWellDown from "@/assets/undraw-well-done.svg";

export default function StudentsPage() {
    return (
        <Flex direction="column" justify="between" gap="8" height="100%">
            <Flex direction="column" gap="2">
                <Heading as="h2" size="4">
                    Welcome!
                </Heading>
                <Text>
                    What are you gonna do today?      
                </Text>
            </Flex>
            <Flex justify="end" style={{ flex: 1 }}>
              <Image src={imgUndrawWellDown} alt="Decoration Image" width={300} />
            </Flex>
        </Flex>
    );
}
