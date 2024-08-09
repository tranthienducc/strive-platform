"use client";
import BreadcumsCustom from "@/components/breadcums-custom";
import InspirationForm from "@/components/form/InspirationForm";

const UpdatePage = () => {
  return (
    <div>
      <BreadcumsCustom title1="Updating" title2=" Update" />

      <h1 className="text-3xl font-semibold text-white mb-3">
        Update a current inspiration
      </h1>
      <p className="text-sm font-medium text-gray9 mb-14">
        Updating a current inspiration for ID, title, price, categories, images,
        desc.
      </p>
      <InspirationForm action="Update" />
    </div>
  );
};

export default UpdatePage;
