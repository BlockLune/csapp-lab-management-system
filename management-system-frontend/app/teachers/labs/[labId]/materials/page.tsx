'use client';

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Flex, Table, Heading, Text, Skeleton, Button, Code } from "@radix-ui/themes";
import { LabInfo, getLabInfo } from "@/scripts/api";

export default function MaterialsPage() {
    const { labId } = useParams();

    const [fetching, setFetching] = useState<boolean>(true);
    const [materials, setMaterials] = useState<string[]>([]);
    const [labInfo, setLabInfo] = useState<LabInfo | null>(null);

    async function fetchLabInfo() {
        setFetching(true);
        const labInfo = await getLabInfo(labId as string);
        if (labInfo) {
            setLabInfo(labInfo);
        }
        setFetching(false);
    }

    useEffect(() => {
        fetchLabInfo();
        // TODO: fetch real data
        setTimeout(() => {
            const DUMMY_DATA = Array.from({ length: 10 }, (_, i) => `material-${i + 1}`);
            setMaterials(DUMMY_DATA);
            setFetching(false);
        }, 1000);
    }, []);

    const tableSkeleton = (
        <Table.Root style={{ width: "100%", overflowY: "auto" }}>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell justify="center">File Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify="center">Download</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify="center">Remove</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    Array.from({ length: 6 }).map((_, i) => {
                        return (
                            <Table.Row key={i}>
                                <Table.RowHeaderCell justify="center"><Skeleton>BlockLune</Skeleton></Table.RowHeaderCell>
                                <Table.Cell justify="center"><Skeleton>BlockLune</Skeleton></Table.Cell>
                                <Table.Cell justify="center"><Skeleton>BlockLune</Skeleton></Table.Cell>
                            </Table.Row>
                        );
                    })
                }
            </Table.Body>
        </Table.Root>
    );

    const tableComponent = (
        <Table.Root style={{ width: "100%", overflowY: "auto" }}>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell justify="center">File Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify="center">Download</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell justify="center">Remove</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    materials.map((fileName: string) => {
                        return (
                            <Table.Row key={fileName}>
                                <Table.RowHeaderCell justify="center">{fileName}</Table.RowHeaderCell>
                                <Table.Cell justify="center">
                                    <Button variant="ghost">Download</Button>
                                </Table.Cell>
                                <Table.Cell justify="center">
                                    <Button variant="ghost" color="red">Remove</Button>
                                </Table.Cell>
                            </Table.Row>
                        );
                    })
                }
            </Table.Body>
        </Table.Root>
    );

    const fallbackComponent = (
        <Text>No materials found</Text>
    );

    return (
        <Flex direction="column" gap="4" width="100%" height="100%">
            <Flex direction="column" gap="2">
                <Heading as="h2" size="4">
                    Materials of Lab {labId} <Code>{labInfo?.name}</Code>
                </Heading>
                <Text>
                    Manage materials of Lab {labId} <Code>{labInfo?.name}</Code>
                </Text>
            </Flex>
            <Button style={{ cursor: "pointer" }}>Add Material</Button>
            <Flex justify="center" height="70%">
                {
                    fetching ? tableSkeleton : (materials.length !== 0 ? tableComponent : fallbackComponent)
                }
            </Flex>
        </Flex>
    );
}

