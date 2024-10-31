import { Card, Flex, Heading, Text, TextField, Button, Link } from "@radix-ui/themes";

export default function LoginForm() {
    return (
        <Card>
            <Flex gap="5" direction="column" align="start" p="4" width="24rem">
                <Heading as="h2">Sign in</Heading>
                <Flex direction="column" gap="3" width="100%">
                    <Text as="label" htmlFor="username">Username</Text>
                    <TextField.Root id="username" placeholder="Enter your username" />
                    <Text as="label" htmlFor="password">Password</Text>
                    <TextField.Root id="password" type="password" placeholder="Enter your password" />
                </Flex>
                <Flex gap="2" width="100%">
                    <Button variant="solid" style={{ flex: 1, cursor: "pointer" }}>Sign in</Button>
                </Flex>
            </Flex>
        </Card>
    );
}

