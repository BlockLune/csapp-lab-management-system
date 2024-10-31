import { Flex, Heading, Card, Avatar, Box, Text } from "@radix-ui/themes";
import LoginForm from "@/components/login-form";

export default function Home() {
	return (
		<Flex width="100vw" height="100vh" display="flex"
			direction="column" justify="center" align="center" gap="8">
			<Heading size="8">CSAPP Lab Management System</Heading>
			<LoginForm />
		</Flex>
	);
}