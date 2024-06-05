"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import DetailSidebar from "@/components/detail-sidebar";
import ExploreAllTemplate from "@/components/templates/template-list";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "@/components/shared";
import { useParams } from "next/navigation";
import { ProductProps } from "@/utils/types/type";

const DetailTemplate = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const productId = useParams();
  console.log(productId);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("/api/purchaseProduct");
        setProducts(res.data.data);

        // Lọc sản phẩm có slug trùng với slug trong params
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API", error);
      }
    };

    getProducts();
  }, []);

  const filtered = products.find(
    (product) => product.attributes.slug !== (productId as any as string)
  );

  const { name, large_thumb_url, description, price, slug } =
    filtered?.attributes || {};
  console.log(filtered);

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

          <DetailSidebar
            name={name}
            price={price}
            slug={slug}
            description={description}
          />
        </div>

        <ExploreAllTemplate />
      </div>
    </>
  );
};

export default DetailTemplate;
