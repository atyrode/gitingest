import {
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"

interface PatternSelectorProps {
    form: UseFormReturn<any>
    onPatternTypeChange: (value: "exclude" | "include") => void
}

export function PatternSelector({ form, onPatternTypeChange }: PatternSelectorProps) {
    return (
        <div className="w-[200px] sm:w-[250px] mr-9">
            <div className="relative">
                <div className="w-full h-full rounded bg-gray-900 translate-y-1 translate-x-1 absolute inset-0 z-10" />
                <div className="flex relative z-20 border-[3px] border-gray-900 rounded bg-white">
                    <FormField
                        control={form.control}
                        name="pattern_type"
                        render={({ field }) => (
                            <FormItem className="relative flex items-center">
                                <FormControl>
                                    <select
                                        {...field}
                                        className="w-21 py-2 pl-2 pr-6 appearance-none bg-[#e6e8eb] focus:outline-none border-r-[3px] border-gray-900 font-medium"
                                        onChange={(e) => {
                                            field.onChange(e)
                                            onPatternTypeChange(e.target.value as "exclude" | "include")
                                        }}
                                    >
                                        <option value="exclude">Exclude</option>
                                        <option value="include">Include</option>
                                    </select>
                                </FormControl>
                                <svg
                                    className="absolute right-2 w-4 h-4 pointer-events-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pattern"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <input
                                        {...field}
                                        placeholder="*.md, src/ "
                                        className="py-2 px-2 bg-[#E8F0FE] focus:outline-none w-full font-medium placeholder-gray-600"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}
