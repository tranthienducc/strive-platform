import {
  Atom,
  PanelLeft,
  Plus,
  ShoppingBag,
  Undo2,
  UserRoundCog,
} from "lucide-react";

export const links = [
  {
    href: "/about",
    title: "About",
  },
  {
    href: "/explore-template",
    title: "Gallery",
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
    url: "/dashboard/profile",
    icon: <UserRoundCog className="w-[18px] h-[18px]" />,
    title: "Profile",
  },
  {
    url: "/",
    icon: <Undo2 className="w-[18px] h-[18px]" />,
    title: "Home",
  },
];
