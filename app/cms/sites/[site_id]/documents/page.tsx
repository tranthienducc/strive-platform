"use client";
import CreateDocument from "@/app/cms/_component/CreateDocument";
import SiteDashWrapper from "../_component/SidebarWrapper";
import Documents from "./_component/Documents";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const DocumentsPage = ({ params }: { params: { site_id: Id<"sites"> } }) => {
  const documents = useQuery(api.documents.getAllDocuments);
  return (
    <SiteDashWrapper site_id={params.site_id}>
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <CreateDocument site_id={params?.site_id} />
        </div>
        <div className="flex justify-start flex-wrap items-center gap-3">
          {documents?.map((data) => <Documents key={data._id} info={data} />)}
          {documents?.length === 0 ? (
            <main className="flex flex-col gap-2 lg:gap-2 min-h-[80vh] w-full">
              <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm border-white/20">
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    You have no documents
                  </h3>
                  <p className="text-sm text-gray9 mb-3">
                    Documents will show here once you&apos;ve created documents
                  </p>
                  <CreateDocument site_id={params?.site_id} />
                </div>
              </div>
            </main>
          ) : null}
        </div>
      </div>
    </SiteDashWrapper>
  );
};

export default DocumentsPage;
