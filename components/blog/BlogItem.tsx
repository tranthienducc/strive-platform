import React from "react";
import { Button } from "../ui/button";
import { Waypoints } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Link from "next/link";

const BlogItem = () => {
  return (
    <div className="max-w-[672px] w-full text-white">
      <h2 className="text-2xl text-center font-semibold text-white">
        What will you ship?
      </h2>
      <p className="text-base font-normal text-center text-gray9">
        September 2024
      </p>

      <Button className="rounded-full bg-[#1f2025] size-10 mb-10">
        <Waypoints className="w-full h-full text-white" />
      </Button>

      <Image
        src="/assets/images/bento-img3.webp"
        alt="blog-thumb"
        width={1300}
        height={1300}
        priority={true}
        className="max-w-full w-full h-[378px] rounded-xl border border-white/25 object-cover mb-7"
      />

      <p className="text-sm font-normal text-[#ededed] mb-5 text-balance leading-[28px]">
        But what elements of an interface are largely universally experienced?
        The page speed, legible typography, information honesty, layout
        stability and scannability, accessible focus states, auditory feedback,
        and sensible DOM ordering. Alas, primitives such as performance and
        accessibility are not as glamorous or fruitful to obsess over — because
        seemingly, they are invisible, and thus are trivial to trade off when it
        comes to shipping quickly. Truthfully, I would much rather spend time on
        polishing that animation spring over tracking down what made the initial
        load so slow. But is having a slow website with immaculate attention to
        visual craft desirable?
      </p>
      <Separator className="bg-white/15 mb-7" />

      <div className="flex flex-row flex-wrap justify-between w-full">
        <Link href="/" className="flex flex-col gap-0 items-start">
          <div className="text-sm font-normal text-gray9">Previous</div>
          <span className="text-sm font-semibold text-white">
            CMS web inspiration
          </span>
        </Link>
        <Link href="/" className="flex flex-col gap-0 items-start">
          <div className="text-sm font-normal text-gray9">Next</div>
          <span className="text-sm font-semibold text-white">
            Ecommence is the best practice
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
