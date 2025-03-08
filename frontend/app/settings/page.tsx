import { PageContainer } from "@/components/containers/page-container"
import { SectionContainer } from "@/components/containers/section-container"
import { SettingsTabs } from "@/components/settings/settings-tabs"

export default function SettingsPage() {
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <SectionContainer>
        <SettingsTabs />
      </SectionContainer>
    </PageContainer>
  )
}

