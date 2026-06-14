"use client"

import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Utensils } from "lucide-react"

export function Hero() {
  const t = useTranslations("hero")
  const locale = useLocale()

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta-900/90 via-teal-900/80 to-zinc-900/90" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')",
        }}
      />

      <div
        className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-terracotta-500/20 blur-3xl"
      />
      <div
        className="absolute right-1/4 -bottom-32 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm">
            <Utensils className="h-4 w-4" />
            <span>Restaurant & Coffee</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          <span className="text-gold-400">Encanto</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mb-8 max-w-2xl text-lg text-white/80 sm:text-xl"
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href={`/${locale}/contact`}>
            <Button size="lg" variant="gold" className="gap-2 text-base">
              {t("reserve")}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href={`/${locale}/menu`}>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              {t("viewMenu")}
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-8 text-sm text-white/60"
        >
          <div className="flex items-center gap-2">
            <span className="text-gold-400">50–100 MAD</span>
            <span className="hidden sm:inline">per person</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <span>14 Rue de la Poste, Batha, Fès</span>
          <div className="h-4 w-px bg-white/20" />
          <span>06 75 03 85 27</span>
        </motion.div>
      </div>
    </section>
  )
}
