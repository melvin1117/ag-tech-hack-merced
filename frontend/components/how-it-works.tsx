import Image from "next/image"

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform makes it easy to get started with drone-based agricultural monitoring.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold">Connect Your Drones</h3>
            <p className="text-sm text-muted-foreground text-center">
              Easily connect your existing drones or purchase compatible models through our platform.
            </p>
            <div className="relative h-40 w-full overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=160&width=320"
                alt="Drone connection illustration"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold">Map Your Land</h3>
            <p className="text-sm text-muted-foreground text-center">
              Schedule automated drone flights to create detailed maps of your agricultural land.
            </p>
            <div className="relative h-40 w-full overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=160&width=320"
                alt="Land mapping illustration"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold">Get Insights</h3>
            <p className="text-sm text-muted-foreground text-center">
              Receive actionable insights about soil conditions, crop health, and optimal planting areas.
            </p>
            <div className="relative h-40 w-full overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=160&width=320"
                alt="Data insights illustration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

