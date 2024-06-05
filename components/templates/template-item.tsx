"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const TemplateItem = () => {
  const [products, setProducts] = useState<[]>([]);

  //
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("/api/purchaseProduct");
        if (Array.isArray(res.data.data)) {
          setProducts(res.data.data);
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

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((item: any, i) => (
            <div className="max-w-[443px] w-full" key={i}>
              <Link
                href={`/detail-template/${item.attributes.slug}`}
                className="max-w-[442px] max-h-[531px] mb-[13px] block"
              >
                <Image
                  src={
                    item?.attributes?.large_thumb_url ||
                    "/assets/images/404-page.png"
                  }
                  alt="template"
                  width={1500}
                  height={1500}
                  className="rounded-xl w-full h-full object-cover border border-gray-700"
                />
              </Link>
              <div className="flex flex-row justify-between mb-2">
                <h2 className="text-sm font-medium text-white">
                  {item.attributes.name}
                </h2>
                <span className="text-sm font-medium text-gray9">
                  {item.attributes.price} VNĐ
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-sm font-normal text-gray9">Agency</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col space-y-3">
            <Skeleton className="w-[442px] h-[531px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TemplateItem;
