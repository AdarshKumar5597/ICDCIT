import React from 'react'

const Hero = () => {
    const stats = [
        {
            value: '4.9+',
            label: 'Average platform specialists rating',
        },
        {
            value: 'HHS',
            label: 'All goverment licences and certicates',
        },
        {
            value: '2M+',
            label: 'Online-consultations number last year',
        }
    ];
    return (
        <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-blue-950 leading-tight mb-4">
                Save time.
                <br />
                Healthcare online
            </h1>
            <p className="text-gray-600 text-lg mb-8">
                Your one-stop solution for all your healthcare needs, anytime, anywhere.
            </p>

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
    )
}

export default Hero