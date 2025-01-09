import React, { useState } from 'react'
import { X, Link, IndianRupee, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { useHealthcareStore } from '@/zustand/useHealthcareStore'
import toast from 'react-hot-toast'

const DoctorContractForm = ({ onClose }: { onClose: () => void }) => {
    const [meetingUrl, setMeetingUrl] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [feedback, setFeedback] = useState<string>('')
    const authData = useHealthcareStore(state => state.authData);

    const handleSubmit = () => {
        if (!meetingUrl.includes('meet.google.com')) {
            alert('Please enter a valid Google Meet URL');
            return;
        }

        if (isNaN(Number(price))) {
            alert('Please enter a valid price');
            return;
        }

        const formData: { requestId: number; paymentAmount: number; meetingDetails: string; } = {
            requestId: 1,
            paymentAmount: Number(price),
            meetingDetails: `Meeting URL: ${meetingUrl || 'No URL provided'} | Feedback: ${feedback || 'No feedback given'}`
        };

        console.log(formData);
        createContract(formData);
    }

    const createContract = async (formData: { requestId: number; paymentAmount: number; meetingDetails: string; }) => {
        const createContractURL = "http://localhost:8080/appointments/create-meeting-contract";
        const response = await fetch(createContractURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authData?.token}`,
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            toast.success('Contract created successfully');
            onClose();
        } else {
            toast.error('Failed to create contract');
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen p-4 bg-black/50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-md relative border border-gray-100 mx-auto"
            >
                <div className="absolute -top-4 -right-4 bg-blue-500 rounded-full p-2 shadow-lg z-10">
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-blue-600 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 md:p-8 space-y-4 md:space-y-6"
                >
                    <div className="text-center mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Meeting Details</h2>
                        <p className="text-sm md:text-base text-gray-500">Fill in the appointment information</p>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Link className="h-5 w-5 text-blue-500" />
                            </div>
                            <input
                                type="url"
                                value={meetingUrl}
                                onChange={(e) => setMeetingUrl(e.target.value)}
                                placeholder="https://meet.google.com/..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all hover:border-gray-300 text-sm md:text-base"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <IndianRupee className="h-5 w-5 text-blue-500" />
                            </div>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter consultation fee"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all hover:border-gray-300 text-sm md:text-base"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute top-3 left-4">
                                <MessageSquare className="h-5 w-5 text-blue-500" />
                            </div>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Additional notes or instructions..."
                                rows={4}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all resize-none hover:border-gray-300 text-sm md:text-base"
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        className="w-full py-3 md:py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
                    >
                        Confirm Details
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default DoctorContractForm
