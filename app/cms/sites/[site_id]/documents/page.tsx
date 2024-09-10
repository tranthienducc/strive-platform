import CreateDocument from "@/app/cms/_component/CreateDocument";
import SiteDashWrapper from "../_component/SidebarWrapper";
import Documents from "./_component/Documents";
import { Id } from "@/convex/_generated/dataModel";

const DocumentsPage = ({ params }: { params: { site_id: Id<"sites"> } }) => {
  return (
    <SiteDashWrapper site_id={params.site_id}>
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <CreateDocument site_id={params?.site_id} />
        </div>
        <div className="flex justify-start flex-wrap items-center gap-3">
          <Documents site_id={params.site_id} />
          <main className="flex flex-col gap-2 lg:gap-2 min-h-[80vh] w-full">
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  You have no documents
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Documents will show here once you&apos;ve created documents
                </p>
                <CreateDocument site_id={params?.site_id} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SiteDashWrapper>
  );
};

export default DocumentsPage;
