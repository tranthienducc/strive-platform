"use client";
import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/lib/edgestore";
import { FormValues } from "@/utils/types/type";
import { useMutation } from "convex/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import slugify from "slugify";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import FileUpload from "../FileUpload";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";
import { DropdownCategories } from "@/components/common/index";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import { Label } from "../ui/label";
import dynamic from "next/dynamic";

const TiptabEditor = dynamic(() => import("@/components/editor/TiptabEditor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const InspirationForm = ({
  setCloseDialog,
}: {
  setCloseDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const create = useMutation(api.inspiration.createInspiration);

  const [isSubmiting, setIsSubmiting] = useState(false);

  const [file, setFile] = useState<File>();
  const [figFile, setFigFile] = useState<File | null>(null);

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

  const { edgestore } = useEdgeStore();
  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      categories: "",
      coverImage: "",
      slug: "",
      price: 0,
      url: "",
    },
  });

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmiting(true);
    try {
      if (!file) {
        toast.error("File is not defined");
        return;
      }
      if (!figFile) {
        toast.error(".fig file is required");
        return;
      }
      if (!figFile.name.toLowerCase().endsWith(".fig")) {
        toast.error("File must have .fig extension");
        return;
      }

      const [coverImageRes, figUrlRes] = await Promise.all([
        edgestore.publicFiles.upload({ file }),
        edgestore.publicFiles.upload({
          file: figFile,
          options: {
            temporary: false,
          },
        }),
      ]);

      const newSlug = slugify(data.title || "", { lower: true });

      const price =
        typeof data.price === "string" ? parseFloat(data.price) : data.price;

      const response = await create({
        ...data,
        price,
        description: html,
        slug: newSlug,
        coverImage: coverImageRes.url,
        url: figUrlRes.url,
      });
      setCloseDialog(false);
      toast.success("New inspiration created!");
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to create a new inspiration...");
    } finally {
      setIsSubmiting(true);
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
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col max-w-[320px] w-full">
                <FormLabel className="text-white font-medium text-base">
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    className="outline-none text-white placeholder:text-gray9 bg-inherit h-12 bg-black border border-white/25"
                    type="number"
                    required
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    value={field.value || ""}
                    placeholder="pricing template"
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
                  <FileUpload setFile={setFile} fieldChange={field.onChange} />
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
            className="px-4 py-2 bg-white rounded-xl duration-300 hover:bg-white/30 text-sm font-semibold text-black flex items-center justify-center"
          >
            {isSubmiting ? <Spinner /> : "Publish now"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InspirationForm;
