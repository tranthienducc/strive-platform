import { FILTERS_CATEGORIES } from "@/utils/types/enum";
import { FilterOptions } from "@/utils/types/type";
import { Blend, Send, Drill, AtSign, Info, Users, Flag } from "lucide-react";

export const social = [
  {
    icons: <Blend className="w-4 h-4 text-white" />,
    description: "Star a live chat",
  },
  {
    icons: <Send className="w-4 h-4 text-white" />,
    description: "Shoot us an email",
  },
  {
    icons: <Drill className="w-4 h-4 text-white" />,
    description: "Message us on Threads",
  },
];

export const pages = [
  {
    name: "Home",
  },
  {
    name: "About",
  },
  {
    name: "Pricing",
  },
  {
    name: "Features",
  },
  {
    name: "Contact",
  },
  {
    name: "404",
  },
];
export const supports = [
  {
    icon: <AtSign className="size-4 text-white" />,
    description: "Contact Tran Thien Duc",
  },
  {
    icon: <Info className="size-4 text-white" />,

    description: "How templates work",
  },
  {
    icon: <Users className="size-4 text-white" />,

    description: "Get help from the community",
  },
  {
    icon: <Flag className="size-4 text-white" />,
    description: "Report this template",
  },
];

export const categoriesInspiration = [
  "Discover",
  "Animation",
  "Branding",
  "Mobile",
  "Illustration",
  "Product Design",
  "Typography",
  "Web Design",
];

export const PRICING_OPTIONS: FilterOptions[] = [
  { value: FILTERS_CATEGORIES.PAID_FREE, label: "Paid + Free" },
  { value: FILTERS_CATEGORIES.PAID, label: "Paid" },
  { value: FILTERS_CATEGORIES.FREE, label: "Free" },
];

export const POPULAR_RECENT_OPTIONS: FilterOptions[] = [
  { value: FILTERS_CATEGORIES.POPULAR, label: "Popular" },
  { value: FILTERS_CATEGORIES.RECENT, label: "Recent" },
];

export const initialValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Hello, World!" }],
  },
];
