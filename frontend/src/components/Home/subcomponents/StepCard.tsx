import React from 'react';
import { StepCardProps } from '@/types/types';

const StepCard: React.FC<StepCardProps> = ({ step }) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative">
            {/* Mobile Layout (Only number and text) */}
            <div className="flex gap-4 md:hidden">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                    {step.number}
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-blue-950 mb-2">
                        {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                        {step.description}
                    </p>
                </div>
            </div>

            {/* Medium Screen Layout (Icon and text, no number) */}
            <div className="hidden md:block lg:hidden text-center">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                        {step.icon}
                    </div>
                </div>
                <h3 className="text-xl font-semibold text-blue-950 mb-3">
                    {step.title}
                </h3>
                <p className="text-gray-600">
                    {step.description}
                </p>
            </div>

            {/* Large Screen Layout (Number, icon, and text) */}
            <div className="hidden lg:block text-center">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.number}
                </div>
                <div className="mb-6 mt-4">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                        {step.icon}
                    </div>
                </div>
                <h3 className="text-xl font-semibold text-blue-950 mb-3">
                    {step.title}
                </h3>
                <p className="text-gray-600">
                    {step.description}
                </p>
            </div>
        </div>
    );
};

export default StepCard;