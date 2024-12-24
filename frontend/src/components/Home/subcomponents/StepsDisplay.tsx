import { Search, Calendar, MessageCircle, ClipboardCheck } from 'lucide-react';
import StepCard from "./StepCard";
import { Step } from '@/types/types';

const StepsDisplay = () => {
    const steps: Step[] = [
        {
            icon: <Search className="w-8 h-8 text-blue-500" />,
            title: "Find Your Specialist",
            description: "Search through our verified specialists based on your symptoms or specific medical needs.",
            number: 1
        },
        {
            icon: <Calendar className="w-8 h-8 text-blue-500" />,
            title: "Book Appointment",
            description: "Choose a convenient time slot from the doctor's available schedule. Get instant confirmation.",
            number: 2
        },
        {
            icon: <MessageCircle className="w-8 h-8 text-blue-500" />,
            title: "Consultation",
            description: "Connect with your doctor through high-quality video call or chat for diagnosis and treatment.",
            number: 3
        },
        {
            icon: <ClipboardCheck className="w-8 h-8 text-blue-500" />,
            title: "Follow-up Care",
            description: "Get your prescription, treatment plan, and schedule follow-up appointments as needed.",
            number: 4
        }
    ];

    return (
        <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-100 -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="relative">
                        <StepCard step={step} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepsDisplay;