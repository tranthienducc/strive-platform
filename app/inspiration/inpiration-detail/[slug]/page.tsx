"use client";
import { DialogFeedback, DialogShare } from "@/components/common/index";
import { api } from "@/convex/_generated/api";
import parse from "html-react-parser";
import { InspirationType } from "@/utils/types/type";
import { useQuery } from "convex/react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Key } from "react";

const DetailInspiration = () => {
  const inspiration = useQuery(
    api.documents.getById
  ) as any as InspirationType[];
  const searchParams = useSearchParams();
  const inspirationParams = searchParams.get("slug");

  const trimInspirationParams = String(inspirationParams).trim();

  const inspirationList = inspiration?.find((item) => {
    const productSlug = item.slug;
    return trimInspirationParams === productSlug;
  });

  const { title, coverImage, description } = inspirationList || {};

  const filterInspiration = inspiration?.filter(
    (data) => data.slug !== trimInspirationParams
  );

  return (
    <>
      <div className="mt-20 px-5 lg:px-[244px] pb-10">
        <Link
          href="/inspiration"
          className="flex flex-row gap-x-2 mb-5 items-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <p className="text-sm font-medium text-gray9">Back to inspiration</p>
        </Link>
        <h1 className="heading-1">{title}</h1>
        <div className="flex flex-row justify-between items-center mb-6">
          <div className="flex flex-row gap-x-3 items-center">
            <Image
              src="/assets/images/avatar.png"
              alt="avatar"
              width={300}
              height={300}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col gap-1 text-start">
              <h5 className="text-sm font-semibold text-white">
                Tran Thien Duc
              </h5>
              <p className="text-xs font-medium text-white">Admin</p>
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
          src={coverImage || "/assets/images/404-page.webp"}
          alt="bg-dashboard"
          width={1500}
          height={1500}
          className="w-full h-[500px] rounded-lg object-cover mb-14"
        />

        <p className="descripion-1">{parse(description ?? "")} </p>

        <div className="flex items-center justify-center gap-x-3">
          <DialogFeedback />
          <DialogShare />
        </div>
        <h3 className="pt-10 text-sm font-medium text-white mb-4">
          You might also like
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 col-span-2 gap-9">
          {filterInspiration &&
            filterInspiration?.map((item: InspirationType, index: Key) => (
              <React.Fragment key={index}>
                <div className="max-w-full lg:max-w-[315px] w-full flex flex-col gap-y-3">
                  <Link
                    href={`/inspiration/inpiration-detail/inspiration?slug=${item.slug}`}
                  >
                    <Image
                      src={item.coverImage || "/assets/images/404-page.webp"}
                      alt="emty"
                      width={1300}
                      height={300}
                      className="w-full h-[236px] object-cover rounded-xl"
                    />
                  </Link>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-x-2 items-center">
                      <Image
                        src="/assets/images/avatar.png"
                        alt="avatar"
                        width={300}
                        height={300}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-medium text-white">
                        Tran Thien Duc
                      </span>
                      <Link
                        href="/pricing"
                        className="uppercase px-1 py-0 rounded-md bg-white text-xs font-medium text-black"
                      >
                        pro
                      </Link>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </>
  );
};

export default DetailInspiration;
