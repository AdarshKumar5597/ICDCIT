import React from 'react';
import SectionHeader from './subcomponents/SectionHeader';
import StepsDisplay from './subcomponents/StepsDisplay';
import BookAppointmentBox from './subcomponents/BookAppointmentBox';
import TrustIndicators from './subcomponents/TrustIndicators';

const GetStarted = () => {

    return (
        <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto">
                <SectionHeader />
                <StepsDisplay />
                <BookAppointmentBox />
                <TrustIndicators />
            </div>
        </section>
    );
};

export default GetStarted;