import { NewsArticle } from '@/types/types';
import { AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const TopHeadlinesSection: React.FC<{ articles: NewsArticle[] }> = ({ articles }) => {
    if (!articles?.length) {
        return (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl">
                <div className="text-center text-gray-500">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                    <p>No headlines available at the moment</p>
                </div>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
                <Link
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                    <div className="relative h-48">
                        <Image
                            src={article.image}
                            loading='lazy'
                            alt={article.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-3">{article.description}</p>
                        <div className="mt-4 text-sm text-gray-500">
                            {new Date(article.publishedAt).toLocaleDateString()}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default TopHeadlinesSection;
