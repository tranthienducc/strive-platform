import { Header } from "@/components/shared";

import CategoriesCard from "./_component/CategoriesCard";
import { categories } from "@/constants/data";

export default function CategoryPage() {
  return (
    <>
      <Header />
      <section className="flex flex-col max-w-full w-full mt-24 px-[72px]">
        <h1 className="text-3xl font-medium text-white mb-3">
          All website templates categories
        </h1>
        <p className="text-base font-normal text-gray9 mb-10">
          Explore web design using Strive’s top-notch templates.
        </p>

        <div className="grid grid-cols-4 gap-5">
          {categories.map((category) => (
            <CategoriesCard {...category} key={category.categories} />
          ))}
        </div>
      </section>
    </>
  );
}
