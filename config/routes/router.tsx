import { Atom, PanelLeft, Plus, ShoppingBag, Undo2 } from "lucide-react";

export const links = [
  {
    href: "/explore-template",
    title: "Marketplace",
  },
  {
    href: "/inspiration",
    title: "Inspiration",
  },
  {
    href: "/blog",
    title: "Blog",
  },
  {
    href: "/contact",
    title: "Contact",
  },
];

export const sidebarLinks = [
  {
    url: "/dashboard/manage",
    icon: <PanelLeft className="w-[18px] h-[18px] " />,
    title: "Dashboard",
  },
  {
    url: "/dashboard/inspiration-manage",
    icon: <Atom className="w-[18px] h-[18px]" />,
    title: "Inspiration",
  },
  {
    url: "/dashboard/create",
    icon: <Plus className="w-[18px] h-[18px]" />,
    title: "New inspiration",
  },
  {
    url: "/dashboard/order-template-management",
    icon: <ShoppingBag className="w-[18px] h-[18px]" />,
    title: "Order Management",
  },

  {
    url: "/",
    icon: <Undo2 className="w-[18px] h-[18px]" />,
    title: "Home",
  },
];
export const profileLinks = [
  {
    url: "likes",
    title: "Likes Inspiration",
  },
  {
    url: "user-info",
    title: "About",
  },
];
