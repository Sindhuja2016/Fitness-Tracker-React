import GlassCard from "../components/GlassCard";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../validation/signupSchema";
import api from "../services/api";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: signupSchema,

    onSubmit: async (values) => {
      setServerError("");
      try {
        const res = await api.post("/auth/register", {
          name: values.name,
          email: values.email,
          password: values.password,
        });

        // No token yet — user must verify OTP first
        localStorage.setItem("pendingEmail", res.data.email);
        localStorage.setItem("isNewUser", "true");

        navigate("/verify-otp");
      } catch (error) {
        setServerError(error.response?.data?.message || "Registration failed. Please try again.");
      }
    },
  });

  return (
    <GlassCard>
      <h1 className="text-4xl text-white font-bold text-center mb-2">
        Create Account
      </h1>

      <p className="text-gray-300 text-center mb-6">
        Start your fitness journey
      </p>

      {serverError && (
        <p className="text-red-400 text-sm text-center mb-4">{serverError}</p>
      )}

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4">

        <div>
          <input type="text" name="name" placeholder="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white" />

          {formik.touched.name &&
            formik.errors.name && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.name}
              </p>
            )}
        </div>

        <div>
          <input type="email" name="email" placeholder="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white" />

          {formik.touched.email &&
            formik.errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.email}
              </p>
            )}
        </div>

        <div>
          <input type="password" name="password" placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white" />

          {formik.touched.password &&
            formik.errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
        </div>

        <div>
          <input type="password" name="confirmPassword" placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white" />

          {formik.touched.confirmPassword &&
            formik.errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.confirmPassword}
              </p>
            )}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold">

          Sign Up
        </button>
      </form>

      <p className="text-center text-gray-300 mt-6">
        Already have an account?{" "}
        <Link to="/signin"
          className="text-orange-400">Sign In </Link>
      </p>
    </GlassCard>
  );
};

export default SignUp;