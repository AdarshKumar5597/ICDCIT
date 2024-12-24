import React from 'react';

const Stats = () => {
    const stats = [
        { value: "98%", label: "Patient Satisfaction" },
        { value: "1000+", label: "Verified Doctors" },
        { value: "50k+", label: "Active Users" },
        { value: "24/7", label: "Support Available" }
    ];

    return (
        <div className="mt-12 sm:mt-20">
            <div className="text-center mb-12">
                <div className="inline-block">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                        Platform Statistics
                    </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-4">
                    Trusted by Thousands Worldwide
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Discover the key metrics that highlight the reliability and excellence of our platform.
                </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-4 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors"
                        >
                            <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1 sm:mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm sm:text-base text-gray-600">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;
