import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";

export default function UpdateStudent({ studentId }: { studentId: string }) {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="ghost" style={{ cursor: "pointer" }}>Update</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Update Student</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Update student details
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            New password for student {studentId}
                        </Text>
                        <TextField.Root
                            placeholder="Enter password"
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray" style={{ cursor: "pointer" }}>
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button style={{ cursor: "pointer" }}>Update</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>

    );
}