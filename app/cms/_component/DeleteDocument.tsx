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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteDocument = ({ id }: { id: Id<"documents"> }) => {
  const { openDialog, closeDialog } = useDialogActions();
  const router = useRouter();
  const deleteDocuments = useMutation(api.documents.deleteDocuments);

  const handleDeleteDocument = async (id: Id<"documents">) => {
    try {
      const response = await deleteDocuments({
        id: id,
      });
      closeDialog();
      router.push(`/cms/sites/${id}/documents`);
      toast.success("Delete documents successfully.");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={openDialog}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-white text-black mb-3 hover:bg-white/50"
        >
          Delete
        </Button>
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
