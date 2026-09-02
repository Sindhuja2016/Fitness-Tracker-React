import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../components/GlassCard";
import api from "../services/api";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("pendingEmail") || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/verify-otp", { email, otp });

      // Now that they're verified, they have a real token
      localStorage.setItem("token", res.data.token);
      localStorage.removeItem("pendingEmail");

      navigate("/onboarding");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setResendMessage("");
    try {
      const res = await api.post("/auth/resend-otp", { email });
      setResendMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Could not resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <GlassCard>
        <h1 className="text-3xl text-white font-bold text-center mb-2">
          Verify Your Email
        </h1>
        <p className="text-gray-300 text-center mb-6">
          We sent a 6-digit code to <span className="text-orange-400">{email}</span>
        </p>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}
        {resendMessage && (
          <p className="text-green-400 text-sm text-center mb-4">{resendMessage}</p>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-blue text-center text-2xl tracking-widest"
          />

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Didn't get the code?{" "}
          <button onClick={handleResend} className="text-orange-400 underline">
            Resend
          </button>
        </p>
      </GlassCard>
    </div>
  );
};

export default VerifyOtp;