"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useLocale } from "next-intl"

type LocaleContextType = {
  locale: string
  dir: "ltr" | "rtl"
}

const LocaleContext = createContext<LocaleContextType>({ locale: "en", dir: "ltr" })

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useLocale()
  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <LocaleContext.Provider value={{ locale, dir }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocaleContext() {
  return useContext(LocaleContext)
}
