import Image from "next/image";
import React from "react";

const ImageCover = ({ url }: { url?: string }) => {
  return (
    <>
      <Image
        src={url || "/assets/images/bento-img2.webp"}
        alt="cover-img"
        width={500}
        height={300}
        className="rounded-md"
        priority={true}
      />
    </>
  );
};

export default ImageCover;
