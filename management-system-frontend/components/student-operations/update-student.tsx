'use client';

import { Dialog, Button, Flex, Text, TextField, IconButton } from "@radix-ui/themes";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { updateStudent } from "@/scripts/api";
import { useState } from "react";

export default function UpdateStudent({ studentId, onUpdate }: { studentId: string, onUpdate: () => void }) {
    const [newPassword, setNewPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewPassword(e.target.value);
    }

    async function handleUpdate() {
        await updateStudent(studentId, newPassword);
        setNewPassword("");
        onUpdate();
    }

    function handleCancel() {
        setNewPassword("");
    }

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
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            placeholder="Enter password"
                            onChange={(e) => handleChange(e)}
                        >
                            <TextField.Slot side="right">
                                <IconButton size="1" variant="ghost" onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                                </IconButton>
                            </TextField.Slot>
                        </TextField.Root>
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray" style={{ cursor: "pointer" }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button
                            style={{ cursor: "pointer" }}
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>

    );
}