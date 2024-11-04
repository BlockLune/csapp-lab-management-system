"use client";

import { useState, useEffect } from "react";
import { Flex, Table, Heading, Text, Skeleton, Link } from "@radix-ui/themes";
import { type LabInfo, getLabList } from "@/scripts/api";

export default function LabSolutions() {
  const [fetching, setFetching] = useState<boolean>(true);
  const [labs, setLabs] = useState<LabInfo[]>([]);

  const fetchLabs = async () => {
    setFetching(true);
    const labs = await getLabList();
    if (labs) {
      setLabs(labs);
    } else {
      setLabs([]);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchLabs();
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
        {Array.from({ length: 8 }).map((_, i) => {
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
            Solutions
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {labs.map((lab) => {
          return (
            <Table.Row key={lab.id}>
              <Table.RowHeaderCell justify="center">
                {lab.name}
              </Table.RowHeaderCell>
              <Table.Cell justify="center">
                <Link href={`/students/labs/solutions/${lab.id}`}>Check</Link>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );

  const fallbackComponent = <Text>No labs found</Text>;

  return (
    <Flex direction="column" gap="4" width="100%" height="100%">
      <Flex direction="column" gap="2">
        <Heading as="h2" size="4">
          Lab Solutions
        </Heading>
        <Text>Check and manage your solutions here.</Text>
      </Flex>
      <Flex justify="center" height="80%">
        {fetching
          ? tableSkeleton
          : labs.length !== 0
          ? tableComponent
          : fallbackComponent}
      </Flex>
    </Flex>
  );
}
