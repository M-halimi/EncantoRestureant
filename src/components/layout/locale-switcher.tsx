"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/lib/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"

const locales = [
  { value: "en", label: "EN" },
  { value: "fr", label: "FR" },
  { value: "ar", label: "AR" },
]

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-4 w-4 text-zinc-500" />
      <Select value={locale} onValueChange={handleChange}>
        <SelectTrigger className="h-9 w-20 border-0 bg-transparent p-0 text-sm font-medium focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {locales.map((l) => (
            <SelectItem key={l.value} value={l.value}>
              {l.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
