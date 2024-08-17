import {
  Construction,
  InspectIcon,
  LayoutTemplate,
  MonitorSmartphone,
} from "lucide-react";
import Image from "next/image";

export const planned = [
  {
    icon: "/assets/icons/message-icon.webp",
    title: "Keyboard shortcuts",
    desc: "Streamline your workflow with customizable keyboard shortcuts. Navigate and manage tasks faster, boosting your productivity.",
  },
  {
    icon: "/assets/icons/noti-icon.webp",
    title: "Break time",
    desc: "Enhance your focus with scheduled breaks. Stay productive by incorporating regular breaks to refresh your mind.",
  },
  {
    icon: "/assets/icons/blue-icon.webp",
    title: "AI task creation",
    desc: "Leverage AI to automatically generate and organize tasks. Save time and improve efficiency with intelligent task management.",
  },
  {
    icon: "/assets/icons/t-icon.webp",
    title: "Integration",
    desc: "Seamlessly connect with Notion, Google, and other tools. Integrate your favorite apps for a unified productivity experience.",
  },
  {
    icon: "/assets/icons/lightning-icon.webp",
    title: "Live Collabration",
    desc: "Collaborate in real-time with your team. Share tasks, track progress, and achieve goals together effortlessly.",
  },
  {
    icon: "/assets/icons/square.webp",
    title: "Dark & Light mode",
    desc: "Switch between dark and light modes to suit your preference. Enjoy a comfortable viewing experience day or night.",
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
        src="/assets/images/bento-img1.png"
        className="absolute -right-20 -top-20 opacity-60 h-full object-cover w-full"
        alt="bg"
        width={1300}
        height={1300}
        loading="lazy"
      />
    ),
  },

  {
    Icon: InspectIcon,
    name: "Inspiration",
    description: "Many inspiration for you.",
    href: "/",
    cta: "See more",
    className: "col-span-2",
    background: (
      <Image
        src="/assets/images/bento-img2.png"
        className="absolute -right-20 -top-20 opacity-60"
        alt="bg"
        width={1300}
        height={1300}
        loading="lazy"
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
        src="/assets/images/bento-img3.png"
        className="absolute -right-20 -top-20 opacity-60"
        alt="bg"
        width={1300}
        height={1300}
        loading="lazy"
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
        src="/assets/images/bento-img4.png"
        className="absolute -right-20 -top-20 opacity-60 h-full"
        alt="bg"
        width={1300}
        height={1300}
        loading="lazy"
      />
    ),
  },
];
