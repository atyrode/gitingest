"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"

import * as React from "react"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative mt-2 h-3 w-full grow overflow-hidden rounded-sm border-[3px] border-gray-900 bg-[#ebdbb7]">
      <SliderPrimitive.Range className="absolute h-full bg-[#FE4A60]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="mt-2 block h-7 w-5 rounded-sm border-[3px] border-gray-900 bg-white shadow-[3px_3px_0_#000] transition-all hover:-translate-y-px hover:-translate-x-px hover:shadow-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
