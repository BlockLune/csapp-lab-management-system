'use client';

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { logout } from "@/scripts/api";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();
    function handleConfirm() {
        logout();
        router.push('/');
    }
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button variant="outline" color="red" style={{cursor: "pointer"}}>Logout</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Logout</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure you want to logout?
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray" style={{cursor: "pointer"}}>
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" style={{cursor: "pointer"}}
                        onClick={handleConfirm}
                        >
                            Confirm
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>

    );
}