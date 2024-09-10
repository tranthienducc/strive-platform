"use client";

import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/lib/edgestore";
import useDialogActions from "@/state/hooks/useDialogActions";
import { useMutation } from "convex/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const subdomainRegex = /^[a-zA-Z0-9-]+$/;

const FormSchema = z.object({
  site_name: z.string(),
  site_description: z.string(),
  site_subdomain: z
    .string()
    .min(1, "Subdomain is required")
    .max(63, "Subdomain must be less than 64 characters")
    .regex(
      subdomainRegex,
      "Subdomain must only contain alphanumeric characters or hyphens"
    ),
  site_coverImage: z.string(),
});

const CreateSites = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      site_name: "",
      site_description: "",
      site_subdomain: "",
      site_coverImage: "",
    },
  });
  const { openDialog, closeDialog } = useDialogActions();
  const [file, setFile] = useState<File>();
  const createSites = useMutation(api.documents.createSites);
  const { edgestore } = useEdgeStore();

  const onSubmit = async (value: z.infer<typeof FormSchema>) => {
    try {
      if (!file) {
        toast.error("File is not defined");
        return;
      }
      const [coverImageRes] = await Promise.all([
        edgestore.publicFiles.upload({ file }),
      ]);
      await createSites({
        ...value,
        site_coverImage: coverImageRes.url,
      });
      toast.success("Site is publish");
      form.reset();
      closeDialog();
    } catch (error) {
      console.log(error);
      toast.error("Error occured");
    }
  };

  return (
    <Dialog onOpenChange={openDialog}>
      <DialogTrigger asChild>
        <Button size="sm" className="text-white">
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border border-white/15">
        <DialogHeader>
          <DialogTitle className="text-white">Create a new site</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[600px] w-full mt-2 space-y-3"
          >
            <FormField
              control={form.control}
              name="site_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray9">Site Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-black border border-white/15"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="site_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray9">Site Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="bg-black border border-white/15"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="site_subdomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray9">
                    Site custom domain
                  </FormLabel>
                  <FormControl>
                    <div className="flex justify-center items-center gap-3">
                      <Input
                        {...field}
                        className="bg-black border border-white/15"
                        placeholder=""
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="site_coverImage"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-white font-medium text-base">
                    Image{" "}
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      setFile={setFile}
                      fieldChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                size="sm"
                className="bg-white text-black font-medium text-sm"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSites;
