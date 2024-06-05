"use client";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const PreviewPage = () => {
  const [viewMode, setViewMode] = useState("none");
  const [productsVariant, setProductsVariant] = useState<[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("/api/purchaseProduct");
        if (Array.isArray(res.data.productVariant)) {
          setProductsVariant(res.data.productVariant);
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
      <div className="bg-blue-300 max-w-full h-[80px] w-full flex flex-row justify-between items-center py-3 px-6 ">
        <Link href="/" className="flex flex-row items-center gap-x-2">
          <ArrowLeft className="text-black w-5 h-5" />
          <p className="text-base text-black font-medium">Home</p>
        </Link>

        <button className="px-3 py-3 rounded-xl bg-black text-white">
          Dowload / Buy Template
        </button>

        <div className="flex flex-row gap-x-2 pt-3 pl-3">
          <button
            onClick={() => setViewMode("iframe")}
            className="px-3 py-3 rounded-xl bg-stone-400 text-black"
          >
            View in Page
          </button>
          <button
            onClick={() => setViewMode("link")}
            className="px-3 py-3 rounded-xl bg-stone-400 text-black "
          >
            Open in New Tab
          </button>
        </div>
      </div>
      <div className="max-w-full w-full  h-screen">
        {viewMode === "iframe" &&
          productsVariant.map((productVariant: any, index) => (
            <div
              style={{ width: "100%", height: "100vh", border: "none" }}
              key={index}
            >
              <iframe
                src={productVariant.attributes.name}
                style={{ width: "100%", height: "100%", border: "none" }}
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default PreviewPage;
