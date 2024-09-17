"use client";

import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import dynamic from "next/dynamic";

const TiptabEditor = dynamic(() => import("@/components/editor/TiptabEditor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const CommentRepyForm = ({
  comment,
  closeForm,
}: {
  comment: any;
  closeForm: () => void;
}) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const replyComment = useMutation(api.comment.replyComment);
  const { users } = useUserContext();
  const router = useRouter();

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

  const onSubmit = async () => {
    setIsSubmiting(true);
    if (!users?.id) {
      router.push("/sign-in");
      return;
    }
    try {
      await replyComment({
        content: html,
        users: {
          id: users.id,
          name: `${users.firstName} ${users.lastName}`,
          avatar: users.imageUrl,
        },
        parentDocument: comment._id,
      });
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
        <TiptabEditor
          editor={editor}
          className="text-white min-h-[100px] h-full border border-white/20 w-full p-4 rounded-xl"
        />

        <div className="flex items-end justify-end mt-3">
          <Button
            type="submit"
            onClick={onSubmit}
            className="px-4 py-2 bg-white rounded-xl duration-300 hover:bg-white/30 text-sm font-semibold text-black flex items-center justify-center"
          >
            {isSubmiting ? <Spinner /> : "Reply"}
          </Button>
        </div>
      </>
    </div>
  );
};

export default CommentRepyForm;
