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
import { useMutation } from "convex/react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteSite = ({ site_id }: { site_id: Id<"sites"> }) => {
  const router = useRouter();
  const deleteSite = useMutation(api.sites.deleteSite);

  const onDeleteSite = async (site_id: Id<"sites">) => {
    try {
      await deleteSite({
        id: site_id,
      });
      toast.success("Delete site successfully.");
      router.push("/cms");
    } catch (error) {
      console.log(error);
      toast.error("Error occured");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-white text-black">
          <Trash className="mr-2 size-4" />
          Delete Site
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your site
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onDeleteSite(site_id)} variant={"destructive"}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSite;
