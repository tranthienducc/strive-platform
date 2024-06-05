import Image from "next/image";
import Title from "../title";
import { ArrowRight } from "lucide-react";
import Checkbox from "../checkbox";
import Link from "next/link";

const Pricing = () => {
  return (
    <section className="pb-40">
      <div className="flex items-center flex-col mb-8">
        <Title>Pricing</Title>
        <h4 className="text-[54px] font-semibold text-white mb-4">
          All-Access
        </h4>
        <p className="text-sm text-gray9 font-normal max-w-[463px] w-full text-center">
          Get unlimited access to our full collection of templates, may be an
          backgrounds, mockups, fonts in future and more and take your workflow
          to the next level.
        </p>
      </div>

      <div className="flex flex-row gap-x-4 justify-center items-center">
        <div className="bg-gradient-conic max-w-[360px] w-full rounded-xl border border-gray-800 px-6 py-6">
          <Image
            src="/assets/icons/month-pricing.svg"
            alt="month-pricing"
            width={700}
            height={700}
            className="w-[52px] h-[52px] mb-4"
          />
          <div className="flex flex-col gap-y-1 mb-4 ">
            <h4 className="text-lg font-medium text-[#f0f0f0]">Month</h4>
            <p className="text-4xl text-white font-semibold">$39/mo</p>
            <span className="text-xs font-light text-gray9">Billed Month</span>
          </div>
          <div className="max-w-[312px] bg-[#ffffff1a] h-[1px] mb-4" />

          <div className="flex flex-col gap-y-2 mb-4">
            <Checkbox>Access all products</Checkbox>
            <Checkbox>Unlimited downloads</Checkbox>
            <Checkbox>Lifetime license</Checkbox>
            <Checkbox>Access upcoming releases</Checkbox>
          </div>

          <Link
            href="/"
            className="flex flex-row gap-x-2 bg-white rounded-xl max-w-[312px] w-full h-[44px] items-center py-[14px] px-28 text-black"
          >
            <p className="text-sm font-medium">Subscribe</p>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-gradient-conic max-w-[360px] w-full rounded-xl border border-gray-800 px-6 py-6">
          <div className="flex flex-row justify-between items-start">
            <Image
              src="/assets/icons/year-pricing.svg"
              alt="month-pricing"
              width={700}
              height={700}
              className="w-[52px] h-[52px] mb-4"
            />
            <h5 className="py-1 px-3 rounded-full text-white border border-gray-800 text-xs font-medium bg-gradient-conic">
              Most Popular
            </h5>
          </div>
          <div className="flex flex-col gap-y-1 mb-4 ">
            <h4 className="text-lg font-medium text-[#f0f0f0]">Year</h4>
            <p className="text-4xl text-white font-semibold">$40/mo</p>
            <span className="text-xs font-light text-gray9">Billed Yearly</span>
          </div>
          <div className="max-w-[312px] bg-[#ffffff1a] h-[1px] mb-4" />

          <div className="flex flex-col gap-y-2 mb-4">
            <Checkbox>Access all products</Checkbox>
            <Checkbox>Unlimited downloads</Checkbox>
            <Checkbox>Lifetime license</Checkbox>
            <Checkbox>Access upcoming releases</Checkbox>
          </div>

          <Link
            href="/"
            className="flex flex-row gap-x-2 bg-white rounded-xl max-w-[312px] w-full h-[44px] items-center py-[14px] px-28 text-black"
          >
            <p className="text-sm font-medium ">Subscribe</p>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
