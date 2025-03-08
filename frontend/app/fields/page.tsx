import { PageContainer } from "@/components/layout/page-container"
import { FieldList } from "@/components/fields/field-list"
import { FieldStats } from "@/components/fields/field-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function FieldsPage() {
  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Fields</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Field
        </Button>
      </div>
      <FieldStats />
      <FieldList />
    </PageContainer>
  )
}

