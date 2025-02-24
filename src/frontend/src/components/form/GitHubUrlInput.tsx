import { Button } from "@/components/ui/button"
import {
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"

interface GitHubUrlInputProps {
  form: UseFormReturn<any>
  isLoading?: boolean
}

export function GitHubUrlInput({ form, isLoading }: GitHubUrlInputProps) {
  return (
    <div className="flex md:flex-row flex-col w-full h-full justify-center items-stretch space-y-5 md:space-y-0 md:space-x-5 pb-3">
      <div className="relative w-full h-full">
        <div className="w-full h-full rounded bg-gray-900 translate-y-1 translate-x-1 absolute inset-0 z-10" />
        <FormField
          control={form.control}
          name="input_text"
          render={({ field }) => (
            <FormItem className="relative z-20">
              <FormControl>
                <input
                  {...field}
                  placeholder="https://github.com/..."
                  className="border-[3px] w-full relative z-20 border-gray-900 placeholder-gray-600 text-lg font-medium focus:outline-none py-3.5 px-6 rounded bg-white disabled:opacity-50"
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <Button
        type="submit"
        variant="default"
        size="lg"
        className="bg-[#ffc480] border-[3px] border-gray-900 text-gray-900 font-medium tracking-wide text-lg flex-shrink-0 h-[58px] disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Ingesting...
          </div>
        ) : (
          "Ingest"
        )}
      </Button>
    </div>
  )
}
