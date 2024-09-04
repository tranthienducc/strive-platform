import Image from "next/image";
import { planned } from "@/constants/featureConstans";
import Heading from "../Heading";
import { MapPin } from "lucide-react";

const Product = () => {
  return (
    <section className="pb-40 max-w-full w-full flex flex-col items-center justify-center">
      <Heading
        heading="Features for the future"
        description="Exciting new features, enhanced integrations, and continuous
          improvements to keep you ahead in your productivity journey."
      />

      <div className="grid gap-[1px] grid-cols-mansory max-w-[793px] w-full rounded-xl">
        <div className="aspect-video col-span-2 flex flex-col justify-between py-7 pl-7 relative overflow-hidden  border-grid">
          <div className="max-w-sm flex flex-col items-start">
            <h3 className="text-balance max-w-2xl text-[1.375rem] font-medium text-white">
              Templates sales service
            </h3>
            <p className="max-w-2xl text-gray9 text-balance text-[1.375rem] font-normal">
              The service provides beautiful and inspiring designs worldwide.
            </p>
          </div>

          <div className="flex flex-col gap-1 uppercase tracking-wide text-[.688rem]">
            <div className="font-semibold text-gray9">Edge location</div>
            <div className="flex flex-row items-center gap-2">
              <MapPin className="size-3 text-white" />
              <span className="text-white">can tho city, vn</span>
            </div>
          </div>

          <Image
            priority={true}
            alt="earth-abstract"
            width={1300}
            height={1300}
            className="aspect-square absolute bottom-0 -right-[163px] h-[558.16px] w-auto overflow-hidden mix-blend-screen -top-[57px]"
            src="/assets/images/earth-abstract.png"
          />
        </div>

        {planned.map((data, i) => (
          <div
            className="relative col-span-1 border-grid  p-7 flex flex-col gap-4"
            key={i}
          >
            {data.icon}
            <div className="flex flex-col max-w-60 items-start">
              <h3 className="text-balance max-w-2xl font-medium text-base text-white">
                {data.title}
              </h3>
              <p className="text-balance max-w-xl text-gray9 text-base">
                {data.desc}
              </p>
            </div>
          </div>
        ))}
        <div className="border-grid p-7 col-span-2 flex flex-col overflow-hidden">
          <div className="max-w-sm flex flex-col items-start mb-5">
            <h3 className="text-balance max-w-2xl text-[1.375rem] font-medium text-white">
              Monitoring inspirations
            </h3>
            <p className="max-w-2xl text-gray9 text-balance text-[1.375rem] font-normal">
              Preview, orders, and future may have CMS for your create web.
            </p>
          </div>

          <div
            className="flex items-center justify-center pointer-events-none relative"
            role="img"
          >
            <Image
              priority={true}
              alt="mac-os-frame"
              width={500}
              height={500}
              className="w-[448px] h-[243px] object-cover rounded-xl flex-shrink-0"
              src="/assets/images/mac-os-frame.png"
            />
            <Image
              priority={true}
              alt="mac-os-frame"
              width={500}
              height={500}
              className="w-[448px] h-[243px] object-cover rounded-xl absolute left-[12.25rem] top-9 border border-white/15"
              src="/assets/images/inspiration-detail-page.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
