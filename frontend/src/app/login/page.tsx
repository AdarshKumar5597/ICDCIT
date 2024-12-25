import React from 'react';
import Link from "next/link";

const Page = () => {
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
                    <div className="relative flex flex-col justify-center items-center">

                        <main className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                            <h1 className="text-2xl font-semibold text-center text-blue-950 mb-6">Login</h1>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="email"
                                           className="block text-sm font-medium text-gray-600">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block text-sm font-medium text-gray-600">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-50"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                >
                                    Login
                                </button>
                            </form>
                            <div className="mt-4 text-center flex flex-col">
                                <p className="text-sm text-gray-600">Don&apos;t have an account?</p>
                                <Link
                                    href={"/signup"}
                                    type="button"
                                    className="mt-2 px-4 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;