"use client"

import { ExampleRepositories } from "@/components/form/ExampleRepositories"
import { FileSizeSlider } from "@/components/form/FileSizeSlider"
import { GitHubUrlInput } from "@/components/form/GitHubUrlInput"
import { PatternSelector } from "@/components/form/PatternSelector"
import { ResultDisplay } from "@/components/result/ResultDisplay"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import * as React from "react"
import { useForm } from "react-hook-form"

interface FormData {
  input_text: string
  pattern_type: "exclude" | "include"
  pattern: string
  max_file_size: number
}

interface IngestResult {
  summary: string
  tree: string
  content: string
  ingest_id?: string
}

// Convert size to slider position
function sizeToLogSlider(sizeInKB: number): number {
  const minp = 0
  const maxp = 500
  const minv = Math.log(1)
  const maxv = Math.log(102400)

  // Inverse of the exponential function
  const value = Math.pow((Math.log(sizeInKB) - minv) / (maxv - minv), 1 / 1.5) * maxp
  return Math.round(value)
}

function GitForm() {
  const form = useForm<FormData>({
    defaultValues: {
      input_text: "",
      pattern_type: "exclude",
      pattern: "",
      max_file_size: sizeToLogSlider(50), // Convert 50kb to correct slider position
    },
  })

  const [patternType, setPatternType] = React.useState<"exclude" | "include">("exclude")
  const [result, setResult] = React.useState<IngestResult | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [isExiting, setIsExiting] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Auto-hide error after 5 seconds
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setIsExiting(true)
        // Wait for exit animation before removing error
        setTimeout(() => {
          setError(null)
          setIsExiting(false)
        }, 300)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true)
      setError(null)
      setIsExiting(false)
      
      // Create FormData object
      const formData = new FormData()
      formData.append("input_text", data.input_text)
      formData.append("pattern_type", data.pattern_type)
      formData.append("pattern", data.pattern)
      formData.append("max_file_size", data.max_file_size.toString())

      const response = await fetch("/", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to connect to server. Is it running?")
      }

      // Since the server returns HTML, we need to parse it to extract the data
      const html = await response.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, "text/html")
      
      // Extract data from the HTML response based on the template structure
      const summaryTextarea = doc.querySelector("textarea.w-full.h-\\[160px\\]") as HTMLTextAreaElement
      const treeInput = doc.querySelector("#directory-structure-content") as HTMLInputElement
      const contentTextarea = doc.querySelector("textarea.result-text") as HTMLTextAreaElement
      const resultsDiv = doc.querySelector("[data-results]")

      // Only set result if we found the summary element (indicating successful ingest)
      if (summaryTextarea) {
        setResult({
          summary: summaryTextarea.textContent || "",
          tree: treeInput?.value || "",
          content: contentTextarea?.textContent || "",
          ingest_id: resultsDiv?.getAttribute("data-ingest-id") || undefined,
        })
      } else {
        throw new Error("Failed to parse repository data")
      }
    } catch (error) {
      console.error("Error ingesting repository:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle pattern type change to toggle strikethrough on files
  const handlePatternChange = (value: "exclude" | "include") => {
    setPatternType(value)
    const files = document.getElementsByName("tree-line")

    Array.from(files).forEach((element) => {
      if (element.textContent?.includes("Directory structure:")) {
        return
      }

      element.classList.toggle("line-through")
      element.classList.toggle("text-gray-500")
      element.classList.toggle("hover:text-inherit")
      element.classList.toggle("hover:no-underline")
      element.classList.toggle("hover:line-through")
      element.classList.toggle("hover:text-gray-500")
    })
  }

  return (
    <>
      <div className="relative max-w-[864px] mx-auto px-0">
        <Card className="rounded-xl relative z-20 pl-8 sm:pl-10 pr-8 sm:pr-16 py-8 border-[3px] border-gray-900 bg-[#fff4da]">
          <img
            src="https://cdn.devdojo.com/images/january2023/shape-1.png"
            className="absolute md:block hidden left-0 h-[4.5rem] w-[4.5rem] bottom-0 -translate-x-full ml-3"
            alt="Decorative shape"
          />
          <CardContent className="p-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <GitHubUrlInput form={form} isLoading={isLoading} />

                <div className="flex flex-wrap gap-4 items-start">
                  <PatternSelector form={form} onPatternTypeChange={handlePatternChange} />
                  <FileSizeSlider form={form} />
                </div>

                <ExampleRepositories form={form} />
              </form>
            </Form>
          </CardContent>
        </Card>

        {result && <ResultDisplay result={result} />}
      </div>

      {/* Error Alert */}
      {mounted && (
        <div className="fixed bottom-4 right-4 z-50">
          {error && (
            <div
              className={`${
                isExiting
                  ? "animate-out fade-out slide-out-to-bottom duration-300"
                  : "animate-in fade-in slide-in-from-bottom duration-300"
              }`}
            >
              <Alert className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-[300px] bg-[#ffc480]">
                <AlertDescription className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default GitForm
