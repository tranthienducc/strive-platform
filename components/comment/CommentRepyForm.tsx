"use client";

import { useUserContext } from "@/context/UserContext";
import { FormCommentValues } from "@/utils/types/type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";
import dynamic from "next/dynamic";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const PlateEditor = dynamic(() => import("@/components/editor/PlateEditor"), {
  ssr: false,
  loading: () => <p>Loading editor..</p>,
});

const CommentRepyForm = ({
  comment,
  closeForm,
}: {
  comment: any;
  closeForm: () => void;
}) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const replyComment = useMutation(api.documents.replyComment);
  const { users } = useUserContext();
  const router = useRouter();
  const form = useForm<FormCommentValues>({
    defaultValues: {
      comment: "",
    },
  });

  const commentValue = form.watch("comment");

  const onSubmit: SubmitHandler<FormCommentValues> = async (values) => {
    setIsSubmiting(true);
    if (!users?.id) {
      router.push("/sign-in");
      return;
    }
    try {
      await replyComment({
        content: values.comment as string,
        users: {
          id: users.id,
          name: `${users.firstName} ${users.lastName}`,
          avatar: users.imageUrl,
        },
        parentDocument: comment._id,
      });
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmiting(false);
      closeForm();
    }
  };

  return (
    <div>
      <>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="flex flex-col max-w-full w-full">
                  <FormControl>
                    <PlateEditor
                      placeholder="Reply..."
                      values={field.value}
                      className="h-11"
                      fieldChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-end justify-end mt-3">
              <Button
                type="submit"
                disabled={!commentValue || isSubmiting}
                className="px-4 py-2 bg-white rounded-xl duration-300 hover:bg-white/30 text-sm font-semibold text-black flex items-center justify-center"
              >
                {isSubmiting ? <Spinner /> : "Reply"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </>
    </div>
  );
};

export default CommentRepyForm;
