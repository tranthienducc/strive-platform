import { Id } from "@/convex/_generated/dataModel";
import { ReactNode } from "react";
import { FILTERS_CATEGORIES, FORM } from "./enum";

export type ChildrenType = {
  children: ReactNode;
};
export type DashboardType = {
  children: ReactNode;
  params: {
    item: string;
  };
};

export interface DetailSidebarProps {
  data: ProductProps;
}

export type InspirationType = {
  [x: string]: any;
  _id: Id<"inspirations">;
  title?: string;
  description?: string;
  categories?: string;
  coverImage?: string;
  slug?: string;
  price: number;
  salePrice: number;
  url: string;
  _creationTime: string;
};

export type InspirationProps = {
  _id: Id<"inspirations">;
  _creationTime: number;
  title?: string;
  coverImage?: string;
  slug?: string;
  price?: number;
  url?: string;
  salePrice?: number;
  description?: string;
  categories?: string;
  heart?: number;
  watch?: number;
  userId?: string;
  parentDocument?: Id<"inspirations">;
};
[];
export interface FormValues {
  _id: Id<"inspirations">;
  title?: string;
  categories?: string;
  coverImage?: string;
  slug?: string;
  url?: string;
  price?: number;
  salePrice?: number;
  description?: string;
}
export interface FormCommentValues {
  _id: Id<"comments">;
  comment?: string;
  reply?: string;
  userId?: string;
}
export interface FormValuesDiscount {
  name_code?: string;
  code?: string;
  amount?: number;
  limit?: number;
  inspirations?: string;
  start_date?: string;
  end_date?: string;
}

export type InspirationFilters = {
  search?: string | undefined;
  category: FILTERS_CATEGORIES;
};

export type InspirationFormProps = {
  action: FORM.CREATE | FORM.UPDATE;
};

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}

export interface DataTableFilterOption<TData> {
  id: string;
  label: string;
  value: keyof TData;
  options: Option[];
  filterValues?: string[];
  filterOperator?: string;
  isMulti?: boolean;
}

export type HeadingType = {
  heading: string;
  description: string;
};
export type ReviewsCardType = {
  logo: string;
  message: string;
  avatar: string;
  name: string;
  position: string;
  info_company: {
    icon: JSX.Element;
    text: string;
  }[];
};

export type DropdownFiltersType = {
  onFilterChange: (filter: string) => void;
};

export type FilterOptions = {
  value: FILTERS_CATEGORIES;
  label: string;
};

export type OrdersInpirationType = {
  _id: Id<"orders">;
  _creationTime: number;
  code: string;
  userId: string;
  parentDocument: Id<"orders">;
  order_code: string;
  status: string;
  product_name: string;
  revenue: number;
  amount: number;
};

export type Sites = {
  _id: Id<"sites">;
  _creationTime: number;
  userId?: string | undefined;
  parentDocument?: Id<"sites"> | undefined;
  site_custom_domain: string;
  site_name: string;
  site_description: string;
  site_subdomain: string;
  site_coverImage: string;
};
