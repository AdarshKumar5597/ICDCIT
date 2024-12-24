import React from 'react'

const TrustIndicators = () => {
    return (
        <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-6 sm:gap-8 items-center opacity-70">
            <div className="text-center px-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500 mb-1">VERIFIED BY</div>
                <div className="text-lg font-bold text-gray-700">HealthCare</div>
            </div>
            <div className="text-center px-4 sm:px-6 border-l border-r border-gray-200">
                <div className="text-sm font-medium text-gray-500 mb-1">CERTIFIED</div>
                <div className="text-lg font-bold text-gray-700">ISO 27001</div>
            </div>
            <div className="text-center px-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500 mb-1">TRUSTED BY</div>
                <div className="text-lg font-bold text-gray-700">500+ Hospitals</div>
            </div>
        </div>
    )
}

export default TrustIndicators