'use client';

import { parse } from 'csv-parse/browser/esm/sync';
import { Dialog, Button, Flex, Link, TextArea } from "@radix-ui/themes";
import { addStudent } from "@/scripts/api";
import { useState } from "react";

export default function AddStudents({ onAdd }: { onAdd: () => void }) {
    const csvPlaceholder = "student_id,password\nB22040001,123456\nB22040002,qwerty\n...";
    const [csv, setCsv] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setCsv(e.target.value);
    }

    async function handleAdd() {
        const records = parse(csv, {
            columns: true,
            skip_empty_lines: true
        });
        for (const record of records) {
            await addStudent(record.student_id, record.password);
        }
        setCsv("");
        onAdd();
    }

    function handleCancel() {
        setCsv("");
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="soft" style={{ cursor: "pointer", flex: 1 }}>Add Students</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Add Students</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Paste student ids and passwords in the text area below in
                    {" "}
                    <Link href="https://en.wikipedia.org/wiki/Comma-separated_values"
                        target="_blank"
                        rel="nofollow"
                    >
                        CSV
                    </Link>
                    {" "}
                    <Link href="https://en.wikipedia.org/wiki/Comma-separated_values"></Link>
                    format, and click "Add" to add them to the system.
                </Dialog.Description>

                <TextArea
                    placeholder={csvPlaceholder}
                    value={csv}
                    onChange={handleChange}
                />

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray" style={{ cursor: "pointer" }}
                            onClick={handleCancel}
                        >
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