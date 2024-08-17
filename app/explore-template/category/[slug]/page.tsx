"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import BreadcrumbCategory from "../../_component/BreadcrumbCategory";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { multiPrice } from "@/utils";
import DialogPeekTemplate from "@/components/DialogPeekTemplate";
import Link from "next/link";
import {
  useGetProducts,
  useGetProductsVariant,
} from "@/lib/react-query/queries";
import {
  filterCategoryNames,
  filterVariantProducts,
  filterImageUrl,
  filterProductNames,
  findProductUrlMatch,
} from "@/helper";

const TemplateGallery = () => {
  const { productsVariant } = useGetProductsVariant();
  const { products } = useGetProducts();
  const { slug: categoryParams } = useParams();
  const slugProducts = products?.map((item) => item.attributes.slug) ?? [];

  const dataVariantProducts = filterVariantProducts(
    productsVariant,
    categoryParams
  );
  const listCategoryName = filterCategoryNames(dataVariantProducts);
  const listImageUrl = filterImageUrl(dataVariantProducts);
  const namesProduct = filterProductNames(dataVariantProducts);

  const productsUrlMatch = findProductUrlMatch(namesProduct, slugProducts);

  return (
    <div className="flex flex-col">
      <BreadcrumbCategory page={listCategoryName} className="capitalize" />

      <h1 className="text-4xl font-medium text-white capitalize mb-5">
        Responsive {listCategoryName} Website Templates
      </h1>

      <p className="text-lg text-gray9 font-normal max-w-[800px] w-full text-balance mb-10">
        Display your design agency&apos;s work effectively. Optimize templates
        to showcase capabilities. Responsive, editable, varying layouts
        available for custom selection.
      </p>

      <div className="flex flex-row items-center justify-between mb-10">
        <Select>
          <SelectTrigger className="w-[100px] h-[34px] bg-[#222] rounded-[8px] border-none text-white">
            <SelectValue placeholder="Popular" />
          </SelectTrigger>
          <SelectContent className="bg-[#222] text-white border-none w-[180px]">
            <SelectItem value="Popular">Popular</SelectItem>
            <SelectItem value="Recent">Recent</SelectItem>
            <SelectItem value="Free">Free</SelectItem>
          </SelectContent>
        </Select>

        <p className="text-base text-gray9 font-normal">
          {dataVariantProducts?.length} Templates
        </p>
      </div>

      <div className="grid grid-cols-4 gap-5 mb-[43px] relative">
        {dataVariantProducts?.length ? (
          dataVariantProducts?.map((item) => (
            <div
              className="flex flex-col max-w-[253px] w-full relative"
              key={item.id}
            >
              <Link href={`/detail-template/${productsUrlMatch}`}>
                <Image
                  src={listImageUrl || "/assets/images/bento-img1.png"}
                  alt="imageUrl"
                  width={1300}
                  height={1300}
                  className="object-cover rounded-xl max-w-[253px] w-full h-[302.8px] mb-5"
                />
              </Link>

              <DialogPeekTemplate />
              <div className="flex flex-row items-center justify-between">
                <h5 className="text-base font-semibold text-white">
                  {item.attributes.name}
                </h5>
                <span className="text-gray9 font-normal text-sm">
                  {multiPrice(item.attributes.price)}
                </span>
              </div>
              <span className="text-sm text-gray9 font-normal">
                Tran Thien Duc
              </span>
            </div>
          ))
        ) : (
          <p className="absolute left-[39%] top-[8.25rem] text-sm text-gray9 font-medium">
            No templates available here.
          </p>
        )}
      </div>

      {dataVariantProducts?.length === 20 && (
        <div className="w-full max-w-full flex items-center justify-center">
          <button className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-[#333]">
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateGallery;
