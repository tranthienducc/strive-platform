import { Atom, Code, PanelLeft, Undo2 } from "lucide-react";

export const links = [
  {
    href: "/cms",
    title: "CMS",
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
    url: "/manage",
    icon: <PanelLeft className="w-[18px] h-[18px] " />,
    title: "Dashboard",
  },
  {
    url: "/discount-manage",
    icon: <Code className="w-[18px] h-[18px] " />,
    title: "Discount Manage",
  },
  {
    url: "/inspiration-manage",
    icon: <Atom className="w-[18px] h-[18px]" />,
    title: "Inspiration",
  },
  {
    url: "/orders-manage",
    icon: <Atom className="w-[18px] h-[18px]" />,
    title: "Order Inspiration Manage",
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
