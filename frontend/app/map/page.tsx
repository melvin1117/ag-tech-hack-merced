import type { Metadata } from "next"
import { PageContainer } from "@/components/layout/page-container"
import { SectionContainer } from "@/components/layout/section-container"
import { FieldMap } from "@/components/map/field-map"
import { MapControls } from "@/components/map/map-controls"
import { MapLayers } from "@/components/map/map-layers"
import { MapLegend } from "@/components/map/map-legend"

export const metadata: Metadata = {
  title: "Field Map | AgroDrone",
  description: "Interactive map of your fields with drone data overlays",
}

export default function MapPage() {
  return (
    <PageContainer>
      <SectionContainer title="Field Map" description="Interactive map of your fields with drone data overlays" plain>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-3 h-[calc(100vh-12rem)] min-h-[500px]">
            <FieldMap />
          </div>
          <div className="space-y-4">
            <MapControls />
            <MapLayers />
            <MapLegend />
          </div>
        </div>
      </SectionContainer>
    </PageContainer>
  )
}

