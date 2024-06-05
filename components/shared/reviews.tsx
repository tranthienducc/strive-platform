import Image from "next/image";
import Title from "../title";
import { Dot } from "lucide-react";
import Link from "next/link";

const Reviews = () => {
  return (
    <section className="pb-36">
      <Title>Reviews</Title>

      <div className="mt-16 grid grid-cols-3 col-span-2 gap-6">
        {Array(6)
          .fill(0)
          .map((_item, _index) => (
            <>
              <div className="max-w-[443px] w-full bg-gradient-conic border border-gray-800 rounded-xl p-6">
                <div className="flex flex-col gap-y-3 mb-3">
                  <div className="flex flex-row gap-x-2 items-center">
                    <Image
                      src="/assets/images/avatar.jpg"
                      alt="avatar"
                      className="w-6 h-6 rounded-full"
                      width={400}
                      height={400}
                    />
                    <h5 className="text-sm font-medium text-white">
                      Theo Kureila
                    </h5>
                  </div>
                  <div className="flex flex-row gap-x-[3px]">
                    {Array(5)
                      .fill(0)
                      .map((_item, _index) => (
                        <>
                          <Image
                            src="/assets/icons/star-fill.svg"
                            alt="star"
                            width={400}
                            height={400}
                            className="w-[14px] h-[14px]"
                          />
                        </>
                      ))}
                  </div>
                </div>
                <p className="text-sm font-normal text-gray9 mb-[14px]">
                  I absolutely love the Strive templates! They have exceeded my
                  expectations and I highly recommend them. These templates are
                  a game-changer for my design projects.
                </p>
                <div className="flex flex-row gap-x-[2px] items-center">
                  <div className="flex flex-row gap-x-[2px]">
                    <Link
                      href="/preview"
                      className="text-xs font-normal text-white"
                    >
                      Productize
                    </Link>
                    <Dot className="w-6 h-6 text-gray9" />
                    <span className="text-xs font-normal text-gray9">
                      Nov 18, 2024
                    </span>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </section>
  );
};

export default Reviews;
