"use client";
import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/lib/edgestore";
import { FormValues } from "@/utils/types/type";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
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
import dynamic from "next/dynamic";

const PlateEditor = dynamic(() => import("@/components/editor/PlateEditor"), {
  ssr: false,
  loading: () => <p>Loading editor..</p>,
});

const InspirationForm = ({
  setCloseDialog,
}: {
  setCloseDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const create = useMutation(api.documents.createDocument);
  const { slug: InspirationId } = useParams();
  const inspirations = useQuery(api.documents.getById);

  const [status, setStatus] = useState<
    "success" | "error" | "loading" | "pending" | null
  >(null);

  const isLoading = status === "loading";

  const [file, setFile] = useState<File>();
  const [figFile, setFigFile] = useState<File | null>(null);

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

  // lấy ra params và bỏ khoảng trẳng đầu cuối
  const inspirationsParamTrim = String(InspirationId).trim();

  //So sánh để param và id của inspiration để lây ra dữ liệu tương ứng
  const inspirationsList = inspirations?.find((item) => {
    const productSlug = item._id;
    return inspirationsParamTrim === productSlug;
  });

  //destructuring inspirations data
  const { coverImage } = inspirationsList || {};

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
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

      const newSlug = slugify(data.title || "", { lower: true });

      const price =
        typeof data.price === "string" ? parseFloat(data.price) : data.price;

      await create({
        ...data,
        price,
        slug: newSlug,
        coverImage: coverImageRes.url,
        url: figUrlRes.url,
      });
      toast.success("New inspiration created!");
      setCloseDialog(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create a new inspiration...");
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
                  <FileUpload
                    setFile={setFile}
                    fieldChange={field.onChange}
                    mediaUrl={coverImage}
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

export default InspirationForm;
