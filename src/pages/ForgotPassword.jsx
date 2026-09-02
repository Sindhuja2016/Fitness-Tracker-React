import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // STEP 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/forgot-password", {
        email,
      });

      setMessage(res.data.message);
      setStep(2);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-reset-otp", {
        email,
        otp,
      });

      setMessage(res.data.message);
      setStep(3);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h1 className="text-3xl font-bold text-white text-center">
              Forgot Password?
            </h1>

            <p className="text-gray-300 text-center mt-2 mb-6">
              Enter your registered email and we'll send you an OTP.
            </p>

            {error && (
              <p className="text-red-400 text-sm text-center mb-4">
                {error}
              </p>
            )}

            <form onSubmit={handleSendOtp}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h1 className="text-3xl font-bold text-white text-center">
              Verify OTP
            </h1>

            <p className="text-gray-300 text-center mt-2 mb-6">
              Enter the OTP sent to your email.
            </p>

            {message && (
              <p className="text-green-400 text-sm text-center mb-4">
                {message}
              </p>
            )}

            {error && (
              <p className="text-red-400 text-sm text-center mb-4">
                {error}
              </p>
            )}

            <form onSubmit={handleVerifyOtp}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-orange-400 mt-4"
            >
              Change Email
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h1 className="text-3xl font-bold text-white text-center">
              Reset Password
            </h1>

            <p className="text-gray-300 text-center mt-2 mb-6">
              Enter your new password.
            </p>

            {error && (
              <p className="text-red-400 text-sm text-center mb-4">
                {error}
              </p>
            )}

            <form onSubmit={handleResetPassword}>

              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
              />

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full p-3 mt-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

        <button
          type="button"
          onClick={() => navigate("/signin")}
          className="w-full text-gray-300 mt-6 hover:text-white"
        >
          Back to Login
        </button>

      </div>
    </div>
  );
};

export default ForgotPassword;