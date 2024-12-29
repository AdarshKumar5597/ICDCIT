"use client";

import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Step validation schemas
const signupSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    userName: z
        .string()
        .min(5, "Username must be at least 5 characters")
        .regex(/^[a-zA-Z0-9@]+$/, "Username can only contain letters, numbers, and @"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "Password must contain uppercase, number, and special character"),
    role: z.enum(["DOCTOR", "PATIENT"]),
});

const doctorDetailsSchema = z.object({
    certificate: z.any(),
    bio: z.string().min(20, "Bio must be at least 20 characters"),
    proficiencies: z.array(z.string()).min(1, "Select at least one proficiency"),
});

const profilePhotoSchema = z.object({
    photo: z.any(),
});

// Merged schema for all steps
const combinedSchema = signupSchema
    .and(doctorDetailsSchema)
    .and(profilePhotoSchema);

// Type inference for each step
type Step1FormData = z.infer<typeof signupSchema>;
type Step2FormData = z.infer<typeof doctorDetailsSchema>;
type Step3FormData = z.infer<typeof profilePhotoSchema>;

// Props for the form steps
interface StepProps {
    onNext: () => void;
    onBack?: () => void;
}

// Step 1: Signup Details
const Step1: React.FC<StepProps> = ({ onNext }) => {
    const { register, handleSubmit, formState: { errors, isValid }, getValues } = useFormContext<Step1FormData>();

    const onSubmit: SubmitHandler<Step1FormData> = (data) => {
        console.log("Form submitted with data:", data);
        console.log("Current values:", getValues());
        console.log("Validation errors:", errors);
        console.log("Form validity:", isValid);
        onNext();
    };

    return (
        <form id="step1form" onSubmit={handleSubmit((data) => {
            console.log("HandleSubmit triggered");
            onSubmit(data);
        })} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                    {...register("firstName")}
                    type="text"
                    className="mt-1 w-full border rounded-md p-2"
                />
                <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
            </div>
            <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                    {...register("lastName")}
                    type="text"
                    className="mt-1 w-full border rounded-md p-2"
                />
                <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
            </div>
            <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                    {...register("userName")}
                    type="text"
                    className="mt-1 w-full border rounded-md p-2"
                />
                <p className="text-red-500 text-sm">{errors.userName?.message}</p>
            </div>
            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                    {...register("email")}
                    type="email"
                    className="mt-1 w-full border rounded-md p-2"
                />
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
            <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                    {...register("password")}
                    type="password"
                    className="mt-1 w-full border rounded-md p-2"
                />
                <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <div>
                <label className="block text-sm font-medium">Role</label>
                <select {...register("role")} className="mt-1 w-full border rounded-md p-2">
                    <option value="">Select a role</option>
                    <option value="DOCTOR">Doctor</option>
                    <option value="PATIENT">Patient</option>
                </select>
                <p className="text-red-500 text-sm">{errors.role?.message}</p>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Next
            </button>
        </form>
    );
};

// Step 2: Doctor Details
const Step2: React.FC<StepProps> = ({ onNext, onBack }) => {
    console.log("Into step2");
    const { register, handleSubmit, formState: { errors } } = useFormContext<Step2FormData>();

    const onSubmit: SubmitHandler<Step2FormData> = (data) => {
        console.log("Step 2 Data:", data);
        onNext(); // Call onNext only after successful validation
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Certificate</label>
                <input
                    {...register("certificate")}
                    type="file"
                    className="mt-1 w-full border rounded-md p-2"
                />
                <p className="text-red-500 text-sm">
                    {errors.certificate?.message ? String(errors.certificate?.message) : ""}
                </p>

            </div>

            <div>
                <label className="block text-sm font-medium">Bio</label>
                <textarea
                    {...register("bio")}
                    className="mt-1 w-full border rounded-md p-2"
                />
                <p className="text-red-500 text-sm">{errors.bio?.message}</p>
            </div>
            <div>
                <label className="block text-sm font-medium">Proficiencies</label>
                <select {...register("proficiencies")} multiple className="mt-1 w-full border rounded-md p-2">
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Dermatology">Dermatology</option>
                </select>
                <p className="text-red-500 text-sm">{errors.proficiencies?.message}</p>
            </div>
            <div className="flex justify-between">
                <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">
                    Back
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Next
                </button>
            </div>
        </form>
    );

};
// Step 3: Profile Photo
const Step3: React.FC<StepProps> = ({ onBack }) => {
    const { register, handleSubmit, formState: { errors } } = useFormContext<Step3FormData>();

    const onSubmit = (data: Step3FormData) => {
        console.log("Step 3 Data:", data);
        alert("Form Submitted!");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Profile Photo</label>
                <input
                    {...register("photo")}
                    type="file"
                    className="mt-1 w-full border rounded-md p-2"
                />
                <p className="text-red-500 text-sm">
                    {errors.photo?.message ? String(errors.photo?.message) : ""}
                </p>
            </div>
            <div className="flex justify-between">
                <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">
                    Back
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </div>
        </form>
    );
};

// Main Multi-Step Form Component
const MultiStepForm: React.FC = () => {
    const methods = useForm({
        resolver: zodResolver(combinedSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            role: "",
            certificate: null,
            bio: "",
            proficiencies: [],
            photo: null,
        },
    });

    const [step, setStep] = useState(1);

    const onNext = () => setStep((prev) => prev + 1);
    const onBack = () => setStep((prev) => prev - 1);

    return (
        <FormProvider {...methods}>
            <div className="max-w-lg mx-auto mt-10 p-4 border rounded-md">
                {step === 1 && <Step1 onNext={onNext} />}
                {step === 2 && <Step2 onNext={onNext} onBack={onBack} />}
                {step === 3 && <Step3 onNext={() => { console.log("Finished form") }} onBack={onBack} />}
            </div>
        </FormProvider>
    );
};

export default MultiStepForm;
