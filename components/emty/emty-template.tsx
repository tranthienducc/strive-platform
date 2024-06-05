import Image from "next/image";

const EmtyTemplate = () => {
  return (
    <div className="max-w-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col mb-6 items-center text-center">
        <Image
          src="/assets/images/emty-img-product.png"
          alt="emty"
          width={1300}
          height={1300}
          className="max-w-[400px] h-[210px] object-cover rounded-xl mb-5"
        />
        <div className="flex-col gap-y-2 flex">
          <h5 className="text-base font-medium text-white">
            No templates now available here
          </h5>
          <p className="text-sm font-normal text-gray9">
            Please wait patiently, they will appear soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmtyTemplate;
