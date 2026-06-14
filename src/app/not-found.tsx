import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-6xl font-bold text-terracotta-600 dark:text-terracotta-400">404</h1>
      <p className="text-xl text-zinc-600 dark:text-zinc-400">
        Page not found
      </p>
      <Link href="/en">
        <Button variant="default">Back to Home</Button>
      </Link>
    </div>
  )
}
