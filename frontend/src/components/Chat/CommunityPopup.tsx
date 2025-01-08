import React, { useState, useEffect } from 'react'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const CommunityPopup = ({ onClose }: { onClose: () => void }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isOutSideClick, setIsOutSideClick] = useState(false)
    const [isInnerClick, setIsInnerClick] = useState(false)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        if (isOutSideClick && !isInnerClick) {
            onClose()
        }
        setIsOutSideClick(false)
        setIsInnerClick(false)
    }, [isOutSideClick, isInnerClick])

    return (
        <div onClick={() => setIsOutSideClick(true)} className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsInnerClick(true)}
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
                    <h2 className="text-2xl font-semibold text-gray-800">Create Community</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Community Name</label>
                            <input
                                type="text"
                                placeholder="Enter a unique name"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Profile Image</label>
                            <div className="relative">
                                {imagePreview ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="relative w-full h-40 rounded-xl overflow-hidden"
                                    >
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                        <button
                                            onClick={() => setImagePreview(null)}
                                            className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                                        >
                                            <X className="w-4 h-4 text-white" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-500/50 hover:bg-blue-50/50 transition-all">
                                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                        <span className="text-sm text-gray-500">Click to upload image</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                            <textarea
                                placeholder="What's your community about?"
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
                        Create Community
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default CommunityPopup
