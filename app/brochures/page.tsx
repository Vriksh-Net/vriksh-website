import type { Metadata } from "next";
import BrochureHero from "@/components/brochure-hero";
import BrochureList from "@/components/brochure-list";

export const metadata: Metadata = {
  title: "Brochures - Vriksh Consulting",
  description:
    "Download our company brochures and resources to learn more about our services and expertise.",
};


export default function BrochuresPage() {
  return (
    <div className="flex flex-col w-full">
      <BrochureHero />
      <BrochureList />
    </div>
  );
}
