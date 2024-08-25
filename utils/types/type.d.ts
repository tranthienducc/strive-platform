import { Id } from "@/convex/_generated/dataModel";
import { ReactNode } from "react";
import { FILTERS_CATEGORIES, FORM } from "./enum";

// nữa thay đổi từ export => declear

export type ChildrenType = {
  children: ReactNode;
};
export type DashboardType = {
  children: ReactNode;
  params: {
    item: string;
  };
};

export type FormUpdateType = {
  data: {
    title?: string;
    price?: string;
    categories?: string;
    coverImage?: string;
    desc1?: string;
    desc2?: string;
    desc3?: string;
    desc4?: string;
  };
};
export interface ProductProps {
  id: string;
  attributes: {
    name: string;
    slug: string;
    large_thumb_url: string;
    description: string;
    price: number;
    store_id: string;
    created_at: string;
    buy_now_url: string;
  };
}
export interface ProductVariantProps {
  id: string;
  attributes: {
    name: string;
    slug?: string;
    large_thumb_url?: string;
    description: string;
    price: number;
    links: {
      map(arg0: (link: { title: string; url: string }) => string): any;
      title: string;
      url: string;
    };
  };
}

export interface DetailSidebarProps {
  data: ProductProps;
}

export type InspirationType = {
  [x: string]: any;
  id: Id<"documents">;
  title: string;
  description: string;
  categories: string;
  coverImage: string;
  slug: string;
};

export type InspirationProps = {
  id: Id<"documents">;
  _creationTime: number;
  title?: string | undefined;
  categories?: string | undefined;
  coverImage?: string | undefined;
  slug?: string | undefined;
  description?: string | undefined;
  heart?: number | undefined;
  watch?: number | undefined;
  userId?: string | undefined;
  parentDocument?: Id<"documents"> | undefined;
}[];
export interface FormValues {
  title: string;
  categories: string;
  coverImage: string;
  slug: string;
  description: string;
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
