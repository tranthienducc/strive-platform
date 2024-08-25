import { useEdgeStore } from "@/lib/edgestore";
import { FILTERS_CATEGORIES } from "./types/enum";
import { ProductVariantProps } from "./types/type";

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export async function UploadFile(file: File) {
  const { edgestore } = useEdgeStore();
  try {
    const res = await edgestore.publicFiles.upload({ file });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  return `${formattedDate} `;
}

export const multiFormatDateString = (timestamp = "") => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date = new Date(timestampNum * 1000);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return "Just now";
  }
};

export const multiPrice = (value: number) => {
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

// Kiểm tra để chắc chắn value là một trong các giá trị của enum FILTERS_CATEGORIES
export const isFilterCategory = (value: any): value is FILTERS_CATEGORIES => {
  return Object.values(FILTERS_CATEGORIES).includes(value);
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

export const findUrlTemplate = (
  productsVariant: ProductVariantProps[] | undefined
) => {
  const urlsTemplate = productsVariant
    ?.map((item) => item.attributes.links)
    .flatMap((data) => data)
    .map((d, index) => (index === 0 ? d.url : null))
    .filter((url) => url !== null)
    .join("");

  return urlsTemplate;
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
