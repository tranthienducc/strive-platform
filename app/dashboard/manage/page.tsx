"use client";
import { Bell, CircleHelp } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserContext } from "@/context/UserContext";
import { useGetProducts } from "@/lib/react-query/queries";

const ManagePage = () => {
  const { products } = useGetProducts();
  const { users } = useUserContext();

  if (products?.length === 0) {
    return (
      <div className="max-w-[394px] w-full rounded-[10px] p-3">
        <Skeleton className="w-[374px] h-[170px] rounded-lg mb-3" />
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-x-3 items-center">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex flex-col gap-y-[6px]">
              <Skeleton className="w-20 h-5" />
              <Skeleton className="w-20 h-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full pb-10">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-y-[1px]">
          <span className="text-xs lg:text-sm font-normal text-gray9">
            Welcome,
          </span>
          <p className="text-sm lg:text-base font-medium text-white">
            {users?.fullName}
          </p>
        </div>

        <div className="flex flex-row gap-x-6 items-center">
          <CircleHelp className="text-white w-5 h-5" />
          <Bell className="text-white w-5 h-5" />
        </div>
      </div>
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
        All created templates
      </h3>
      <p className="text-sm font-normal text-gray9  max-w-[350px] lg:max-w-[700px] w-full mb-[46px]">
        Simplify user authentication and memberships without coding
        complexities. Discover tools that make managing user access and
        memberships a breeze.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative">
        {products && products?.length > 0 ? (
          products?.map((item, i) => (
            <div
              className="max-w-[384px] w-full rounded-[10px] bg-black border border-gray-800 p-3"
              key={i}
            >
              <Image
                src={
                  item?.attributes?.large_thumb_url ||
                  "/assets/images/404-page.webp"
                }
                alt="card-img"
                className="max-w-[374px] w-full h-[170px] object-cover rounded-lg mb-3"
                width={1500}
                height={1500}
              />
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-x-3 items-center">
                  <Image
                    src="/assets/images/avatar.png"
                    alt="card-avatar"
                    width={400}
                    height={400}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col gap-y-[6px]">
                    <p className="text-sm font-normal text-white">
                      {item.attributes.name}
                    </p>
                    <span className="text-xs font-normal text-gray9">
                      Tran Thien Duc
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-base font-normal text-gray9 absolute top-[50%] left-[30%]">
            No template available. Please create a new one.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManagePage;
