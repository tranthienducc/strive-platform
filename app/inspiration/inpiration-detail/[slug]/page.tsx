import DetailInspirationCard from "@/components/inspiration-shared/DetailInspirationCard";
import { Suspense } from "react";
import Loading from "./loading";

const DetailInspiration = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <DetailInspirationCard />
      </Suspense>
    </>
  );
};

export default DetailInspiration;
