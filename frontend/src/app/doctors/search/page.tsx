'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Doctor } from '@/types/types';
import { mockDoctors } from '@/data/data';
import { AnimatePresence } from 'framer-motion';
import SendRequestForm from '@/components/Appointment/SendRequestForm';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useHealthcareStore } from '@/zustand/useHealthcareStore';

export default function DoctorsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [doctorId, setDoctorId] = useState<number>(0);

    const [hasMore, setHasMore] = useState(true);
    const [openDoctorForm, setOpenDoctorForm] = useState<boolean>(false);
    const authData = useHealthcareStore(state => state.authData);

    interface User {
        userId: number;
        firstName: string;
        lastName: string;
        userName: string;
        proficiencies: string[];
        email: string;
        password: string;
        role: 'ADMIN' | 'USER' | 'DOCTOR';  // Adjust roles based on your actual enum values
        profileImage: BinaryType;  // To handle binary data for images
        bio: string | null;
        createdAt: string;  // Date as string in ISO format
        rating: number | null;
        reviewCount: number | null;
        doctorId?: number | null;
    }

    const [fetchedDoctors, setFetchedDoctors] = useState<User[]>([]);
    const type = 'image/jpg';

    const fetchDoctorsByProficiencies = async (query: string) => {

        // Make request to flask to fetch profociency list based on query.
        // ----------------- flask api call ----------------------
        if(!query) return;
        const proficienciesResponse = await axios.post('http://localhost:5000/proficiency', {message : query}, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log(proficienciesResponse.data.proficiencies)
        const response= await axios.post('http://localhost:8080/appointments/doctors-by-proficiencies', {proficiencies : proficienciesResponse.data.proficiencies}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authData?.token}}`
            }
        });

        if (response.data.length > 0) {
            setFetchedDoctors(response.data);
        }

        setTimeout(() => {
            setHasMore(false);
        }, 1500);
    }

    const fetchMoreDoctors = async () => {
        if(authData.token === null) return;
        const response = await axios.get('http://localhost:8080/doctors/all-doctors', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authData?.token}}`
            }
        });

        // if (response.data.length > 0) {
            setFetchedDoctors(response.data);
        // }

        setTimeout(() => {
            setHasMore(false);
        }, 1500);
    };


    useEffect(() => {
        //fetch doctors from API
        fetchMoreDoctors();

        // if (fetchMoreDoctors.length === 0) {
        //     setDoctors(mockDoctors);
        // }
    }, [authData.token]);

    useEffect(() => {
        if(searchQuery.length === 0) {
            fetchMoreDoctors();
        }
    }, [searchQuery]);

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
                        <SendRequestForm onClose={() => setOpenDoctorForm(false)} doctorId={doctorId} />
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
                                onKeyDown={(e) => e.key === 'Enter' && fetchDoctorsByProficiencies(searchQuery)}
                            />
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 ease-in-out" onClick={()=>fetchDoctorsByProficiencies(searchQuery)}>
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
                        {
                            fetchedDoctors.length > 0 ? (
                                fetchedDoctors.map(( doctor, id) => (
                                    doctor.userId !== authData.userId && 
                                    <div key={doctor?.userId} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                                        <div className="p-6 sm:p-8">
                                            <div className="flex flex-col lg:flex-row gap-8">
                                                <div className="w-full lg:w-56 h-56 lg:h-64 shrink-0 relative">
                                                    <div className="aspect-square relative w-full h-full rounded-xl overflow-hidden">
                                                        <Image
                                                            src={mockDoctors[id]?.profilePhoto}
                                                            alt={doctor.firstName + " " + doctor.lastName}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                                            <div>
                                                                <h2 className="text-2xl font-bold text-blue-950 mb-2">{doctor.firstName + " " + doctor.lastName}</h2>
                                                                <div className="flex items-center gap-4 text-gray-600 text-sm">
                                                                    <span className="flex items-center gap-1">
                                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                                        </svg>
                                                                        {"Location"} {/* {doctor.location} */}
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
                                                                <span className="text-2xl font-bold text-blue-950">₹{1200}</span>
                                                                <span className="text-sm text-gray-500">per consultation</span>
                                                            </div>
                                                        </div>

                                                        <p className="text-gray-600 mb-6">{doctor.bio}</p>

                                                        <div className="flex flex-wrap gap-2 mb-6">
                                                            {["Cardiology", "Neurology"].map((prof, index) => (
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
                                                        <button onClick={() => {
                                                            setDoctorId(id + 1)
                                                            setOpenDoctorForm(true)
                                                        }
                                                        } className="flex-1 bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 font-medium">
                                                            Book Appointment
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                doctors.map((doctor) => (
                                    <div key={doctor.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                                        <div className="p-6 sm:p-8">
                                            <div className="flex flex-col lg:flex-row gap-8">
                                                <div className="w-full lg:w-56 h-56 lg:h-64 shrink-0 relative">
                                                    <div className="aspect-square relative w-full h-full rounded-xl overflow-hidden">
                                                        <Image
                                                            src={doctor.profilePhoto}
                                                            alt={doctor.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                                                            {doctor.proficiencies?.map((prof, index) => (
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
                                                        <button onClick={() => setOpenDoctorForm(true)} className="flex-1 bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 font-medium">
                                                            Book Appointment
                                                        </button>
                                                        <button className="flex-1 border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-full hover:bg-blue-50 transition-all duration-300 font-medium">
                                                            View Full Profile
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }

                    </InfiniteScroll>
                </div>
            </main>
        </>
    );
}