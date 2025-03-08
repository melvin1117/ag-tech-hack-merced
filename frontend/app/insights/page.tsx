import { PageContainer } from "@/components/layout/page-container"
import { InsightsList } from "@/components/insights/insights-list"
import { InsightsFilter } from "@/components/insights/insights-filter"
import { InsightsTrends } from "@/components/insights/insights-trends"
import { InsightsChatbot } from "@/components/insights/insights-chatbot"

export default function InsightsPage() {
  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Insights</h2>
        <InsightsFilter />
      </div>
      <InsightsTrends />
      <div className="grid gap-4 md:grid-cols-2">
        <InsightsList />
        <InsightsChatbot />
      </div>
    </PageContainer>
  )
}

