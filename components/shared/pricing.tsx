import Link from "next/link";
import Checkbox from "../checkbox";
import { PRICING_DATA } from "@/constants/data";
import { cn } from "@/lib/utils";
import Heading from "../Heading";

const Pricing = () => {
  return (
    <section className="pb-40">
      <Heading
        heading="All-Access"
        description="Get unlimited access to our full collection of templates, may be an
          backgrounds, mockups, fonts in future and more and take your workflow
          to the next level."
      />

      <div className="flex flex-row gap-x-4 justify-center items-center">
        {PRICING_DATA.map((data, index) => (
          <div
            className={cn(
              "max-w-[412px] w-full min-h-[760px] h-full rounded-3xl bg-[#0C0C0F] border border-[#1D2021] flex flex-custom flex-col flex-wrap gap-8 p-10",

              index === 1 ? "border-white/30" : "border-[#1D2021]"
            )}
            key={index}
          >
            <div className="flex-col flex flex-nowrap gap-4">
              <div className="flex flex-row justify-between items-start">
                {data.icon}
                <p className="text-sm font-normal text-white">{data.kind}</p>
              </div>
              <h3 className="text-2xl font-medium text-white">{data.title}</h3>
            </div>
            <div className="flex flex-col flex-wrap gap-2">
              <span className="text-xs font-normal text-gray9">
                {data.desc1}
              </span>
              <p className="text-[40px] font-semibold text-white">
                {data.price}
              </p>
              <span className="text-xs font-normal text-gray9">
                {data.desc2}
              </span>
            </div>
            <Link
              href="/pricing"
              className="bg-[#1D2021] rounded-[40px] flex flex-nowrap items-center justify-center py-[14px] px-5 text-base font-normal text-white"
            >
              Get started
            </Link>
            <div className="bg-[#1D2021] h-[1px]"></div>
            <div className="flex flex-col gap-y-4">
              {data.interest.map((item, index) => (
                <div className="flex flex-row gap-x-8" key={index}>
                  <Checkbox>{item}</Checkbox>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
