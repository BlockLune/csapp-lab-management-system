"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Flex, Table, Heading, Text, Skeleton } from "@radix-ui/themes";
import { getStudentList, getLabSolutionsByTeacher } from "@/scripts/api";
import DownloadSolution from "@/components/solution-operations/download-solution-by-teacher";

interface StudentSolution {
  studentId: string;
  solutions: string[] | null;
}

export default function SolutionsPage() {
  const { labId } = useParams();
  const [fetching, setFetching] = useState<boolean>(true);
  const [students, setStudents] = useState<StudentSolution[]>([]);

  const fetchStudentsAndSolutions = async () => {
    setFetching(true);
    try {
      const studentIdList = await getStudentList();

      if (!studentIdList || studentIdList.length === 0) {
        setStudents([]);
        return;
      }

      const studentsWithSolutions = await Promise.all(
        studentIdList.map(async (studentId) => {
          const solutions = await getLabSolutionsByTeacher(
            labId as string,
            studentId
          );
          return {
            studentId,
            solutions: solutions || null
          };
        })
      );

      setStudents(studentsWithSolutions);
    } catch (error) {
      console.error("Error fetching students and solutions:", error);
      setStudents([]);
    } finally {
      console.log(students);
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchStudentsAndSolutions();
  }, [labId]);

  const tableSkeleton = (
    <Table.Root style={{ width: "100%", overflowY: "auto" }}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell justify="center">
            Student Id
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center">
            Solution
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
            Student Id
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell justify="center">
            Solution
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {students.map((student: StudentSolution) => {
          const downloadButtons = (student.solutions && student.solutions.length > 0) ? student.solutions.map((solution) => (
            <DownloadSolution
              labId={labId as string}
              studentId={student.studentId}
              fileName={solution}
            />
          ))
            : null;
          return (
            <Table.Row key={student.studentId}>
              <Table.RowHeaderCell justify="center">
                {student.studentId}
              </Table.RowHeaderCell>
              <Table.Cell justify="center">
                {downloadButtons || <Text color="gray">No solution</Text>}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );

  const fallbackComponent = <Text>No students found</Text>;

  return (
    <Flex direction="column" gap="4" width="100%" height="100%">
      <Flex direction="column" gap="2">
        <Heading as="h2" size="4">
          Students' Solutions
        </Heading>
        <Text>
          Here you can download the solutions submitted by the students.
        </Text>
      </Flex>
      <Flex justify="center" height="80%">
        {fetching
          ? tableSkeleton
          : students.length !== 0
            ? tableComponent
            : fallbackComponent}
      </Flex>
    </Flex>
  );
}
