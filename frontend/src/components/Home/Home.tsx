import React from 'react';
import Image from 'next/image';
import { Star, Circle, User } from 'lucide-react';

const Home = () => {
    const stats = [
        {
            value: '4.9',
            label: 'Average platform specialists rating',
        },
        {
            value: 'HHS',
            label: 'All goverment licences and serticates',
        },
        {
            value: '2M+',
            label: 'Online-consultations number last year',
        }
    ];

    return (
        <div className="bg-gradient-to-br from-blue-50 to-white min-h-[100vh] mt-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto pt-12 pb-16 sm:pt-16 lg:pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Content */}
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-blue-950 leading-tight mb-4">
                            Save time.
                            <br />
                            Healthcare online
                        </h1>
                        <p className="text-gray-600 text-lg mb-8">
                            Your one-stop solution for all your healthcare needs, anytime, anywhere.
                        </p>

                        {/* Email Input */}
                        <div className="mx-auto gap-4 mb-12">
                            <div className="relative flex">
                                <input
                                    type="text"
                                    placeholder="What issue are you facing?"
                                    className="w-full px-4 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="absolute right-0 bottom-0 top-0 bg-blue-500 text-white px-6 py-4 rounded-full hover:bg-blue-600 transition-colors">
                                    Get Started
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center sm:text-left"
                                >
                                    <div className="flex items-center sm:items-baseline justify-center sm:justify-start">
                                        <span className="text-4xl sm:text-3xl font-bold text-blue-900">{stat.value}</span>
                                    </div>
                                    <p className="text-md sm:text-sm text-gray-600 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Right Column - Doctor Interface */}
                    <div className="relative">
                      

                        <div className="bg-white rounded-2xl shadow-lg p-4 max-w-sm mx-auto">
                            <div className="relative h-80 rounded-xl overflow-hidden mb-4">
                                <Image
                                    src="/doctor2.png"
                                    alt="Dr. Brand"
                                    width={400}
                                    height={320}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/90 to-transparent p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-navy-900">Dr. Brand</h3>
                                            <p className="text-sm text-gray-600">Dentist</p>
                                        </div>
                                        <div className="bg-green-400 w-2 h-2 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Interface */}
                            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <Image
                                            src="/patient.png"
                                            alt="Patient"
                                            width={1000}
                                            height={1000}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">A. Cooper</p>
                                        <p className="text-xs text-gray-500">Hello I need your help...</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4">
                                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Call
                                    </button>
                                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                        Message
                                    </button>
                                </div>
                            </div>

                            {/* Queue Info */}
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>Online queue</span>
                                <span className="font-semibold">48</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;