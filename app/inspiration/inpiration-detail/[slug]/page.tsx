"use client";
import { Header } from "@/components/shared";
import { api } from "@/convex/_generated/api";
import { InspirationType } from "@/utils/types/type";
import { useQuery } from "convex/react";
import { ArrowLeft, Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const DetailInspiration = () => {
  const inspiration = useQuery(
    api.documents.getById
  ) as any as InspirationType[];
  const { slug: inspirationParams } = useParams();

  const trimInspirationParams = String(inspirationParams).trim();

  const inspirationList = inspiration?.find((item) => {
    const productSlug = item._id;
    return trimInspirationParams === productSlug;
  });

  const { name, title, coverImage, description } = inspirationList || {};

  return (
    <>
      <Header></Header>

      <div className="mt-12 px-[244px] pb-10">
        <Link
          href="/inspiration"
          className="flex flex-row gap-x-2 mb-5 items-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <p className="text-sm font-medium text-gray9">Back to inspiration</p>
        </Link>
        <h1 className="text-2xl font-semibold text-white mb-6">{title}</h1>
        <div className="flex flex-row justify-between items-center mb-6">
          <div className="flex flex-row gap-x-1 items-center">
            <Image
              src="/assets/images/avatar.png"
              alt="avatar"
              width={300}
              height={300}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col gap-y-[2px] items-baseline">
              <h5 className="text-sm font-semibold text-white pl-[14px]">
                {name}
              </h5>
              <span className="text-xs font-medium flex flex-row  text-green-400 items-center">
                <Dot className="w-8 h-8 animate-pulse" />
                Available for work
              </span>
            </div>
          </div>

          <Link
            href="/contact"
            className="rounded-full bg-white text-black hover:bg-white/70 text-sm font-semibold px-5 py-3"
          >
            Get in touch
          </Link>
        </div>

        <Image
          src={coverImage || "/assets/images/404-page.png"}
          alt="bg-dashboard"
          width={1500}
          height={1500}
          className="w-full h-[500px] rounded-[8px] object-cover mb-14"
        />

        <p className="text-base font-normal text-gray9 mb-8">{description}</p>
        <h3 className="pt-10 text-sm font-medium text-white mb-4">
          You might also like
        </h3>
        <div className="grid grid-cols-3 col-span-2 gap-9">
          <div className="max-w-[315px] w-full flex flex-col gap-y-3">
            <Image
              src={coverImage || "/assets/images/404-page.png"}
              alt="emty"
              width={1300}
              height={300}
              className="w-full h-[236px] object-cover rounded-xl"
            />
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-x-2 items-center">
                <Image
                  src="/assets/images/avatar.png"
                  alt="avatar"
                  width={300}
                  height={300}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm font-medium text-white">Denoos</span>
                <Link
                  href="/pricing"
                  className="uppercase px-1 py-0 rounded-md bg-white text-xs font-medium text-black"
                >
                  pro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailInspiration;
