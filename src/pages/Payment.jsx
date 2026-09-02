import React, { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";

const Payment = () => {
const [paymentMethod, setPaymentMethod] = useState("upi");
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");

const navigate = useNavigate();

const handlePayment = async () => {
try {
setLoading(true);
setMessage("");


  // Simulate payment processing
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock payment API
  const response = await api.post("/payment/upgrade", {});

  setMessage(response.data.message);

  // Store premium status locally
  localStorage.setItem("isPremium", "true");

  setTimeout(() => {
    navigate("/dashboard");
  }, 2000);
} catch (error) {
  console.error(error);

  setMessage(
    error.response?.data?.message ||
      "Payment failed. Please try again."
  );
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4"> <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">


    <h1 className="text-2xl font-bold text-center mb-2">
      Upgrade to Premium ⭐
    </h1>

    <p className="text-gray-600 text-center mb-6">
      Unlock all premium fitness challenges.
    </p>

    {/* Plan Details */}
    <div className="border rounded-lg p-5 mb-6 text-center">
      <h2 className="text-xl font-semibold">
        Premium Plan
      </h2>

      <p className="text-3xl font-bold my-3">
        ₹199
      </p>

      <p className="text-gray-500">
        One-time demo payment
      </p>
    </div>

    {/* Payment Method */}
    <h3 className="font-semibold mb-3">
      Choose Payment Method
    </h3>

    <div className="space-y-3 mb-6">

      <label className="flex items-center border rounded-lg p-4 cursor-pointer">
        <input
          type="radio"
          name="payment"
          value="upi"
          checked={paymentMethod === "upi"}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mr-3"
        />

        <span>UPI (Demo)</span>
      </label>

      <label className="flex items-center border rounded-lg p-4 cursor-pointer">
        <input
          type="radio"
          name="payment"
          value="card"
          checked={paymentMethod === "card"}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mr-3"
        />

        <span>Credit / Debit Card (Demo)</span>
      </label>

    </div>

    {/* Pay Button */}
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
    >
      {loading
        ? "Processing Payment..."
        : `Pay ₹199 with ${
            paymentMethod === "upi" ? "UPI" : "Card"
          }`}
    </button>

    {message && (
      <div className="mt-4 text-center font-medium text-green-600">
        ✅ {message}
      </div>
    )}

    <p className="text-xs text-gray-400 text-center mt-5">
      This is a demo payment system. No real payment will be processed.
    </p>

  </div>
</div>


);
};

export default Payment;
