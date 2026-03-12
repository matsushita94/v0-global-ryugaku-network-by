import Image from "next/image"
import { ArrowRight } from "lucide-react"

const destinations = [
  {
    name: "Japan",
    image: "/images/japan.jpg",
    description: "Experience traditional culture while pursuing cutting-edge education in technology and design.",
  },
  {
    name: "Canada",
    image: "/images/canada.jpg",
    description: "Study in a multicultural environment with world-class universities and stunning natural beauty.",
  },
  {
    name: "Australia",
    image: "/images/australia.jpg",
    description: "Combine quality education with an adventurous lifestyle in a welcoming, diverse country.",
  },
  {
    name: "United Kingdom",
    image: "/images/uk.jpg",
    description: "Access prestigious institutions with centuries of academic excellence and rich history.",
  },
  {
    name: "Europe",
    image: "/images/europe.jpg",
    description: "Explore diverse cultures and languages while studying at renowned European institutions.",
  },
  {
    name: "Southeast Asia",
    image: "/images/southeast-asia.jpg",
    description: "Discover emerging educational opportunities in dynamic and culturally rich destinations.",
  },
]

export function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Popular Study Destinations
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover your ideal study destination from our curated selection of countries.
          </p>
        </div>

        <div className="mx-auto mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <article
              key={destination.name}
              className="group relative overflow-hidden rounded-xl bg-card shadow-sm border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={destination.image}
                  alt={`Study in ${destination.name}`}
                  width={400}
                  height={300}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {destination.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {destination.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="ml-1 size-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
