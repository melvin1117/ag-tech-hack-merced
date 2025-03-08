import { PageContainer } from "@/components/containers/page-container"
import { SectionContainer } from "@/components/containers/section-container"
import { DroneLiveFeed } from "@/components/drones/drone-live-feed"
import { DronesList } from "@/components/drones/drones-list"

export default function DronesPage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold mb-6">Drone Management</h1>
      <SectionContainer>
        <DroneLiveFeed />
        <DronesList />
      </SectionContainer>
    </PageContainer>
  )
}

