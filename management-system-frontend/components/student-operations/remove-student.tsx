import { AlertDialog, Button, Flex } from "@radix-ui/themes";

export default function RemoveStudent({ studentId }: { studentId: string }) {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button variant="ghost" color="red" style={{ cursor: "pointer" }}>Remove</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Remove Student</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure? The student will be removed from the system.
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray" style={{ cursor: "pointer" }}>
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" style={{ cursor: "pointer" }}>
                            Remove
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>

    );
}