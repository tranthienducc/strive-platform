import BreadcumsCustom from "@/components/breadcums-custom";
import FormUpdate from "@/components/form/form-update";

const UpdatePage = () => {
  return (
    <div>
      <BreadcumsCustom title1="Updating" title2=" Update" />

      <h1 className="text-3xl font-semibold text-white mb-3">
        Update a current template
      </h1>
      <p className="text-sm font-medium text-gray9 mb-14">
        Updating a current templates for ID, title, price, categories, images,
        desc.
      </p>
      <div className="bg-gray28 border border-gray-800 max-w-[552px] rounded-xl w-full px-4 py-3 flex justify-center items-center flex-row">
        <FormUpdate />
      </div>
    </div>
  );
};

export default UpdatePage;
