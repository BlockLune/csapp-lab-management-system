'use client';

import { useState, useEffect } from "react";
import { Flex, Table, Heading, Text, Skeleton } from "@radix-ui/themes";
import AddStudent from "@/components/student-operations/add-student";
import UpdateStudent from "@/components/student-operations/update-student";
import RemoveStudent from "@/components/student-operations/remove-student";
import { getStudentList } from "@/scripts/api";

export default function ManageStudentsPage() {
  const [fetching, setFetching] = useState<boolean>(true);
  const [students, setStudents] = useState<string[]>([]);

  useEffect(() => {
    // TODO: fetch real data
    setTimeout(() => {
      const DUMMY_DATA = Array.from({ length: 10 }, (_, i) => `student-${i + 1}`);
      setStudents(DUMMY_DATA);
      setFetching(false);
    }, 1000);
  }, []);

  const tableSkeleton = (
    <Table.Root style={{ width: "100%", overflowY: "auto" }}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell justify="center">Student Id</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center">Update</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center">Remove</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          Array.from({ length: 7 }).map((_, i) => {
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
          <Table.ColumnHeaderCell justify="center">Student Id</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center">Update</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center">Remove</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          students.map((studentId: string) => {
            return (
              <Table.Row key={studentId}>
                <Table.RowHeaderCell justify="center">{studentId}</Table.RowHeaderCell>
                <Table.Cell justify="center">
                  <UpdateStudent studentId={studentId} />
                </Table.Cell>
                <Table.Cell justify="center">
                  <RemoveStudent studentId={studentId} />
                </Table.Cell>
              </Table.Row>
            );
          })
        }
      </Table.Body>
    </Table.Root>
  );

  const fallbackComponent = (
    <Text>No students found</Text>
  );


  return (
    <Flex direction="column" gap="4" width="100%" height="100%">
      <Heading as="h2" size="4">
        Student Management Panel
      </Heading>
      <AddStudent />
      <Flex justify="center" height="80%">
        {
          fetching ? tableSkeleton : (students.length !== 0 ? tableComponent : fallbackComponent)
        }
      </Flex>
    </Flex>
  );
}
