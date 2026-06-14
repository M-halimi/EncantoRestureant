"use client"

import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, WheatOff } from "lucide-react"
import { menuItems } from "@/lib/menu-data"

const featuredIds = [12, 15, 18, 24, 42, 48]

export function FeaturedSection() {
  const t = useTranslations("home")
  const locale = useLocale()
  const featured = menuItems.filter((item) => featuredIds.includes(item.id))

  return (
    <section className="bg-cream py-20 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
            {t("featuredTitle")}
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            {t("featuredSubtitle")}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={`https://images.unsplash.com/photo-${1555396273 + index}?w=400&q=80`}
                    alt={item.name[locale as "en" | "fr" | "ar"]}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.currentTarget
                      target.src = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80`
                    }}
                  />
                </div>
                <CardContent className="p-5">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                      {item.name[locale as "en" | "fr" | "ar"]}
                    </h3>
                    <span className="shrink-0 font-bold text-terracotta-600 dark:text-terracotta-400">
                      {item.price} MAD
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.isVegan && (
                      <Badge variant="vegan" className="flex items-center gap-1">
                        <Leaf className="h-3 w-3" />
                        Vegan
                      </Badge>
                    )}
                    {item.isGlutenFree && (
                      <Badge variant="glutenFree" className="flex items-center gap-1">
                        <WheatOff className="h-3 w-3" />
                        GF
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link href={`/${locale}/menu`}>
            <Button variant="outline" size="lg" className="gap-2">
              View Full Menu
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
