import Hero from "@/components/global/site/hero";
import Feature from "@/components/global/site/feature";
import ProductCatalog from "@/components/global/site/product-catalog";
import ProductCreation from "@/components/global/site/product-creation";
import PromotionBanner from "@/components/global/site/promotion-banner";
import Footer from "@/components/global/site/footer";

export default function Home() {
  return (
    <div className="h-screen relative bg-[#D0F2B7] w-full">
      <Hero />
      <section className="bg-[#D0F2B7]">
        <Feature />
      </section>
      <section className="bg-[#D0F2B7] pt-24">
        <ProductCatalog />
      </section>
      <section className="bg-[#D0F2B7] pt-24">
        <ProductCreation />
      </section>
      <section className="bg-[#D0F2B7] pt-24">
        <PromotionBanner />
      </section>
      <Footer />
    </div>
  );
}
