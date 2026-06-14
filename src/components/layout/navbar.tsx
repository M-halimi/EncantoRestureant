"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { Menu, X, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { LocaleSwitcher } from "./locale-switcher"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", labelKey: "home" },
  { href: "/menu", labelKey: "menu" },
  { href: "/gallery", labelKey: "gallery" },
  { href: "/contact", labelKey: "contact" },
]

export function Navbar() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 shadow-sm backdrop-blur-md dark:bg-zinc-950/90"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-xl font-bold text-terracotta-600 dark:text-terracotta-400"
        >
          <UtensilsCrossed className="h-6 w-6" />
          <span>Encanto</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href === "/" ? "" : link.href}`}
              className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-cream hover:text-terracotta-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-terracotta-400"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher />
          <ThemeToggle />
          <Link href={`/${locale}/contact`}>
            <Button variant="default" size="sm" className="bg-teal-700 hover:bg-teal-800">
              Reserve
            </Button>
          </Link>
        </div>

        <button
          className="flex items-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-cream-dark bg-white px-4 pb-6 pt-4 dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href === "/" ? "" : link.href}`}
                className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-cream hover:text-terracotta-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-terracotta-400"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-3 border-t border-cream-dark pt-4 dark:border-zinc-800">
              <LocaleSwitcher />
              <ThemeToggle />
              <Link href={`/${locale}/contact`} className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button variant="default" size="sm" className="w-full bg-teal-700 hover:bg-teal-800">
                  Reserve
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
