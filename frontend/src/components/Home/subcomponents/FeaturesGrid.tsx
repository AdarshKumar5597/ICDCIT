import React from 'react'
import { Newspaper, Calendar, MessageSquare, Shield, UserCheck, Activity } from 'lucide-react';
import { Feature } from '@/types/types';

const FeaturesGrid = () => {
    const features: Feature[] = [
        {
            icon: <Newspaper className="w-12 h-12 text-blue-500" />,
            title: "Healthcare Feed",
            description: "Stay informed with personalized health articles, news, and expert insights tailored to your interests.",
            highlight: "Personalized"
        },
        {
            icon: <Calendar className="w-12 h-12 text-blue-500" />,
            title: "Doctor Consultations",
            description: "Book appointments with specialists online or visit them in person at your convenience.",
            highlight: "Online/Offline"
        },
        {
            icon: <MessageSquare className="w-12 h-12 text-blue-500" />,
            title: "AI Health Assistant",
            description: "Get instant responses to basic health queries through our intelligent chatbot system.",
            highlight: "24/7 Support"
        },
        {
            icon: <Shield className="w-12 h-12 text-blue-500" />,
            title: "Secure Payments",
            description: "Hassle-free payment system with guaranteed refunds for cancellations and automated revenue distribution.",
            highlight: "Money Safe"
        },
        {
            icon: <UserCheck className="w-12 h-12 text-blue-500" />,
            title: "Interactive Chat",
            description: "Connect with doctors, AI assistants, and other patients in group chats for comprehensive support.",
            highlight: "Multi-mode"
        },
        {
            icon: <Activity className="w-12 h-12 text-blue-500" />,
            title: "Appointment Management",
            description: "Efficiently manage your appointments, reschedules, and get timely reminders for upcoming consultations.",
            highlight: "Streamlined"
        }
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="group relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl border border-gray-100"
                >
                    <div className="relative z-10">
                        <div className="mb-6 p-3 bg-blue-50 rounded-2xl inline-block group-hover:bg-blue-100 transition-colors">
                            {feature.icon}
                        </div>

                        {feature.highlight && (
                            <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                {feature.highlight}
                            </span>
                        )}

                        <h3 className="text-xl font-semibold text-blue-950 mb-4">
                            {feature.title}
                        </h3>

                        <p className="text-gray-600">
                            {feature.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FeaturesGrid