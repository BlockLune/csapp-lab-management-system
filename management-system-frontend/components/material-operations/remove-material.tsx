import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { removeMaterial } from "@/scripts/api";

export default function RemoveMaterial({ labId, fileName, onRemove }: { labId: string, fileName: string, onRemove: () => void }) {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button variant="ghost" color="red" style={{ cursor: "pointer" }}>Remove</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Remove Material</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure? The material will be removed from the system.
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
                                await removeMaterial(labId, fileName);
                                onRemove();
                            }}
                        >
                            Remove
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>

    );
}