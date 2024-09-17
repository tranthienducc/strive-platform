"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useTogglePublish } from "@/lib/zustand/store";
import useDialogActions from "@/state/hooks/useDialogActions";
import { useMutation } from "convex/react";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ManageArticleProps {
  article: any;
  params?: { site_id: Id<"sites">; slug: string };
}

const ManageArticle = ({ params, article }: ManageArticleProps) => {
  return (
    <div className="flex justify-end items-center w-full flex-row gap-2">
      <Link
        href={`/cms/sites/${params?.site_id}/preview/${params?.slug}/edit`}
        className="flex flex-row items-center gap-2"
      >
        <Button
          size="sm"
          className="border border-white/15 bg-inherit hover:bg-white/30"
        >
          <Edit className="size-4"></Edit>
        </Button>
      </Link>
      <DialogDeleteArticle article={article} params={params} />
      <DialogPublishArticle article={article} />
    </div>
  );
};

export default ManageArticle;

function DialogDeleteArticle({ article, params }: ManageArticleProps) {
  const { openDialog, closeDialog } = useDialogActions();

  const deleteArticle = useMutation(api.article.deleteArticle);
  const router = useRouter();

  const handleDelete = async (id: Id<"article">) => {
    try {
      await deleteArticle({
        id: id,
      });
      closeDialog();
      router.push(`/cms/sites/${params?.site_id}`);
      toast.success("Delete article successfully");
    } catch (error) {
      console.log(error);
      toast.error("Faild to delete article!");
    }
  };

  return (
    <Dialog onOpenChange={openDialog}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="border border-white/15 bg-inherit hover:bg-white/30"
        >
          <Trash className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-inherit border border-white/15">
        <DialogHeader>
          <DialogTitle className="text-white">Delete Article</DialogTitle>
          <DialogDescription className="text-gray9">
            Are you sure you want to delete this article?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => handleDelete(article._id)}
            size="sm"
            variant={"destructive"}
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DialogPublishArticle({ article }: ManageArticleProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const statusArticle = useMutation(api.article.statusArticle);
  const { setPublishStatus } = useTogglePublish();

  const isPublish = article.published;

  const handleTogglePublishArticle = async (id: Id<"article">) => {
    try {
      await statusArticle({
        id: id,
        published: !isPublish,
      });
      setIsOpen(false);
      setPublishStatus(id, !isPublish);
      toast.success(
        !isPublish ? "Publish successfully" : "Unublish successfully"
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="border border-white/15 bg-inherit hover:bg-white/30"
          size="sm"
        >
          {isPublish ? "Unpublish" : "Publish"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-inherit border border-white/15">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isPublish ? "Unpublish Article" : "Publish Article"}
          </DialogTitle>
          <DialogDescription className="text-gray9">
            Are you sure you want to {isPublish ? "unpublish" : "publish"} this
            article?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-white text-black hover:bg-white/50"
            onClick={() => handleTogglePublishArticle(article._id)}
          >
            Yes, {isPublish ? "Unpublish" : "Publish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
