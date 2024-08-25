import { HeadingType } from "@/utils/types/type";
import React from "react";

const Heading = ({ heading, description }: HeadingType) => {
  return (
    <div className="flex text-center items-center flex-col mb-16">
      <h4 className="text-4xl lg:text-[54px] font-semibold text-white mb-4">
        {heading}
      </h4>
      <p className="text-sm lg:text-base text-gray9 font-normal max-w-[300px] lg:max-w-[640px] w-full">
        {description}
      </p>
    </div>
  );
};

export default Heading;
