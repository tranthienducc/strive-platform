"use client";
import { DialogFeedback, DialogShare } from "@/components/common/index";
import { api } from "@/convex/_generated/api";
import parse from "html-react-parser";
import { InspirationType } from "@/utils/types/type";
import { useQuery } from "convex/react";
import { ArrowLeft, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Key } from "react";
import SaleProductPayment from "@/app/checkout/[slug]/_component/SaleProductPayment";
import { Button } from "@/components/ui/button";
import TemplateInfo from "@/components/TemplateInfo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { accordianData } from "@/constants/data";
import { Metadata } from "next";
import { getInspirations } from "@/state/functions";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const filterInspirations = await getInspirations(slug);

  return {
    title: filterInspirations?.title,
    description: filterInspirations?.description,
    keywords: "Strive Platform",
    openGraph: {
      title: filterInspirations?.title,
      description: filterInspirations?.description,
      images: [
        filterInspirations?.coverImage || "/inspiration-detail-page.png",
      ],
    },
  };
}

const DetailInspiration = () => {
  const inspiration = useQuery(
    api.documents.getById
  ) as any as InspirationType[];
  const searchParams = useSearchParams();
  const slugInspiration = searchParams.get("slug");

  const slugTrim = String(slugInspiration).trim();

  const inspirationList = inspiration?.find((item) => {
    const productSlug = item.slug;
    return slugTrim === productSlug;
  });

  const {
    title,
    coverImage,
    description,
    price,
    salePrice,
    slug,
    categories,
    _creationTime,
  } = inspirationList || {};

  const filterInspiration = inspiration?.filter(
    (data) => data.slug !== slugTrim
  );

  return (
    <>
      <div className="mt-20 px-5 lg:px-[180px] pb-10">
        <Link
          href="/inspiration"
          className="flex flex-row gap-x-2 mb-5 items-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <p className="text-sm font-medium text-gray9">Back to inspiration</p>
        </Link>
        <h1 className="heading-1">{title}</h1>
        <div className="flex flex-row justify-between items-start mb-6">
          <div className="flex flex-row gap-x-3 items-center">
            <Image
              src="/assets/images/clients-avatar-1.webp"
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
          <Button
            variant={"secondary"}
            className="flex flex-row items-center gap-2"
          >
            Preview
            <SquareArrowOutUpRight className="text-black size-4" />
          </Button>
        </div>
        <div className="flex flex-row items-start gap-10">
          <Image
            src={coverImage || ""}
            alt="bg-dashboard"
            width={1500}
            height={1500}
            priority={true}
            className="w-full h-[500px] rounded-lg object-cover mb-14"
          />

          <SaleProductPayment
            slug={slug}
            price={price}
            salePrice={salePrice}
            title={title}
          />
        </div>

        <p className="descripion-1 max-w-[300px] w-full">
          {parse(description ?? "")}{" "}
        </p>

        <div className="flex items-center justify-center gap-x-3 mb-5">
          <DialogFeedback />
          <DialogShare coverImage={coverImage} />
        </div>

        <div className="flex flex-col lg:flex-row items-start space-y-[60px] lg:space-x-20 mb-20">
          <div className="flex flex-col-reverse w-full space-y-20 max-w-[800px]">
            <div className="flex flex-col gap-1">
              {accordianData.map((data, i) => (
                <Accordion
                  key={i}
                  type="single"
                  collapsible
                  className="text-white bg-[#1f2025] rounded-xl h-[60px] rounded-b-xl mb-1"
                >
                  <AccordionItem value="item-1" className="border-b-0 px-5">
                    <AccordionTrigger>
                      <div className="flex flex-row items-center gap-3">
                        {data.icon}
                        <span className="text-xl font-medium text-white">
                          {data.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-[#1f2025] text-sm text-gray9 font-normal w-full mt-5 z-50">
                      {data.desc}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>

          <TemplateInfo catgoriesName={categories} createAt={_creationTime} />
        </div>

        <h3 className="pt-10 text-sm font-medium text-white mb-4">
          You might also like
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 col-span-2 gap-9">
          {filterInspiration?.length === 0 ? (
            <p className="text-sm text-gray9 font-normal">
              No inspiration data avaiblable heare.
            </p>
          ) : null}
          {filterInspiration?.map((item: InspirationType, index: Key) => (
            <MoreInspirations key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailInspiration;

function MoreInspirations({ item }: { item: InspirationType }) {
  return (
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
            src="/assets/images/clients-avatar-1.webp"
            alt="avatar"
            width={300}
            height={300}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm font-medium text-white">Tran Thien Duc</span>
          <Link
            href="/pricing"
            className="uppercase px-1 py-0 rounded-md bg-white text-xs font-medium text-black"
          >
            pro
          </Link>
        </div>
      </div>
    </div>
  );
}
