import { Suspense } from "react";
import Loading from "./loading";
import Inspiration from "@/components/inspiration-shared/Inspiration";

const DetailInspiration = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Inspiration />
      </Suspense>
    </>
  );
};

export default DetailInspiration;
