"use client";
import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/lib/edgestore";
import {
  FormValues,
  InspirationFormProps,
  InspirationType,
} from "@/utils/types/type";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import slugify from "slugify";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import FileUpload from "../FileUpload";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";
import { Id } from "@/convex/_generated/dataModel";
import { FORM } from "@/utils/types/enum";
import { DropdownCategories } from "@/components/common/index";
import dynamic from "next/dynamic";

const PlateEditor = dynamic(() => import("@/components/editor/PlateEditor"), {
  ssr: false,
  loading: () => <p>Loading editor..</p>,
});
const InspirationForm = ({ action }: InspirationFormProps) => {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const update = useMutation(api.documents.update);
  const { slug: InspirationId } = useParams();
  const inspirations = useQuery(
    api.documents.getById
  ) as any as InspirationType[];
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      categories: "",
      coverImage: "",
      slug: "",
      description: "",
    },
  });
  // lấy ra params và bỏ khoảng trẳng đầu cuối
  const inspirationsParamTrim = String(InspirationId).trim();

  // So sánh để param và id của inspiration để lây ra dữ liệu tương ứng
  const inspirationsList = inspirations?.find((item) => {
    const productSlug = item._id;
    return inspirationsParamTrim === productSlug;
  });

  // destructuring inspirations data
  const { slug, title, coverImage, description, categories } =
    inspirationsList || {};

  useEffect(() => {
    if (action === FORM.UPDATE) {
      form.reset({
        title: title || "",
        categories: categories || "",
        coverImage: coverImage || "",
        slug: slug || "",
        description: description || "",
      });
    }
  }, [action, categories, coverImage, description, form, slug, title]);

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (!file) {
        toast.error("File is not defined");
        return;
      }
      const res = await edgestore.publicFiles.upload({ file });
      const newSlug = slugify(data.title || "", { lower: true });

      // CREATE INSPIRATION
      const createInspiration = async () => {
        const promise = create({
          ...data,
          slug: newSlug,
          coverImage: res.url,
        });
        toast.promise(promise, {
          loading: "Creating a new inspiration...",
          success: "New inspiration created!",
          error: "Failed to create a new inspiration...",
        });
        setIsLoading(true);
        router.push("/dashboard/inspiration-manage");
      };
      console.log("data", data);

      // UPDATE INSPIRATION
      const updateInspiration = async () => {
        const promise = update({
          id: inspirationsParamTrim as Id<"documents">,
          ...data,
          coverImage: res.url,
        });
        toast.promise(promise, {
          loading: "Update a new inspiration...",
          success: "Updating inspiration successfully!",
          error: "Failed to update a new inspiration...",
        });
        setIsLoading(true);
        router.push("/dashboard/inspiration-manage");
      };

      if (action === FORM.CREATE) {
        await createInspiration();
      } else if (action === FORM.UPDATE) {
        await updateInspiration();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="shadow-md max-w-[552px] w-full flex-col"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-row gap-x-4 mb-2 max-w-full w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2 max-w-[276px] w-full">
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
            name="slug"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2 max-w-[276px] w-full">
                <FormLabel className="text-white font-medium text-base">
                  Slug
                </FormLabel>
                <FormControl>
                  <Input
                    className="outline-none text-white placeholder:text-gray9 bg-inherit h-12 bg-black border border-white/25"
                    type="text"
                    required
                    placeholder="this-is-slug"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem className="max-w-full w-full flex flex-col gap-y-2 mb-7">
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

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="text-white font-medium text-base">
                Add Image{" "}
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
            <FormItem className="flex flex-col gap-y-2 mb-7">
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

        <Button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 items-end bg-white rounded-xl duration-300 hover:bg-white/30 text-base font-semibold text-black"
        >
          {isLoading ? (
            <Spinner />
          ) : action === FORM.CREATE ? (
            "Create"
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default InspirationForm;
