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
import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateDocument = ({ site_id }: { site_id: string }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const createDocuments = useMutation(api.documents.createDocuments);
  const documents = useQuery(api.documents.getAllDocuments);
  const maxDocuments = 3;

  const onSubmit = async (data: any) => {
    if (documents && documents.length >= maxDocuments) {
      toast.error(
        "You've reached the document limit. Please upgrade to Premium."
      );
      return;
    }
    try {
      await createDocuments({
        name: data.name,
        sites: {
          id: site_id,
        },
      });
      setOpen(false);
      toast.success("Create documents successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="border border-white/15 bg-black hover:bg-opacity-40"
        >
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border border-white/15">
        <DialogHeader>
          <DialogTitle>Create Document</DialogTitle>
          <DialogDescription className="text-gray9">
            Name your document
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full"
        >
          <div className="flex flex-col justify-center items-center w-full gap-3">
            <Label className="w-full">Name</Label>
            <Input
              className="w-full bg-black border border-white/15"
              {...register("name", { required: true })}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              className="border border-white/15 bg-white text-black hover:bg-white/20"
            >
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDocument;
