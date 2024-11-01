import { Flex, Table, Heading, Button } from "@radix-ui/themes";
import AddStudent from "@/components/add-student";

export default function ManageStudentsPage() {
  return (
    <Flex direction="column" gap="4">
      <Heading as="h2" size="4">
        Manage Students
      </Heading>
      <Flex>
        <AddStudent />
      </Flex>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
            <Table.Cell>danilo@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
            <Table.Cell>zahra@example.com</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
            <Table.Cell>jasper@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

    </Flex>
  );
}
