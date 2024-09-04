import { Metadata } from "next";
import { getInspirations } from "@/state/functions";
import DetailInspirationCard from "@/components/inspiration-shared/DetailInspirationCard";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const filterInspirations = await getInspirations(slug);

  return {
    title: filterInspirations?.title,
    description: filterInspirations?.description,
    keywords: "Strive Platform",
    openGraph: {
      title: filterInspirations?.title,
      description: filterInspirations?.description,
      images: [
        filterInspirations?.coverImage || "/inspiration-detail-page.png",
      ],
    },
  };
}

const DetailInspiration = () => {
  return (
    <>
      <DetailInspirationCard />
    </>
  );
};

export default DetailInspiration;
