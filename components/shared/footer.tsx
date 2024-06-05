import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="">
      <div className="max-w-full w-full h-[1px] bg-gray-800 mb-16" />
      <div className="flex flex-row justify-between mb-16">
        <div className="flex flex-col">
          <Link
            className="flex flex-row items-center gap-x-5 mb-[34px]"
            href="/"
          >
            <Image
              src="/assets/icons/logo.svg"
              alt="logo"
              width={300}
              height={300}
              className="w-8 h-8"
            />
            <h1 className="text-2xl font-bold text-white">strive</h1>
          </Link>

          <p className="text-lg font-normal text-white mb-3">
            Get 15% off your first order!
          </p>
          <p className="text-base font-normal text-[#999] mb-4 max-w-[355px] w-full">
            Sign up to our mailing list below to get 15% off your first order.
            Dont worry, we hate spam too.
          </p>

          <div className="flex flex-row gap-x-3">
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              className="max-w-[270px] w-full h-[49px] rounded-xl p-4 outline-none font-normal text-sm text-[#999] bg-black17 border border-gray-800"
            />
            <button className="text-center max-w-[112px] w-full h-[49px] font-medium text-sm bg-white text-black rounded-xl">
              Subscribe
            </button>
          </div>
        </div>

        <div className="flex flex-row gap-x-8 items-end">
          <div className="flex flex-col">
            <p className="text-base font-normal text-white mb-4">Products</p>
            <ul className="list-none text-sm font-normal text-[#999] flex flex-col gap-y-3">
              <li>
                <Link href="/" className="hover:text-white">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Backgrounds
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Mockup
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white">
                  Fonts
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <p className="text-base font-normal text-white mb-4">
              All-Access Pass
            </p>
            <ul className="list-none text-sm font-normal text-[#999] flex flex-col gap-y-3">
              <li>
                <Link href="/">Sign Up</Link>
              </li>
              <li>
                <Link href="/">Activate License</Link>
              </li>
              <li>
                <Link href="/">Sign In</Link>
              </li>
              <li>
                <Link href="/">Reset Password</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <p className="text-base font-normal text-white mb-4">Information</p>
            <ul className="list-none text-sm font-normal text-[#999] flex flex-col gap-y-3">
              <li>
                <Link href="/">FAQ</Link>
              </li>
              <li>
                <Link href="/">Contact Us</Link>
              </li>
              <li>
                <Link href="/">License Agreement</Link>
              </li>
              <li>
                <Link href="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-full w-full h-[1px] bg-gray-800" />
      <div className="flex flex-row gap-x-1 items-center pt-5">
        <Dot className="w-6 h-6 text-[#999]" />
        <p className="text-xs font-normal text-[#999]">
          Created by <span className="text-white">Tran Thien Duc</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
