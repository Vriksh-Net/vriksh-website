import GalleryHero from "@/components/gallery-hero"
import GalleryContent from "@/components/gallery-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery | Vriksh Consulting",
  description: "Explore our gallery showcasing office awards, training sessions, events, and more.",
}

export default function GalleryPage() {
  return (
    <div className="pt-20">
      <GalleryHero />
      <GalleryContent />
    </div>
  )
}
