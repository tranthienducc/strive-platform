import { useEdgeStore } from "@/lib/edgestore";
import { FILTERS_CATEGORIES } from "./types/enum";
import queryString from "query-string";

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

export const multiPrice = (value: number): string => {
  if (!value) return "0";
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Kiểm tra để chắc chắn value là một trong các giá trị của enum FILTERS_CATEGORIES
export const isFilterCategory = (value: any): value is FILTERS_CATEGORIES => {
  return Object.values(FILTERS_CATEGORIES).includes(value);
};

export const formUrlQuery = ({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) => {
  const currentUrl = queryString.parse(params);

  currentUrl[key] = value;

  return queryString?.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
