import React from 'react';
import FeedDetails from './subcomponents/FeedDetails';
import FeedPromoCard from './subcomponents/FeedPromoCard';

const FeedPromo = () => {
    return (
        <section className="bg-gradient-to-br from-blue-50 to-white px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <FeedDetails />
                    <FeedPromoCard />
                </div>
            </div>
        </section>
    );
};

export default FeedPromo;