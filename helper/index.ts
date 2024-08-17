import { ProductVariantProps } from "@/utils/types/type";
import TurndownService from "turndown";

export const genarateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const filterCategoryNames = (
  data: ProductVariantProps[] | undefined
) => {
  const categoryName = data
    ?.map((item) => item.attributes.links)
    .flatMap((data) => data)
    .map((d, index) => (index === 0 ? d.title : null))
    .filter((title) => title !== null)
    .join("");

  return categoryName;
};
export const filterImageUrl = (data: ProductVariantProps[] | undefined) => {
  const imageUrl = data
    ?.map((item) => item.attributes.links)
    .flatMap((data) => data)
    .map((d, index) => (index === 2 ? d.url : null))
    .filter((url) => url !== null)
    .join("");

  return imageUrl;
};

export const parseMarkDown = (html: string) => {
  if (!html || typeof html !== "string") {
    return "";
  }

  const result = new TurndownService();

  const markdown = result?.turndown(html);

  return markdown;
};

export const filterVariantProducts = (
  productsVariant: ProductVariantProps[] | undefined,
  categoiesParams: string[] | string | undefined
) => {
  const filterVariantProducts = productsVariant?.slice(1).filter((data) => {
    const item = data.attributes.links.map((t) => t.title);

    return item.includes(categoiesParams);
  });

  return filterVariantProducts;
};

export const filterProductNames = (
  productsVariant: ProductVariantProps[] | undefined
) => {
  const productNames = productsVariant?.map((item) =>
    item.attributes.name.toLowerCase()
  );

  return productNames;
};
export const findProductUrlMatch = (
  namesProduct: string[] | undefined,
  slugProducts: string[]
) => {
  const productsUrlMatch = namesProduct?.find((data) =>
    slugProducts.includes(data)
  );

  return productsUrlMatch;
};
