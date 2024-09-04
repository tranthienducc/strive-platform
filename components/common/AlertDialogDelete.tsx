import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Trash } from "lucide-react";

const AlertDialogDelete = ({ onClick }: { onClick: () => void }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="bg-transparent border border-red-500 rounded-md size-6 flex items-center justify-center">
          <Trash className="text-white size-4" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black border border-white/15 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely delete ?</AlertDialogTitle>
          <AlertDialogDescription className="text-sm font-medium text-gray9">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent border border-inherit text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-white text-black"
            onClick={() => onClick()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogDelete;
