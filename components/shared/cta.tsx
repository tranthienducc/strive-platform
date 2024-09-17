import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRight, Sparkle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Cta = () => {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <Card className="w-full bg-blackOC border border-white/15">
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            Adaptive Blog CMS
          </CardTitle>
          <CardDescription className="text-gray9">
            One template, three styles, infinite customization
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-white">Key Features:</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Sparkle className="mr-2 size-4 text-white" />
                <span className="text-gray9">
                  Clean, minimalist design option
                </span>
              </li>
              <li className="flex items-center">
                <Sparkle className="mr-2 size-4 text-white" />

                <span className="text-gray9">
                  Rich media support for magazine-style layouts
                </span>
              </li>
              <li className="flex items-center">
                <Sparkle className="mr-2 size-4 text-white" />

                <span className="text-gray9">
                  Portfolio integration for showcasing projects
                </span>
              </li>
              <li className="flex items-center">
                <Sparkle className="mr-2 size-4 text-white" />

                <span className="text-gray9">
                  Responsive design for all devices
                </span>
              </li>
              <li className="flex items-center">
                <Sparkle className="mr-2 size-4 text-white" />

                <span className="text-gray9">
                  Easy customization with our intuitive CMS
                </span>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/assets/images/cta-img.png"
              alt="Versatile Blog Template Preview"
              width={400}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p className="text-sm text-gray9">Start your blog journey today</p>
          <Link
            href="/cms"
            className="bg-white text-black px-4 p-2 rounded-md flex items-center gap-2 text-base font-medium hover:bg-white/50 duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Cta;
