import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

type BreadcrumbCategoryType = {
  page?: string;
  className?: string;
};

const BreadcrumbCategory = ({ page, className }: BreadcrumbCategoryType) => {
  return (
    <Breadcrumb className={cn("mb-5", className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/explore-template"
            className="text-[15px] font-medium text-gray9 hover:text-white"
          >
            Categories
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[15px] font-medium text-white">
            {page}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbCategory;
