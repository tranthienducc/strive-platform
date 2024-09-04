"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import BreadcrumbCategory from "@/app/explore-template/_component/BreadcrumbCategory";
import RelatedTemplate from "@/components/RelatedTemplate";
import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserContext } from "@/context/UserContext";
import {
  useGetProducts,
  useGetProductsVariant,
} from "@/lib/react-query/queries";
import { parseMarkDown } from "@/helper";
import { API_CHECKOUTS } from "@/config";
import TemplateInfo from "@/components/TemplateInfo";
import {
  filterCategoryNames,
  filterProductNames,
  findProductUrlMatch,
} from "@/utils";

const DetailTemplate = () => {
  const { products } = useGetProducts();
  const { productsVariant } = useGetProductsVariant();
  const { slug: productId } = useParams();
  const { users } = useUserContext();
  const router = useRouter();
  const createdNotifi = useMutation(api.documents.createNotifi);
  const trimProductId = String(productId).trim();
  const slugProducts = products?.map((item) => item.attributes.slug) ?? [];

  const filterProduct = useMemo(
    () =>
      products?.find((item) => {
        const productSlug = item.attributes.slug;

        return trimProductId.includes(productSlug);
      }),
    [products, trimProductId]
  );

  const { name, large_thumb_url, description, price, created_at } =
    filterProduct?.attributes || {};

  const filterProductVariant = productsVariant?.filter((data) => {
    const productName = data.attributes.name;

    return name === productName;
  });

  const dataId = filterProductVariant?.map((data) => data.id);
  const listCategoryName = filterCategoryNames(filterProductVariant);
  console.log("filterCategoryNames", listCategoryName);

  const handleBuyProduct = async () => {
    if (!users?.id) {
      router.push("/sign-in");
      return;
    }
    try {
      const response = await axios.post(API_CHECKOUTS, {
        productId: dataId,
      });
      window.open(response.data.checkoutUrl, "_blank");

      createdNotifi({
        templateName: name,
        avatar: users?.imageUrl,
        userName: `${users?.firstName} ${users?.lastName}`,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to buy product");
    }
  };

  const namesProducts = filterProductNames(productsVariant);

  const productsUrlMatch = findProductUrlMatch(namesProducts, slugProducts);

  const urlTemplates = filterProductVariant
    ?.map((item) => item.attributes.links)
    .flatMap((data) => data)
    .map((d, index) => (index === 0 ? d.url : null))
    .filter((url) => url !== null)
    .join("");

  const releatedTemplates = productsVariant
    ?.slice(3)
    .filter((item) => item.attributes.name !== productId);

  return (
    <>
      <div className="py-6 px-5 lg:px-[68px] max-w-full w-full mb-40 mt-14">
        <BreadcrumbCategory page={name} className="mb-6 lg:mt-0 mt-4" />

        <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-[60px] items-center  mb-20 lg:space-y-0 space-y-10">
          <div className="w-full max-w-[720px] text-white">
            <h1 className="text-[28px] lg:text-5xl font-medium mb-5 leading-[1.2] leading-">
              {name} — Creative Professional Website
            </h1>
            <Link
              href="/creator"
              className="flex flex-row items-center gap-x-2"
            >
              <Image
                src="/assets/images/clients-avatar-1.webp"
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
            <p className="text-lg text-balance font-normal text-grayc">
              {name} boosts productivity with seamless task management and
              real-time collaboration. This scalable, user-friendly Framer
              template offers comprehensive features for efficient workflow
              integration.
            </p>

            <div className="flex flex-col lg:flex-row gap-2">
              <Link
                href={`/preview/${productsUrlMatch}`}
                className="py-[10px] px-3 rounded-[8px] bg-black22 hover:bg-white/15 duration-300 text-center"
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
          src={large_thumb_url || "/assets/images/404-page.webp"}
          alt="img2"
          width={1500}
          height={1500}
          priority={true}
          className="object-cover rounded-xl max-w-[385px] h-[261px] lg:max-w-[800px] w-full lg:h-[542px] mb-20"
        />

        <div className="flex flex-col lg:flex-row items-start space-y-[60px] lg:space-x-20 mb-20">
          <div className="flex flex-col-reverse w-full space-y-20 max-w-[800px]">
            <div className="text-lg text-grayc font-normal">
              {parseMarkDown(description ?? "")}
            </div>
          </div>

          <TemplateInfo
            catgoriesName={listCategoryName}
            createAt={created_at}
          />
        </div>

        <h6 className="text-[22px] font-semibold text-white">
          Related templates
        </h6>

        <div className="grid-cols-2 lg:grid-cols-5 grid gap-2 mt-5">
          {releatedTemplates?.map((item) => (
            <RelatedTemplate
              key={item.id}
              name={item.attributes.name}
              price={item.attributes.price}
              preview={urlTemplates}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailTemplate;
