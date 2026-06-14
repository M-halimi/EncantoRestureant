import { GalleryGrid } from "@/components/gallery/gallery-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery",
}

export default function GalleryPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white sm:text-5xl">
          Gallery
        </h1>
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
          Moments and flavors from Encanto
        </p>
      </div>
      <div className="mt-12">
        <GalleryGrid />
      </div>
    </div>
  )
}
