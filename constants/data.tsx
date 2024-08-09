import {
  Undo2,
  UserRoundCog,
  PanelLeft,
  Plus,
  Atom,
  Blend,
  Send,
  Drill,
} from "lucide-react";
import { UserResource } from "@clerk/types";

export const links = [
  {
    href: "/explore-template",
    title: "Templates",
  },
  {
    href: "/inspiration",
    title: "Inspiration",
  },
  {
    href: "/about",
    title: "About",
  },
  {
    href: "/contact",
    title: "Contact",
  },
];

export const sidebarLinks = [
  {
    url: "/dashboard/manage",
    icon: <PanelLeft className="w-[18px] h-[18px]  active:text-[#cff110]" />,
    title: "Dashboard",
  },
  {
    url: "/dashboard/inspiration-manage",
    icon: <Atom className="w-[18px] h-[18px] active:text-[#cff110]" />,
    title: "Inspiration",
  },
  {
    url: "/dashboard/create",
    icon: <Plus className="w-[18px] h-[18px] active:text-[#cff110]" />,
    title: "New inspiration",
  },
  {
    url: "/dashboard/profile",
    icon: <UserRoundCog className="w-[18px] h-[18px] active:text-[#cff110]" />,
    title: "Profile",
  },
  {
    url: "/",
    icon: <Undo2 className="w-[18px] h-[18px] active:text-[#cff110]" />,
    title: "Home",
  },
];
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

export const categories = [
  {
    name: "Discovery",
  },
  {
    name: "Animation",
  },
  {
    name: "Branding",
  },
  {
    name: "Illustration",
  },
  {
    name: "Mobile",
  },
  {
    name: "Print",
  },
  {
    name: "Product Design",
  },
  {
    name: "Typography",
  },
  {
    name: "Web Design",
  },
];
