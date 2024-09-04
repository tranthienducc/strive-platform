import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <div>
      <div className="py-5 lg:py-20 text-center">
        <h1 className="text-3xl lg:text-5xl mb-5 font-bold text-center flex flex-col gap-5 items-center">
          <span className="text-white inline-block text-7xl">404</span>
          <span className="text-white">Not found page</span>
        </h1>
        <p className="text-center text-lg max-w-[600px] mx-auto mb-10 text-gray9">
          Dường như trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Hãy
          kiểm tra lại đường dẫn hoặc quay về trang chủ.
        </p>

        <Link href="/" className="text-white">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
