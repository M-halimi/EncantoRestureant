"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Phone, Clock } from "lucide-react"
import { InstagramIcon } from "@/components/ui/icons"

export function LocationSection() {
  const t = useTranslations("home")
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              {t("locationTitle")}
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              {t("locationText")}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">14 Rue de la Poste, Batha</p>
                  <p className="text-sm text-zinc-500">Fès, Morocco</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-terracotta-100 text-terracotta-700 dark:bg-terracotta-900 dark:text-terracotta-300">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">06 75 03 85 27</p>
                  <p className="text-sm text-zinc-500">Call to reserve</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700 dark:bg-gold-900 dark:text-gold-300">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">Open daily</p>
                  <p className="text-sm text-zinc-500">12:00 – 22:00</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300">
                  <InstagramIcon className="h-5 w-5" />
                </div>
                <div>
                  <Link
                    href="https://instagram.com/Encanto_fes_restaurant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-terracotta-600 hover:underline dark:text-terracotta-400"
                  >
                    @Encanto_fes_restaurant
                  </Link>
                  <p className="text-sm text-zinc-500">{t("instagram")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.5!2d-4.983!3d34.033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b1c2d3e4f5%3A0x6a7b8c9d0e1f2a3b!2sBatha%2C+F%C3%A8s!5e0!3m2!1sen!2sma!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Encanto location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
