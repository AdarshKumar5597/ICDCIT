import React, { useState } from 'react'
import { X } from 'lucide-react'
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
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Meeting Type</label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setMeetingType('online')}
                                className={`flex-1 py-2.5 rounded-xl border ${meetingType === 'online'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                    } transition-all`}
                            >
                                Online
                            </button>
                            <button
                                onClick={() => setMeetingType('offline')}
                                className={`flex-1 py-2.5 rounded-xl border ${meetingType === 'offline'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                    } transition-all`}
                            >
                                Offline
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
