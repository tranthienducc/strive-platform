"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Bell } from "lucide-react";
import { multiFormatDateString } from "@/utils";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const NotificationPanel = () => {
  const notifications = useQuery(api.documents.getNotifiById);
  return (
    <Popover>
      <PopoverTrigger>
        <Bell className="w-5 h-5 text-gray9" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-0 shadow-sm bg-grayDark border-opacity-10 border-gray-200"
      >
        <div className="p-3 font-bold text-base border-b border-b-gray-200 border-opacity-10 text-white">
          Notification
        </div>
        {notifications?.length ? (
          <div className="p-3  max-h-[300px] overflow-y-auto">
            {notifications?.map((el: any) => (
              <div
                className="flex items-baseline gap-3 text-sm font-medium pb-3 mb-3 border-b border-b-gray-100 border-dashed dark:border-opacity-10 last:mb-0 last:pb-0 last:border-b-0"
                key={el._id}
              >
                <span className="rounded-full size-2 bg-green-500 flex-shrink-0"></span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-white text-sm">System</h3>
                    <span className="block size-1 rounded-full bg-gray-600"></span>
                    <span className="text-slate-500 text-xs">
                      {multiFormatDateString(el._creationTime)}
                    </span>
                  </div>
                  <div className="text-slate-300">
                    User <span className="font-bold">{el.userName}</span>{" "}
                    purchased template{" "}
                    <span className="font-bold">{el.templateName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray9 font-normal">No notifications yet</p>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPanel;
