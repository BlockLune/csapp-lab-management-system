'use client';

import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { addStudent } from "@/scripts/api";
import { useState } from "react";

export default function AddStudent({ onAdd }: { onAdd: () => void }) {
    const [studentId, setStudentId] = useState<string>("");
    const [rawPassword, setRawPassword] = useState<string>("");

    function handleStudentIdChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStudentId(e.target.value);
    }

    function handleRawPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setRawPassword(e.target.value);
    }

    async function handleAdd() {
        await addStudent(studentId, rawPassword);
        onAdd();
    }

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
                            value={studentId}
                            placeholder="Enter student id"
                            onChange={handleStudentIdChange}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Password
                        </Text>
                        <TextField.Root
                            type="password"
                            value={rawPassword}
                            placeholder="Enter password"
                            onChange={handleRawPasswordChange}
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
                        <Button style={{ cursor: "pointer" }}
                        onClick={handleAdd}
                        >Add</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>

    );
}