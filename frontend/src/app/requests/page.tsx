'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CheckIcon, XMarkIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Icon } from 'lucide-react';

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

const StatusBadge = ({ status }: { status: RequestStatus }) => {
    const statusConfig = {
        pending: {
            icon: ClockIcon,
            text: 'Pending',
            classes: 'bg-yellow-50 text-yellow-600',
            iconClasses: 'text-yellow-500',
        },
        accepted: {
            icon: CheckCircleIcon,
            text: 'Accepted',
            classes: 'bg-green-50 text-green-600',
            iconClasses: 'text-green-500',
        },
        rejected: {
            icon: XCircleIcon,
            text: 'Rejected',
            classes: 'bg-red-50 text-red-600',
            iconClasses: 'text-red-500',
        },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.classes}`}>
            <Icon className={`w-4 h-4 mr-1.5 ${config.iconClasses}`} />
            {config.text}
        </span>
    );
};


const RequestCard = ({
    request,
    isPatientRequest,
}: {
    request: RequestProps;
    isPatientRequest: boolean;
}) => {
    const [status, setStatus] = useState<RequestStatus>(request.status || "pending");

    const handleAccept = () => setStatus("accepted");
    const handleDecline = () => setStatus("rejected");

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
                                <span className="text-sm text-blue-600 font-medium">
                                    • {request.specialty}
                                </span>
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
                    {isPatientRequest ? (
                        status === "pending" ? (
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
                        ) : (
                            <span
                                className={`text-sm font-medium px-3 py-1.5 rounded-full text-center w-full sm:w-auto ${status === "accepted"
                                    ? "bg-green-50 text-green-600"
                                    : status === "rejected"
                                        ? "bg-red-50 text-red-600"
                                        : "bg-gray-50 text-gray-600"
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                        )
                    ) : (
                        <span
                            className={`text-sm font-medium px-3 py-1.5 rounded-full text-center w-full sm:w-auto ${status === "accepted"
                                ? "bg-green-50 text-green-600"
                                : status === "rejected"
                                    ? "bg-red-50 text-red-600"
                                    : "bg-gray-50 text-gray-600"
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
    const [activeTab, setActiveTab] = useState<RequestStatus>('pending');

    const stats = {
        pending: {
            count: 5,
            icon: ClockIcon,
            color: 'text-amber-600',
            bgColor: 'bg-amber-50',
            label: 'Awaiting Response',
        },
        accepted: {
            count: 12,
            icon: CheckCircleIcon,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
            label: 'Consultations Approved',
        },
        rejected: {
            count: 3,
            icon: XCircleIcon,
            color: 'text-rose-600',
            bgColor: 'bg-rose-50',
            label: 'Requests Declined',
        },
    };

    const patientList = {
        showTo: "doctor",
        requests: [
            {
                id: '1',
                name: 'James Anderson',
                profileImage: '/images/patient.png',
                requestDate: '2024-01-19',
                requestTime: '09:15',
                description: 'Hello sir, I am experiencing severe pain in my lower back for the past 2 weeks.',
                status: 'pending',
            },
            {
                id: '2',
                name: 'Emma Thompson',
                profileImage: '/images/patient.png',
                requestDate: '2024-01-18',
                requestTime: '14:30',
                description: 'Following up on my previous treatment.',
                status: 'accepted',
            },
            {
                id: '3',
                name: 'Michael Brown',
                profileImage: '/images/patient.png',
                requestDate: '2024-01-17',
                requestTime: '11:20',
                description: 'Need urgent consultation regarding chest pain.',
                status: 'rejected',
            },
        ]
    };

    const doctorList = {
        showTo: "patient",
        requests: [
            {
                id: '2',
                name: 'Dr. Sarah Wilson',
                profileImage: '/images/doctors/doctor1.png',
                requestDate: '2024-01-20',
                requestTime: '14:30',
                description:
                    'Hello sir, I am experiencing severe pain in my lower back for the past 2 weeks. I would like to consult with you regarding this issue.',
                status: 'pending',
            },
        ]
    };

    const filteredRequests = (list: typeof patientList | typeof doctorList) => {
        return list.requests.filter(request => request.status === activeTab);
    };

    return (
        <div className="max-w-6xl min-h-screen mt-16 mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Consultation Requests</h1>
                <p className="text-gray-600">Track and manage your medical consultation requests</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {Object.entries(stats).map(([key, stat]) => {
                    const Icon = stat.icon;
                    return (
                        <div key={key}
                            onClick={() => setActiveTab(key as RequestStatus)}
                            className={`p-6 rounded-xl border cursor-pointer transition-all duration-200
                      ${activeTab === key ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-blue-200'}`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                    <p className="text-2xl font-bold mt-1">{stat.count}</p>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                <div className="flex gap-3">
                    {['pending', 'accepted', 'rejected'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setActiveTab(status as RequestStatus)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 
                    ${activeTab === status
                                    ? 'bg-blue-50 border border-blue-200 text-blue-700 shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <StatusBadge status={status as RequestStatus} />
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <select className="rounded-lg border-gray-200 text-sm py-2 px-3 bg-gray-50 hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="date">Sort by Date</option>
                        <option value="status">Sort by Status</option>
                        <option value="name">Sort by Name</option>
                    </select>
                </div>
            </div>


            {/* Requests List with Animation */}
            <div className="space-y-4 transition-all duration-300">
                {patientList.showTo === "doctor" && (
                    filteredRequests(patientList).map((request) => (
                        <RequestCard
                            key={request.id}
                            request={request as RequestProps}
                            isPatientRequest={true}
                        />
                    ))
                )}

                {doctorList.showTo === "patient" && (
                    filteredRequests(doctorList).map((request) => (
                        <RequestCard
                            key={request.id}
                            request={request as RequestProps}
                            isPatientRequest={false}
                        />
                    ))
                )}

                {filteredRequests(patientList).length === 0 && (
                    <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        <div className="max-w-sm mx-auto">
                            <Icon className={`w-12 h-12 mx-auto mb-4`} iconNode={[]} />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">No {activeTab} requests</h3>
                            <p className="text-gray-500">There are no requests in this category at the moment.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestsPage;
