"use client"
import React from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { NewsArticle } from '@/types/types'
import Link from 'next/link'

const LocalHealthNews: React.FC<{ articles: NewsArticle[] }> = ({ articles }) => {
    if (!articles || articles.length === 0) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                        <div className="h-44 bg-gray-200" />
                        <div className="p-5">
                            <div className="h-6 bg-gray-200 rounded mb-3" />
                            <div className="h-4 bg-gray-200 rounded w-2/3" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article, index) => (
                <Link
                    target='_blank'
                    href={article.url}
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-full flex flex-col"
                >
                    <div className="relative h-52">
                        <Image
                            src={article.image}
                            loading='lazy'
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 left-4 bg-white/95 px-3 py-1.5 rounded-full shadow-sm">
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-red-500" />
                                <span className="font-medium text-gray-800">Local News</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                        <h3 className="font-semibold text-lg mb-3 text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                            {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3 flex-grow">{article.description}</p>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-sm text-gray-500">{article.source.name}</span>
                            <span className="text-sm text-gray-400">
                                {new Date(article.publishedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default LocalHealthNews
