import Image from "next/image";
import { ChartManage } from "@/components/ChartManage";
import { BreadcumsCustom } from "@/components/common";

const ManagePage = () => {
  return (
    <div className="h-full pb-40">
      <BreadcumsCustom link="Manage" page="Chart" />

      <div className="max-w-full w-full h-[1px] bg-neutral-800 mb-4 mt-4"></div>

      <div className="flex items-center justify-center pt-5">
        <Image
          src="/assets/images/dashboard-img.webp"
          alt="bg-dashboard"
          width={1300}
          priority={true}
          height={1300}
          className="max-w-[390px] lg:max-w-[864px] w-full h-[282px] object-cover rounded-xl mb-10"
        />
      </div>

      <h3 className="text-lg lg:text-2xl font-semibold text-white mb-3">
        Show chart and analyst template user buy
      </h3>
      <p className="text-sm font-normal text-gray9 max-w-[350px] lg:max-w-[700px] w-full mb-[46px]">
        Simplify user authentication and memberships without coding
        complexities. Discover tools that make managing user access and
        memberships a breeze.
      </p>

      <ChartManage />
    </div>
  );
};

export default ManagePage;
