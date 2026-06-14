import { auth } from "@/lib/auth"
import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import { routing } from "./i18n/routing"

const i18nMiddleware = createMiddleware(routing)

export default auth((req) => {
  const { pathname } = req.nextUrl

  const protectedPaths = ["/admin/reservations", "/admin/dashboard", "/admin/staff"]

  const isAdminPath = protectedPaths.some((p) => pathname.includes(p))

  if (isAdminPath && !pathname.endsWith("/admin/login") && !req.auth) {
    const locale = pathname.split("/")[1]
    const loginUrl = new URL(`/${locale}/admin/login`, req.url)
    return NextResponse.redirect(loginUrl)
  }

  return i18nMiddleware(req)
})

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
