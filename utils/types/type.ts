import { Id } from "@/convex/_generated/dataModel";
import { ReactNode } from "react";

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
  };
}
export interface ProductVariantProps {
  id: string;
  attributes: {
    name: string;
    slug: string;
    large_thumb_url: string;
    description: string;
    price: number;
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
  fullName: string;
};
export interface FormValues {
  title: string;
  categories: string;
  coverImage: string;
  fullName: string;
  description: string;
}
