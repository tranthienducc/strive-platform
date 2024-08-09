"use client";
import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/lib/edgestore";
import { FormValues, InspirationType } from "@/utils/types/type";
import { useMutation, useQuery } from "convex/react";
import { ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import slugify from "slugify";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import FileUpload from "../FileUpload";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";
import { Id } from "@/convex/_generated/dataModel";

type InspirationFormProps = {
  action: "Create" | "Update";
};

const InspirationForm = ({ action }: InspirationFormProps) => {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const update = useMutation(api.documents.update);
  const { slug: InspirationId } = useParams();
  const inspirations = useQuery(
    api.documents.getById
  ) as any as InspirationType[];

  const trimInspirationsParam = String(InspirationId).trim();

  const inspirationsList = inspirations?.find((item) => {
    const productSlug = item._id;
    return trimInspirationsParam === productSlug;
  });

  const { slug, title, coverImage, description, categories } =
    inspirationsList || {};

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const form = useForm<FormValues>({
    defaultValues: {
      title: action === "Update" ? title : "",
      categories: action === "Update" ? categories : "",
      coverImage: action === "Update" ? coverImage : "",
      slug: action === "Update" ? slug : "",
      description: action === "Update" ? description : "",
    },
  });

  console.log("title", form);

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (action === "Create") {
        if (!file) {
          toast.error("File is not defined");
          return;
        }
        const { title, slug } = data;
        const res = await edgestore.publicFiles.upload({ file });
        let newSlug = slug || "";
        if (!slug) {
          newSlug = slugify(title, { lower: true });
        }

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
      } else if (inspirations && action === "Update") {
        if (!file) {
          toast.error("File is not defined");
          return;
        }
        const res = await edgestore.publicFiles.upload({ file });

        const promise = update({
          id: trimInspirationsParam as Id<"documents">,
          ...data,
          coverImage: res.url,
        });
        toast.promise(promise, {
          loading: "Update a new inspiration...",
          success: "Updating inspiration created!",
          error: "Failed to update a new inspiration...",
        });
        setIsLoading(true);
        router.push("/dashboard/inspiration-manage");
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
              <FormItem className="flex flex-col gap-y-2">
                <FormLabel className="text-white font-medium text-base">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    className="outline-none text-white placeholder:text-gray9 bg-inherit"
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
              <FormItem className="flex flex-col gap-y-2">
                <FormLabel className="text-white font-medium text-base">
                  Slug
                </FormLabel>
                <FormControl>
                  <Input
                    className="outline-none text-white placeholder:text-gray9 bg-inherit"
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
                <Input
                  className="rounded-lg outline-none bg-[#1e1e22] text-white placeholder:text-gray9 px-4 pt-4 pb-20"
                  type="text"
                  required
                  placeholder="categories"
                  {...field}
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
                <Textarea
                  required
                  className="rounded-xl bg-[#1e1e22] text-white px-4 text-sm pt-4 pb-16 placeholder:text-gray9"
                  placeholder="that is a solopreneur"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="flex flex-row gap-x-2 items-center bg-[#cff110] rounded-xl max-w-full w-full h-11 text-center justify-center duration-300 "
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <span className="text-base font-semibold text-black">
                {" "}
                {action === "Create" ? "Create" : "Update"}
              </span>
              <ShieldCheck className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default InspirationForm;
