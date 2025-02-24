import { Card, CardContent } from "@/components/ui/card"
import { DirectoryStructure } from "./DirectoryStructure"
import { FileContent } from "./FileContent"
import { Summary } from "./Summary"

interface ResultDisplayProps {
  result: {
    summary: string
    tree: string
    content: string
    ingest_id?: string
  }
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  if (!result) return null

  return (
    <div className="mt-10">
      <div className="relative">
        <div className="w-full h-full absolute inset-0 bg-gray-900 rounded-xl translate-y-2 translate-x-2" />
        <Card className="bg-[#fafafa] rounded-xl border-[3px] border-gray-900 p-6 relative z-20">
          <CardContent className="p-0 space-y-6">
            {/* Summary and Directory Structure */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5">
                <Summary 
                  summary={result.summary} 
                  ingestId={result.ingest_id}
                />
              </div>
              <div className="md:col-span-7">
                <DirectoryStructure tree={result.tree} />
              </div>
            </div>
            
            {/* Files Content */}
            <FileContent content={result.content} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
