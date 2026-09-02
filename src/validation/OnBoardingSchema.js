import * as Yup from "yup";

export const onboardingSchema = Yup.object({
    age: Yup.number()
        .required("Age is required")
        .min(10, "Minimum age is 10")
        .max(100, "Maximum age is 100"),

    gender: Yup.string()
        .required("Gender is required"),

    height: Yup.number()
        .required("Height is required")
        .min(50, "Invalid height")
        .max(250, "Invalid height"),

    weight: Yup.number()
        .required("Weight is required")
        .min(20, "Invalid weight")
        .max(300, "Invalid weight"),

    goal: Yup.string()
        .required("Please select a goal"),
});