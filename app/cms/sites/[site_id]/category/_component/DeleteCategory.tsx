import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const DeleteCategory = ({ id }: { id: Id<"category"> }) => {
  const [open, setOpen] = useState(false);
  const deleteCategory = useMutation(api.category.deleteCategory);

  const handleDeleteCategory = async (id: Id<"category">) => {
    try {
      const response = await deleteCategory({
        id: id,
      });
      setOpen(false);
      toast.success("Delete category successfully");
      return response;
    } catch (error) {}
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          className="border border-white/15 bg-inherit hover:bg-white/30 mr-3"
        >
          <Trash className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-inherit border border-white/15">
        <DialogHeader>
          <DialogTitle className="text-white">Delete Category</DialogTitle>
          <DialogDescription className="text-gray9">
            Are you sure you want to delete this category?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => handleDeleteCategory(id)}
            size="sm"
            variant={"destructive"}
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategory;
