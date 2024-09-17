"use client";
import { Id } from "@/convex/_generated/dataModel";
import SiteDashWrapper from "../_component/SidebarWrapper";
import CreateCategory from "./_component/CreateCategory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DeleteCategory from "./_component/DeleteCategory";

import UpdateCategory from "./_component/UpdateCategory";

const CategoryArticlePage = ({
  params,
}: {
  params: {
    site_id: Id<"sites">;
  };
}) => {
  const categories = useQuery(api.category.getAllCategory);

  return (
    <SiteDashWrapper site_id={params.site_id}>
      <main className="flex w-full p-4 flex-col items-center justify-between ">
        <div className="flex flex-col mb-[5rem] w-full">
          <h1 className=" text-3xl font-semibold tracking-tight">
            Create a Category & Manage Category
          </h1>
          <p className="leading-7 text-sm text-gray9">
            Categories help organize your blogs
          </p>

          <CreateCategory params={params} />
          <Table className="bg-black border border-white/15 rounded-lg overflow-x-auto text-white mt-6 h-36">
            <TableHeader>
              <TableRow className="text-gray9">
                <TableHead>
                  <Checkbox />
                </TableHead>
                <TableHead>#</TableHead>
                <TableHead>Category name</TableHead>
                <TableHead>Site Id</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.length === 0 ? (
                <p className="text-sm text-gray9 font-medium">No results...</p>
              ) : null}
              {categories?.map((cate, index) => (
                <TableRow key={cate._id} className="font-medium">
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{index + 1}</span>
                  </TableCell>
                  <TableCell className="font-bold text-nowrap">
                    {cate.category}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{cate.site_id}</span>
                  </TableCell>
                  <TableCell>
                    {new Date(cate._creationTime).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DeleteCategory id={cate._id} />
                    <UpdateCategory id={cate._id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </SiteDashWrapper>
  );
};

export default CategoryArticlePage;
