"use client";
import { Id } from "@/convex/_generated/dataModel";
import React, { useEffect, useState } from "react";
import SiteDashWrapper from "../_component/SidebarWrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";
import { Input } from "@/components/ui/input";
import FileUpload from "@/components/FileUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

const FormSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  slug: z.string(),
  keywords: z.string(),
  image: z.string(),
  document: z.string(),
  category: z.string(),
});

const PublishPage = ({
  params,
}: {
  params: {
    site_id: Id<"sites">;
  };
}) => {
  const documents = useQuery(api.documents.getAllDocuments);

  const sites = useQuery(api.sites.getSitesById, {
    id: params.site_id,
  });

  console.log(documents?.map((data) => data.name));

  const createArticle = useMutation(api.article.createArticle);
  const categories = useQuery(api.category.getAllCategory);

  const [file, setFile] = useState<File>();

  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      slug: "",
      keywords: "",
      image: "",
      category: "",
      document: "",
    },
  });

  useEffect(() => {
    const title = form.watch("title");
    if (title) {
      form.setValue("slug", slugify(title, { lower: true }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("title")]);

  const onSubmit = async (value: z.infer<typeof FormSchema>) => {
    try {
      if (!file) {
        toast.error("File is not defined");
        return;
      }

      const [coverImageRes] = await Promise.all([
        edgestore.publicFiles.upload({ file }),
      ]);

      const selecteDocument = documents?.find(
        (doc) => doc.name === value.document
      );
      const keywordsArray = value.keywords
        .split(",")
        .map((keyword) => keyword.trim());

      const response = await createArticle({
        userId: selecteDocument?.userId as string,
        image: coverImageRes.url,
        document_title: value.document,
        sub_title: value.subtitle,
        blog_html: selecteDocument?.description as string,
        site_id: params.site_id,
        title: value.title,
        slug: value.slug,
        category: value.category,
        keywords: keywordsArray,
        published: true,
        site_subdomain: sites?.site_subdomain,
      });
      toast.success("Article is published");
      form.reset();
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Fail to publish article");
    }
  };

  return (
    <SiteDashWrapper site_id={params.site_id}>
      <main className="flex min-h-screen p-4 flex-col items-center justify-between">
        <div className="flex flex-col mb-[5rem] w-full">
          <h1 className="text-3xl font-semibold tracking-tight">Publish</h1>
          <p className="leading-7 text-sm text-gray9 font-normal">
            Get ready to publish articles that have been written and saved
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-[600px] mt-[0.5rem] space-y-3"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter title here</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border border-white/15 text-white placeholder:text-gray9 bg-transparent"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your article title.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter subtitle here</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border border-white/15 text-white placeholder:text-gray9 bg-transparent"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your article subtitle.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center w-full gap-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Enter slug here</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border border-white/15 text-white placeholder:text-gray9 bg-transparent"
                        />
                      </FormControl>
                      <FormDescription>
                        This is your article slug.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Enter keywords here</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border border-white/15 text-white placeholder:text-gray9 bg-transparent"
                          placeholder="Pizza, Chicken, Food"
                        />
                      </FormControl>
                      <FormDescription>
                        Separate keywords by comma.(SEO)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Cover</FormLabel>
                    <FormControl>
                      <FileUpload
                        className="w-full max-w-full"
                        setFile={setFile}
                        fieldChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-transparent border border-white/15 placeholder:text-gray9">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black border border-white/15 text-white">
                        {categories?.map((data) => (
                          <SelectItem key={data?._id} value={data?.category}>
                            {data?.category}
                          </SelectItem>
                        ))}
                        {categories?.length === 0 ? (
                          <Link href={`/cms/sites/${params?.site_id}/category`}>
                            <Button variant="ghost" className="w-full">
                              <PlusIcon className="mr-2 w-4 h-4 border rounded-full" />
                              Create Category
                            </Button>
                          </Link>
                        ) : null}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-transparent border border-white/15 placeholder:text-gray9">
                          <SelectValue placeholder="Select a document" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black border border-white/15 text-white">
                        {documents?.map((document) => (
                          <SelectItem
                            key={document._id}
                            value={document?.name as string}
                          >
                            {document?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                size="sm"
                type="submit"
                className="bg-white text-black hover:bg-white/50"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </SiteDashWrapper>
  );
};

export default PublishPage;
