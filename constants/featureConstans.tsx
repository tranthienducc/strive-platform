import IconsPen from "@/components/icons/IconsPen";
import IconsRocket from "@/components/icons/IconsRocket";
import IconsScalling from "@/components/icons/IconsScalling";
import IconsService from "@/components/icons/IconsService";
import {
  Construction,
  Database,
  LayoutTemplate,
  MonitorSmartphone,
} from "lucide-react";
import Image from "next/image";

export const planned = [
  {
    icon: <IconsRocket />,
    title: "CMS",
    desc: "System CMS create blog and manage them.",
  },
  {
    icon: <IconsScalling />,
    title: "Break time",
    desc: "Enhance your focus with scheduled breaks.",
  },
  {
    icon: <IconsPen />,
    title: "AI task creation (maybe a future)",
    desc: "Leverage AI to automatically generate and organize tasks.",
  },
  {
    icon: <IconsService />,
    title: "Integration",
    desc: "Seamlessly connect with",
  },
];

export const features = [
  {
    Icon: LayoutTemplate,
    name: "Teamplates",
    description: "We create many template all kind.",
    href: "/",
    cta: "See more",
    className: "col-span-1",
    background: (
      <Image
        src="/assets/images/bento-img1.webp"
        className="absolute -right-20 -top-20 opacity-60 h-full object-cover w-full"
        alt="bg"
        width={1300}
        height={1300}
        priority={true}
      />
    ),
  },

  {
    Icon: Database,
    name: "CMS",
    description: "Manage and generate blog site.",
    href: "/",
    cta: "See more",
    className: "col-span-2",
    background: (
      <Image
        src="/assets/images/cta-img.png"
        className="absolute -right-20 -top-20 opacity-60"
        alt="bg"
        width={1300}
        height={1300}
        priority={true}
      />
    ),
  },
  {
    Icon: MonitorSmartphone,
    name: "Dynamic Resources",
    description: "Responsive for your websites.",
    href: "/",
    cta: "See more",
    className: "col-span-2",
    background: (
      <Image
        src="/assets/images/bento-img3.webp"
        className="absolute -right-20 -top-20 opacity-60"
        alt="bg"
        width={1300}
        height={1300}
        priority={true}
      />
    ),
  },
  {
    Icon: Construction,
    name: "Coming soon",
    description: "We have a secret feature that will be released soon",
    href: "/",
    cta: "Learn more",
    className: "col-span-1",

    background: (
      <Image
        src="/assets/images/bento-img4.webp"
        className="absolute -right-20 -top-20 opacity-60 h-full"
        alt="bg"
        width={1300}
        height={1300}
        priority={true}
      />
    ),
  },
];
