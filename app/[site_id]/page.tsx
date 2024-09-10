import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convex } from "@/services/providers/convex-provider";
import ArticleCard from "../cms/sites/_component/ArticleCard";

export default async function page({
  params,
}: {
  params: { site_id: Id<"sites"> };
}) {
  const result = await convex.query(api.documents.getSitesById, {
    id: params.site_id,
  });

  return (
    <div className="flex flex-col mt-4  justify-center items-center w-[90%]">
      <div className="flex flex-col items-center p-3 w-full">
        <div className="flex flex-col justify-start items-center gap-2 w-full">
          <div className="flex gap-3 justify-start items-center w-full">
            <h1 className="scroll-m-20 text-3xl md:text-4xl tracking-tight font-bold text-center text-white">
              {result?.site_name[0]}
            </h1>
          </div>
          <div className="flex gap-3 justify-start items-center w-full border-b border-b-white/15 pb-4">
            <p className="text-gray9">{result?.site_description[0]}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center w-full">
        <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-5">
          <ArticleCard />
        </div>
      </div>
    </div>
  );
}
