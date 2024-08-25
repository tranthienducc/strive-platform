"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import BreadcrumbCategory from "../../_component/BreadcrumbCategory";
import { isFilterCategory, multiPrice } from "@/utils";
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
} from "@/utils/index";
import { memo, useEffect, useState } from "react";

import { FILTERS_CATEGORIES } from "@/utils/types/enum";
import { useFilterQueryManager } from "@/state/hooks/useFilterQueryManager";
import { PRICING_OPTIONS } from "@/constants/data";
import { DropdownFilters } from "@/components/common/index";
import { DialogPeekTemplate } from "@/components/common/index";

const TemplateGallery = memo(() => {
  const { productsVariant } = useGetProductsVariant();
  const { products } = useGetProducts();
  const { slug: categoryParams } = useParams();
  const { category, setFilters } = useFilterQueryManager();
  const [filterType, setFilterType] = useState<FILTERS_CATEGORIES>(
    FILTERS_CATEGORIES.PAID
  );
  const slugProducts = products?.map((item) => item.attributes.slug) ?? [];

  const dataVariantProducts = filterVariantProducts(
    productsVariant,
    categoryParams
  );
  const listCategoryName = filterCategoryNames(dataVariantProducts);
  const listImageUrl = filterImageUrl(dataVariantProducts);
  const namesProduct = filterProductNames(dataVariantProducts);

  const productsUrlMatch = findProductUrlMatch(namesProduct, slugProducts);

  const urlTemplates = dataVariantProducts
    ?.map((item) => item.attributes.links)
    .flatMap((data) => data)
    .map((d, index) => (index === 0 ? d.url : null))
    .filter((url) => url !== null)
    .join("");

  // Đồng bộ hóa filterType với trạng thái bộ lọc
  useEffect(() => {
    if (category !== filterType) {
      setFilters({ category: filterType });
    }

    if (filterType === FILTERS_CATEGORIES.PAID) {
      dataVariantProducts?.filter((data) => data.attributes.price > 0);
    } else if (filterType === FILTERS_CATEGORIES.FREE) {
      dataVariantProducts?.filter((item) => item.attributes.price === 0);
    }
  }, [category, dataVariantProducts, filterType, setFilters]);

  return (
    <div className="flex flex-col">
      <BreadcrumbCategory
        page={listCategoryName}
        className="capitalize lg:mt-0 mt-5"
      />

      <h1 className="text-4xl font-medium text-white capitalize mb-5 text-balance">
        Responsive {listCategoryName} Website Templates
      </h1>

      <p className="text-base lg:text-lg text-gray9 font-normal max-w-[800px] w-full text-balance mb-10">
        Display your design agency&apos;s work effectively. Optimize templates
        to showcase capabilities. Responsive, editable, varying layouts
        available for custom selection.
      </p>

      <div className="flex flex-col lg:flex-row items-start lg:gap-0 gap-3 lg:items-center justify-between mb-10">
        <DropdownFilters
          value={filterType}
          placeholder={FILTERS_CATEGORIES.PAID_FREE}
          onValueChange={(value) => {
            if (isFilterCategory(value)) {
              setFilterType(value);
            }
          }}
          options={PRICING_OPTIONS}
        />

        <p className="text-base text-gray9 font-normal">
          {dataVariantProducts?.length} Templates
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-[43px] relative">
        {dataVariantProducts?.length === 0 ? (
          <p className="absolute left-[39%] top-[8.25rem] text-sm text-gray9 font-medium">
            No templates available here.
          </p>
        ) : null}

        {dataVariantProducts?.map((item) => (
          <div
            className="flex flex-col max-w-[253px] w-full relative group/sidebar"
            key={item.id}
          >
            <Link href={`/detail-template/${productsUrlMatch}`}>
              <Image
                src={listImageUrl || "/assets/images/bento-img1.png"}
                alt="imageUrl"
                width={1300}
                height={1300}
                className="object-cover rounded-xl max-w-[253px] w-full h-[219px]  lg:h-[302.8px] mb-5"
              />
            </Link>

            <DialogPeekTemplate url={urlTemplates} />
            <div className="flex flex-row items-center justify-between">
              <h5 className="text-sm lg:text-base font-semibold text-white">
                {item.attributes.name}
              </h5>
              <span className="text-gray9 font-normal text-xs lg:text-sm">
                {multiPrice(item.attributes.price)}
              </span>
            </div>
            <span className="text-xs lg:text-sm text-gray9 font-normal">
              Tran Thien Duc
            </span>
          </div>
        ))}
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
});

TemplateGallery.displayName = "TemplateGallery";

export default TemplateGallery;
