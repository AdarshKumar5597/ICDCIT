'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Doctor } from '@/types/types';
import { mockDoctors } from '@/data/data';
import { AnimatePresence } from 'framer-motion';
import SendRequestForm from '@/components/Appointment/SendRequestForm';
import { motion } from 'framer-motion';

export default function DoctorsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
    const [hasMore, setHasMore] = useState(true);
    const [openDoctorForm, setOpenDoctorForm] = useState<boolean>(false);

    const fetchMoreDoctors = () => {
        setTimeout(() => {
            setHasMore(false);
        }, 1500);
    };

    useEffect(() => {
        //fetch doctors from API
        setDoctors(mockDoctors);
    }, []);

    return (
        <>
            <AnimatePresence>
                {openDoctorForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4"
                    >
                        <SendRequestForm onClose={() => setOpenDoctorForm(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="mt-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                            <h1 className="text-3xl lg:text-4xl font-bold text-blue-950">
                                Find Your Doctor
                            </h1>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Describe your healthcare condition..."
                                className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pl-12"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 ease-in-out">
                                Search
                            </button>
                        </div>
                    </div>

                    <InfiniteScroll
                        dataLength={doctors.length}
                        next={fetchMoreDoctors}
                        hasMore={hasMore}
                        loader={
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                            </div>
                        }
                        endMessage={
                            <div className="text-center py-8 text-gray-500 font-medium">
                                You&apos;ve seen all available doctors
                            </div>
                        }
                        className="space-y-8"
                    >
                        {doctors.map((doctor) => (
                            <div key={doctor.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                                <div className="p-6 sm:p-8">
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="w-full md:w-48 lg:w-56 mx-auto md:mx-0">
                                            <div className="aspect-square relative rounded-xl overflow-hidden max-w-[224px] md:max-w-none">
                                                <Image
                                                    src={doctor.profilePhoto}
                                                    alt={doctor.name}
                                                    width={1000}
                                                    height={1000}
                                                    className="object-cover w-60 h-60"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-blue-950 mb-2">{doctor.name}</h2>
                                                        <div className="flex items-center gap-4 text-gray-600 text-sm">
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                                </svg>
                                                                {doctor.location}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 15.585l-4.95 2.607 0.945-5.507-4-3.897 5.527-0.803L10 2.5l2.478 5.485 5.527 0.803-4 3.897 0.945 5.507L10 15.585z" clipRule="evenodd" />
                                                                </svg>
                                                                {doctor.rating} 20 reviews
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col sm:items-end gap-2">
                                                        <span className="text-2xl font-bold text-blue-950">₹{doctor.consultationFee}</span>
                                                        <span className="text-sm text-gray-500">per consultation</span>
                                                    </div>
                                                </div>

                                                <p className="text-gray-600 mb-6">{doctor.bio}</p>

                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {doctor.proficiencies.map((prof, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                                                        >
                                                            {prof}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                                <button onClick={() => setOpenDoctorForm(true)} className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 font-medium">
                                                    Book Appointment
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            </main>
        </>
    );
}