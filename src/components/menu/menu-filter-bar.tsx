"use client"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Leaf, WheatOff, X } from "lucide-react"
import { useTranslations } from "next-intl"

interface MenuFilterBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  veganOnly: boolean
  onVeganToggle: () => void
  glutenFreeOnly: boolean
  onGlutenFreeToggle: () => void
}

export function MenuFilterBar({
  searchQuery,
  onSearchChange,
  veganOnly,
  onVeganToggle,
  glutenFreeOnly,
  onGlutenFreeToggle,
}: MenuFilterBarProps) {
  const t = useTranslations("menu")

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <Input
          placeholder={t("search")}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={onVeganToggle}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
            veganOnly
              ? "bg-green-100 text-green-800 ring-2 ring-green-300 dark:bg-green-900 dark:text-green-200 dark:ring-green-700"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          }`}
        >
          <Leaf className="h-3.5 w-3.5" />
          {t("vegan")}
        </button>
        <button
          onClick={onGlutenFreeToggle}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
            glutenFreeOnly
              ? "bg-amber-100 text-amber-800 ring-2 ring-amber-300 dark:bg-amber-900 dark:text-amber-200 dark:ring-amber-700"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          }`}
        >
          <WheatOff className="h-3.5 w-3.5" />
          {t("glutenFree")}
        </button>
      </div>
    </div>
  )
}
