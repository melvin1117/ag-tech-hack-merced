import { PageContainer } from "@/components/layout/page-container"
import { FieldHeader } from "@/components/fields/field-header"
import { FieldMap } from "@/components/fields/field-map"
import { SoilAnalysis } from "@/components/fields/soil-analysis"
import { CropHealth } from "@/components/fields/crop-health"
import { PlantingRecommendations } from "@/components/fields/planting-recommendations"
import { FieldHistory } from "@/components/fields/field-history"
import { DiseaseProgression } from "@/components/fields/disease-progression"

export default function FieldDetailPage({ params }: { params: { id: string } }) {
  return (
    <PageContainer>
      <FieldHeader id={params.id} />
      <div className="grid gap-4 md:grid-cols-2">
        <FieldMap id={params.id} />
        <div className="grid gap-4 md:grid-rows-2">
          <SoilAnalysis id={params.id} />
          <CropHealth id={params.id} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <PlantingRecommendations id={params.id} />
        <DiseaseProgression id={params.id} />
        <FieldHistory id={params.id} />
      </div>
    </PageContainer>
  )
}

