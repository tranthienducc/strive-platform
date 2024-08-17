"use client";
import { ProductVariantProps } from "@/utils/types/type";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PreviewPage = () => {
  const [variantProduct, setVariantProduct] = useState<ProductVariantProps[]>(
    []
  );
  const { slug: variantId } = useParams();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("/api/purchaseProduct");
        if (Array.isArray(res.data.productVariant)) {
          setVariantProduct(res.data.productVariant);
        } else {
          console.error("Dữ liệu trả về không phải là một mảng", res.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API", error);
      }
    };

    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trimProductId = String(variantId).trim();

  const productVariant = variantProduct.find((item) => {
    const productSlug = item.attributes.slug;
    const trimProductSlug = String(productSlug).trim();
    return trimProductId === trimProductSlug;
  });

  const { name } = productVariant?.attributes || {};

  return (
    <>
      <div className="bg-[#111111] max-w-full h-[80px] w-full flex flex-row justify-between items-center py-3 px-6 ">
        <div className="flex flex-row items-center gap-x-3">
          <Link href="/" className="flex flex-row items-center gap-x-2">
            <ArrowLeft className="text-white size-5" />
            <p className="text-base text-white font-medium">Home</p>
          </Link>
          <p className="text-sm font-medium text-gray9">Preview</p>
        </div>

        <Link
          href="/"
          className="text-sm font-medium text-white"
          target="_blank"
        >
          {name}
        </Link>

        <button className="text-sm font-medium text-black bg-white rounded-xl px-4 py-2">
          Buy now
        </button>
      </div>
      <div className="max-w-full w-full p-6 h-[690px]">
        <iframe
          src={name}
          className="w-full h-full rounded-xl bg-white"
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
        />
      </div>
    </>
  );
};

export default PreviewPage;
