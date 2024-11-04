"use client";

import { useState, useEffect } from "react";
import { Flex, Table, Heading, Text, Skeleton } from "@radix-ui/themes";
import { LabInfo, getLabList, getLabMaterials } from "@/scripts/api";
import DownloadMaterial from "@/components/material-operations/download-material";

interface LabMaterial extends LabInfo {
  materials: string[] | null;
}

export default function LabMaterials() {
  const [fetching, setFetching] = useState<boolean>(true);
  const [labMaterials, setLabMaterials] = useState<LabMaterial[]>([]);

  async function fetchLabMaterials() {
    setFetching(true);

    const labList = await getLabList();
    if (!labList || labList.length === 0) {
      setLabMaterials([]);
      setFetching(false);
      return;
    }

    const labsWithMaterials = await Promise.all(
      labList.map(async (labInfo) => {
        const materials = await getLabMaterials(labInfo.id.toString());
        return {
          ...labInfo,
          materials,
        };
      })
    );

    setLabMaterials(labsWithMaterials);

    setFetching(false);
  }

  useEffect(() => {
    fetchLabMaterials();
  }, []);

  const tableSkeleton = (
    <Table.Root style={{ width: "100%", overflowY: "auto" }}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell justify="center">
            Lab Name
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center">
            Materials
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array.from({ length: 6 }).map((_, i) => {
          return (
            <Table.Row key={i}>
              <Table.RowHeaderCell justify="center">
                <Skeleton>BlockLune</Skeleton>
              </Table.RowHeaderCell>
              <Table.Cell justify="center">
                <Skeleton>BlockLune</Skeleton>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );

  const tableComponent = (
    <Table.Root style={{ width: "100%", overflowY: "auto" }}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell justify="center">
            Lab Name
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center">
            Materials
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {labMaterials.map((labMaterial) => {
          const downloadButtons =
            labMaterial.materials && labMaterial.materials.length > 0
              ? labMaterial.materials.map((material) => (
                  <DownloadMaterial
                    key={`${labMaterial.id}-${material}`}
                    labId={labMaterial.id.toString()}
                    fileName={material}
                    showFileName
                  />
                ))
              : null;
          return (
            <Table.Row key={labMaterial.id}>
              <Table.RowHeaderCell justify="center">
                {labMaterial.name}
              </Table.RowHeaderCell>
              <Table.Cell justify="center" align="center">
                {downloadButtons ? (
                  <Flex direction="column" gap="2">
                    {downloadButtons}
                  </Flex>
                ) : (
                  <Text color="gray">No materials</Text>
                )}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );

  const fallbackComponent = <Text>No materials found</Text>;

  return (
    <Flex direction="column" gap="4" width="100%" height="100%">
      <Flex direction="column" gap="2">
        <Heading as="h2" size="4">
          Materials
        </Heading>
        <Text>Check the lab materials published by teacher.</Text>
      </Flex>
      <Flex justify="center" height="70%">
        {fetching
          ? tableSkeleton
          : labMaterials.length !== 0
          ? tableComponent
          : fallbackComponent}
      </Flex>
    </Flex>
  );
}
