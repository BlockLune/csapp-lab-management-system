'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Flex } from "@radix-ui/themes";
import LoginForm from "@/components/login-form";
import { getAuth, getRouteFromRole } from '@/scripts/auth';
import { checkStatus, logout } from "@/scripts/api";

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		const auth = getAuth();
		if (auth) {
			(async () => {
				const status = await checkStatus(auth.roles);
				if (status) {
					router.push(getRouteFromRole(auth.roles));
				}
			})();
		}
		logout();
	}, []);

	return (
		<Flex width="100vw" height="100vh"
			direction="column" justify="center"
			align="center" gap="8"
			className="heropattern"
		>
			<LoginForm />
		</Flex>
	);
}