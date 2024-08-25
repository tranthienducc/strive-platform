import Image from "next/image";
import { planned } from "@/constants/featureConstans";
import Heading from "../Heading";

const Product = () => {
  return (
    <section className="pb-40">
      <Heading
        heading="Features for the future"
        description="Exciting new features, enhanced integrations, and continuous
          improvements to keep you ahead in your productivity journey."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1px] border border-white/10 rounded-xl">
        {planned.map((data, index) => (
          <div
            className="flex flex-col max-w-full w-full py-7 pl-7 border-grid rounded-xl"
            key={index}
          >
            <Image
              src={data.icon}
              alt="keyboards"
              width={500}
              height={500}
              loading="lazy"
              className="size-20 mb-8"
            />
            <h4 className="text-lg text-white font-medium">{data.title}</h4>
            <p className="text-sm font-normal text-gray9 text-balance lg:max-w-[290px] w-full max-w-[240px]">
              {data.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Product;
