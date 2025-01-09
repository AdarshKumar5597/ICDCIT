"use client"
import React from 'react'
import { FileText, ExternalLink, AlertCircle } from 'lucide-react'
import { NewsArticle } from '@/types/types'
import Link from 'next/link'

const ResearchFindings: React.FC<{ articles: NewsArticle[] }> = ({ articles }) => {
    if (!articles.length) {
        return (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl">
                <div className="text-center text-gray-500">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                    <p>No research findings available</p>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
                <Link
                    target='_blank'
                    href={article.url}
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                >
                    <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold group-hover:text-blue-600 transition-colors line-clamp-2">
                            {article.title}
                        </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 pl-16">
                        {article.description}
                    </p>
                    <div className="flex items-center justify-between text-sm pl-16">
                        <span className="text-gray-500 font-medium">{article.source.name}</span>
                        <ExternalLink className="w-4 h-4 text-blue-600 group-hover:transform group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ResearchFindings
