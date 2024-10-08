"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import CommentRepyForm from "./CommentRepyForm";
import { Trash } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserContext } from "@/context/UserContext";
import { Skeleton } from "../ui/skeleton";

const CommentItem = ({
  comment,
  isChild,
}: {
  comment: any;
  isChild?: boolean;
}) => {
  const [showReply, setShowReply] = useState("");
  const deleteComment = useMutation(api.comment.deleteComment);
  const { users } = useUserContext();

  const handleDeleteComment = async (_id: Id<"comment">) => {
    try {
      await deleteComment({
        id: _id,
        users: {
          id: users?.id as string,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!comment) {
    return (
      <div
        className="flex flex-row items-start gap-2"
        style={{
          paddingLeft: isChild ? "52px" : 0,
          marginTop: isChild ? "32px" : 0,
        }}
      >
        <Skeleton className="size-8 rounded-full" />
        <div className="flex-1">
          <div className="px-4 py-2 mb-4">
            <Skeleton className="w-5" />
            <Skeleton className="w-8" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-row items-start gap-2"
      style={{
        paddingLeft: isChild ? "52px" : 0,
        marginTop: isChild ? "32px" : 0,
      }}
    >
      <Image
        src={comment.users.avatar}
        alt="avatar-user"
        width={80}
        height={80}
        className={cn(
          "size-8 rounded-full object-cover",
          !isChild ? "avatar-shadow1" : "avatar-shadow2"
        )}
      />
      <div className="flex-1">
        <div className="px-4 py-2 mb-4">
          <h3
            className={cn(
              "font-bold mb-1 text-white",
              !isChild ? "text-sm font-semibold" : ""
            )}
          >
            {comment.users.name}
          </h3>
          <div
            className="font-medium text-sm leading-loose text-gray9"
            dangerouslySetInnerHTML={{
              __html: comment.content,
            }}
          ></div>
        </div>
        <div className="text-xs text-white font-medium flex items-center gap-3">
          <div className="flex items-center gap-1">
            {IconTime}
            {new Date(comment._creationTime).toLocaleString()}
          </div>
          {!comment?.parentDocument && (
            <div
              role="button"
              className="flex items-center gap-1 hover:text-secondary text-white text-sm font-medium"
              onClick={() =>
                setShowReply((prev) =>
                  prev === comment._id ? "" : comment._id
                )
              }
            >
              {IconsReply}
              <span>Reply</span>
            </div>
          )}
          <Button
            onClick={() => handleDeleteComment(comment._id)}
            className="flex items-center gap-1 hover:text-secondary text-red-400 text-sm font-medium bg-transparent hover:bg-transparent p-0"
          >
            <Trash className="size-4 text-red-400" />
            <span>Delete</span>
          </Button>
        </div>
        {showReply === comment._id && (
          <CommentRepyForm
            comment={{
              ...comment,
            }}
            closeForm={() => setShowReply("")}
          />
        )}
      </div>
    </div>
  );
};

export default CommentItem;

const IconTime = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
    />
  </svg>
);

const IconsReply = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
    />
  </svg>
);
