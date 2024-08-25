"use client";
import { BreadcumsCustom } from "@/components/common/index";
import InspirationForm from "@/components/form/InspirationForm";
import { FORM } from "@/utils/types/enum";

const UpdatePage = () => {
  return (
    <div className="h-full">
      <BreadcumsCustom link="Updating" page=" Update" />

      <h1 className="text-3xl font-semibold text-white mb-3">
        Update a current inspiration
      </h1>
      <p className="text-sm font-medium text-gray9 mb-14">
        Updating a current inspiration for ID, title, price, categories, images,
        desc.
      </p>
      <InspirationForm action={FORM.UPDATE} />
    </div>
  );
};

export default UpdatePage;
