import { TracingBeam } from "@/components/animations/TrackingBeem";
import BlogItem from "@/components/blog/BlogItem";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const BlogDetailPage = () => {
  return (
    <div className="h-screen mt-32 pl-14 mb-48 lg:pl-[161px]">
      <Link href="/blog" className="bg-[#1f2025] hover:bg-gray-400">
        <ArrowLeft className="size-4 text-white" />
      </Link>
      <TracingBeam>
        <BlogItem></BlogItem>
      </TracingBeam>
    </div>
  );
};

export default BlogDetailPage;
