"use client";
import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation, useQuery } from "convex/react";
import { Asterisk, ShieldCheck, UploadCloud } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { FormValues, InspirationType } from "@/utils/types/type";

const FormUpdate = () => {
  const [file, setFile] = useState<File>();
  const { slug: InspirationId } = useParams();
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const update = useMutation(api.documents.update);
  const inspirations = useQuery(
    api.documents.getById
  ) as any as InspirationType[];

  const trimInspirationsParam = String(InspirationId).trim();

  const inspirationsList = inspirations?.find((item) => {
    const productSlug = item._id;
    return trimInspirationsParam === productSlug;
  });

  const { fullName, title, coverImage, description, categories } =
    inspirationsList || {};

  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      title: title,
      categories: categories,
      coverImage: coverImage,
      fullName: fullName,
      description: description,
    },
  });

  const handleUpdateTemplate: SubmitHandler<FormValues> = async (data) => {
    try {
      if (!file) {
        return;
      }
      const res = await edgestore.publicFiles.upload({ file });

      if (trimInspirationsParam && trimInspirationsParam.length > 0) {
        const promise = update({
          id: trimInspirationsParam as Id<"documents">,
          ...data,
          coverImage: res.url,
        });

        toast.promise(promise, {
          loading: "Creating a new inspiration...",
          success: "New inspiration created!",
          error: "Failed to create a new inspiration...",
        });
      }
      router.push("/dashboard/inspiration-manage");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create a new template.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
  };

  return (
    <>
      <form
        className="shadow-md max-w-[552px] w-full"
        onSubmit={handleSubmit(handleUpdateTemplate)}
      >
        <div className="flex flex-row gap-x-4 mb-2">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="title" className="text-white font-medium">
              Title
            </label>
            <div className="flex flex-row justify-between bg-[#1e1e22] rounded-lg px-4 py-4">
              <input
                type="text"
                id="title"
                required
                className="outline-none text-white placeholder:text-gray9 bg-inherit"
                placeholder="Solopreneur"
                {...register("title")}
              />
              <Asterisk className="w-6 h-6" color="#cff110" />
            </div>
          </div>
          <div className="flex flex-col gap-y-2 mb-7">
            <label htmlFor="fullName" className="text-white font-medium">
              Full Name
            </label>
            <div className="flex flex-row justify-between bg-[#1e1e22] rounded-lg px-4 py-4">
              <input
                type="text"
                required
                id="fullName"
                className="outline-none text-white placeholder:text-gray9 bg-inherit"
                placeholder="Josh Geist"
                {...register("fullName")}
              />
              <Asterisk className="w-6 h-6" color="#cff110" />
            </div>
          </div>
        </div>
        <div className="max-w-full w-full flex flex-col gap-y-2 mb-7">
          <label htmlFor="categories" className="text-white font-medium">
            Categories
          </label>
          <input
            type="text"
            id="categories"
            required
            className="rounded-lg outline-none bg-[#1e1e22] text-white placeholder:text-gray9 px-4 pt-4 pb-20"
            placeholder="Web design"
            {...register("categories")}
          />
        </div>
        <div className="flex flex-col gap-y-2 mb-7">
          <label htmlFor="image" className="text-white font-medium">
            Image
          </label>
          <div className="bg-[#1e1e22] max-w-full h-[200px] px-[13.5rem] py-[4.5rem] flex items-center justify-center flex-col gap-y-3">
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              className="w-full h-[200px] px-[13.5rem] py-[4.5rem]"
              hidden
            />

            <UploadCloud className="w-10 h-10 text-white" />
            <p className="text-sm font-normal text-white">
              Drop your file here or{" "}
              <span className="text-sm font-medium text-[#cff110]">browse</span>{" "}
            </p>
            <p className="text-xs font-medium text-gray9">
              Maximum upload file size: 120MB
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 mb-7">
          <label htmlFor="description" className="text-white font-medium">
            Description
          </label>
          <textarea
            id="description"
            className="rounded-xl bg-[#1e1e22] text-white px-4 text-sm pt-4 pb-16 placeholder:text-gray9"
            placeholder="that is a solopreneur"
            {...register("description")}
          ></textarea>
        </div>
        <button
          type="submit"
          className="flex flex-row gap-x-2 items-center bg-neutral-800 rounded-xl max-w-full w-full h-11 text-center justify-center text-white hover:bg-white hover:text-black duration-300"
        >
          Update
          <ShieldCheck className="w-4 h-4" />
        </button>
      </form>
    </>
  );
};

export default FormUpdate;
