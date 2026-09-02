import { useFormik } from "formik";
import { signinSchema } from "../validation/signinschema";
import { Link, useNavigate } from "react-router-dom";
import GlassCard from "./GlassCard";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import api from "../services/api";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit: async (values) => {
      setServerError("");
      try {
        const res = await api.post("/auth/login", {
          email: values.email,
          password: values.password,
        });

        localStorage.setItem("token", res.data.token);

        const isNewUser = localStorage.getItem("isNewUser");
        if (isNewUser === "true") {
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        setServerError(error.response?.data?.message || "Invalid credentials");
      }
    },
  });

  return (
    <div className="w-full lg:w-7/12 flex items-center justify-center px-6">
      <GlassCard>
        <h1 className="text-4xl text-white font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Sign in to continue
        </p>

        {serverError && (
          <p className="text-red-400 text-sm text-center mb-4">{serverError}</p>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          {formik.touched.email &&
            formik.errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.email}
              </p>
            )}

          {/* Password */}

          <div className="relative mt-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
            />

            <button
              type="button"
              className="absolute right-4 top-4 text-white"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {formik.touched.password &&
            formik.errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}

          {/* Remember + Forgot */}

          <div className="flex justify-between items-center mt-4 text-sm">
            <label className="text-gray-300 flex gap-2">
              <input type="checkbox" />
              Remember Me
            </label>

            <button
                type="button"
                className="text-orange-400" onClick={() => navigate("/forgot-password")}
            >Forgot Password?</button>
          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold mt-5"
          >
            Sign In
          </button>

          {/* Divider */}

          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-3 text-gray-300">
              OR
            </span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Google */}

          <button
            type="button"
            className="w-full py-3 rounded-xl bg-white text-gray-700 font-medium hover:bg-gray-100"
          >
            Continue with Google
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-400"
          >
            Sign Up
          </Link>
        </p>
      </GlassCard>
    </div>
  );
};

export default LoginForm;