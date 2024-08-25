import IconsClound from "@/components/icons/IconsClound";
import IconsDate from "@/components/icons/IconsDate";
import IconsSingleMonth from "@/components/icons/IconsSingleMonth";
import IconsStaffs from "@/components/icons/IconsStaffs";
import IconsYear from "@/components/icons/IconsYear";
import {
  Bot,
  Box,
  BriefcaseMedical,
  Factory,
  Folder,
  GraduationCap,
  Home,
  PanelLeftDashed,
  PenTool,
  PlaneLanding,
  Rocket,
  Shapes,
  ShoppingCart,
  Soup,
  Speech,
  Store,
  Tv,
  Waves,
} from "lucide-react";

export const categories = [
  {
    Icon: <Box className="size-5 text-gray9 lg:flex hidden" />,
    categories: "3D",
    slug: "3d",
    quantity: "31",
    description:
      "Stand out with a 3D website theme. Get noticed by potential customers with stunning animations, visuals, and scroll effects. Fully responsive on all devices.",
  },
  {
    Icon: <Store className="size-5 text-gray9 lg:flex hidden" />,
    slug: "agency",
    categories: "agency",
    quantity: "31",
    description:
      "Display your design agency's work effectively. Optimize templates to showcase capabilities. Responsive, editable, varying layouts available for custom selection.",
  },
  {
    Icon: <PlaneLanding className="size-5 text-gray9 lg:flex hidden" />,
    categories: "landing page",
    slug: "landing-page",
    quantity: "31",
    description:
      "Launch your business with a powerful landing page. Optimized, mobile-tested templates drive conversions and highlight your brand. Convert visitors into customers with professional design.",
  },
  {
    Icon: <ShoppingCart className="size-5 text-gray9 lg:flex hidden" />,
    categories: "ecomnerce",
    slug: "ecommerce",
    quantity: "31",
    description:
      "Craft a sleek online store with e-commerce templates integrating Gumroad and Lemon Squeezy. Optimized for conversions and tested on multiple devices, these templates elevate your brand and convert visitors into loyal customers.",
  },
  {
    Icon: <Waves className="size-5 text-gray9 lg:flex hidden" />,
    categories: "animated",
    slug: "animated",
    quantity: "31",
    description:
      "Want to captivate your web visitors with motion? Explore our animated website templates. Customizable, responsive, and perfect for creating dynamic and engaging websites.",
  },
  {
    Icon: <Bot className="size-5 text-gray9 lg:flex hidden" />,
    categories: "artificial intelligence",
    slug: "ai",
    quantity: "31",
    description:
      "Harness AI website templates for stunning and functional AI applications. No coding needed. Use Framer's platform for captivating, device-friendly web experiences.",
  },
  {
    Icon: <PenTool className="size-5 text-gray9 lg:flex hidden" />,
    categories: "blog",
    slug: "blog",
    quantity: "31",
    description:
      "Launch your blog effortlessly with customizable free/paid templates. Choose a fitting design, personalize it, and manage easily using content management systems.",
  },
  {
    Icon: <Factory className="size-5 text-gray9 lg:flex hidden" />,
    categories: "businees",
    slug: "businees",
    quantity: "31",
    description:
      "Effective work presentation is crucial for your business. Optimize templates to showcase capabilities. Impress clients with high-quality designs tailored for your projects.",
  },
  {
    Icon: <GraduationCap className="size-5 text-gray9 lg:flex hidden" />,
    categories: "education",
    slug: "Education",
    quantity: "31",
    description:
      "Building an educational site? Discover our education website templates. Customizable, responsive, and perfect for schools, online courses, and educational resources.",
  },
  {
    Icon: <Tv className="size-5 text-gray9 lg:flex hidden" />,
    categories: "entertainment",
    slug: "entertainment",
    quantity: "31",
    description:
      "Engage your audience with captivating entertainment templates. Stunning layouts, user-friendly navigation. Showcase creative content, build a loyal following with responsive design.",
  },
  {
    Icon: <Soup className="size-5 text-gray9 lg:flex hidden" />,
    categories: "food",
    slug: "food",
    quantity: "31",
    description:
      "Creating a culinary site? Explore our food website templates. Customizable, responsive, and perfect for showcasing recipes, restaurants, and food blogs.",
  },
  {
    Icon: <BriefcaseMedical className="size-5 text-gray9 lg:flex hidden" />,
    categories: "Health",
    slug: "health",
    quantity: "31",
    description:
      "Highlight health content professionally with beautifully designed templates. Perfect for healthcare providers, wellness bloggers, and fitness enthusiasts to create engaging online presence.",
  },
  {
    Icon: <Speech className="size-5 text-gray9 lg:flex hidden" />,
    categories: "personal",
    slug: "personal",
    quantity: "31",
    description:
      "Affordable for Mini plan. Deploy and host single-page websites quickly. User-friendly interface for easy setup, no technical experience required.",
  },
  {
    Icon: <Folder className="size-5 text-gray9 lg:flex hidden" />,
    categories: "porfolio",
    slug: "portfolio",
    quantity: "31",
    description:
      "Impress clients and employers with standout portfolio templates. Highlight your best work and attract attention on your website.",
  },
  {
    Icon: <Home className="size-5 text-gray9 lg:flex hidden" />,
    categories: "real Estate",
    slug: "real-estate",
    quantity: "31",
    description:
      "Customize each template to create a unique online presence for your real estate business. Explore our collection of real estate website templates and kickstart your online presence today.",
  },
  {
    Icon: <PanelLeftDashed className="size-5 text-gray9 lg:flex hidden" />,
    categories: "dashboard",
    slug: "dashboard",
    quantity: "31",
    description:
      "Explore no-code Framer templates with split-view sidebars. Captivating, responsive designs, streamlined navigation. Personalize effortlessly, launch code-free. Enhance your online presence today.",
  },
  {
    Icon: <Rocket className="size-5 text-gray9 lg:flex hidden" />,
    categories: "startup",
    slug: "startup",
    quantity: "31",
    description:
      "Launch your business with templates that showcase products, explain pricing, and convert users into customers. Professional design for attracting investors and clients.",
  },
  {
    Icon: <Shapes className="size-5 text-gray9 lg:flex hidden" />,
    categories: "web3",
    slug: "web3",
    quantity: "31",
    description:
      "Web3 is a powerful platform for creating websites compatible with Ethereum, EOS, and more. The templates on this page were designed specifically for the needs of crypto projects, including those with an ICO or NFT component.",
  },
];

export const pricingData = [
  {
    icon: <IconsSingleMonth />,
    kind: "Starter",
    title: "Membership",
    desc1: "Landing page or Templates free all a month",
    price: "$100",
    desc2: "Converting Copy, Design, Development",
    interest: [
      "Unique subpages: $500/page",
      "Strive development",
      "48 hour delivery",
      "Direct access slack channel",
      "Onboarding strategy call",
      "High converting copy, design included",
      "UX research and user journey",
      "Satisfaction guaranteed",
    ],
  },
  {
    icon: <IconsYear />,
    kind: "Most Popular",
    title: "Pro/Year",
    desc1: "1 Active Request",
    price: "$500",
    desc2: "Pause or cancel anytime",
    interest: [
      "No contract or commitment",
      "Unlimited requests",
      "48 hour delivery",
      "Direct access slack channel",
      "Multiple brands, one subscription",
      "Unlimited revisions",
      "Includes copy, design, & development",
      "Pause anytime",
    ],
  },
];

export const reviewsInfo = [
  {
    logo: "_zaper",
    message:
      "Strive offers a fantastic selection of modern, responsive templates perfect for any business or personal project. The platform is user-friendly, making customization a breeze even for beginners. With Strive, you can create stunning websites quickly without sacrificing quality. Highly recommended for anyone looking to streamline their web design process.",
    avatar: "/assets/images/clients-avatar-1.webp",
    name: "Dan Smitch",
    position: "Director of New Products at Zaper",
    info_company: [
      {
        icon: <IconsClound />,
        text: "CMS",
      },
      {
        icon: <IconsDate />,
        text: "Founded 2011",
      },
      {
        icon: <IconsStaffs />,
        text: "501-1,000",
      },
    ],
  },
  {
    logo: "Eagle",
    message:
      "One of the standout features of Strive is its wide variety of design options, catering to different industries and styles. Whether you need a sleek corporate site or a vibrant portfolio, Strive has something for everyone. The templates are not only visually appealing but also optimized for performance, ensuring fast load times and a great user experience.",
    avatar: "/assets/images/clients-avatar-2.webp",
    name: "Jessica Laura",
    position: "Software Engineer at Eagle",
    info_company: [
      {
        icon: <IconsClound />,
        text: "Blockchain",
      },
      {
        icon: <IconsDate />,
        text: "Founded 2020",
      },
      {
        icon: <IconsStaffs />,
        text: "500",
      },
    ],
  },
  {
    logo: "jamp.",
    message:
      "In addition to its impressive template library, Strive provides excellent customer support. The platform is continuously updated with new features and improvements, reflecting their commitment to helping users stay ahead in the competitive online space. Strive is an all-in-one solution that makes website creation simple, efficient, and enjoyable.",
    avatar: "/assets/images/clients-avatar-3.webp",
    name: "Paul Todd",
    position: "CTO at jamp.",
    info_company: [
      {
        icon: <IconsClound />,
        text: "Real Esate",
      },
      {
        icon: <IconsDate />,
        text: "Founded 2014",
      },
      {
        icon: <IconsStaffs />,
        text: "500-1,200",
      },
    ],
  },
];

export const aboutInfo = [
  {
    title: "Our Mission",
    desc: "On a mission to create Strive templates that seamlessly enhance user experiences and skyrocket conversion rates.",
  },
  {
    title: "Our Vision",
    desc: "Our vision is to empower individuals to create high-conversion websites without the burden of expensive design costs.",
  },
  {
    title: "Our Focus",
    desc: "Our focus on result-oriented design sets us apart, guaranteeing that every template you use leads to real success for your projects.",
  },
];
export const innovative = [
  "Creativity",
  "Expression",
  "Individuality",
  "Innovation",
  "Creativity",
  "Quality",
  "Beauty",
];
