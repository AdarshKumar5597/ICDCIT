"use client"
import React from 'react'
import Image from 'next/image'
import { Clock, AlertCircle } from 'lucide-react'
import { NewsArticle } from '@/types/types'
import Link from 'next/link'

const FeaturedNews: React.FC<{ articles: NewsArticle[] }> = ({ articles }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    if (!articles.length) {
        return (
            <div className="flex items-center justify-center h-96 bg-gray-100 rounded-xl">
                <div className="text-center text-gray-500">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                    <p>No featured articles available</p>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles[0] && (
                <Link
                    target='_blank'
                    href={articles[0].source.url}
                    className="md:col-span-2 relative h-[500px] rounded-xl overflow-hidden cursor-pointer group"
                >
                    <Image
                        src={articles[0].image}
                        alt={articles[0].title}
                        fill
                        priority
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 p-8 text-white">
                        <h3 className="text-3xl font-bold mb-4 leading-tight">{articles[0].title}</h3>
                        <p className="line-clamp-2 mb-4 text-gray-200 text-lg">{articles[0].description}</p>
                        <div className="flex items-center gap-3 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{formatDate(articles[0].publishedAt)}</span>
                        </div>
                    </div>
                </Link>
            )}

            {articles.slice(1, 5).map((article, index) => (
                <Link
                    href={article.url}
                    target='_blank'
                    key={index}
                    className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
                >
                    <Image
                        src={article.image}
                        loading='lazy'
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 p-6 text-white">
                        <h3 className="font-semibold text-lg line-clamp-2 mb-2">{article.title}</h3>
                        <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{formatDate(article.publishedAt)}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default FeaturedNews
