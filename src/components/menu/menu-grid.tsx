"use client"

import { useState, useMemo } from "react"
import { useTranslations, useLocale } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MenuItemCard } from "./menu-item-card"
import { MenuFilterBar } from "./menu-filter-bar"
import { menuItems, categories } from "@/lib/menu-data"

export function MenuGrid() {
  const t = useTranslations("menu")
  const locale = useLocale() as "en" | "fr" | "ar"
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [veganOnly, setVeganOnly] = useState(false)
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false)

  const filtered = useMemo(() => {
    let result = menuItems

    if (activeCategory !== "all") {
      result = result.filter((item) => item.category === activeCategory)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter((item) =>
        item.name.en.toLowerCase().includes(q) ||
        item.name.fr.toLowerCase().includes(q) ||
        item.name.ar.includes(q)
      )
    }

    if (veganOnly) {
      result = result.filter((item) => item.isVegan)
    }

    if (glutenFreeOnly) {
      result = result.filter((item) => item.isGlutenFree)
    }

    return result
  }, [activeCategory, searchQuery, veganOnly, glutenFreeOnly])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <MenuFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          veganOnly={veganOnly}
          onVeganToggle={() => setVeganOnly(!veganOnly)}
          glutenFreeOnly={glutenFreeOnly}
          onGlutenFreeToggle={() => setGlutenFreeOnly(!glutenFreeOnly)}
        />
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-6">
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id}>
              {cat.label[locale]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-0">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-zinc-500">
              <p className="text-lg">{t("noResults") || "No dishes found"}</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MenuItemCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
