"use client";
import { Header } from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { ChevronDown, ListFilter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ExploreTemplate = () => {
  const [products, setProducts] = useState<[]>([]);
  const [filterWord, setFilterWord] = useState<string[]>([]);
  const [filterInspiration, setFilterInspiration] = useState<any[]>([]);

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

  const filterLabel = (categories: string) => {
    if (filterWord.includes(categories)) {
      setFilterWord(filterWord?.filter((filter) => filter !== categories));
    } else {
      setFilterWord([...filterWord, categories]);
    }
  };

  useEffect(() => {
    if (filterWord.length > 0) {
      const filtered = products?.filter((product: any) => {
        return filterWord.every((fillters) => product.name?.includes(fillters));
      });
      setFilterInspiration(filtered || []);
    } else {
      setFilterInspiration(products || []);
    }
  }, [filterWord, products]);

  console.log("filterWord", filterWord);
  console.log("filterInspiration", filterInspiration);
  return (
    <>
      <Header />
      <div className="max-w-full w-full mt-16 px-[72px]">
        <div className="flex flex-row justify-between items-center mb-8">
          <button className="rounded-md border border-white/15 max-w-[115px] w-full h-[40px] px-4 py-3 flex flex-row items-center gap-x-4 bg-white">
            <span className="text-sm font-medium text-black">Popular</span>
            <ChevronDown className="text-black w-4 h-4" />
          </button>
          <div className="flex flex-row gap-x-1">
            {products ? (
              products.map((product: any, index) => (
                <>
                  <button
                    key={index}
                    className={`${
                      filterWord.includes(product.attributes.name)
                        ? "text-sm font-semibold bg-white text-black py-3 px-3 text-center duration-300 rounded-full"
                        : "text-sm font-semibold text-white py-3 px-3 text-center duration-300 rounded-full"
                    }`}
                    onClick={() => filterLabel(product.attributes.name)}
                  >
                    {product.attributes.name}
                  </button>
                </>
              ))
            ) : (
              <Skeleton className="w-[106px] h-11" />
            )}
          </div>
          <button className="rounded-md border border-white/15 max-w-[115px] w-full h-[40px] px-4 py-3 flex flex-row items-center gap-x-2 bg-white">
            <ListFilter className="text-black w-4 h-4" />
            <span className="text-sm font-medium text-black">Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-9">
          {products?.length ? (
            products?.map((item: any, index) => (
              <>
                <div
                  className="max-w-[315px] w-full flex flex-col gap-y-3"
                  key={index}
                >
                  <Link href={`/inspiration/inpiration-detail/${item._id}`}>
                    <Image
                      src={
                        item?.attributes?.large_thumb_url ||
                        "/assets/images/404-page.png"
                      }
                      alt="emty"
                      width={1300}
                      height={300}
                      className="w-full h-[236px] object-cover rounded-xl"
                    />
                  </Link>
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-sm font-medium text-white">
                      {item?.attributes.name}
                    </span>
                    <p className="text-sm font-normal text-gray9">
                      {item?.attributes.price} VNĐ
                    </p>
                    <Link
                      href="/preview"
                      className="rounded-xl px-3 py-1 text-black bg-white text-sm font-medium"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
              </>
            ))
          ) : (
            <div className="max-w-[315px] w-full flex flex-col gap-y-3">
              <Skeleton className="w-[315px] h-[236px] rounded-xl" />
              <div className="flex flex-row justify-between items-center">
                <Skeleton className="w-20 h-5" />
                <Skeleton className="w-[59px] h-5" />
                <Skeleton className="w-[77px] h-7" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExploreTemplate;
