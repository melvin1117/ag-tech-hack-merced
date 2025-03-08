import { PageContainer } from "@/components/containers/page-container"
import { SectionContainer } from "@/components/containers/section-container"
import { AnalyticsChatbot } from "@/components/analytics/analytics-chatbot"
import { AnalyticsAlerts } from "@/components/analytics/analytics-alerts"
import { AnalyticsSummary } from "@/components/analytics/analytics-summary"

export default function AnalyticsPage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold mb-6">Analytics & Insights</h1>
      <SectionContainer>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <AnalyticsSummary />
            <AnalyticsAlerts />
          </div>
          <div>
            <AnalyticsChatbot />
          </div>
        </div>
      </SectionContainer>
    </PageContainer>
  )
}


