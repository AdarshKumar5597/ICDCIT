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

    const dataForKnowledgeGraph = (currentNews: typeof news) => {
        let result = "";
        let counter = 1;

        if (currentNews.topHeadlines?.length > 0) {
            currentNews.topHeadlines.forEach(article => {
                result += `${counter}. ${article.title}\n${article.description}\n\n`;
                counter++;
            });
        }

        if (currentNews.featuredNews?.length > 0) {
            currentNews.featuredNews.forEach(article => {
                result += `${counter}. ${article.title}\n${article.description}\n\n`;
                counter++;
            });
        }

        if (currentNews.latestUpdates?.length > 0) {
            currentNews.latestUpdates.forEach(article => {
                result += `${counter}. ${article.title}\n${article.description}\n\n`;
                counter++;
            });
        }

        if (currentNews.trendingTopics?.length > 0) {
            currentNews.trendingTopics.forEach(article => {
                result += `${counter}. ${article.title}\n${article.description}\n\n`;
                counter++;
            });
        }

        if (currentNews.localNews?.length > 0) {
            currentNews.localNews.forEach(article => {
                result += `${counter}. ${article.title}\n${article.description}\n\n`;
                counter++;
            });
        }

        if (currentNews.research?.length > 0) {
            currentNews.research.forEach(article => {
                result += `${counter}. ${article.title}\n${article.description}\n\n`;
                counter++;
            });
        }

        console.log("Knowledge Graph Data: ", result);
        return result.trim();
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
                    process.env.NEXT_PUBLIC_GNEWS_API_KEY6,
                    process.env.NEXT_PUBLIC_GNEWS_API_KEY7,
                ];

                const newsData = {
                    featuredNews: await fetchNews("healthcare+innovation", 5, apiKeys[6]!),
                    latestUpdates: await fetchNews("recent+medicine", 6, apiKeys[1]!),
                    trendingTopics: await fetchNews("latest+trends+health", 10, apiKeys[2]!),
                    localNews: await fetchNews("India+health+updates", 8, apiKeys[3]!),
                    research: await fetchNews("medical+research", 6, apiKeys[4]!),
                    topHeadlines: await fetchTopHeadlines(apiKeys[5]!),
                };

                setNews(newsData);
                // Process the knowledge graph data after setting the news
                const graphData = dataForKnowledgeGraph(newsData);
                console.log("Initial Knowledge Graph Data:", graphData);
            } catch (err) {
                setError('Failed to fetch news. Please try again later.' + err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllNews();
    }, []);

    // Add a useEffect to watch for news changes
    useEffect(() => {
        if (!isLoading && Object.values(news).some(arr => arr.length > 0)) {
            const graphData = dataForKnowledgeGraph(news);
            console.log("Updated Knowledge Graph Data:", graphData);
        }
    }, [news, isLoading]);

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
                            {news.topHeadlines.length > 0 && (
                                <section className="mb-12">
                                    <h2 className="text-2xl font-semibold mb-6">Top Health Headlines</h2>
                                    <TopHeadlinesSection articles={news.topHeadlines} />
                                </section>
                            )}

                            {news.featuredNews.length > 0 && (
                                <section className="mb-12">
                                    <h2 className="text-2xl font-semibold mb-6">Featured Stories</h2>
                                    <FeaturedNews articles={news.featuredNews} />
                                </section>
                            )}

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
