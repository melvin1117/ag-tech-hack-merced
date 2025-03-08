import { PageContainer } from "@/components/containers/page-container"
import { SectionContainer } from "@/components/containers/section-container"
import { FarmHealthFieldOverview } from "@/components/dashboard/farm-health-field-overview"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"

export default function DashboardPage() {
  return (
    <PageContainer>
      <DashboardHeader title="AgroVision Dashboard" />
      <SectionContainer>
        <DashboardCards />
        <FarmHealthFieldOverview />
        <DashboardCharts />
      </SectionContainer>
    </PageContainer>
  )
}

