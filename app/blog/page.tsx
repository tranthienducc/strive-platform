import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = () => {
  return (
    <div className="mt-20 px-5 lg:px-[100px] pb-10">
      <h2 className="text-4xl font-semibold text-white mb-10">Blog</h2>
      <div className="flex flex-row items-center gap-[60px] mb-[120px]">
        <Image
          src="/assets/images/bento-img2.webp"
          alt="thumb-img"
          width={1000}
          height={1000}
          priority={true}
          className="max-w-[804px] w-full h-[406px] rounded-[8px] border border-white/25 hover:opacity-75 object-cover"
        />

        <div className="max-w-[536px] w-full flex flex-col gap-[21px] items-start">
          <p className="text-sm font-normal text-blue-400">Inspiration</p>
          <Link href="/" className="text-4xl font-semibold text-white">
            8 engaging websites that nail parallax scrolling
          </Link>

          <p className="text-lg text-balance font-normal text-gray9">
            Have you ever landed on a website and found yourself fully immersed,
            as if the page was pulling you in? Chances are, these websites have
            used parallax scrolling—a popular web design technique where layers
            of content shift and move, creating a sense of depth that draw you
            in.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[30px]">
        {Array(6)
          .fill(0)
          .map((_item, index) => (
            <BlogCard key={index} path="/blog/abc" />
          ))}
      </div>
    </div>
  );
};

export default BlogPage;

function BlogCard({ path }: { path: string }) {
  return (
    <div className="max-w-[447px] w-full h-[349px]">
      <Image
        src="/assets/images/bento-img4.webp"
        alt="thumb-img"
        width={1000}
        height={1000}
        priority={true}
        className="w-full h-[251px] object-cover rounded-[8px] border border-white/15 mb-[23px] hover:opacity-75"
      />
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1 items-start">
          <Link
            href={path}
            className="text-base font-semibold text-white whitespace-nowrap"
          >
            15 Standout portfolio website examples in Strive
          </Link>
          <p className="text-sm font-normal text-gray9">Inspiration</p>
        </div>
        <Image
          src="/assets/images/clients-avatar-2.webp"
          alt="avatar-img"
          width={500}
          height={500}
          className="size-8 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
