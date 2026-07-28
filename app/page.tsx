import { HeroSequence } from "@/components/hero/hero-sequence";
import { StatsSection } from "@/components/home/stats-section";
import { CatalogTeaser } from "@/components/home/catalog-teaser";
import { FinalCta } from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <HeroSequence />
      <StatsSection />
      <CatalogTeaser />
      <FinalCta />
    </>
  );
}
