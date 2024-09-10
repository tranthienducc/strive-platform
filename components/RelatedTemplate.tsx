import Image from "next/image";
import Link from "next/link";
import { multiPrice } from "@/utils";

const RelatedTemplate = ({ name, price }: any) => {
  return (
    <div className="flex flex-col max-w-[253px] w-full relative">
      <Link href={`/detail-template`}>
        <Image
          src="/assets/images/bento-img1.png"
          alt={name}
          width={1300}
          height={1300}
          priority={true}
          className="object-cover rounded-xl max-w-[253px] w-full h-[302.8px] mb-5"
        />
      </Link>
      <div className="flex flex-row items-center justify-between">
        <h5 className="text-base font-semibold text-white">{name}</h5>
        <span className="text-gray9 font-normal text-sm">
          {multiPrice(price)}
        </span>
      </div>
      <span className="text-sm text-gray9 font-normal">Tran Thien Duc</span>
    </div>
  );
};

export default RelatedTemplate;
