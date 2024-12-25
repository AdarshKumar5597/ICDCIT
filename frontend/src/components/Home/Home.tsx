import React from 'react';
import Hero from './subcomponents/Hero';
import DoctorCard from './subcomponents/DoctorCard';

const Home = () => {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto pt-12 pb-16 sm:pt-16 lg:pt-24">
                <div className="mt-8 md:mt-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <Hero />
                    <DoctorCard />
                </div>
            </div>
        </div>
    );
};

export default Home;