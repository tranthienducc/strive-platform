"use client";
import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/lib/edgestore";
import { FormUpdateType } from "@/utils/types/type";
import { useMutation, useQuery } from "convex/react";
import { ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

interface FormValues {
  title: string;
  userId: string;
  price: string;
  categories: string;
  coverImage: string;
  desc1: string;
  desc2: string;
  desc3: string;
  desc4: string;
}

const FormUpdate = () => {
  const [file, setFile] = useState<File>();
  const params = useParams();
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const update = useMutation(api.documents.update);
  const documents = useQuery(api.documents.getById);

  const idDocUpdate = (documents?.map((item) => item._id) ||
    []) as unknown as Id<"documents">;

  console.log("rootId", idDocUpdate);
  const paramsId = params.id as Id<"documents">;
  const defaultDocument = documents?.find((doc) => doc._id === paramsId);

  console.log(defaultDocument);
  console.log(params.id);

  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      title: defaultDocument?.title,
      price: defaultDocument?.price,
      categories: defaultDocument?.categories,
      coverImage: defaultDocument?.coverImage,
      desc1: defaultDocument?.desc1,
      desc2: defaultDocument?.desc2,
      desc3: defaultDocument?.desc3,
      desc4: defaultDocument?.desc4,
    },
  });

  const handleUpdateTemplate: SubmitHandler<FormValues> = async (values) => {
    try {
      if (!file) {
        return;
      }
      const res = await edgestore.publicFiles.upload({ file });

      if (idDocUpdate && idDocUpdate.length > 0) {
        const promise = update({
          id: idDocUpdate as Id<"documents">,
          ...values,
          coverImage: res.url,
        });

        toast.promise(promise, {
          loading: "Updating a template...",
          success: "Template has been updated!",
          error: "Failed to update a template...",
        });
      }
      router.push("/dashboard/manage");
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
      <form className="shadow-md" onSubmit={handleSubmit(handleUpdateTemplate)}>
        <div className="flex flex-row gap-x-6">
          <div className="flex flex-col gap-y-2 mb-5">
            <label htmlFor="title" className="text-white">
              Title
            </label>
            <input
              type="text"
              id="title"
              required
              className="rounded-xl outline-none bg-neutral-800 text-white placeholder:text-gray9 px-4 py-2"
              placeholder="Solopreneur"
              {...register("title")}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="price" className="text-white">
              Price
            </label>
            <input
              type="text"
              required
              id="price"
              className="rounded-xl outline-none bg-neutral-800 text-white placeholder:text-gray9 px-4 py-2"
              placeholder="39$"
              {...register("price")}
            />
          </div>
        </div>
        <div className="max-w-full w-full flex flex-col gap-y-2 mb-5">
          <label htmlFor="categories" className="text-white">
            Categories
          </label>
          <input
            type="text"
            id="categories"
            required
            className="rounded-xl outline-none bg-neutral-800 text-white placeholder:text-gray9 px-4 py-2"
            placeholder="Web design"
            {...register("categories")}
          />
        </div>

        <input
          type="file"
          accept="images/*"
          onChange={handleFileChange}
          className="max-w-full w-full h-[50px] bg-gray9 mb-5 rounded-xl text-center flex items-center justify-center"
        />
        <div className="grid grid-cols-2 col-span-2 gap-4 mb-5">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="desc1" className="text-white ">
              Description 1
            </label>
            <textarea
              id="desc1"
              className="rounded-xl bg-neutral-800 text-white px-2 text-sm py-2"
              {...register("desc1")}
            ></textarea>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="desc2" className="text-white">
              Description 2
            </label>
            <textarea
              id="desc2"
              className="rounded-xl bg-neutral-800 text-white px-2 text-sm py-2"
              {...register("desc2")}
            ></textarea>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="desc3" className="text-white">
              Description 3
            </label>
            <textarea
              id="desc3"
              className="rounded-xl bg-neutral-800 text-white px-2 text-sm py-2"
              {...register("desc3")}
            ></textarea>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="desc4" className="text-white">
              Description 4
            </label>
            <textarea
              id="desc4"
              className="rounded-xl bg-neutral-800 text-white px-2 text-sm py-2"
              {...register("desc4")}
            ></textarea>
          </div>
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
