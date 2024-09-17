import {
  Hero,
  Pricing,
  Reviews,
  Footer,
  About,
  Product,
  CTA,
} from "@/components/shared";

export default function Home() {
  return (
    <main className="max-w-full w-full h-screen mx-auto">
      <div className="lg:px-[68px] px-5 pt-[52px] pb-5 flex-col flex items-center justify-center">
        <Hero />
        <Product />
        <Pricing />
        <Reviews />
        <About />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
