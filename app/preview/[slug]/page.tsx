"use client";
import { filterProductNames, findUrlTemplate } from "@/utils/index";
import { useGetProductsVariant } from "@/lib/react-query/queries";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const PreviewPage = () => {
  const { productsVariant } = useGetProductsVariant();
  const { slug: categoryParams } = useParams();

  const dataProductsVariant = productsVariant?.slice(1).filter((data) => {
    const item = data.attributes.name.toLowerCase();

    return item.includes(categoryParams as string);
  });
  const urlTemplates = findUrlTemplate(dataProductsVariant);
  const categoriesName = filterProductNames(dataProductsVariant);

  return (
    <>
      <div className="bg-black11 max-w-full h-[80px] w-full flex flex-row justify-between items-center py-3 px-6 ">
        <div className="flex flex-row  items-center gap-x-3">
          <Link
            href={`/detail-template/${categoriesName}`}
            className="flex flex-row items-center gap-x-2"
          >
            <ArrowLeft className="text-white size-4 lg:size-5" />
            <p className="text-sm lg:text-base text-white font-medium">Home</p>
          </Link>
          <p className="text-sm font-medium text-gray9">Preview</p>
        </div>

        <Link
          href="/"
          className="text-sm font-medium text-white cursor-pointer"
          target="_blank"
        >
          {urlTemplates}
        </Link>
      </div>
      <div className="max-w-full w-full p-6 h-[690px]">
        <iframe
          src={urlTemplates}
          className="w-full h-full rounded-xl bg-white"
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
        />
      </div>
    </>
  );
};

export default PreviewPage;
