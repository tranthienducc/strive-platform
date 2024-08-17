"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import BreadcrumbCategory from "@/app/explore-template/_component/BreadcrumbCategory";
import DialogPeekTemplate from "@/components/DialogPeekTemplate";
import React, { useMemo } from "react";
import { Earth } from "lucide-react";
import { Header } from "@/components/shared";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserContext } from "@/context/UserContext";
import {
  useGetProducts,
  useGetProductsVariant,
} from "@/lib/react-query/queries";
import {
  filterCategoryNames,
  filterProductNames,
  findProductUrlMatch,
  parseMarkDown,
} from "@/helper";
import { pages, supports } from "@/constants/data";
import { ChildrenType } from "@/utils/types/type";
import { multiFormatDateString, multiPrice } from "@/utils";

const DetailTemplate = () => {
  const { products } = useGetProducts();
  const { productsVariant } = useGetProductsVariant();
  const { slug: productId } = useParams();
  const { user } = useUserContext();
  const createdNotifi = useMutation(api.documents.createNotifi);
  const trimProductId = String(productId).trim();

  const product = useMemo(
    () =>
      products?.find((item) => {
        const productSlug = item.attributes.slug;

        return trimProductId.includes(productSlug);
      }),
    [products, trimProductId]
  );

  const { name, large_thumb_url, description, price, created_at } =
    product?.attributes || {};

  const renderProductVariant = productsVariant?.filter((data) => {
    const productName = data.attributes.name;

    return name === productName;
  });

  const listCategoryName = filterCategoryNames(renderProductVariant);

  const slugVariants = productsVariant?.map((data) => data.attributes.slug);
  const slugProducts = products?.map((item) => item.attributes.slug) ?? [];

  const dataId = productsVariant?.map((variant) => variant.id);

  const handleBuyProduct = async () => {
    try {
      const response = await axios.post("/api/purchaseProduct", {
        productId: dataId,
      });
      window.open(response.data.checkoutUrl, "_blank");

      createdNotifi({
        templateName: name,
        avatar: user?.imageUrl,
        userName: `${user?.firstName} ${user?.lastName}`,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to buy product #1");
    }
  };

  const namesProducts = filterProductNames(productsVariant);

  const productsUrlMatch = findProductUrlMatch(namesProducts, slugProducts);
  console.log("namesProducts", namesProducts);
  console.log("slugProducts", slugProducts);
  console.log("productsUrlMatch", productsUrlMatch);

  return (
    <>
      <Header />
      <div className="py-6 px-[68px] max-w-[1513px] w-full mb-40 mt-14">
        <BreadcrumbCategory page={name} className="mb-6" />

        <div className="flex flex-row space-x-[60px] items-center space-y-0 mb-20">
          <div className="w-full max-w-[720px] text-white">
            <h1 className="text-5xl font-medium mb-5">
              {name} — Creative Professional Website
            </h1>
            <Link
              href="/creator"
              className="flex flex-row items-center gap-x-2"
            >
              <Image
                src="/assets/images/emty-img-product.png"
                alt="avatar"
                width={300}
                height={300}
                loading="lazy"
                className="size-[30px] rounded-full object-cover"
              />
              <p className="text-base font-medium text-gray9">Tran Thien Duc</p>
            </Link>
          </div>
          <div className="w-full max-w-[720px] space-y-[30px]">
            <p className="text-lg text-balance font-normal text-[#ccc]">
              {name} boosts productivity with seamless task management and
              real-time collaboration. This scalable, user-friendly Framer
              template offers comprehensive features for efficient workflow
              integration.
            </p>

            <div className="flex flex-row gap-x-2">
              <Link
                href={`/preview/${slugVariants}`}
                className="py-[10px] px-3 rounded-[8px] bg-[#222] hover:bg-white/15 duration-300"
              >
                <span className="text-sm font-medium text-white block">
                  Preview
                </span>
              </Link>

              <button
                onClick={handleBuyProduct}
                className="bg-red-400 rounded-[8px] py-[10px] px-3"
              >
                <p className="text-sm font-semibold text-white">
                  Purchase for {price} VNĐ
                </p>
              </button>
            </div>
          </div>
        </div>

        <Image
          src={large_thumb_url || "/assets/images/404-page.png"}
          alt="img2"
          width={1500}
          height={1500}
          priority={true}
          className="object-cover rounded-xl max-w-[800px] w-full h-[542px] mb-20"
        />

        <div className="flex flex-row items-start space-x-20 mb-20">
          <div className="flex flex-col-reverse w-full space-y-20 max-w-[800px]">
            <div className="text-lg text-[#ccc] font-normal">
              {parseMarkDown(description ?? "")}
            </div>
          </div>
          <div className="max-w-[300px] w-full space-y-10">
            <div className="space-y-5">
              <HeadingTemplate>Pages</HeadingTemplate>

              <div className="flex flex-wrap gap-[.625rem]">
                {pages.map((data, index) => (
                  <div
                    key={index}
                    className="py-1 px-2 bg-[#222] rounded-md flex flex-row items-center gap-x-2"
                  >
                    <Earth className="size-3 text-gray9" />
                    <p className="text-sm whitespace-nowrap font-semibold text-gray9">
                      {data.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <HeadingTemplate>Categories</HeadingTemplate>
              <div className="flex flex-wrap gap-[.625rem]">
                <div className="py-1 px-2 bg-[#222] rounded-md">
                  <p className="text-sm whitespace-nowrap font-semibold text-gray9">
                    {listCategoryName}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <HeadingTemplate>Support</HeadingTemplate>

              <div className="flex flex-col gap-y-3">
                {supports.map((data, index) => (
                  <div
                    className="flex flex-row items-center gap-x-2"
                    key={index}
                  >
                    {data.icon}
                    <p className="text-sm font-medium text-white">
                      {data.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm font-normal text-gray9">
              Published {multiFormatDateString(created_at)}
            </p>
          </div>
        </div>

        <HeadingTemplate>Related templates</HeadingTemplate>

        <div className="grid-cols-5 grid gap-2 mt-5">
          {products?.map((item) => (
            <RelatedTemplate
              key={item.id}
              url={productsUrlMatch}
              imageUrl={item.attributes.large_thumb_url}
              name={item.attributes.name}
              price={item.attributes.price}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailTemplate;

const HeadingTemplate = ({ children }: ChildrenType) => {
  return <h6 className="text-[22px] font-semibold text-white">{children}</h6>;
};

const RelatedTemplate = ({ url, imageUrl, name, price }: any) => (
  <div className="flex flex-col max-w-[253px] w-full relative">
    <Link href={`/detail-template/${url}`}>
      <Image
        src={imageUrl || "/assets/images/bento-img1.png"}
        alt={name}
        width={1300}
        height={1300}
        priority={true}
        className="object-cover rounded-xl max-w-[253px] w-full h-[302.8px] mb-5"
      />
    </Link>
    <DialogPeekTemplate />
    <div className="flex flex-row items-center justify-between">
      <h5 className="text-base font-semibold text-white">{name}</h5>
      <span className="text-gray9 font-normal text-sm">
        {multiPrice(price)}
      </span>
    </div>
    <span className="text-sm text-gray9 font-normal">Tran Thien Duc</span>
  </div>
);
