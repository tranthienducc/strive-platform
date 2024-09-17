"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import useDialogActions from "@/state/hooks/useDialogActions";

import SiteDashWrapper from "../../_component/SidebarWrapper";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";
import { useEditor } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import "./styles.scss";
import DeleteDocument from "@/app/cms/_component/DeleteDocument";

const FormSchema = z.object({
  name: z
    .string()
    .min(1, "name is required")
    .max(50, "name must be less than 200 characters"),
});

const TiptabEditor = dynamic(() => import("@/components/editor/TiptabEditor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const DocumentEditor = ({
  params,
}: {
  params: {
    id: Id<"documents">;
    site_id: Id<"sites">;
  };
}) => {
  const router = useRouter();
  const { closeDialog, openDialog } = useDialogActions();

  const updateDocuments = useMutation(api.documents.updateDocument);
  const documents = useQuery(api.documents.getDocumentById, {
    id: params.id,
  });

  const [isSubmiting, setIsSubmiting] = useState(false);

  const extensions: any = [
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      paragraph: {},
    }),
    Link.configure({
      HTMLAttributes: {
        // Define attributes for the <a> tag
        target: "_blank",
        rel: "noopener noreferrer nofollow",
      },
    }),
    Image.configure({
      inline: true,
    }),
    // Color.configure({ types: [TextStyle.name, ListItem.name] }),
    // TextStyle,
  ];

  const editor = useEditor({
    extensions,
    content: "",
    editorProps: {
      handleDOMEvents: {
        focus: () => true,
      },
    },
    // Ensure this is set to false to prevent SSR issues
    immediatelyRender: false,
  }) as any;

  const html = editor?.getHTML();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      name: documents?.name || "",
    },
  });

  useEffect(() => {
    if (documents?.name) {
      form.setValue("name", documents?.name);
    }
  }, [documents, form]);

  useEffect(() => {
    if (editor && documents?.description) {
      editor.commands.setContent(documents?.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, documents?.description]);

  const onSubmit = async (value: z.infer<typeof FormSchema>) => {
    setIsSubmiting(true);
    try {
      await updateDocuments({
        id: params.id,
        name: value.name,
        description: html,
      });
      form.reset();
      closeDialog();
      toast(
        "Article has been submitted, you can publish the article by going to 'Publish Article' tab",
        {
          description: new Date().toLocaleTimeString(),
          action: {
            label: "Publish",
            onClick: () => router.push(`/cms/sites/${params.id}/publish`),
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Faid to submit form");
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <SiteDashWrapper site_id={params.site_id}>
      <div className="flex flex-col items-end w-full">
        <div className="flex justify-between items-center gap-3 w-full">
          <div className="flex justify-center items-center pb-3 my-7 gap-4">
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-3xl mb-6">
              {documents?.name}
            </h1>
          </div>
        </div>
        <DeleteDocument id={params.id} />

        <Form {...form}>
          <form
            className="p-4 border border-white/20 rounded-2xl w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <TiptabEditor editor={editor} isShowMenuBar={true} />

            <Dialog onOpenChange={openDialog}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-white text-black hover:bg-white/50"
                >
                  Submit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-black border border-white/15">
                <DialogHeader>
                  <DialogTitle>Save Document</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start gap-4">
                        <FormLabel className="text-white font-medium text-base">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-black border border-white/15 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="sm"
                    onClick={form.handleSubmit(onSubmit)}
                    className="bg-white text-black mt-4 hover:bg-white/50"
                    disabled={isSubmiting}
                  >
                    {isSubmiting ? <Spinner /> : "Save changes"}
                  </Button>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </form>
        </Form>
      </div>
    </SiteDashWrapper>
  );
};

export default DocumentEditor;
