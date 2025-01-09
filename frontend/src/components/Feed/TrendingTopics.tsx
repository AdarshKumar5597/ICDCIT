"use client"
import React from 'react'
import { TrendingUp, ArrowUpRight } from 'lucide-react'
import { NewsArticle } from '@/types/types'
import Link from 'next/link'

const TrendingTopics: React.FC<{ articles: NewsArticle[] }> = ({ articles }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            {articles.map((article, index) => (
                <Link
                    href={article.url}
                    key={index}
                    className="group cursor-pointer"
                >
                    <div className={`flex gap-4 p-4 py-5 ${index !== articles.length - 1 ? 'border-b' : ''} hover:bg-blue-50/50 rounded-lg transition-colors`}>
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            {index === 0 ? (
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                            ) : (
                                <span className="font-semibold text-blue-600">{index + 1}</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
                                {article.title}
                            </h3>
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-sm text-gray-500">
                                    {article.source.name}
                                </p>
                                <ArrowUpRight className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default TrendingTopics
