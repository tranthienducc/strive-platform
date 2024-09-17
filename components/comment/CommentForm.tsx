"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserContext } from "@/context/UserContext";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import CommentItem from "./CommentItem";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import dynamic from "next/dynamic";

const TiptabEditor = dynamic(() => import("@/components/editor/TiptabEditor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const CommentForm = ({
  _id,
  title,
}: {
  _id?: Id<"inspirations">;
  title?: string;
}) => {
  const comments = useQuery(api.comment.getCommentInspiration);
  const createComment = useMutation(api.comment.createComment);
  const { users } = useUserContext();
  const router = useRouter();
  const [isSubmiting, setIsSubmiting] = useState(false);

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

  const html = editor?.getHTML();

  const handleSubmitComments = async () => {
    setIsSubmiting(true);
    if (!users?.id) {
      router.push("/sign-in");
      return;
    }
    try {
      const response = await createComment({
        content: html,
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
      editor?.commands.clearContent();
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <>
      <TiptabEditor
        editor={editor}
        className="text-white min-h-[150px] h-full border border-white/20 w-full p-4 rounded-xl"
      />
      <div className="flex items-end justify-end mt-5">
        <Button
          type="submit"
          onClick={handleSubmitComments}
          className="px-4 py-2 bg-white rounded-xl duration-300 hover:bg-white/30 text-sm font-semibold text-black flex items-center justify-center"
        >
          {isSubmiting ? <Spinner /> : "Post"}
        </Button>
      </div>
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
