import { links } from "@/config/routes/router";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col mb-5 max-w-full w-full rounded-2xl bg-blackOC px-5 py-4 mt-10">
      <div className="flex  items-center justify-center flex-col mb-7">
        <div className="flex items-center flex-row gap-2 mb-4">
          <Image
            src="/assets/icons/logo.webp"
            alt="logo"
            width={300}
            height={300}
            loading="lazy"
            className="lg:size-10 size-5"
          />
          <h1 className="text-sm lg:text-xl font-semibold text-white">
            Strive
          </h1>
        </div>

        <p className="font-medium text-base text-gray9 max-w-[400px] w-full text-center mb-6">
          Modern and optimized Stive website templates featuring sleek design
          and enhanced performance.
        </p>
        <nav className="rounded-full px-4 py-2 bg-[#141414] flex flex-row items-center gap-3">
          {links.map((link, i) => (
            <div key={i}>
              <Link
                href={link.href}
                className="text-sm font-medium hover:bg-white/5 duration-300 py-2 rounded-lg text-gray9"
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
      <div className="flex items-center justify-between font-medium text-sm text-gray9">
        <span>@2024 All Rights Reserved</span>
        <span>Privacy Policy</span>
      </div>
    </footer>
  );
};

export default Footer;
