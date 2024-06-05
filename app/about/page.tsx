import { Header } from "@/components/shared";
import { ArrowDown, ChevronDown } from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <>
      <Header />
      <div className="mt-16 px-[231px] pb-10">
        <div className="flex flex-col gap-y-4 text-center items-center w-full justify-center">
          <h1 className="text-2xl font-bold text-white">About us</h1>
          <p className="text-base font-medium text-gray9 max-w-[750px] w-full">
            We are template platform, the best platform ever. At Strive, we
            believe can help your has a one template beautifull, good UI. We
            create beautiful interface templates, helping you have a vivid and
            attractive personal or company website.That is our mission.
          </p>
          <Image
            src="/assets/images/bg-dashboard.png"
            alt="meeting"
            width={1500}
            height={1500}
            className="max-w-[1050px] w-full h-[500px] object-cover rounded-xl mb-7"
          />
        </div>

        <h2 className="text-xl font-semibold text-white mb-5">Our Mission</h2>
        <p className="text-sm font-medium text-gray9 mb-32">
          Our mision is to empower individuals and businees through invovative
          solutions, fostering growth, and driving positive change in our
          communicaties. By delivering exceptinal products and services, we
          strive to exceed expectations, enhance lives, and inspire sustainable
          progess.
          <br />
          <br />
          Guilded by integrity, collaboration, and a commitment to exellence, we
          aim to be a catalyst for success, driving prosperity for our
          customers, employees, and shareholders while upholdings our
          responsibility to the enviroment and society at large.
        </p>

        <div className="flex flex-col gap-y-4 text-center items-center w-full justify-center mb-7">
          <h1 className="text-xl font-bold text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-base font-medium text-gray9 max-w-[750px] w-full">
            Welcome to our FAQ page! We&aspo;s compiled a list of commonly asked
            questions to provide you with quick an informatives answers.
          </p>
        </div>
        {Array(4)
          .fill(0)
          .map((item, index) => (
            <>
              <div className="flex flex-row justify-between items-center border-t border-white/10 pt-4 mb-4">
                <p className="text-sm font-medium text-white" key={index}>
                  What payments method do you accept?
                </p>
                <ChevronDown className="text-white w-5 h-5" />
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default AboutPage;
