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
  attributes: {
    name: string;
    slug: string;
    large_thumb_url: string;
    description: string;
    price: number;
  };
}

export interface DetailSidebarProps {
  name: string | undefined;
  price: number | undefined;
  slug: string | undefined;
  description: string | undefined;
}

export type InspirationType = {
  [x: string]: any;
  _id: Id<"documents">;
  title: string;
  description: string;
  coverImage: string;
};
export interface FormValues {
  title: string;
  categories: string;
  coverImage: string;
  fullName: string;
  description: string;
}
