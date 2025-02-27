import Hero from "@/components/global/site/hero";
import Feature from "@/components/global/site/feature";

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="mt-24">
        <Feature />
      </section>
    </div>
  );
}
