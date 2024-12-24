import React from 'react'

const FeatureHeader = () => {
    return (
        <div className="text-center mb-16" >
            <div className="inline-block">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                    Our Platform Features
                </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-4">
                Complete healthcare at your fingertips
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Access comprehensive healthcare services through our platform designed to make your medical journey seamless and efficient.
            </p>
        </div>
    )
}

export default FeatureHeader