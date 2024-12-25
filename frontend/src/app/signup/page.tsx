"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { Eye, EyeOff } from 'lucide-react';

const Page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold text-blue-950 mb-4">
                        Join HealthCare Online
                    </h1>
                    <p className="text-gray-600 text-lg mb-6">
                        Create your account to access personalized healthcare services and connect with trusted medical professionals.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-blue-900">2M+</div>
                            <p className="text-sm text-gray-600">Active Users</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-blue-900">100%</div>
                            <p className="text-sm text-gray-600">Secure & Private</p>
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
                            <h2 className="text-2xl font-bold text-blue-950">Create Your Account</h2>
                            <p className="text-gray-600 mt-2">Fill in your information to get started</p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    placeholder="john.doe@example.com"
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
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {showPassword ?
                                            <EyeOff className="w-5 h-5" /> :
                                            <Eye className="w-5 h-5" />
                                        }
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {showConfirmPassword ?
                                            <EyeOff className="w-5 h-5" /> :
                                            <Eye className="w-5 h-5" />
                                        }
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                    required
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                    I agree to the <a href="#" className="text-blue-500 hover:text-blue-600">Terms of Service</a> and <a href="#" className="text-blue-500 hover:text-blue-600">Privacy Policy</a>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200 font-medium"
                            >
                                Create Account
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600 mb-4">Already have an account?</p>
                            <Link
                                href="/login"
                                className="inline-block w-full px-4 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition duration-200 font-medium"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;