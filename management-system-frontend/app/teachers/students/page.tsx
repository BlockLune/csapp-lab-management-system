'use client';

import { useState, useEffect } from "react";
import { Flex, Table, Heading, Text, Skeleton } from "@radix-ui/themes";
import AddAStudent from "@/components/student-operations/add-a-student";
import AddStudents from "@/components/student-operations/add-students";
import UpdateStudent from "@/components/student-operations/update-student";
import RemoveStudent from "@/components/student-operations/remove-student";
import { getStudentList } from "@/scripts/api";

export default function ManageStudentsPage() {
  const [fetching, setFetching] = useState<boolean>(true);
  const [students, setStudents] = useState<string[]>([]);

  const fetchStudents = async () => {
    setFetching(true);
    const students = await getStudentList();
    if (students) {
      setStudents(students);
    } else {
      setStudents([]);
    }
    setFetching(false);
  }

  useEffect(() => {
    fetchStudents();
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
                  <UpdateStudent studentId={studentId} onUpdate={fetchStudents} />
                </Table.Cell>
                <Table.Cell justify="center">
                  <RemoveStudent studentId={studentId} onRemove={fetchStudents} />
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
      <Flex direction="column" gap="2">
        <Heading as="h2" size="4">
          Student Management Panel
        </Heading>
        <Text>
          Add students, update their passwords or remove them from the system.
        </Text>
      </Flex>
      <Flex gap="2">
        <AddAStudent onAdd={fetchStudents} />
        <AddStudents onAdd={fetchStudents} />
      </Flex>
      <Flex justify="center" height="70%">
        {
          fetching ? tableSkeleton : (students.length !== 0 ? tableComponent : fallbackComponent)
        }
      </Flex>
    </Flex>
  );
}
