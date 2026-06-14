import { useTranslations } from "next-intl"
import Link from "next/link"
import { UtensilsCrossed, MapPin, Phone } from "lucide-react"
import { InstagramIcon } from "@/components/ui/icons"

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="border-t border-cream-dark bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-terracotta-600 dark:text-terracotta-400">
              <UtensilsCrossed className="h-6 w-6" />
              <span>Encanto</span>
            </Link>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              {t("contact.title")}
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-terracotta-500" />
                <span>14 Rue de la Poste, Batha, Fès</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-terracotta-500" />
                <span>06 75 03 85 27</span>
              </li>
              <li className="flex items-center gap-2">
                <InstagramIcon className="h-4 w-4 text-terracotta-500" />
                <a
                  href="https://instagram.com/Encanto_fes_restaurant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta-600 dark:hover:text-terracotta-400"
                >
                  @Encanto_fes_restaurant
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              {t("nav.links") || "Links"}
            </h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/menu" className="text-zinc-600 hover:text-terracotta-600 dark:text-zinc-400 dark:hover:text-terracotta-400">
                {t("nav.menu")}
              </Link>
              <Link href="/gallery" className="text-zinc-600 hover:text-terracotta-600 dark:text-zinc-400 dark:hover:text-terracotta-400">
                {t("nav.gallery")}
              </Link>
              <Link href="/contact" className="text-zinc-600 hover:text-terracotta-600 dark:text-zinc-400 dark:hover:text-terracotta-400">
                {t("nav.contact")}
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-cream-dark pt-6 text-center text-xs text-zinc-500 dark:border-zinc-800">
          &copy; {new Date().getFullYear()} Encanto. {t("footer.rights")}
        </div>
      </div>
    </footer>
  )
}
