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
    name: "Global Expansion",
    image: "/images/southeast-asia.jpg",
    description:
      "We plan to expand our network over time. More destinations will be added as partnerships are built.",
  },
]

export function Destinations() {
  return (
    <section id="destinations" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Destinations
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Current Focus
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            We are currently focused on study opportunities in Japan. As our network grows,
            we will add new destinations in a careful and transparent way.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative h-64">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  {destination.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {destination.description}
                </p>
                <div className="mt-5 inline-flex items-center text-sm font-medium text-blue-600">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
