import Image from "next/image"
import { ArrowRight } from "lucide-react"

const destinations = [
  {
    name: "Japan",
    image: "/images/japan.jpg",
    description:
      "Our current focus is helping students explore study opportunities in Japan, including language schools, vocational schools, and universities.",
  },
  {
    name: "Future Expansion",
    image: "/images/southeast-asia.jpg",
    description:
      "Our long-term vision is to expand gradually into wider international study opportunities as our network grows.",
  },
]

export function Destinations() {
  return (
    <section id="destinations" className="bg-slate-50 section-spacing">
      <div className="section-container">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Destinations</p>

          <h2 className="section-title">
            Current Focus
          </h2>

          <p className="section-subtext">
            We are currently focused on helping students study in Japan. As our network
            develops, we plan to expand carefully and transparently.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {destinations.map((destination) => (
            <article
              key={destination.name}
              className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-72">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900">
                  {destination.name}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {destination.description}
                </p>

                <div className="mt-6 inline-flex items-center text-sm font-medium text-blue-600">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
