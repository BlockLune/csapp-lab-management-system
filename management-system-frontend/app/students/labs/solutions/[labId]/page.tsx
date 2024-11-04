"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Flex, Table, Heading, Text, Skeleton, Code } from "@radix-ui/themes";
import { getLabInfo, getLabSolutionsByStudent, LabInfo } from "@/scripts/api";
import UploadSolution from "@/components/solution-operations/upload-solution-by-student";

interface LabSolution extends LabInfo {
  solutions: string[] | null;
}

export default function LabSolutionPage() {
  const { labId } = useParams();
  const [fetching, setFetching] = useState(false);
  const [labSolution, setLabSolution] = useState<LabSolution | null>(null);

  async function fetchLabSolution() {
    setFetching(true);

    const labInfo = await getLabInfo(labId as string);
    if (!labInfo) {
      setLabSolution(null);
      setFetching(false);
      return;
    }

    const solutions = await getLabSolutionsByStudent(labInfo.id.toString());
    setLabSolution({
      ...labInfo,
      solutions,
    });

    setFetching(false);
  }

  useEffect(() => {
    fetchLabSolution();
  }, [labId]);

  const tableSkeleton = (
    <Table.Root style={{ width: "100%", overflowY: "auto" }}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell justify="center">
            File Name
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center">
            Operations
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
            File Name
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center">
            Operations
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {labSolution &&
          labSolution.solutions &&
          labSolution.solutions.map((solution) => (
            <Table.Row key={solution}>
              <Table.RowHeaderCell justify="center">
                {solution}
              </Table.RowHeaderCell>
              <Table.Cell justify="center">TODO</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  );

  const fallbackComponent = <Text>No solutions found</Text>;

  return (
    <Flex direction="column" gap="4" width="100%" height="100%">
      <Flex direction="column" gap="2">
        <Heading as="h2" size="4">
          Solution Files of Lab {labId}{" "}
          {labSolution && <Code>{labSolution.name}</Code>}
        </Heading>
        <Text>Here are your solution files.</Text>
      </Flex>
      <UploadSolution labId={labId as string} onAdd={fetchLabSolution} />
      <Flex justify="center" height="70%">
        {fetching
          ? tableSkeleton
          : labSolution &&
            labSolution.solutions &&
            labSolution.solutions.length !== 0
          ? tableComponent
          : fallbackComponent}
      </Flex>
    </Flex>
  );
}
