import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { deleteSolutionByStudent } from "@/scripts/api";

export default function DeleteSolution({
  labId,
  fileName,
  onDelete,
}: {
  labId: string;
  fileName: string;
  onDelete: () => void;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="ghost" color="red" style={{ cursor: "pointer" }}>
          Delete
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete Solution File</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This solution file will be deleted.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" style={{ cursor: "pointer" }}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              style={{ cursor: "pointer" }}
              onClick={async () => {
                await deleteSolutionByStudent(labId, fileName);
                onDelete();
              }}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
