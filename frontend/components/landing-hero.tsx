import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Smart Farming with Drone Technology
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Monitor crops, analyze soil conditions, and optimize planting with real-time drone data
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/demo">Watch Demo</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-700 rounded-lg shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=800')] bg-cover bg-center opacity-50 mix-blend-overlay"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center p-6">
                    <div className="text-4xl font-bold mb-2">AgroDrone</div>
                    <div className="text-lg opacity-90">Precision Agriculture Platform</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

