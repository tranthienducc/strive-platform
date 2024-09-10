"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useDialogActions from "@/state/hooks/useDialogActions";
import { useMutation } from "convex/react";
import { toast } from "sonner";

const DeleteDocument = ({ id }: { id: Id<"documents"> }) => {
  const { openDialog, closeDialog } = useDialogActions();

  const deleteDocuments = useMutation(api.documents.deleteDocuments);

  const handleDeleteDocument = async (id: Id<"documents">) => {
    try {
      await deleteDocuments({
        id: id,
      });
      closeDialog();
      toast.success("Delete documents successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={openDialog}>
      <DialogTrigger asChild>
        <Button>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete document</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your document?
          </DialogDescription>
        </DialogHeader>
        <Button
          type="submit"
          onClick={() => handleDeleteDocument(id)}
          variant={"destructive"}
        >
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDocument;
