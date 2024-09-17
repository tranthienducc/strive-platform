"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { InspirationProps } from "@/utils/types/type";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import FileUpload from "../FileUpload";
import { DropdownCategories } from "../common";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import dynamic from "next/dynamic";
import { Label } from "../ui/label";

const TiptabEditor = dynamic(() => import("@/components/editor/TiptabEditor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const UpdateInspirationForm = ({
  data,
  setCloseDialog,
}: {
  data: InspirationProps;
  setCloseDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [figFile, setFigFile] = useState<File | null>(null);
  const { edgestore } = useEdgeStore();
  const updateInspiration = useMutation(api.inspiration.updatedInspiration);

  const extensions: any = [
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
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

  useEffect(() => {
    if (editor && data.description) {
      editor.commands.setContent(data.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, data.description]);

  const html = editor?.getHTML();

  const form = useForm<InspirationProps>({
    defaultValues: {
      title: data.title,
      coverImage: data.coverImage,
      salePrice: data.salePrice,
      url: data.url,
      categories: data.categories,
    },
  });

  const handleSubmit: SubmitHandler<InspirationProps> = async (values) => {
    setIsSubmiting(true);
    try {
      if (!figFile) {
        toast.error(".fig file is required");
        return;
      }
      if (!figFile.name.toLowerCase().endsWith(".fig")) {
        toast.error("");
        return;
      }

      let coverImageUrl = data.coverImage;
      if (file) {
        const coverImageRes = await edgestore.publicFiles.upload({ file });
        coverImageUrl = coverImageRes.url;
      }

      const figUrlRes = await edgestore.publicFiles.upload({
        file: figFile,
        options: {
          temporary: false,
        },
      });

      const response = await updateInspiration({
        id: data._id,
        coverImage: coverImageUrl,
        description: html,
        url: figUrlRes.url,
        ...values,
      });

      toast.success("Update inspiration successfully");
      setCloseDialog(false);
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to update inspiration!");
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex max-w-full w-full flex-col"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-row gap-2 mb-1 max-w-full w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col max-w-[320px] w-full">
                <FormLabel className="text-white font-medium text-base">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    className="outline-none text-white placeholder:text-gray9 bg-inherit h-12 bg-black border border-white/25"
                    type="text"
                    required
                    placeholder="Solopreneur"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salePrice"
            render={({ field }) => (
              <FormItem className="flex flex-col max-w-[320px] w-full">
                <FormLabel className="text-white font-medium text-base">
                  Sale Price
                </FormLabel>
                <FormControl>
                  <Input
                    className="outline-none text-white placeholder:text-gray9 bg-inherit h-12 bg-black border border-white/25"
                    type="number"
                    required
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    value={field.value || ""}
                    placeholder="100000VND"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-2 mb-1 max-w-full w-full">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="flex flex-col max-w-[320px] w-full">
                <FormLabel className="text-white font-medium text-base">
                  Url
                </FormLabel>
                <FormControl>
                  <Input
                    className="outline-none text-white placeholder:text-gray9 bg-inherit h-12 bg-black border border-white/25"
                    type="file"
                    required
                    accept=".fig"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFigFile(file);
                        field.onChange(file.name);
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem className="flex flex-col max-w-[320px] w-full">
                <FormLabel className="text-white font-medium text-base">
                  Categories
                </FormLabel>
                <FormControl>
                  <DropdownCategories
                    onValuesChange={field.onChange}
                    values={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-2 max-w-full w-full mb-3">
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-white font-medium text-base">
                  Image{" "}
                </FormLabel>
                <FormControl>
                  <FileUpload
                    setFile={setFile}
                    fieldChange={field.onChange}
                    mediaUrl={data.coverImage}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Label className="mb-2 text-base font-medium text-white">
            Description
          </Label>
          <TiptabEditor
            editor={editor}
            className="min-h-[200px] h-full border border-white/15 w-full min-w-[702px] rounded-md"
          />
        </div>
        <div className="flex items-end justify-end">
          <Button
            type="submit"
            disabled={isSubmiting}
            className="px-4 py-2 bg-white rounded-xl duration-300 hover:bg-white/30 text-sm font-semibold text-black flex items-center justify-center"
          >
            {isSubmiting ? <Spinner /> : "Publish now"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateInspirationForm;
