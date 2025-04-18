'use client';

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Flex, Table, Heading, Text, Skeleton, Button, Code } from "@radix-ui/themes";
import { LabInfo, getLabInfo, getLabMaterials } from "@/scripts/api";
import AddMaterial from "@/components/material-operations/add-material";
import RemoveMaterial from "@/components/material-operations/remove-material";
import DownloadMaterial from "@/components/material-operations/download-material";

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
        const materials = await getLabMaterials(labId as string);
        if (materials) {
            setMaterials(materials);
        }
        setFetching(false);
    }

    useEffect(() => {
        fetchLabInfo();
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
                                <Table.Cell justify="center" align="center">
                                    <DownloadMaterial labId={labId as string} fileName={fileName}/>
                                </Table.Cell>
                                <Table.Cell justify="center" align="center">
                                    <RemoveMaterial labId={labId as string} fileName={fileName} onRemove={fetchLabInfo}/>
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
            {labId && <AddMaterial labId={labId as string} onAdd={fetchLabInfo}/>}
            <Flex justify="center" height="70%">
                {
                    fetching ? tableSkeleton : (materials.length !== 0 ? tableComponent : fallbackComponent)
                }
            </Flex>
        </Flex>
    );
}

