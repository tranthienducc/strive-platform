import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import parse from "html-react-parser";

const BlogPostPage = () => {
  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex text-black"
        )}
      >
        <ChevronLeft className="mr-2 size-4" />
        See all posts
      </Link>
      <div>
        <p className="block text-sm text-gray9">Published on</p>
        <h1 className="scroll-m-20 text-3xl font-bold pt-4 tracking-tight lg:text-3xl">
          title
        </h1>
        <div className="mt-4 flex items-center space-x-3">
          <Image
            src="/assets/images/bento-img1.webp"
            alt="bento"
            width={32}
            height={42}
            className="rounded-full bg-white"
          />
          <div className="flex flex-col text-left leading-tight">
            <p className="font-medium text-white">name</p>
            {/* Facebook author */}
            <Link href={`https://www.facebook.com/`} target="_blank">
              <p className="text-xs text-gray9 font-semibold hover:underline cursor-pointer">
                Tranthienduc
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Image
        src="/assets/image/bento-img3.webp"
        alt="bento"
        priority={true}
        width={720}
        height={405}
        className="my-8 rounded-md border bg-muted transition-colors"
      />
      {parse("description")}
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
          <ChevronLeft className="mr-2 h-4 w-4 text-black" />
          See all posts
        </Link>
      </div>
    </article>
  );
};

export default BlogPostPage;
