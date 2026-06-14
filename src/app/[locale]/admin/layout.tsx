"use client"

import { useSession } from "next-auth/react"
import { useLocale } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, LayoutDashboard, LogOut, UtensilsCrossed, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SessionProvider } from "next-auth/react"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/reservations", label: "Reservations", icon: CalendarDays },
  { href: "/admin/staff", label: "Staff", icon: Users },
]

function AdminSidebar({ locale }: { locale: string }) {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="flex w-64 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex h-16 items-center gap-2 border-b border-zinc-200 px-6 dark:border-zinc-800">
        <UtensilsCrossed className="h-6 w-6 text-terracotta-600 dark:text-terracotta-400" />
        <span className="text-lg font-bold text-zinc-900 dark:text-white">Encanto</span>
        <span className="rounded-md bg-teal-100 px-1.5 py-0.5 text-[10px] font-medium text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">
          ADMIN
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const href = `/${locale}${item.href}`
          const active = pathname === href
          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {session && (
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          <div className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
            {session.user?.email}
          </div>
          <Link href={`/${locale}/admin/login`}>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={async () => {
                const { signOut } = await import("next-auth/react")
                await signOut({ redirect: false })
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </Link>
        </div>
      )}
    </aside>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale()

  return (
    <SessionProvider>
      <div className="flex min-h-screen">
        <AdminSidebar locale={locale} />
        <main className="flex-1 bg-zinc-50 dark:bg-zinc-950">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </SessionProvider>
  )
}
