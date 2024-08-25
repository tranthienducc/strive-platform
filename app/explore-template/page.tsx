import CategoriesCard from "./_component/CategoriesCard";
import { categories } from "@/constants/infoSectionConstants";

export default function CategoryPage() {
  return (
    <>
      <section className="flex flex-col max-w-full w-full mt-24 px-5 lg:px-[72px]">
        <h1 className="text-3xl font-medium text-white mb-3">
          All website templates categories
        </h1>
        <p className="text-base font-normal text-gray9 mb-10">
          Explore web design using Strive’s top-notch templates.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {categories.map((category, index) => (
            <CategoriesCard {...category} key={index} />
          ))}
        </div>
      </section>
    </>
  );
}
