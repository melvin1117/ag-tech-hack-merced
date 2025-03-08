import { PageContainer } from "@/components/layout/page-container"
import { DroneHeader } from "@/components/drones/drone-header"
import { DroneCamera } from "@/components/drones/drone-camera"
import { DroneFlightPath } from "@/components/drones/drone-flight-path"

export default function DroneDetailPage({ params }: { params: { id: string } }) {
  return (
    <PageContainer>
      <DroneHeader id={params.id} />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <DroneCamera id={params.id} />
        </div>
        {/* <DroneControls id={params.id} /> */}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <DroneFlightPath id={params.id} />
        {/* <DroneHealth id={params.id} /> */}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {/* <DroneSchedule id={params.id} />
        <DroneHistory id={params.id} /> */}
      </div>
    </PageContainer>
  )
}

