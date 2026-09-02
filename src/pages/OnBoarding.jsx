import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { onboardingSchema } from "../validation/OnBoardingSchema";



const Onboarding = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            age: "",
            gender: "",
            height: "",
            weight: "",
            goal: "",
        },

        validationSchema: onboardingSchema,

        onSubmit: (values) => {
            localStorage.setItem("profile", JSON.stringify(values)); // save form values
            localStorage.removeItem("isNewUser");                    // clear new user flag
            navigate("/dashboard");
        },
    });

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Complete Your Profile
                </h1>

                <form onSubmit={formik.handleSubmit} className="space-y-4">

                    {/* Age */}
                    <div>
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            className="w-full border rounded-lg p-3"
                            {...formik.getFieldProps("age")}
                        />
                        {formik.touched.age && formik.errors.age && (
                            <p className="text-red-500 text-sm">
                                {formik.errors.age}
                            </p>
                        )}
                    </div>

                    {/* Gender */}
                    <div>
                        <select
                            name="gender"
                            className="w-full border rounded-lg p-3"
                            {...formik.getFieldProps("gender")}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        {formik.touched.gender && formik.errors.gender && (
                            <p className="text-red-500 text-sm">
                                {formik.errors.gender}
                            </p>
                        )}
                    </div>

                    {/* Height */}
                    <div>
                        <input
                            type="number"
                            name="height"
                            placeholder="Height (cm)"
                            className="w-full border rounded-lg p-3"
                            {...formik.getFieldProps("height")}
                        />

                        {formik.touched.height && formik.errors.height && (
                            <p className="text-red-500 text-sm">
                                {formik.errors.height}
                            </p>
                        )}
                    </div>

                    {/* Weight */}
                    <div>
                        <input
                            type="number"
                            name="weight"
                            placeholder="Weight (kg)"
                            className="w-full border rounded-lg p-3"
                            {...formik.getFieldProps("weight")}
                        />

                        {formik.touched.weight && formik.errors.weight && (
                            <p className="text-red-500 text-sm">
                                {formik.errors.weight}
                            </p>
                        )}
                    </div>

                    {/* Goal */}
                    <div>
                        <select
                            name="goal"
                            className="w-full border rounded-lg p-3"
                            {...formik.getFieldProps("goal")}
                        >
                            <option value="">Select Goal</option>
                            <option value="maintain">
                                Maintain Weight
                            </option>
                            <option value="lose">
                                Lose Weight
                            </option>
                            <option value="gain">
                                Gain Weight
                            </option>
                        </select>

                        {formik.touched.goal && formik.errors.goal && (
                            <p className="text-red-500 text-sm">
                                {formik.errors.goal}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
                    >
                        Continue
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Onboarding;