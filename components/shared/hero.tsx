import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Spotlight } from "../animations/Spotlight";
import AnimatedShinyText from "../animations/AnimatedShinyText";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import { features } from "@/constants/featureConstans";

const Hero = () => {
  return (
    <section className="flex flex-col mb-44 mt-14 items-center">
      <Spotlight />
      <div className="z-10 flex mb-5 items-center justify-center">
        <div
          className={cn(
            "group rounded-full border border-white/10 bg-[#FCFCFC14] text-sm text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-600 "
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span className="text-white">✨ Lenas release version v1 now.</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>
      </div>
      <div className="text-center flex flex-col items-center max-w-[950px] w-full mb-[62px]">
        <h1 className="text-6xl font-semibold mb-6 bg-gradient-text">
          Unlock project potential for greater productivity
        </h1>
        <div className="mb-6 max-w-3xl w-full">
          <p className="text-base font-normal text-gray9">
            Deliver quality {"  "}
            <Link
              href="/templates"
              className="text-white text-xl font-semibold whitespace-nowrap inline-flex gap-x-2"
            >
              <Image
                src="/assets/icons/t-icon.webp"
                alt="t-icon"
                width={1300}
                height={1300}
                className="size-6"
              />
              Template
            </Link>
            , source inspiration. Suitable for customers such as designers or
            developers, fostering creativity and accelerating growth. Final.
          </p>
        </div>
        <div className="flex flex-row gap-x-6">
          <Link
            href="/explore-template"
            className="bg-white px-4 py-2 rounded-3xl text-black text-base font-medium"
          >
            Started buy template
          </Link>
          <button className="border border-white/10 text-base font-medium text-white rounded-3xl px-4 py-2">
            All-Access Pass
          </button>
        </div>
      </div>
      <BentoGrid className="lg:grid-cols-3 grid gap-2">
        {features.map((feature) => (
          <BentoCard {...feature} key={feature.name} />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Hero;
