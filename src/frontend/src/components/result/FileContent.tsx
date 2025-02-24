import { Button } from "@/components/ui/button"

interface FileContentProps {
  content: string
}

export function FileContent({ content }: FileContentProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">Files Content</h3>
        <div className="relative group">
          <div className="w-full h-full rounded bg-gray-900 translate-y-1 translate-x-1 absolute inset-0" />
          <Button
            onClick={() => copyToClipboard(content)}
            className="px-4 py-2 bg-[#ffc480] border-[3px] border-gray-900 text-gray-900 rounded group-hover:-translate-y-px group-hover:-translate-x-px transition-transform relative z-10 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
            Copy
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="w-full h-full rounded bg-gray-900 translate-y-1 translate-x-1 absolute inset-0" />
        <textarea
          className="w-full p-4 bg-[#fff4da] border-[3px] border-gray-900 rounded font-mono text-sm resize-y focus:outline-none relative z-10"
          style={{ minHeight: content ? "600px" : "calc(100vh - 800px)" }}
          value={content}
          readOnly
        />
      </div>
    </div>
  )
}
