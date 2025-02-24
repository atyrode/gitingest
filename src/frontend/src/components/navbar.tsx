'use client'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

// Animation timing constants (in milliseconds)
const ANIMATION_TIMINGS = {
    initialDelay: 150,      // Delay before starting animations
    widthDuration: 300,    // Duration of width expansion
    fadeDelay: 100,        // Delay before starting fade-in
    fadeDuration: 200      // Duration of fade-in animation
} as const

export default function Navbar() {
    const [starCount, setStarCount] = useState<string | null>(null)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const formatStarCount = (count: number) => {
            if (count >= 1000) {
                return (count / 1000).toFixed(1) + 'k'
            }
            return count.toString()
        }

        const fetchGitHubStars = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/cyclotruc/gitingest')
                const data = await response.json()
                setStarCount(formatStarCount(data.stargazers_count))
                // Delay the expansion and fade-in slightly to ensure smooth animation
                setTimeout(() => {
                    setIsExpanded(true)
                    setTimeout(() => setIsVisible(true), ANIMATION_TIMINGS.fadeDelay)
                }, ANIMATION_TIMINGS.initialDelay)
            } catch (error) {
                console.error('Error fetching GitHub stars:', error)
                const element = document.getElementById('github-button')
                if (element) {
                    element.style.display = 'none'
                }
            }
        }

        fetchGitHubStars()
    }, [])

    return (
        <header className="sticky top-0 bg-[#FFFDF8] border-b-[3px] border-gray-900 z-50">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold tracking-tight">
                            <a href="/" className="hover:opacity-80 transition-opacity">
                                <span className="text-gray-900">Git</span><span className="text-[#FE4A60]">ingest</span>
                            </a>
                        </h1>
                    </div>
                    {/* Navigation */}
                    <nav className="flex items-center space-x-5">
                        {/* Chrome extension button */}
                        <Button
                            variant="neutral"
                            size="sm"
                            asChild
                            className="flex items-center gap-1.5 border-gray-900 bg-[#fff4da]"
                        >
                            <a
                                href="https://chromewebstore.google.com/detail/adfjahbijlkjfoicpjkhjicpjpjfaood?utm_source=item-share-cp"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 50 50"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    className="w-4 h-4 mr-1"
                                >
                                    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 32.987976 4 39.925645 8.44503 43.476562 15 L 25 15 A 1.0001 1.0001 0 0 0 24.886719 15.005859 C 19.738868 15.064094 15.511666 19.035373 15.046875 24.078125 L 8.0351562 12.650391 C 11.851593 7.4136918 18.014806 4 25 4 z M 6.8242188 14.501953 L 16.476562 30.230469 A 1.0001 1.0001 0 0 0 16.591797 30.388672 A 1.0001 1.0001 0 0 0 16.59375 30.392578 C 18.3752 33.158533 21.474925 35 25 35 C 26.413063 35 27.756327 34.701734 28.976562 34.169922 L 22.320312 45.824219 C 11.979967 44.509804 4 35.701108 4 25 C 4 21.169738 5.0375742 17.591533 6.8242188 14.501953 z M 25 17 C 29.430123 17 33 20.569877 33 25 C 33 26.42117 32.629678 27.751591 31.984375 28.90625 A 1.0001 1.0001 0 0 0 31.982422 28.908203 A 1.0001 1.0001 0 0 0 31.947266 28.966797 C 30.57172 31.37734 27.983486 33 25 33 C 20.569877 33 17 29.430123 17 25 C 17 20.569877 20.569877 17 25 17 z M 30.972656 17 L 44.421875 17 C 45.43679 19.465341 46 22.165771 46 25 C 46 36.609824 36.609824 46 25 46 C 24.842174 46 24.686285 45.991734 24.529297 45.988281 L 33.683594 29.958984 A 1.0001 1.0001 0 0 0 33.742188 29.841797 C 34.541266 28.405674 35 26.755664 35 25 C 35 21.728612 33.411062 18.825934 30.972656 17 z" />
                                </svg>
                                <p className='font-semibold'>Extension</p>
                            </a>
                        </Button>
                        <Button
                            variant="neutral"
                            size="sm"
                            asChild
                            className="flex items-center gap-1.5 border-gray-900 bg-[#fff4da]"
                        >
                            <a
                                target="_blank"
                                href="https://github.com/cyclotruc/gitingest"
                                className="flex items-center justify-start rounded-base border-2 border-border shadow-nav p-2 transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none overflow-hidden"
                                style={{ 
                                    width: isExpanded ? '80px' : '44px',
                                    transition: `width ${ANIMATION_TIMINGS.widthDuration}ms ease-out`
                                }}
                                id="github-button"
                            >
                                <div className="relative flex items-center gap-2 w-full">
                                    <svg className="h-8 w-6 shrink-0 absolute left-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                        <path className="fill-text" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                    </svg>
                                    {starCount && (
                                        <p 
                                            className="font-semibold opacity-0 transition-opacity absolute right-0"
                                            style={{ 
                                                opacity: isVisible ? 1 : 0,
                                                transitionDuration: `${ANIMATION_TIMINGS.fadeDuration}ms`
                                            }}
                                        >
                                            {starCount}
                                        </p>
                                    )}
                                </div>
                            </a>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
