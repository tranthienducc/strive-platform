import NavigationList from "@/components/navigation/navigation-list";
import Image from "next/image";

const SidebarAdmin = () => {
  return (
    <aside className="fixed top-0 z-50 max-w-[270px] h-screen border-r border-r-white/15 text-white pt-6 pb-6 overflow-y-auto lg:overflow-hidden">
      <div className="flex flex-row gap-x-3 mb-12 px-6 items-center">
        <Image
          src="/assets/icons/logo.webp"
          alt="avatar"
          width={400}
          height={400}
          className="rounded-xl w-10 h-10"
        />
        <div className="flex flex-col gap-y-1">
          <h6 className="text-base font-medium text-white">Strive</h6>
          <p className="text-sm font-normal text-gray9">Template Platform</p>
        </div>
      </div>

      <NavigationList />
      <div className="px-6 pt-80">
        <div className="max-w-[220px] w-full h-[1px] bg-neutral-800 mb-8"></div>

        <span className="font-medium text-xs text-gray9">Strive V1.01</span>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
