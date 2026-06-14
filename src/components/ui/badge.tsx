import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
        vegan: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        glutenFree: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
        gold: "bg-gold-100 text-gold-800 dark:bg-gold-900 dark:text-gold-200",
        outline: "border border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
