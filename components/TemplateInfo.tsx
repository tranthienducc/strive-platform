import { pages, supports } from "@/constants/data";

import { ChildrenType } from "@/utils/types/type";
import { Earth } from "lucide-react";
import React from "react";

const TemplateInfo = ({ createAt }: { createAt: number }) => {
  return (
    <div className="max-w-[400px] w-full space-y-10">
      <div className="space-y-5">
        <HeadingTemplate>Pages</HeadingTemplate>

        <div className="flex flex-wrap gap-[.625rem]">
          {pages.map((data, index) => (
            <div
              key={index}
              className="py-1 px-2 bg-black22 rounded-md flex flex-row items-center gap-x-2"
            >
              <Earth className="size-3 text-gray9" />
              <p className="text-xs lg:text-sm whitespace-nowrap font-semibold text-gray9">
                {data.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <HeadingTemplate>Support</HeadingTemplate>

        <div className="flex flex-col gap-y-3">
          {supports.map((data, index) => (
            <div className="flex flex-row items-center gap-x-2" key={index}>
              {data.icon}
              <p className="text-xs lg:text-sm font-medium text-white">
                {data.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm font-normal text-gray9">
        Published {new Date(createAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default TemplateInfo;

function HeadingTemplate({ children }: ChildrenType) {
  return <h6 className="text-[22px] font-semibold text-white">{children}</h6>;
}
