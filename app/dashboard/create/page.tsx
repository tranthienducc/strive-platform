import BreadcumsCustom from "@/components/breadcums-custom";
import FormCreate from "@/components/form/form-create";
import { social } from "@/constants/data";
import { MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";

const CreatePage = () => {
  return (
    <div className="">
      <BreadcumsCustom title1="Creations" title2=" Create" />

      <h1 className="text-3xl font-semibold text-white mb-3">
        Creating a new template
      </h1>
      <p className="text-sm font-medium text-gray9 mb-14">
        Creating a new templates for user, information template, images, price.
      </p>
      <div className="flex flex-row gap-x-36">
        <FormCreate />
        <div className="flex flex-col">
          <div className="flex flex-col gap-y-2 mb-12">
            <div className="flex gap-y-[3px] flex-col mb-5">
              <h4 className="text-base font-medium text-white">Chat with us</h4>
              <p className="text-sm font-normal text-gray9">
                Speak to our friendly team via live chat.
              </p>
            </div>
            {social.map((data, i) => (
              <>
                <div
                  className="flex flex-row gap-x-3 mb-3 items-center"
                  key={i}
                >
                  {data.icons}
                  <p className="text-sm font-medium text-white">
                    {data.description}
                  </p>
                </div>
              </>
            ))}
          </div>
          <div className="flex flex-col mb-12">
            <div className="flex gap-y-[3px] flex-col mb-5">
              <h4 className="text-base font-medium text-white">Call us</h4>
              <p className="text-sm font-normal text-gray9">
                Call our team Mon-Pri from 8am to 5pm.
              </p>
            </div>

            <div className="flex flex-row gap-x-3 items-center">
              <PhoneCall className="w-4 h-4 text-white" />
              <p className="text-sm font-medium text-white">
                +1 (000) 234-5678
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-y-[3px] flex-col mb-5">
              <h4 className="text-base font-medium text-white">Visit us</h4>
              <p className="text-sm font-normal text-gray9">
                Chat to us in person at our America NY.
              </p>
            </div>

            <div className="flex flex-row gap-x-3 items-center">
              <MapPin className="w-4 h-4 text-white" />
              <p className="text-sm font-medium text-white">
                100 Smitch Street, Colorado NY 3000
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-x-2 backdrop-blur-md rounded-xl border border-white/30 px-2 py-2 max-w-fit mt-5">
            <Image
              src="/assets/icons/logo.svg"
              alt="logo"
              width={400}
              height={400}
              className="w-4 h-4"
            />
            <h5 className="uppercase text-xs font-medium text-white">strive</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
