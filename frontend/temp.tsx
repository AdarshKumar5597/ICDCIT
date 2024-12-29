"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Types
type Step1FormData = z.infer<typeof signupSchema>;
type Step2FormData = z.infer<typeof doctorDetailsSchema>;
type Step3FormData = z.infer<typeof profilePhotoSchema>;

// Validation Schemas
const signupSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    userName: z.string()
        .min(5, "Username must be at least 5 characters")
        .regex(/^[a-zA-Z0-9@]+$/, "Username can only contain letters, numbers, and @"),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "Password must contain uppercase, number and special character"),
    role: z.enum(["DOCTOR", "PATIENT"])
});

const doctorDetailsSchema = z.object({
    certificate: z.any(),
    bio: z.string().min(20, "Bio must be at least 20 characters"),
    proficiencies: z.array(z.string()).min(1, "Select at least one proficiency")
});

const profilePhotoSchema = z.object({
    photo: z.any()
});

const PROFICIENCY_OPTIONS = [
    "Pediatrics",
    "Cardiology",
    "General Medicine",
    "Neurology",
    "Orthopedics",
    "Dermatology",
];

const Page = () => {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<"DOCTOR" | "PATIENT" | null>(null);
    const [isUnderReview, setIsUnderReview] = useState(false);
    const [reviewApproved, setReviewApproved] = useState(false);

    const {
        register: registerStep1,
        handleSubmit: handleSubmitStep1,
        formState: { errors: errorsStep1, isSubmitting: isSubmittingStep1 }
    } = useForm<Step1FormData>({
        resolver: zodResolver(signupSchema)
    });

    const {
        register: registerStep2,
        handleSubmit: handleSubmitStep2,
        formState: { errors: errorsStep2, isSubmitting: isSubmittingStep2 },
        watch: watchStep2
    } = useForm<Step2FormData>({
        resolver: zodResolver(doctorDetailsSchema)
    });

    const {
        register: registerStep3,
        handleSubmit: handleSubmitStep3,
        formState: { errors: errorsStep3, isSubmitting: isSubmittingStep3 }
    } = useForm<Step3FormData>({
        resolver: zodResolver(profilePhotoSchema)
    });

    const handleStep1Submit = async (data: Step1FormData) => {
        try {
            // API call simulation
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Step 1 data:", data);
            setRole(data.role);
            setStep(2);
        } catch (error) {
            console.error("Step 1 error:", error);
        }
    };

    const handleStep2Submit = async (data: Step2FormData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Step 2 data:", data);
            if (role === "DOCTOR") {
                setIsUnderReview(true);
            } else {
                setStep(3);
            }
        } catch (error) {
            console.error("Step 2 error:", error);
        }
    };

    const handleStep3Submit = async (data: Step3FormData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Step 3 data:", data);
            // Final submission logic
        } catch (error) {
            console.error("Step 3 error:", error);
        }
    };

    const pageVariants = {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {[1, 2, 3].map((stepNumber) => (
                            <div
                                key={stepNumber}
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200"
                                    }`}
                            >
                                {stepNumber}
                            </div>
                        ))}
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                        <motion.div
                            className="h-full bg-blue-600 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${((step - 1) / 2) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="bg-white p-8 rounded-xl shadow-lg"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h2>
                            <form onSubmit={handleSubmitStep1(handleStep1Submit)} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            {...registerStep1("firstName")}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {errorsStep1.firstName && (
                                            <p className="text-red-500 text-sm mt-1">{errorsStep1.firstName.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            {...registerStep1("lastName")}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {errorsStep1.lastName && (
                                            <p className="text-red-500 text-sm mt-1">{errorsStep1.lastName.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Username</label>
                                    <input
                                        {...registerStep1("userName")}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errorsStep1.userName && (
                                        <p className="text-red-500 text-sm mt-1">{errorsStep1.userName.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        {...registerStep1("email")}
                                        type="email"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errorsStep1.email && (
                                        <p className="text-red-500 text-sm mt-1">{errorsStep1.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        {...registerStep1("password")}
                                        type="password"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errorsStep1.password && (
                                        <p className="text-red-500 text-sm mt-1">{errorsStep1.password.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setRole("DOCTOR")}
                                            className={`p-4 rounded-lg border-2 ${role === "DOCTOR"
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 hover:border-blue-200"
                                                }`}
                                        >
                                            Doctor
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRole("PATIENT")}
                                            className={`p-4 rounded-lg border-2 ${role === "PATIENT"
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 hover:border-blue-200"
                                                }`}
                                        >
                                            Patient
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmittingStep1}
                                    className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
                                >
                                    {isSubmittingStep1 ? "Processing..." : "Next"}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {step === 2 && role === "DOCTOR" && (
                        <motion.div
                            key="step2-doctor"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="bg-white p-8 rounded-xl shadow-lg"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Details</h2>
                            <form onSubmit={handleSubmitStep2(handleStep2Submit)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Medical Certificate</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        {...registerStep2("certificate")}
                                        className="mt-1 block w-full"
                                    />
                                    {errorsStep2.certificate && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {typeof errorsStep2.certificate?.message === 'string'
                                                ? errorsStep2.certificate.message
                                                : null}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                                    <textarea
                                        {...registerStep2("bio")}
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errorsStep2.bio && (
                                        <p className="text-red-500 text-sm mt-1">{errorsStep2.bio.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Proficiencies</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {PROFICIENCY_OPTIONS.map((option) => (
                                            <label key={option} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    value={option}
                                                    {...registerStep2("proficiencies")}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errorsStep2.proficiencies && (
                                        <p className="text-red-500 text-sm mt-1">{errorsStep2.proficiencies.message}</p>
                                    )}
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="bg-gray-200 text-gray-700 rounded-md py-2 px-4 hover:bg-gray-300 transition duration-200"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmittingStep2}
                                        className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
                                    >
                                        {isSubmittingStep2 ? "Processing..." : "Submit for Review"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {isUnderReview && (
                        <motion.div
                            key="review"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="bg-white p-8 rounded-xl shadow-lg text-center"
                        >
                            <div className="mb-6">
                                <div className="w-20 h-20 mx-auto mb-4">
                                    <Image
                                        src="/review-illustration.svg"
                                        alt="Under Review"
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Under Review</h2>
                                <p className="text-gray-600">
                                    Your application is being reviewed by our team. We'll notify you once it's approved.
                                </p>
                            </div>
                            <Link
                                href="/dashboard"
                                className="inline-block bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-200"
                            >
                                Go to Dashboard
                            </Link>
                        </motion.div>
                    )}

                    {step === 3 || (step === 2 && role === "PATIENT") && (
                        <motion.div
                            key="step3"
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="bg-white p-8 rounded-xl shadow-lg"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Photo</h2>
                            <form onSubmit={handleSubmitStep3(handleStep3Submit)} className="space-y-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden">
                                        {/* Preview image here */}
                                    </div>
                                    <label className="block">
                                        <span className="sr-only">Choose profile photo</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            {...registerStep3("photo")}
                                            className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                                        />
                                    </label>
                                    {errorsStep3.photo && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {typeof errorsStep3.photo?.message === 'string' ? errorsStep3.photo.message : null}
                                        </p>

                                    )}
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setStep((role as "DOCTOR" | "PATIENT") === "DOCTOR" ? 2 : 1)}
                                        className="bg-gray-200 text-gray-700 rounded-md py-2 px-4 hover:bg-gray-300 transition duration-200"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmittingStep3}
                                        className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
                                    >
                                        {isSubmittingStep3 ? "Processing..." : "Complete Registration"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Page;
