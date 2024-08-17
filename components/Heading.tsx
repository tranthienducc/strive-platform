import { HeadingType } from "@/utils/types/type";
import React from "react";

const Heading = ({ heading, description }: HeadingType) => {
  return (
    <div className="flex items-center flex-col mb-16">
      <h4 className="text-[54px] font-semibold text-white mb-4">{heading}</h4>
      <p className="text-sm text-gray9 font-normal max-w-[640px] w-full text-center">
        {description}
      </p>
    </div>
  );
};

export default Heading;
