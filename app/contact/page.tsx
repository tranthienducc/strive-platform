import Image from "next/image";

const ContactPage = () => {
  return (
    <>
      <div className="mt-16 px-[231px] pb-10">
        <div className="grid grid-cols-3 gap-x-2">
          {Array(3)
            .fill(0)
            .map((_item, index) => (
              <>
                <div
                  className="max-w-[371px] w-full h-[484px] rounded-3xl shadow shadow-white/30 px-3 py-3 border border-white/15"
                  key={index}
                >
                  <Image
                    src="/assets/images/newyork.webp"
                    alt="hero-img"
                    className="w-[347px] h-[348px] object-cover rounded-[14px] mb-4"
                    width={1300}
                    height={1300}
                  />
                  <h5 className="text-base font-medium text-white mb-2">
                    New York
                  </h5>
                  <p className="text-sm font-normal text-gray9">
                    0123 Peach PI, Deceitdate, IL, 0000
                  </p>
                  <span className="text-sm font-normal text-gray9">
                    (400) 000 - 0000
                  </span>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default ContactPage;
