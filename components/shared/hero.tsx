import {
  ArrowUpRight,
  FastForward,
  MousePointerClick,
  PencilLine,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col mb-44 items-center">
      <div className=" rounded-full px-3 py-[6px] bg-white shadow-md mb-[10px]">
        <div className="flex flex-row gap-x-2 ">
          <Sparkles className="w-4 h-4 text-black" />
          <p className="text-xs font-normal bg-white text-[#475569]">
            Strive released V1 on June
          </p>

          <Link href="/" className="text-[#3b82f6] text-xs font-normal">
            Changelog
          </Link>
          <ArrowUpRight className="w-4 h-4 text-[#3b82f6]" />
        </div>
      </div>
      <div className="text-center flex flex-col items-center max-w-[950px] w-full mb-[62px]">
        <h1 className="text-6xl font-semibold mb-6 text-white">
          Unlock project potential for greater productivity{" "}
          <span className="bg-gradient-text">improvements.</span>
        </h1>
        <p className="text-base font-normal mb-6 max-w-[605px] w-full text-gray9">
          Ultimate Strive template to turn your website into a powerful
          money-making machine. Sell ​​digital products easily and beautifully,
          powered by Strive.
        </p>

        <div className="flex flex-row gap-x-6">
          <div className="flex flex-row gap-x-3 items-center text-gray9">
            <PencilLine className="w-5 h-5" />
            <span className="text-base font-normal">Easily Customizable</span>
          </div>
          <div className="flex flex-row gap-x-3 items-center text-gray9">
            <FastForward className="w-5 h-5" />
            <span className="text-base font-normal">Lightning Fast</span>
          </div>
          <div className="flex flex-row gap-x-3 items-center text-gray9">
            <MousePointerClick className="w-5 h-5" />
            <span className="text-base font-normal">One-Click Download</span>
          </div>
        </div>
      </div>
      <div className="max-w-[1225px] w-full h-[600px] items-center rounded-lg">
        <Image
          src="/assets/images/hero-img.png"
          alt="hero-img"
          className="w-full h-full object-cover rounded-lg"
          width={1300}
          height={1300}
        />
      </div>
    </section>
  );
};

export default Hero;
