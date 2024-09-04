"use client";
import React from "react";
import Heading from "../Heading";
import { aboutInfo, innovative } from "@/constants/infoSectionConstants";
import { ArrowRight, Sparkle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useHovered } from "@/state/hooks/useHovered";

const About = () => {
  const { isHovered, ref } = useHovered();
  return (
    <section className="pb-36 flex flex-col items-center justify-center">
      <Heading
        heading="About us"
        description="Our service specializes in providing samples"
      />

      <div className="flex items-center justify-center max-w-full w-full lg:flex-row flex-col gap-5 mb-10">
        {aboutInfo.map((data, index) => (
          <div
            key={index}
            className="max-w-[387px] w-full h-[210px] rounded-[20px] p-[30px] items-center text-center bg-blackOC border border-white/5"
          >
            <h3 className="mb-3 text-xl font-semibold text-white">
              {data.title}
            </h3>
            <p className="text-lg font-medium text-gray9">{data.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-row items-center gap-1 mb-[22px]">
        <Sparkle className="size-5 text-gray9" />
        <span className="text-base font-medium text-gray9">We Believe In</span>
        <Sparkle className="size-5  text-gray9" />
      </div>

      <div
        ref={ref}
        className={cn(
          "flex flex-row items-center gap-2 mb-5  lg:max-w-full w-full max-w-[360px] justify-center",
          isHovered ? "overflow-y-auto" : "overflow-y-hidden"
        )}
      >
        {innovative.map((data, index) => (
          <div
            key={index}
            className="rounded-full text-base border border-white/5 font-normal text-white px-4 py-2 bg-blackOC"
          >
            {data}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-5">
        <Image
          src="/assets/images/clients-avatar-1.webp"
          loading="lazy"
          alt="avatar"
          width={400}
          height={400}
          className="size-12 rounded-full object-cover"
        />

        <button className="flex flex-row items-center gap-x-2 rounded-full px-4 py-5 bg-blackOC border border-white/5">
          <span className="font-medium text-base text-gray9">
            Join Our Team
          </span>
          <ArrowRight className="size-5 text-gray9" />
        </button>
      </div>
    </section>
  );
};

export default About;
