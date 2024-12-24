import React from 'react'
import { ArrowRight, BookOpen, Bell, Bookmark } from 'lucide-react';

const FeedDetails = () => {
    return (
        <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                Healthcare Feed
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-6">
                Stay informed with our curated health insights
            </h2>
            <p className="text-gray-600 text-lg mb-8">
                Access a personalized feed of health articles, news, and expert advice. Get the latest updates on medical breakthroughs, wellness tips, and healthcare trends.
            </p>

            <div className="space-y-6 mb-8">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-950 mb-1">Personalized Content</h3>
                        <p className="text-gray-600">Articles and insights tailored to your health interests</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Bell className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-950 mb-1">Latest Updates</h3>
                        <p className="text-gray-600">Stay updated with the newest healthcare developments</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Bookmark className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-950 mb-1">Save for Later</h3>
                        <p className="text-gray-600">Bookmark articles to build your health knowledge library</p>
                    </div>
                </div>
            </div>

            <button className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-medium gap-2">
                Explore Feed
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    )
}

export default FeedDetails