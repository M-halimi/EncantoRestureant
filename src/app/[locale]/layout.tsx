import type { Metadata } from "next"
import { Inter, Noto_Sans_Arabic } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { ThemeProvider } from "next-themes"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { LocaleProvider } from "@/lib/locale-context"
import { JsonLd } from "@/components/seo/json-ld"
import { routing } from "@/i18n/routing"
import "../globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  weight: ["400", "500", "600", "700"],
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: {
    default: "Encanto — Restaurant & Coffee | Fès, Morocco",
    template: "%s | Encanto",
  },
  description: "Moroccan & International cuisine in the heart of Fès. 14 Rue de la Poste, Batha.",
  openGraph: {
    title: "Encanto — Restaurant & Coffee",
    description: "Moroccan & International cuisine in the heart of Fès. 14 Rue de la Poste, Batha.",
    type: "website",
    siteName: "Encanto",
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()
  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <html
      lang={locale}
      dir={dir}
      data-theme="light"
      className={`${inter.variable} ${notoSansArabic.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <JsonLd locale={locale} />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <LocaleProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </LocaleProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
