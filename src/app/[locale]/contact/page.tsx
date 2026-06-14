import { getTranslations } from "next-intl/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/contact/contact-form"
import { ReservationForm } from "@/components/contact/reservation-form"
import { MapPin, Phone, Clock } from "lucide-react"
import { InstagramIcon } from "@/components/ui/icons"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "contact" })

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
          {t("subtitle")}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5 text-terracotta-500" />
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    14 Rue de la Poste, Batha<br />Fès, Morocco
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Phone className="h-5 w-5 text-terracotta-500" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="tel:+212675038527"
                    className="text-lg font-medium text-terracotta-600 hover:underline dark:text-terracotta-400"
                  >
                    06 75 03 85 27
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <InstagramIcon className="h-5 w-5 text-terracotta-500" />
                    Instagram
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://instagram.com/Encanto_fes_restaurant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-terracotta-600 hover:underline dark:text-terracotta-400"
                  >
                    {t("instagram")}
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-terracotta-500" />
                    Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {t("hours")}<br />12:00 – 22:00
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.5!2d-4.983!3d34.033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b1c2d3e4f5%3A0x6a7b8c9d0e1f2a3b!2sBatha%2C+F%C3%A8s!5e0!3m2!1sen!2sma!4v1"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Encanto on Google Maps"
                className="w-full"
              />
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t("reserveTitle")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReservationForm />
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t("title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
