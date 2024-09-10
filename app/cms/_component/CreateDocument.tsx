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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import useDialogActions from "@/state/hooks/useDialogActions";
import { useMutation } from "convex/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateDocument = ({ site_id }: { site_id: string }) => {
  const { openDialog, closeDialog } = useDialogActions();
  const { register, handleSubmit } = useForm();
  const createDocuments = useMutation(api.documents.createDocuments);

  const onSubmit = async (data: any) => {
    try {
      await createDocuments({
        name: data.name,
        sites: {
          id: site_id,
        },
      });
      closeDialog();
      toast.success("Create documents successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={openDialog}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Document</DialogTitle>
          <DialogDescription>Name your document</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full"
        >
          <div className="flex flex-col justify-center items-center w-full gap-3">
            <Label className="w-full">Name</Label>
            <Input
              className="w-full"
              {...register("name", { required: true })}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" size="sm">
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDocument;
