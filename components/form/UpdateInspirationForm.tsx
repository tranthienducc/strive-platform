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
import { useState } from "react";
import FileUpload from "../FileUpload";
import { DropdownCategories } from "../common";
import dynamic from "next/dynamic";
import { useEdgeStore } from "@/lib/edgestore";

const PlateEditor = dynamic(() => import("@/components/editor/PlateEditor"), {
  ssr: false,
  loading: () => <p>Loading editor..</p>,
});

const UpdateInspirationForm = ({
  data,
  setCloseDialog,
}: {
  data: InspirationProps;
  setCloseDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const updateInspiration = useMutation(api.documents.update);
  const [status, setStatus] = useState<
    "success" | "error" | "loading" | "pending" | null
  >(null);
  const [file, setFile] = useState<File | null>(null);

  const [figFile, setFigFile] = useState<File | null>(null);

  const isLoading = status === "loading";

  const { edgestore } = useEdgeStore();

  const form = useForm<InspirationProps>({
    defaultValues: {
      title: data.title,
      coverImage: data.coverImage,
      salePrice: data.salePrice,
      url: data.url,
      categories: data.categories,
      description: data.description,
    },
  });

  const handleSubmit: SubmitHandler<InspirationProps> = async (values) => {
    setStatus("loading");
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

      await updateInspiration({
        id: data._id,
        coverImage: coverImageRes.url,
        url: figUrlRes.url,
        ...values,
      });
      toast.success("Update inspiration successfully");
      setCloseDialog(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update inspiration!");
    } finally {
      setStatus("success");
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col max-w-full w-full">
                <FormLabel className="text-white font-medium text-base">
                  Description
                </FormLabel>
                <FormControl>
                  <PlateEditor
                    placeholder="Update description.."
                    values={field.value}
                    fieldChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-end justify-end">
          <Button
            type="submit"
            disabled={!form}
            className="px-4 py-2 bg-white rounded-xl duration-300 hover:bg-white/30 text-sm font-semibold text-black flex items-center justify-center"
          >
            {isLoading ? <Spinner /> : "Publish now"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateInspirationForm;
