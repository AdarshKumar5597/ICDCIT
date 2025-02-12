"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
import { useHealthcareStore } from '@/zustand/useHealthcareStore';
import {useRouter} from "next/navigation";

const Page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const setAuthData = useHealthcareStore(state => state.setAuthData);
    const setLoggedIn = useHealthcareStore(state => state.setLoggedIn);
    const router = useRouter();
    // const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            const loginURL = process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/login';
            console.log('loginURL:', loginURL);
            const response = await fetch(loginURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                setAuthData({ token: data.token, userId: data.userId, role: data.role, userName: data.userName, doctorId : data.doctorId });
                setLoggedIn(true);
                toast.success('Logged in successfully!');
                console.log("Logged in successfully!");
                await router.push('/doctors/search');
            } else {
                toast.error(data.message || 'Login failed. Please try again!');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold text-blue-950 mb-4">
                        Welcome to HealthCare Online
                    </h1>
                    <p className="text-gray-600 text-lg mb-6">
                        Access your healthcare dashboard to manage appointments, view patient records, and provide consultations.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-blue-900">4.9/5</div>
                            <p className="text-sm text-gray-600">Provider Rating</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-blue-900">100%</div>
                            <p className="text-sm text-gray-600">HIPAA Compliant</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-sm sm:col-span-1 col-span-2">
                            <div className="text-2xl font-bold text-blue-900">24/7</div>
                            <p className="text-sm text-gray-600">Support</p>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-blue-950">Login to Your Account</h2>
                            <p className="text-gray-600 mt-2">Please enter your credentials</p>
                        </div>

                        <form onSubmit={handleSignIn} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="doctor@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200 font-medium disabled:opacity-50"
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600 mb-4">Don&apos;t have an account?</p>
                            <Link
                                href="/signup"
                                className="inline-block w-full px-4 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition duration-200 font-medium"
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;