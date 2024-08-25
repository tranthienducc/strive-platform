import Heading from "../Heading";
import React, { Key } from "react";
import Image from "next/image";
import { ReviewsCardType } from "@/utils/types/type";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { reviewsInfo } from "@/constants/infoSectionConstants";

const Reviews = () => {
  return (
    <section className="pb-36 flex flex-col max-w-full w-full items-center">
      <Heading
        heading="Clients say about our"
        description="Here's what my clients say about our when they visit and buy templates"
      />
      <Carousel className="max-w-[386px] lg:max-w-[793px] w-full">
        <CarouselContent className="ml-0">
          {reviewsInfo.map((review: any, index: Key) => (
            <CarouselItem
              key={index}
              className="max-w-[386px] lg:max-w-[793px] w-full h-full min-h-[446px] rounded-xl p-7 border border-[#1D2021] flex-col flex items-start justify-between bg-[#0C0C0F]"
            >
              <ReviewsCard
                logo={review.logo}
                message={review.message}
                name={review.name}
                avatar={review.avatar}
                position={review.position}
                info_company={review.info_company}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-[17rem] lg:left-[43rem] top-[12%]" />
        <CarouselNext className="right-8 top-[12%]" />
      </Carousel>
    </section>
  );
};

export default Reviews;

const ReviewsCard = ({
  logo,
  message,
  avatar,
  name,
  position,
  info_company,
}: ReviewsCardType) => (
  <React.Fragment>
    <h3 className="text-4xl font-bold text-white">{logo}</h3>

    <div className="flex flex-col gap-8  max-w-full w-full">
      <p className="font-medium text-sm lg:text-[22px] leading-[1.375] lg:leading-[30.25px] max-w-sm lg:max-w-[672px] w-full text-[#8e8d91] text-balance">
        “{message}”
      </p>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div className="flex flex-row items-center gap-x-4 lg:mb-0 mb-5">
          <Image
            loading="lazy"
            alt="avatar"
            src={avatar}
            width={400}
            height={400}
            className="size-9 rounded-full object-cover"
          />
          <div className="flex flex-col gap-0">
            <span className="text-sm font-medium text-white">{name}</span>
            <span className="text-sm text-[#8e8d91] font-normal">
              {position}
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-x-1">
          {info_company.map((info, index) => (
            <div
              className="flex flex-row items-center rounded-full py-1 pl-[.625rem] pr-3 text-[#8e8d91] border border-white/10 gap-x-1"
              key={index}
            >
              {info.icon}
              <span className="text-sm font-normal">{info.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </React.Fragment>
);
