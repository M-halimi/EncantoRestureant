import { Hero } from "@/components/home/hero"
import { FeaturedSection } from "@/components/home/featured-section"
import { LocationSection } from "@/components/home/location-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Encanto — Restaurant & Coffee | Fès, Morocco",
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <LocationSection />
    </>
  )
}
