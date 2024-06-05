import { ChevronRight } from "lucide-react";
import React from "react";
import TemplatesItem from "./template-item";
import Link from "next/link";

const TemplateList = () => {
  return (
    <>
      <div className="flex flex-row gap-x-4 items-center pb-8">
        <p className="text-xl font-normal text-white">Effort Templates</p>
        <div className="flex flex-row gap-x-[2px] items-center">
          {/* Dẫn tới page /templates , show tất cả template hiện có, có tính năng filter */}
          <Link
            href="/explore-template"
            className="text-base font-medium text-gray9 hover:text-white duration-300"
          >
            Explore all
          </Link>
          <ChevronRight className="text-gray9 w-6 h-6" />
        </div>
      </div>

      <TemplatesItem />
    </>
  );
};

export default TemplateList;
