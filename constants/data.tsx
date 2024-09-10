import { FILTERS_CATEGORIES } from "@/utils/types/enum";
import { FilterOptions } from "@/utils/types/type";
import {
  Blend,
  Send,
  Drill,
  AtSign,
  Info,
  Users,
  Flag,
  Sparkle,
  Palette,
  Component,
  MousePointerClick,
  PanelsTopLeft,
  Monitor,
  Bold,
  StickyNote,
  Table,
  ClipboardType,
} from "lucide-react";

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
    name: "Figma",
  },
  {
    name: "Photoshop",
  },
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
    children: [{ text: "" }],
  },
];

export const accordianData = [
  {
    icon: <Sparkle className="text-white size-5" />,
    title: "Animations/Effects",
    desc: "Includes expressive animations. Tweak effects with a few clicks and capture your audience’s attention when they land on your website.",
  },
  {
    icon: <Palette className="text-white size-5" />,
    title: "Color Styles",
    desc: "Color Styles are re-usable colors. They allow you to centrally manage how the colors on your site look. You can update the look and feel of your site in one easy step.",
  },
  {
    icon: <Component className="text-white size-5" />,
    title: "Components",
    desc: "Components offer reusability across pages, with changes applied to all instances. They also offer an easy way to create animations.",
  },
  {
    icon: <MousePointerClick className="text-white size-5" />,
    title: "Link Styles",
    desc: "Link Styles are re-usable styles including color, text and hover properties. They allow you to centrally manage how links look and feel on your site look.",
  },
  {
    icon: <PanelsTopLeft className="text-white size-5" />,
    title: "Overlays",
    desc: "Overlays help you make video players, dialogs, navigation and much more.",
  },
  {
    icon: <Monitor className="text-white size-5" />,
    title: "Ticker",
    desc: "Uses the built-in Ticker component to display infinitely scrolling sections.",
  },
  {
    icon: <Bold className="text-white size-5" />,
    title: "Text Styles",
    desc: "Styles are re-usable visual properties for your text like the font, size, color etc. They allow you to centrally manage how the text on your site looks across different pages.",
  },
  {
    icon: <StickyNote className="text-white size-5" />,
    title: "Stick Scrolling",
    desc: "This template uses elements that stick stick and unstick to the top while scrolling.",
  },
  {
    icon: <Table className="text-white size-5" />,
    title: "Content Management System (CMS)",
    desc: "Everything you need to manage content for your blog posts, job listings, and marketing pages. Generate pages based on CMS entries and easily update content across your site.",
  },
  {
    icon: <ClipboardType className="text-white size-5" />,
    title: "Forms",
    desc: "Capture all the information you need from your website visitors with Forms in Framer, all without writing a single line of code.",
  },
];

export const pagiBtn =
  "size-10 rounded bg-white text-gray-900 flex items-center justify-center hover:bg-gray-400 p-2";
