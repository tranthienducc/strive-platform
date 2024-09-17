"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Trash } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

interface DialogDeleteOrderProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  data: any;
  onSuccess?: () => void;
}

const DialogDeleteOrder = ({
  data,
  onSuccess,
  ...props
}: DialogDeleteOrderProps) => {
  const deleteOrder = useMutation(api.order.deleteOrders);
  const [isSubmiting, setIsSubmiting] = React.useState(false);

  const onDelete = async () => {
    setIsSubmiting(true);
    try {
      await deleteOrder({
        id: data._id,
      });

      props.onOpenChange?.(false);
      toast.success("Order deleted");
      onSuccess?.();
    } catch (error) {
      console.log(error);
      toast.error("Fail to delete order.");
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button className="text-white p-0 bg-transparent w-full flex items-start flex-row justify-start hover:bg-transparent">
          <Trash className="mr-2 size-4 text-white" aria-hidden={true} />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black border border-white/15">
        <DialogHeader>
          <DialogTitle className="text-white">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-gray9">
            This action cannot be undone. This will permanently delete your{" "}
            order from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button className="bg-black border border-white/15">Cancel</Button>
          </DialogClose>
          <Button
            aria-label="Delete selected rows"
            variant={"destructive"}
            onClick={onDelete}
            disabled={isSubmiting}
          >
            {isSubmiting && <Spinner />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDeleteOrder;
