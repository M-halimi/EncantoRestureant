import { useLocale, useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, WheatOff } from "lucide-react"
import type { MenuItem } from "@/lib/menu-data"

export function MenuItemCard({ item }: { item: MenuItem }) {
  const locale = useLocale() as "en" | "fr" | "ar"
  const t = useTranslations("menu")

  return (
    <Card className="group h-full transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
            {item.name[locale]}
          </h3>
          <span className="shrink-0 text-base font-bold text-terracotta-600 dark:text-terracotta-400">
            {item.price} {t("price")}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {item.isVegan && (
            <Badge variant="vegan" className="flex items-center gap-1 text-[10px]">
              <Leaf className="h-3 w-3" />
              {t("vegan")}
            </Badge>
          )}
          {item.isGlutenFree && (
            <Badge variant="glutenFree" className="flex items-center gap-1 text-[10px]">
              <WheatOff className="h-3 w-3" />
              {t("glutenFree")}
            </Badge>
          )}
          {(item.category === "burgers" || item.category === "sandwich") && (
            <Badge variant="outline" className="text-[10px]">
              {t("withFries")}
            </Badge>
          )}
          {item.category === "pizza" && (
            <Badge variant="outline" className="text-[10px]">
              Home made
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
