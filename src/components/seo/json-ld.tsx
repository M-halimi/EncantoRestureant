type Props = {
  locale: string
}

export function JsonLd({ locale }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Encanto",
    description: "Moroccan & International cuisine restaurant and coffee in Fès, Morocco.",
    url: "https://encanto-fes.com",
    telephone: "+212675038527",
    servesCuisine: ["Moroccan", "International", "Italian", "French"],
    priceRange: "50–100 MAD",
    address: {
      "@type": "PostalAddress",
      streetAddress: "14 Rue de la Poste",
      addressLocality: "Batha, Fès",
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.033,
      longitude: -4.983,
    },
    sameAs: [
      "https://instagram.com/Encanto_fes_restaurant",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "12:00",
        closes: "22:00",
      },
    ],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    inLanguage: locale,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
