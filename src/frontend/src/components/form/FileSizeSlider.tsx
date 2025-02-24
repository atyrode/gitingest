"use client"

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import * as React from "react";
import { UseFormReturn } from "react-hook-form";

// Convert slider position to actual file size using logarithmic scale
function logSliderToSize(position: number): number {
    const minp = 0;
    const maxp = 500;
    const minv = Math.log(1);
    const maxv = Math.log(102400);
    
    const value = Math.exp(minv + (maxv - minv) * Math.pow(position / maxp, 1.5));
    return Math.round(value);
}

// Format size to KB or MB
function formatSize(sizeInKB: number): string {
    if (sizeInKB >= 1024) {
        return Math.round(sizeInKB / 1024) + 'mb';
    }
    return Math.round(sizeInKB) + 'kb';
}

interface FileSizeSliderProps {
    form: UseFormReturn<{
        input_text: string;
        pattern_type: "exclude" | "include";
        pattern: string;
        max_file_size: number;
    }>
}

export function FileSizeSlider({ form }: FileSizeSliderProps) {
    const { watch } = form;
    const sliderPosition = watch("max_file_size");
    const actualSize = React.useMemo(() => logSliderToSize(sliderPosition), [sliderPosition]);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="w-[200px] sm:w-[200px]">
            <FormField
                control={form.control}
                name="max_file_size"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="block text-gray-700 font-normal">
                            Include files under:{" "}
                            <span id="size_value" className="font-bold">{formatSize(actualSize)}</span>
                        </FormLabel>
                        <FormControl>
                            <div className="relative">
                                {/* Pre-render static version */}
                                {!mounted && (
                                    <div className="absolute inset-0 flex w-full touch-none select-none items-center">
                                        <div className="relative mt-2 h-3 w-full grow overflow-hidden rounded-sm border-[3px] border-gray-900 bg-[#ebdbb7]">
                                            <div 
                                                className="absolute h-full bg-[#FE4A60]" 
                                                style={{ width: `${(field.value / 500) * 100}%` }}
                                            />
                                        </div>
                                        <div 
                                            className="absolute mt-2 block h-7 w-5 rounded-sm border-[3px] border-gray-900 bg-white shadow-[2.8px_2.9px_0_#000]"
                                            style={{ 
                                                left: `${(field.value / 500) * 100}%`,
                                                transform: 'translateX(-50%)', // Center the thumb on the exact position
                                            }}
                                        />
                                    </div>
                                )}
                                {/* Interactive slider */}
                                <Slider
                                    min={0}
                                    max={500}
                                    step={1}
                                    value={[field.value]}
                                    onValueChange={(value) => {
                                        field.onChange(value[0])
                                    }}
                                    className={mounted ? "w-full" : "invisible"}
                                />
                            </div>
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
    )
}
