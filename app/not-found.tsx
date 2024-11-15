import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <>
      <div className="py-5 lg:py-20 text-center">
        <h1 className="text-3xl lg:text-5xl mb-5 font-bold text-center flex flex-col gap-5 items-center">
          <span className="text-white inline-block text-7xl">404</span>
          <span className="text-white">Not found page</span>
        </h1>
        <p className="text-center text-lg max-w-[600px] mx-auto mb-10 text-gray9">
          It looks like the page you are looking for does not exist or has been
          removed. Please check the link again or return to the home page.
        </p>

        <Link href="/" className="text-white">
          Back to home
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
