import React, { useState } from 'react'
import { X, Video, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const SendRequestForm = ({ onClose }: { onClose: () => void }) => {
    const [meetingType, setMeetingType] = useState<'online' | 'offline'>('online')
    const [problem, setProblem] = useState('')

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md relative"
        >
            <button
                onClick={onClose}
                className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
                <X className="w-5 h-5 text-gray-500" />
            </button>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="p-6 space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-800">Request Appointment</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Meeting Type</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setMeetingType('online')}
                                className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${meetingType === 'online'
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <Video className={`w-6 h-6 ${meetingType === 'online' ? 'text-blue-500' : 'text-gray-600'
                                        }`} />
                                    <span className={`font-medium ${meetingType === 'online' ? 'text-blue-500' : 'text-gray-700'
                                        }`}>Online</span>
                                </div>
                                {meetingType === 'online' && (
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
                                )}
                            </button>

                            <button
                                onClick={() => setMeetingType('offline')}
                                className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${meetingType === 'offline'
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <Users className={`w-6 h-6 ${meetingType === 'offline' ? 'text-blue-500' : 'text-gray-600'
                                        }`} />
                                    <span className={`font-medium ${meetingType === 'offline' ? 'text-blue-500' : 'text-gray-700'
                                        }`}>Offline</span>
                                </div>
                                {meetingType === 'offline' && (
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Describe Your Problem</label>
                        <textarea
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                            placeholder="Please describe your medical concern..."
                            rows={4}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all resize-none"
                        />
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/20 transition-all"
                >
                    Send Request
                </motion.button>
            </motion.div>
        </motion.div>
    )
}

export default SendRequestForm