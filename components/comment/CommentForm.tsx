"use client";
import dynamic from "next/dynamic";
import React, { useCallback, useState } from "react";
import { FormControl, FormItem, FormMessage } from "../ui/form";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FormCommentValues } from "@/utils/types/type";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserContext } from "@/context/UserContext";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import CommentItem from "./CommentItem";
import { Skeleton } from "../ui/skeleton";

const PlateEditor = dynamic(() => import("@/components/editor/PlateEditor"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[150px]" />,
});

const CommentForm = ({
  _id,
  title,
}: {
  _id?: Id<"inspirations">;
  title?: string;
}) => {
  const comments = useQuery(api.documents.getCommentInspiration);
  const createComment = useMutation(api.documents.createComment);
  const { users } = useUserContext();
  const router = useRouter();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isCommentEmty, setIsCommentEmty] = useState(true);

  const form = useForm<FormCommentValues>({
    defaultValues: {
      comment: "",
    },
  });

  const checkIfEmty = useCallback((content: string) => {
    const strippedContent = content.replace(/<[^>]*>/g, "").trim();
    return strippedContent === "";
  }, []);

  const handleEditorChange = useCallback(
    (value: string, fieldOnChange: (value: string) => void) => {
      fieldOnChange(value);
      setIsCommentEmty(checkIfEmty(value));
    },
    [checkIfEmty]
  );

  const handleSubmitComments: SubmitHandler<FormCommentValues> = async (
    values
  ) => {
    setIsSubmiting(true);
    if (!users?.id) {
      router.push("/sign-in");
      return;
    }
    try {
      await createComment({
        content: values.comment as string,
        users: {
          id: users?.id as string,
          name: `${users?.firstName} ${users?.lastName}`,
          avatar: users?.imageUrl as string,
        },
        inspirations: {
          id: _id as Id<"inspirations">,
          title: title as string,
        },
      });
      form.reset();
      setIsCommentEmty(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitComments)}>
          <Controller
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="flex flex-col max-w-full w-full">
                <FormControl>
                  <PlateEditor
                    placeholder="Comment..."
                    values={field.value}
                    className="h-[150px]"
                    fieldChange={(value) =>
                      handleEditorChange(value, field.onChange)
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <div className="flex items-end justify-end mt-3">
            <Button
              type="submit"
              disabled={isCommentEmty || isSubmiting}
              className="px-4 py-2 bg-white rounded-xl duration-300 hover:bg-white/30 text-sm font-semibold text-black flex items-center justify-center"
            >
              {isSubmiting ? <Spinner /> : "Post"}
            </Button>
          </div>
        </form>
      </FormProvider>
      <div className="grid grid-cols-1 gap-3">
        {comments
          ?.filter((c) => !c.parentDocument)
          .map((comment) => (
            <div key={comment._id}>
              <CommentItem comment={comment} />
              {comments
                .filter((c) => c.parentDocument === comment._id)
                .map((reply) => (
                  <CommentItem key={reply._id} comment={reply} isChild />
                ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentForm;
