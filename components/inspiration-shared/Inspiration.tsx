import DetailInspiration from "@/app/inspiration/inpiration-detail/[slug]/page";
import { api } from "@/convex/_generated/api";

import { convex } from "@/services/providers/convex-provider";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { slug: string };
}): Promise<Metadata> {
  const slug = searchParams.slug;

  const inspirations = await convex.query(
    api.inspiration.getInspirationBySlug,
    {
      slug: slug,
    }
  );

  return {
    title: inspirations?.[0].title || "Inspiration Title",
    description: inspirations?.[0].description || "Inspiration Description",
    keywords: inspirations?.[0].title,
    openGraph: {
      title: inspirations?.[0].title,
      description: inspirations?.[0].description,
      images: [inspirations?.[0].coverImage || "/bg-dashboard.webp"],
    },
  };
}

const Inspiration = () => {
  return <DetailInspiration />;
};

export default Inspiration;
