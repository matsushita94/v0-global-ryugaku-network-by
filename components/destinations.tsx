import Image from "next/image"
import { destinations, type Destination } from "@/data/site-content"

export function Destinations() {
  return (
    <section id="destinations" className="bg-slate-50 section-spacing">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Destinations</p>

          <h2 className="section-title">
            Explore Study Destinations in Japan
          </h2>

          <p className="section-subtext mx-auto">
            We are currently focused on Japan and helping students discover cities
            that match their study goals, lifestyle, and future plans.
          </p>
        </div>

        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination: Destination) => (
            <div
              key={destination.name}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={destination.name === "Tokyo"}
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  {destination.name}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {destination.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
