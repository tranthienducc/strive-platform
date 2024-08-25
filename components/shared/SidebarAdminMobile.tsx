import React from "react";

import NavigationList from "../navigation/navigation-list";

const SidebarAdminMobile = () => {
  return (
    <nav className="rounded-full fixed bottom-2  left-11 max-w-[300px] w-full px-3 py-1 flex flex-row items-center gap-3 border border-white/15 z-50 bg-black/75">
      <NavigationList />
    </nav>
  );
};

export default SidebarAdminMobile;
