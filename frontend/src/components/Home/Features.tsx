import React from 'react';
import FeatureHeader from './subcomponents/FeatureHeader';
import FeaturesGrid from './subcomponents/FeaturesGrid';
import Stats from './subcomponents/Stats';

const FeaturesSection = () => {
    return (
        <section className="bg-gradient-to-b from-white to-blue-50 px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-7xl mx-auto">
                <FeatureHeader />
                <FeaturesGrid />
                <Stats />
            </div>
        </section>
    );
};

export default FeaturesSection;