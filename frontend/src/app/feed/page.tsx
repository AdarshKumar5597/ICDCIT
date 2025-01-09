"use client";
import { Suspense, lazy } from 'react';
import LoadingSpinner from '@/components/global/LoadingSpinner';
import { useEffect, useState } from "react";
import { NewsArticle } from '@/types/types';

const FeaturedNews = lazy(() => import("@/components/Feed/FeaturedNews"));
const LatestUpdates = lazy(() => import("@/components/Feed/LatestUpdates"));
const LocalHealthNews = lazy(() => import("@/components/Feed/LocalHealthNews"));
const ResearchFindings = lazy(() => import("@/components/Feed/ResearchFindings"));
const TrendingTopics = lazy(() => import("@/components/Feed/TrendingTopics"));
const TopHeadlinesSection = lazy(() => import("@/components/Feed/TopHeadlinesSection"));


const Feed = () => {
    const [news, setNews] = useState<{
        featuredNews: NewsArticle[];
        latestUpdates: NewsArticle[];
        trendingTopics: NewsArticle[];
        localNews: NewsArticle[];
        research: NewsArticle[];
        topHeadlines: NewsArticle[];
    }>({
        featuredNews: [],
        latestUpdates: [],
        trendingTopics: [],
        localNews: [],
        research: [],
        topHeadlines: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNews = async (query: string, maxResults: number, apiKey: string) => {
        try {
            const response = await fetch(
                `https://gnews.io/api/v4/search?q=${query}&lang=en&country=in&max=${maxResults}&apikey=${apiKey}`
            );
            if (!response.ok) throw new Error('Failed to fetch news');
            const data = await response.json();
            return data.articles || [];
        } catch (error) {
            console.error(`Error fetching ${query}:`, error);
            return [];
        }
    };

    const fetchTopHeadlines = async (apiKey: string) => {
        try {
            const response = await fetch(
                `https://gnews.io/api/v4/top-headlines?category=health&max=6&lang=en&country=in&apikey=${apiKey}`
            );
            if (!response.ok) throw new Error('Failed to fetch top headlines');
            const data = await response.json();
            return data.articles || [];
        } catch (error) {
            console.error('Error fetching top headlines:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchAllNews = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const apiKeys = [
                    process.env.NEXT_PUBLIC_GNEWS_API_KEY1,
                    process.env.NEXT_PUBLIC_GNEWS_API_KEY2,
                    process.env.NEXT_PUBLIC_GNEWS_API_KEY3,
                    process.env.NEXT_PUBLIC_GNEWS_API_KEY4,
                    process.env.NEXT_PUBLIC_GNEWS_API_KEY5,
                ];

                const newsData = {
                    featuredNews: await fetchNews("healthcare+innovation", 5, apiKeys[0]!),
                    latestUpdates: await fetchNews("recent+medicine", 6, apiKeys[1]!),
                    trendingTopics: await fetchNews("latest+trends+health", 10, apiKeys[2]!),
                    localNews: await fetchNews("India+health+updates", 8, apiKeys[3]!),
                    research: await fetchNews("medical+research", 6, apiKeys[4]!),
                    topHeadlines: await fetchTopHeadlines(apiKeys[0]!),
                };

                setNews(newsData);
            } catch (err) {
                setError('Failed to fetch news. Please try again later.' + err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllNews();
    }, []);
    // console.log("All news: ", news);

    if (error) {
        return (
            <div className="mt-16 min-h-screen flex items-center justify-center">
                <div className="text-center text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="mt-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                    Health News & Updates
                </h1>

                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <Suspense fallback={<LoadingSpinner />}>
                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold mb-6">Top Health Headlines</h2>
                                <TopHeadlinesSection articles={news.topHeadlines} />
                            </section>
                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold mb-6">Featured Stories</h2>
                                <FeaturedNews articles={news.featuredNews} />
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-semibold mb-6">Latest Updates</h2>
                                <LatestUpdates articles={news.latestUpdates} />
                            </section>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <section className="lg:col-span-1">
                                    <h2 className="text-2xl font-semibold mb-6">Trending Topics</h2>
                                    <TrendingTopics articles={news.trendingTopics} />
                                </section>

                                <section className="lg:col-span-2">
                                    <h2 className="text-2xl font-semibold mb-6">Local Health News</h2>
                                    <LocalHealthNews articles={news.localNews} />
                                </section>
                            </div>

                            <section className="mt-12">
                                <h2 className="text-2xl font-semibold mb-6">
                                    Latest Research Findings
                                </h2>
                                <ResearchFindings articles={news.research} />
                            </section>
                        </Suspense>
                    </>
                )}
            </div>
        </div>
    );
};

export default Feed;
