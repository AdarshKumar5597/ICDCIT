'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

type RequestStatus = 'pending' | 'accepted' | 'rejected';

interface RequestProps {
    id: string;
    name: string;
    profileImage: string;
    requestDate: string;
    requestTime: string;
    description: string;
    status?: RequestStatus;
    specialty?: string;
}

const RequestCard = ({ request }: { request: RequestProps }) => {
    const [status, setStatus] = useState<RequestStatus>(request.status || 'pending');

    const handleAccept = () => setStatus('accepted');
    const handleDecline = () => setStatus('rejected');

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
                    <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0">
                        <Image
                            src={request.profileImage}
                            alt={request.name}
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <h3 className="font-semibold text-gray-900 truncate">{request.name}</h3>
                            {request.specialty && (
                                <span className="text-sm text-blue-600 font-medium">• {request.specialty}</span>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 max-w-[500px]">{request.description}</p>

                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">{request.requestDate}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{request.requestTime}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    {status === 'pending' && (
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <button
                                onClick={handleAccept}
                                className="flex-1 sm:flex-none px-3 py-1.5 rounded-full bg-green-50 hover:bg-green-100 text-green-600 text-sm font-medium transition-colors flex items-center justify-center gap-1"
                            >
                                <CheckIcon className="w-4 h-4" />
                                Accept
                            </button>
                            <button
                                onClick={handleDecline}
                                className="flex-1 sm:flex-none px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium transition-colors flex items-center justify-center gap-1"
                            >
                                <XMarkIcon className="w-4 h-4" />
                                Decline
                            </button>
                        </div>
                    )}
                    {status !== 'pending' && (
                        <span
                            className={`text-sm font-medium px-3 py-1.5 rounded-full text-center w-full sm:w-auto ${status === 'accepted'
                                ? 'bg-green-50 text-green-600'
                                : status === 'rejected'
                                    ? 'bg-red-50 text-red-600'
                                    : 'bg-gray-50 text-gray-600'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

const RequestsPage = () => {
    // const requestsToShowToDoctor = [
    //     {
    //         id: '1',
    //         name: 'James Anderson',
    //         profileImage: '/images/patient.png',
    //         requestDate: '2024-01-19',
    //         requestTime: '09:15',
    //         description:
    //             'Patient reports persistent cough and fever for 5 days. Temperature: 38-39°C. Dry cough worsening at night. Requesting urgent consultation.',
    //         status: 'pending',
    //     },
    //     {
    //         id: '2',
    //         name: 'Emily Parker',
    //         profileImage: '/images/patient.png',
    //         requestDate: '2024-01-17',
    //         requestTime: '16:20',
    //         description:
    //             'Patient seeking consultation for chronic lower back pain lasting 3 months. Reports pain intensity 7/10. Previous physiotherapy showed minimal improvement.',
    //         status: 'accepted',
    //     },
    //     {
    //         id: '3',
    //         name: 'Michael Johnson',
    //         profileImage: '/images/patient.png',
    //         requestDate: '2024-01-15',
    //         requestTime: '10:30',
    //         description:
    //             'Patient experiencing mild chest pain and difficulty breathing, especially after exertion. Family history of heart disease. Seeking consultation.',
    //         status: 'pending',
    //     },
    //     {
    //         id: '4',
    //         name: 'Sarah Brown',
    //         profileImage: '/images/patient.png',
    //         requestDate: '2024-01-12',
    //         requestTime: '14:00',
    //         description:
    //             'Patient seeking a follow-up for post-surgery recovery. Slight pain and discomfort post-operation, requesting consultation to monitor progress.',
    //         status: 'pending',
    //     },
    //     {
    //         id: '5',
    //         name: 'David Lee',
    //         profileImage: '/images/patient.png',
    //         requestDate: '2024-01-10',
    //         requestTime: '09:00',
    //         description:
    //             'Patient has been feeling fatigued for the past week, with occasional dizziness and lightheadedness. Looking for medical advice.',
    //         status: 'rejected',
    //     },
    // ];

    const requestsToShowToPatient = [
        {
            id: '6',
            name: 'Dr. Sarah Wilson',
            profileImage: '/images/doctors/doctor1.png',
            requestDate: '2024-01-20',
            requestTime: '14:30',
            description:
                'Hello Dr. Wilson, I’ve been experiencing severe migraines 2-3 times per week with light sensitivity and nausea. The medications I’ve tried haven’t helped much. Looking forward to your consultation.',
        },
        {
            id: '7',
            name: 'Dr. Michael Brown',
            profileImage: '/images/doctors/doctor1.png',
            requestDate: '2024-01-18',
            requestTime: '11:45',
            description:
                'Hello Dr. Brown, I wanted to schedule a follow-up for my knee surgery recovery. The physical therapy exercises we discussed have been helping, but I’d like to discuss my progress.',
        },
        {
            id: '8',
            name: 'Dr. Lisa Thompson',
            profileImage: '/images/doctors/doctor1.png',
            requestDate: '2024-01-16',
            requestTime: '10:00',
            description:
                'Hello Dr. Thompson, requesting my regular check-up and review of my blood pressure medication. My home readings have been stable but I’d like to discuss some side effects.',
        },
        {
            id: '9',
            name: 'Dr. Emily Taylor',
            profileImage: '/images/doctors/doctor1.png',
            requestDate: '2024-01-14',
            requestTime: '08:45',
            description:
                'Hello Dr. Taylor, I’ve been dealing with persistent joint pain in my knees. Looking for your advice and treatment options for improving mobility.',
        },
        {
            id: '10',
            name: 'Dr. David Scott',
            profileImage: '/images/doctors/doctor1.png',
            requestDate: '2024-01-13',
            requestTime: '12:15',
            description:
                'Hello Dr. Scott, seeking advice for my chronic back pain. I’d like to discuss physical therapy and medication alternatives.',
        },
    ];

    return (
        <div className="space-y-4 max-w-3xl mx-auto mt-16">
            {requestsToShowToPatient.map((request) => (
                <RequestCard key={request.id} request={request as RequestProps} />
            ))}
            <br />
            {/* {requestsToShowToDoctor.map((request) => (
                <RequestCard key={request.id} request={request} />
            ))} */}
            <br />
        </div>
    );
};

export default RequestsPage;
