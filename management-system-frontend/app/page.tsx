'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Heading } from "@radix-ui/themes";
import LoginForm from "@/components/login-form";
import { getAuth, getRouteFromRole } from '@/scripts/auth';

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		const auth = getAuth();
		if (auth) {
			router.push(getRouteFromRole(auth.roles));
		}
	}, []);

	return (
		<Flex width="100vw" height="100vh" display="flex"
			direction="column" justify="center" align="center" gap="8">
			<Heading size="8">CSAPP Lab Management System</Heading>
			<LoginForm />
		</Flex>
	);
}