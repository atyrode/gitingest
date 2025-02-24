import { Button } from "@/components/ui/button"
import { UseFormReturn } from "react-hook-form"

interface ExampleRepositoriesProps {
    form: UseFormReturn<any>
}

const examples = [
    { name: "Gitingest", url: "https://github.com/cyclotruc/gitingest" },
    { name: "FastAPI", url: "https://github.com/tiangolo/fastapi" },
    { name: "Flask", url: "https://github.com/pallets/flask" },
    { name: "Excalidraw", url: "https://github.com/excalidraw/excalidraw" },
    { name: "ApiAnalytics", url: "https://github.com/tom-draper/api-analytics" },
]

export function ExampleRepositories({ form }: ExampleRepositoriesProps) {
    return (
        <div>
            <p className="opacity-80 mb-1 text-gray-900">Try these example repositories:</p>
            <div className="flex flex-wrap gap-2.5">
                {examples.map((example) => (
                    <Button
                        key={example.url}
                        type="button"
                        variant="reverse"
                        onClick={() => form.setValue("input_text", example.url)}
                        className="h-9 bg-[#EBDBB7] hover:bg-[#FFC480] text-gray-900 rounded border-[3px] border-gray-900 font-medium"
                    >
                        {example.name}
                    </Button>
                ))}
            </div>
        </div>
    )
}
