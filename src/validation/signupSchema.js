import * as Yup from 'yup'



export const signupSchema = Yup.object({
    name:Yup.string()
    .min(3,"Name must be atleast 3 charecters")
    .required("Name is required"),

    email: Yup.string()
    .email("Invalid email")
    .required("email is required"),

    password: Yup.string()
    .min(6,"Password must be atleast 6 charecters ")
    .required("password is required"),

    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")],"Passwords must match")
    
    .required("Confirm Password is required")

});