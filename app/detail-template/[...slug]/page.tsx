"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Key, useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, LockOpen } from "lucide-react";
import { Header } from "@/components/shared";
import { useParams } from "next/navigation";
import { ProductProps, ProductVariantProps } from "@/utils/types/type";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const DetailTemplate = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [productsVariant, setProductsVariant] = useState<ProductVariantProps[]>(
    []
  );
  const { slug: productId } = useParams();
  const { htmlToText } = require("html-to-text");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("/api/purchaseProduct");
        if (Array.isArray(res.data.productVariant)) {
          setProductsVariant(res.data.productVariant);
        } else {
          console.error("Returns data that is not an array", res.data);
        }
      } catch (error) {
        console.error("Error getting data from API", error);
      }
    };

    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataId = products.map((items) => items.id);
  const variantSlug = productsVariant.map((items) => items.attributes.slug);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("/api/purchaseProduct");
        setProducts(res.data.data);
      } catch (error) {
        console.error("Error getting data from API", error);
      }
    };

    getProducts();
  }, []);

  const trimProductId = String(productId).trim();

  const product = products.find((item) => {
    const productSlug = item.attributes.slug;
    return trimProductId === productSlug;
  });

  const { name, large_thumb_url, description, price } =
    product?.attributes || {};

  const handleBuyProduct = async () => {
    try {
      const response = await axios.post("/api/purchaseProduct", {
        productId: dataId,
      });
      window.open(response.data.checkoutUrl, "_blank");
    } catch (error) {
      console.log(error);
      toast.error("Failed to buy product #1");
    }
  };
  const htmlContent = description?.concat("\n");

  const text = htmlToText(htmlContent, {
    wordwrap: 130,
    preserveNewlines: true,
    uppercaseHeadings: false,
    singleNewLineParagraphs: true,
    unorderedListItemPrefix: "• ",
  });

  return (
    <>
      <Header />
      <div className="py-6 px-[68px] max-w-[1513px] w-full mb-40">
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem className="font-normal text-[#999]">
              <BreadcrumbLink
                href="/"
                className="hover:text-white duration-300"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="font-normal text-[#999]">
              <BreadcrumbLink
                href="/allow-template"
                className="hover:text-white duration-300"
              >
                Allow Template{" "}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="font-normal">
              <BreadcrumbPage className="hover:text-white duration-300 text-[#999]">
                {name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-row gap-x-9 mb-40">
          <div className="max-w-[860px] w-full">
            <Image
              src={large_thumb_url || "/assets/images/404-page.png"}
              alt="img2"
              width={1500}
              height={1500}
              className="object-cover rounded-xl mb-3"
            />
          </div>

          <aside className="sticky top-3 mb-10 max-w-[451px] w-full">
            <div className="flex flex-col gap-y-2 mb-4">
              <h3 className="text-4xl font-semibold text-white">{name}</h3>
              <div className="flex flex-row gap-x-[10px]">
                <h6 className="uppercase text-white font-normal text-[10px] rounded-full border border-gray-800 px-2 py-1">
                  allow template
                </h6>
                <h6 className="uppercase text-white font-normal text-[10px] rounded-full border border-gray-800 px-2 py-1">
                  personal
                </h6>
              </div>
            </div>
            {text.split("\n").map((line: any, i: Key) => (
              <p className="text-base font-normal text-[#999]" key={i}>
                {line}
              </p>
            ))}

            <span className="text-base font-normal text-white mb-6 block">
              Compatible with all devices
            </span>
            <button
              onClick={handleBuyProduct}
              className="flex flex-row gap-x-2 items-center bg-white rounded-xl max-w-[490px] w-full h-11 text-center justify-center mb-5"
            >
              <p className="text-sm font-medium text-black bg-white block">
                Buy Now - {price} VNĐ
              </p>
              <ArrowRight className="w-4 h-4 text-black bg-white" />
            </button>

            <p className="text-xs font-light text-[#808080] mb-4 text-center">
              Please note: Standard VAT rate may be charged in accordance with
              your country.
            </p>
            <Link
              href={`/preview/${variantSlug}`}
              className="flex flex-row gap-x-2 items-center bg-gradient-conic rounded-xl max-w-[490px] w-full h-11 text-center justify-center mb-5 border border-gray-800"
            >
              <span className="text-sm font-medium text-white block">
                Preview
              </span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-4 bg-gradient-conic rounded-xl mb-6 border border-gray-800 flex flex-col"
            >
              <div className="flex flex-row justify-between items-center mb-3">
                <div className="flex flex-row gap-x-2 items-center">
                  <LockOpen className="w-5 h-5 text-white" />
                  <h6 className="text-xl font-normal text-white">
                    Unlock with All-Access
                  </h6>
                </div>
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <p className="text-base font-normal text-[#999]">
                Get unlimited access to our full collection of backgrounds and
                more and take your workflow to the next level.
              </p>
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
};

export default DetailTemplate;
