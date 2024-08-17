import { Footer, Header, Hero, Pricing, Reviews } from "@/components/shared";
import Product from "@/components/shared/product";

export default function Home() {
  return (
    <main className="max-w-[1513px] w-full h-screen mx-auto">
      <div className="px-[68px] pt-[52px] pb-5 flex-col flex items-center justify-center">
        <Header />
        <Hero />
        <Product />
        <Pricing />
        <Reviews />
        <Footer />
      </div>
    </main>
  );
}
