import { BreadcumsCustom } from "@/components/common/index";
import InspirationForm from "@/components/form/InspirationForm";
import { FORM } from "@/utils/types/enum";

const CreatePage = () => {
  return (
    <div className="pb-32">
      <BreadcumsCustom link="Creations" page=" Create" />

      <h1 className="text-3xl font-semibold text-white mb-3">
        Creating a new inspiration
      </h1>
      <p className="text-sm font-medium text-gray9 mb-14">
        Creating a new inspiration for user, information template, images,
        price.
      </p>
      <div className="flex flex-row gap-x-36 items-center justify-center">
        <InspirationForm action={FORM.CREATE} />
      </div>
    </div>
  );
};

export default CreatePage;
