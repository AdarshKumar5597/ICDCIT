'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { CheckIcon, XMarkIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import DoctorContractForm from '@/components/Requests/DoctorContractForm';
import { useHealthcareStore } from '@/zustand/useHealthcareStore';
import axios from 'axios';
import toast from 'react-hot-toast';

type RequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

interface Request {
    id?: string;
    name?: string;
    profileImage?: string;
    requestDate?: string;
    requestTime?: string;
    description?: string;
    status?: RequestStatus;
    specialty?: string;
    requestId?: number;
    patientID?: number;
    doctorID?: number;
    proficiencyID?: number;
    requirements?: string;
    createdAt?: string
}

// Mock data for when backend is unavailable
const mockRequests: Request[] = [
    {
        id: '1',
        name: 'John Doe',
        profileImage: '/api/placeholder/100/100',
        requestDate: '2024-01-09',
        requestTime: '10:30 AM',
        description: 'General checkup appointment request',
        status: 'PENDING',
        specialty: 'General Medicine'
    },
    {
        id: '2',
        name: 'Jane Smith',
        profileImage: '/api/placeholder/100/100',
        requestDate: '2024-01-09',
        requestTime: '2:00 PM',
        description: 'Follow-up consultation',
        status: 'ACCEPTED',
        specialty: 'Cardiology'
    },
    {
        id: '3',
        name: 'Mike Johnson',
        profileImage: '/api/placeholder/100/100',
        requestDate: '2024-01-09',
        requestTime: '4:30 PM',
        description: 'Emergency consultation request',
        status: 'REJECTED',
        specialty: 'Orthopedics'
    }
];

const StatusBadge = ({ status }: { status: RequestStatus | undefined }) => {
    const statusConfig = {
        PENDING: {
            icon: ClockIcon,
            text: 'Pending',
            classes: 'bg-yellow-50 text-yellow-600',
            iconClasses: 'text-yellow-500',
        },
        ACCEPTED: {
            icon: CheckCircleIcon,
            text: 'Accepted',
            classes: 'bg-green-50 text-green-600',
            iconClasses: 'text-green-500',
        },
        REJECTED: {
            icon: XCircleIcon,
            text: 'Rejected',
            classes: 'bg-red-50 text-red-600',
            iconClasses: 'text-red-500',
        },
    };

    const config = statusConfig[status || 'PENDING'];
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
    onAccept,
    onDecline
}: {
    request: Request;
    onAccept: (id: string) => void;
    onDecline: (id: string) => void;
}) => {
    const [isMobile, setIsMobile] = useState(false);
    const { authData } = useHealthcareStore();
    const isDoctor = authData.role === 'DOCTOR';

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-3 sm:gap-4 w-full sm:w-auto">
                    <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 flex-shrink-0">
                        {request.profileImage && request.name && <Image
                            src={request.profileImage}
                            alt={request.name}
                            fill
                            className="rounded-full object-cover"
                        />
                        }
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
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 sm:line-clamp-none">{request.requirements}</p>

                        <div className="flex items-center gap-2 mt-1 sm:mt-2">
                            <span className="text-xs text-gray-500">{request.createdAt?.substring(0, 10)}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{request.createdAt?.substring(11, request.createdAt?.length - 10)}</span>
                        </div>
                    </div>
                </div>

                <div className={`flex ${isMobile ? 'flex-row justify-end' : 'flex-col items-end'} gap-2 w-full sm:w-auto mt-2 sm:mt-0`}>
                    {isDoctor && request.status === "PENDING" ? (
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <button
                                onClick={() => onAccept(request.requestId ? request.requestId.toString() : "")}
                                className="flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded-full bg-green-50 hover:bg-green-100 text-green-600 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1"
                            >
                                <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                Accept
                            </button>
                            <button
                                onClick={() => onDecline(request.requestId ? request.requestId.toString() : "")}
                                className="flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1"
                            >
                                <XMarkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                Decline
                            </button>
                        </div>
                    ) : (
                        <StatusBadge status={request.status} />
                    )}
                </div>
            </div>
        </div>
    );
};

const RequestsPage = () => {
    const [activeTab, setActiveTab] = useState<RequestStatus>('PENDING');
    const [requests, setRequests] = useState<Request[]>(mockRequests); // Initialize with mock data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openDoctorContractForm, setOpenDoctorContractForm] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
    const { authData } = useHealthcareStore();

    const fetchRequests = async () => {
        setLoading(true);
        setError(null);

        try {
            const baseUrl = 'http://localhost:8080/appointments';
            const url = authData.role === 'DOCTOR'
                ? `${baseUrl}/doctor/requests/${authData.doctorId}`
                : `${baseUrl}/user/requests/${authData.userId}`;

            const response = await axios.get(url, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            });
            setRequests(response.data.requests);
        } catch (err) {
            setError('Failed to fetch requests');
            // Keep using mock data when fetch fails
            setRequests(mockRequests);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [authData]);

    const handleAccept = async (requestId: string) => {
        try {
            setSelectedRequestId(requestId);
            setOpenDoctorContractForm(true);
            // await fetchRequests();
        } catch (err) {
            setError('Failed to accept request');
            // Update mock data to simulate acceptance
            setRequests(requests.map(req =>
                req.id === requestId ? { ...req, status: 'ACCEPTED' } : req
            ));
        }
    };

    const handleDecline = async (requestId: string) => {
        try {
            const response = await axios.post(`http://localhost:8080/appointments/reject-request/${Number(requestId)}`, null, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            });

            if (response.data.success) {
                await fetchRequests();
                return;
            } else {
                toast.error('Failed to decline request');
            }

        } catch (err) {
            setError('Failed to decline request');
            setRequests(requests.map(req =>
                req.id === requestId ? { ...req, status: 'REJECTED' } : req
            ));
        }
    };

    const filteredRequests = requests.filter(request => request.status === activeTab);

    const stats = {
        PENDING: {
            label: 'Pending Requests',
            count: requests.filter(r => r.status === 'PENDING').length,
            icon: ClockIcon,
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-50',
        },
        ACCEPTED: {
            label: 'Accepted Requests',
            count: requests.filter(r => r.status === 'ACCEPTED').length,
            icon: CheckCircleIcon,
            color: 'text-green-500',
            bgColor: 'bg-green-50',
        },
        REJECTED: {
            label: 'Rejected Requests',
            count: requests.filter(r => r.status === 'REJECTED').length,
            icon: XCircleIcon,
            color: 'text-red-500',
            bgColor: 'bg-red-50',
        },
    };

    if (loading) {
        return (
            <div className="max-w-6xl min-h-screen mt-16 mx-auto px-4 py-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>
            <AnimatePresence>
                {openDoctorContractForm && selectedRequestId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4"
                    >
                        <DoctorContractForm
                            onClose={() => {
                                setOpenDoctorContractForm(false);
                                setSelectedRequestId(null);
                            }}
                            requestId={selectedRequestId}
                            fetchRequests={fetchRequests}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="max-w-6xl min-h-screen mt-16 mx-auto px-3 sm:px-4 py-4 sm:py-8">
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                    </div>
                )}

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
                        {['PENDING', 'ACCEPTED', 'REJECTED'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setActiveTab(status as RequestStatus)}
                                className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 
                                    ${activeTab === status
                                        ? 'bg-blue-50 border border-blue-200 text-blue-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}>
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
                    {filteredRequests.map((request, id) => (
                        <RequestCard
                            key={id}
                            request={request}
                            onAccept={handleAccept}
                            onDecline={handleDecline}
                        />
                    ))}

                    {filteredRequests.length === 0 && (
                        <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            <div className="max-w-sm mx-auto">
                                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No {activeTab} requests</h3>
                                <p className="text-gray-500">There are no requests in this category at the moment.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
};

export default RequestsPage;