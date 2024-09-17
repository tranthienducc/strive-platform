"use client";
import React, { useEffect, useState } from "react";
import SiteDashWrapper from "../../../_component/SidebarWrapper";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import ImageCover from "../../_component/ImageCover";
import "./styles.scss";
import FileUpload from "@/components/FileUpload";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TiptabEditor = dynamic(() => import("@/components/editor/TiptabEditor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const FormSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  slug: z.string(),
  keywords: z.string(),
  image: z.string(),
  category: z.string(),
});

const ArticleEditor = ({
  params,
}: {
  params: { slug: string; site_id: Id<"sites"> };
}) => {
  const articles = useQuery(api.article.getArticleBySlug, {
    slug: params.slug,
  });
  const updatedArticle = useMutation(api.article.updateArticle);
  const categories = useQuery(api.category.getAllCategory);
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

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

  useEffect(() => {
    if (editor && articles?.[0]?.blog_html) {
      editor.commands.setContent(articles?.[0]?.blog_html);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, articles?.[0]?.blog_html]);

  const html = editor?.getHTML();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: articles?.[0]?.title || "",
      subtitle: articles?.[0]?.sub_title || "",
      slug: articles?.[0]?.slug || "",
      keywords: articles?.[0]?.keywords?.join(", ") || "",
      category: articles?.[0]?.category || "",
      image: "",
    },
  });

  useEffect(() => {
    if (articles?.[0]) {
      const article = articles[0];
      form.reset({
        title: article.title || "",
        subtitle: article.sub_title || "",
        slug: article.slug || "",
        keywords: article.keywords?.join(", ") || "",
        image: article.image || "",
        category: article.category || "",
      });
    }
  }, [articles, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      if (!file) {
        toast.error("File is not defined");
        return;
      }
      const [coverImageRes] = await Promise.all([
        edgestore.publicFiles.upload({ file }),
      ]);
      const keywordsArray = data.keywords
        .split(",")
        .map((keyword) => keyword.trim());

      const response = await updatedArticle({
        id: articles?.[0]?._id as Id<"article">,
        blog_html: html,
        image: coverImageRes.url,
        category: data.category,
        keywords: keywordsArray,
        slug: data.slug,
        title: data.title,
        sub_title: data.subtitle,
      });
      toast.success("Article is updated");
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Fail to update article");
    }
  };

  return (
    <SiteDashWrapper site_id={params.site_id}>
      <div className="flex flex-col items-end w-full">
        <div className="flex justify-center items-center gap-3">
          <a href={`/cms/sites/${params?.site_id}/preview/${params?.slug}`}>
            <Button className="bg-white text-black hover:bg-white/50">
              Preview
            </Button>
          </a>
        </div>
        <div className="p-4 border border-white/15 rounded mt-5 w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 justify-center items-start w-full pb-7"
            >
              <div className="flex flex-col gap-3">
                <Label>Blog Cover Image </Label>
                {articles?.[0].image ? (
                  <ImageCover url={articles?.[0].image} />
                ) : (
                  <ImageCover />
                )}
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        {...field}
                        className="text-white placeholder:text-gray9 scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl bg-transparent border-none my-5 outline-none"
                        placeholder="Title"
                      />
                    </FormControl>
                    <Separator className="bg-white/20" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="text-white font-medium text-base">
                      Image Cover Update
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

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <TiptabEditor editor={editor} isShowMenuBar={true} />

              <Button
                type="submit"
                className="bg-white text-black hover:bg-white/50"
                size="sm"
              >
                Update
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </SiteDashWrapper>
  );
};

export default ArticleEditor;
