"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useSearchParams } from "next/navigation";
import React, { memo } from "react";
import { accordianData } from "@/constants/data";
import parse from "html-react-parser";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SaleProductPayment from "@/app/checkout/[slug]/_component/SaleProductPayment";
import { DialogFeedback, DialogPeekTemplate, DialogShare } from "../common";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import TemplateInfo from "../TemplateInfo";

const DetailInspirationCard = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const inspirations = useQuery(api.inspiration.getInspirationBySlug, {
    slug: slug as string,
  });

  const comments = useQuery(api.comment.getCommentInspiration);
  return (
    <div className="mt-20 px-5 lg:px-[180px] pb-10">
      <Link
        href="/inspiration"
        className="flex flex-row gap-x-2 mb-5 items-center"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
        <span className="text-sm font-medium text-gray9">
          Back to inspiration
        </span>
      </Link>

      {inspirations?.map((item) => (
        <React.Fragment key={item?._id}>
          <h1 className="heading-1">{item.title}</h1>
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
          </div>
          <div className="flex flex-row items-start gap-10 relative group/peek">
            <Image
              src={item.coverImage as string}
              alt="bg-dashboard"
              width={1500}
              height={1500}
              priority={true}
              className="max-w-[714px] w-full h-[500px] rounded-lg object-cover mb-14"
            />
            <DialogPeekTemplate url="" />

            <SaleProductPayment
              slug={item.slug}
              price={item.price}
              salePrice={item.salePrice}
              title={item.title}
            />
          </div>

          <p className="descripion-1 max-w-[300px] w-full">
            {parse(item.description ?? "")}{" "}
          </p>

          <div className="flex items-center justify-center gap-x-3 mb-5">
            <DialogFeedback _id={item._id} title={item.title} data={comments} />

            <DialogShare coverImage={item.coverImage} />
          </div>

          <div className="flex flex-col lg:flex-row items-start space-y-[60px] lg:space-x-20 mb-20">
            <div className="flex flex-col-reverse w-full space-y-1 max-w-[800px] h-full">
              {accordianData.map((data) => (
                <Accordion
                  key={data.title}
                  type="single"
                  collapsible
                  className="text-white bg-[#1f2025] rounded-xl h-full rounded-b-xl mt-1 space-y-1"
                >
                  <AccordionItem
                    value={data.title}
                    className="border-b-0 px-5 hover:no-underline"
                  >
                    <AccordionTrigger>
                      <div className="flex flex-row items-center gap-3">
                        {data.icon}
                        <span className="text-xl font-medium text-white">
                          {data.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-[#1f2025] text-sm text-gray9 font-normal w-full mt-5  max-h-[200px] overflow-y-auto">
                      {data.desc}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>

            <TemplateInfo createAt={item._creationTime} />
          </div>

          <h3 className="pt-10 text-sm font-medium text-white mb-4">
            You might also like
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 col-span-2 gap-9">
            {inspirations?.length === 0 ? (
              <span className="text-sm text-gray9 font-normal">
                No inspiration data avaiblable heare.
              </span>
            ) : null}
            {inspirations.map((item) => (
              <MoreInspirations item={item} key={item._id} />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default memo(DetailInspirationCard);

function MoreInspirations({ item }: { item: any }) {
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
