import { Bookmark, Clock, Heart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const FeedPromoCard = () => {
    return (
        <div className="relative w-full">
            <div className="absolute hidden lg:block w-1/4 aspect-square max-w-24 top-8 -right-4 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute hidden lg:block w-1/3 aspect-square max-w-32 -bottom-8 -left-4 bg-blue-200 rounded-full opacity-50"></div>

            <div className="bg-white rounded-2xl shadow-xl p-6 relative z-10">
                <div className="aspect-video w-full bg-blue-50 rounded-xl mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                        <Image
                            src={"/images/food.png"}
                            alt='Featured Article'
                            width={1000}
                            height={1000}
                            className='object-cover w-full h-full'
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <article className="space-y-3">
                        <h3 className="font-semibold text-lg text-gray-900">
                            New Research Shows Benefits of Mediterranean Diet for Heart Health
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                            Recent studies confirm that following a Mediterranean diet rich in olive oil, nuts, and vegetables can significantly reduce cardiovascular risks...
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>5 min read</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Heart size={14} />
                                <span>248</span>
                            </div>
                        </div>
                    </article>

                    <div className="flex gap-3 items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">DR</span>
                        </div>
                        <div className="space-y-1">
                            <div className="font-medium text-sm text-gray-900">Dr. Rachel Smith</div>
                            <div className="text-xs text-gray-500">Cardiologist, MD</div>
                        </div>
                        <button className="ml-auto">
                            <Bookmark size={18} className="text-blue-500" />
                        </button>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                            Heart Health
                        </span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                            Diet & Nutrition
                        </span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                            Latest Research
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedPromoCard