'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { CheckIcon, XMarkIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Icon } from 'lucide-react';
import { doctorList, patientList, stats } from '@/data/data';
import { AnimatePresence, motion } from 'framer-motion';
import DoctorContractForm from '@/components/Requests/DoctorContractForm';
import { useHealthcareStore } from '@/zustand/useHealthcareStore';

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
        <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${config.classes}`}>
            <Icon className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 ${config.iconClasses}`} />
            {config.text}
        </span>
    );
};

const RequestCard = ({
    request,
    isPatientRequest,
    setOpenDoctorContractForm
}: {
    request: RequestProps;
    isPatientRequest: boolean;
    setOpenDoctorContractForm: (value: boolean) => void;
}) => {
    const [status, setStatus] = useState<RequestStatus>(request.status || "pending");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleDecline = () => setStatus("rejected");

    return (
        <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-3 sm:gap-4 w-full sm:w-auto">
                    <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex-shrink-0">
                        <Image
                            src={request.profileImage}
                            alt={request.name}
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{request.name}</h3>
                            {request.specialty && (
                                <span className="text-xs sm:text-sm text-blue-600 font-medium">
                                    • {request.specialty}
                                </span>
                            )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 sm:line-clamp-none">{request.description}</p>

                        <div className="flex items-center gap-2 mt-1 sm:mt-2">
                            <span className="text-xs text-gray-500">{request.requestDate}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{request.requestTime}</span>
                        </div>
                    </div>
                </div>

                <div className={`flex ${isMobile ? 'flex-row justify-end' : 'flex-col items-end'} gap-2 w-full sm:w-auto mt-2 sm:mt-0`}>
                    {isPatientRequest ? (
                        status === "pending" ? (
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <button
                                    onClick={() => setOpenDoctorContractForm(true)}
                                    className="flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded-full bg-green-50 hover:bg-green-100 text-green-600 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1"
                                >
                                    <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Accept
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1"
                                >
                                    <XMarkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Decline
                                </button>
                            </div>
                        ) : (
                            <StatusBadge status={status} />
                        )
                    ) : (
                        <StatusBadge status={status} />
                    )}
                </div>
            </div>
        </div>
    );
};

const RequestsPage = () => {
    const [activeTab, setActiveTab] = useState<RequestStatus>('pending');
    const [openDoctorContractForm, setOpenDoctorContractForm] = useState(false);
    const authData = useHealthcareStore(state => state.authData);

    const filteredRequests = (list: typeof patientList | typeof doctorList) => {
        return list.requests.filter(request => request.status === activeTab);
    };

    return (
        <>
            <AnimatePresence>
                {openDoctorContractForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4"
                    >
                        <DoctorContractForm onClose={() => setOpenDoctorContractForm(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="max-w-6xl min-h-screen mt-16 mx-auto px-3 sm:px-4 py-4 sm:py-8">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Consultation Requests</h1>
                    <p className="text-sm sm:text-base text-gray-600">Track and manage your medical consultation requests</p>
                </div>

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

                <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6 bg-white border border-gray-200 p-4 sm:p-6 rounded-xl shadow-sm">
                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        {['pending', 'accepted', 'rejected'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setActiveTab(status as RequestStatus)}
                                className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 
                    ${activeTab === status
                                        ? 'bg-blue-50 border border-blue-200 text-blue-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <StatusBadge status={status as RequestStatus} />
                            </button>
                        ))}
                    </div>

                    <select className="w-full sm:w-48 rounded-lg border-gray-200 text-sm py-2 px-3 bg-gray-50 hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="date">Sort by Date</option>
                        <option value="status">Sort by Status</option>
                        <option value="name">Sort by Name</option>
                    </select>
                </div>

                <div className="space-y-3 sm:space-y-4 transition-all duration-300">
                    {patientList.showTo === "doctor" && (
                        filteredRequests(patientList).map((request) => (
                            <RequestCard
                                key={request.id}
                                request={request as RequestProps}
                                isPatientRequest={true}
                                setOpenDoctorContractForm={setOpenDoctorContractForm}
                            />
                        ))
                    )}

                    {doctorList.showTo === "patient" && (
                        filteredRequests(doctorList).map((request) => (
                            <RequestCard
                                key={request.id}
                                request={request as RequestProps}
                                isPatientRequest={false}
                                setOpenDoctorContractForm={setOpenDoctorContractForm}
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
        </>
    );
};

export default RequestsPage;
