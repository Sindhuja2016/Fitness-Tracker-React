import * as Yup from 'yup'

export const signinSchema = Yup.object({

    email:Yup.string()
    .email("Invalid Email")
    .required("Email Required"),
    password: Yup.string()
    .required("Password Required")
}) ;

