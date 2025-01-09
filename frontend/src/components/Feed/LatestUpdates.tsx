"use client"
import React, { useRef } from 'react'
import Image from 'next/image'
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react'
import { NewsArticle } from '@/types/types'
import Link from 'next/link'

const LatestUpdates: React.FC<{ articles: NewsArticle[] }> = ({ articles }) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 340
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    if (!articles?.length) {
        return (
            <div className="flex items-center justify-center h-48 bg-gray-50 rounded-xl">
                <div className="text-center text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-4" />
                    <p>No recent updates available</p>
                </div>
            </div>
        )
    }
    
    return (
        <div className="relative group">
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
                {articles.map((article, index) => (
                    <Link
                        href={article.url}
                        target='_blank'
                        key={index}
                        className="flex-shrink-0 w-80 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    >
                        <div className="relative h-48 w-full">
                            <Image
                                src={article.image}
                                loading='lazy'
                                alt={article.title}
                                fill
                                className="object-cover rounded-t-xl"
                                sizes="(max-width: 768px) 100vw, 320px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-xl" />
                        </div>
                        <div className="p-5">
                            <h3 className="font-semibold line-clamp-2 mb-3 text-gray-800 hover:text-blue-600 transition-colors">
                                {article.title}
                            </h3>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {new Date(article.publishedAt).toLocaleDateString()}
                                </span>
                                <ArrowRight className="w-4 h-4 text-blue-500" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                disabled={!articles.length}
            >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                disabled={!articles.length}
            >
                <ArrowRight className="w-5 h-5 text-gray-600" />
            </button>
        </div>
    )
}

export default LatestUpdates
