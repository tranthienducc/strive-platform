import { useEffect, useState } from "react";

export default function useCheckISMobile() {
  const [width, setWidth] = useState(
    typeof window !== undefined ? window?.innerWidth : 0
  );

  const handleWindowSizeChange = () => {
    setWidth(window?.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }
  }, []);

  return width <= 768;
}
