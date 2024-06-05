import Title from "../title";
import TemplateList from "../templates/template-list";

const Product = () => {
  return (
    <section className="pb-40">
      <div className="flex items-center flex-col mb-16">
        <Title>Templates</Title>
        <h4 className="text-[54px] font-semibold text-white">
          Landing Pages Templates
        </h4>
      </div>

      <TemplateList />
    </section>
  );
};

export default Product;
