import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";

export default function AddStudent() {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button style={{ cursor: "pointer" }}>Add Student</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Add Student</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Add a student to the system
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Student Id
                        </Text>
                        <TextField.Root
                            placeholder="Enter student id"
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Password
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
                        <Button style={{ cursor: "pointer" }}>Add</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>

    );
}