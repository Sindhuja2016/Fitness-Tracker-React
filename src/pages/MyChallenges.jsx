
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChallengeCard from "../components/ChallengeCard";
import api from "../services/api";

const MyChallenges = () => {
  const [myChallenges, setMyChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------------------------------
  // Fetch joined challenges from backend
  // ---------------------------------------
  const fetchMyChallenges = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/challenges/my-challenges"
      );

      console.log(
        "My challenges from backend:",
        response.data
      );

      setMyChallenges(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load my challenges:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Could not load your challenges."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // Load when page opens
  // ---------------------------------------
  useEffect(() => {
    fetchMyChallenges();
  }, []);

  // ---------------------------------------
  // Leave challenge
  // ---------------------------------------
  const leaveChallenge = async (challengeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to leave this challenge?"
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/challenges/${challengeId}/leave`
      );

      console.log("Challenge left successfully");

      // Remove from UI immediately
      setMyChallenges((previous) =>
        previous.filter(
          (userChallenge) =>
            userChallenge.challenge?._id !== challengeId
        )
      );
    } catch (error) {
      console.error(
        "Failed to leave challenge:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Could not leave the challenge."
      );
    }
  };

  // ---------------------------------------
  // Loading
  // ---------------------------------------
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <p className="text-gray-500">
          Loading your challenges...
        </p>
      </div>
    );
  }

  // ---------------------------------------
  // Error
  // ---------------------------------------
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-5">
          <p>{error}</p>

          <button
            onClick={fetchMyChallenges}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------
  // Empty state
  // ---------------------------------------
  if (myChallenges.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-800">
          No Challenges Joined Yet
        </h2>

        <p className="text-gray-400 mt-2">
          Browse challenges and join one to get started.
        </p>

        <Link to="/challenges">
          <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all">
            Browse Challenges
          </button>
        </Link>
      </div>
    );
  }

  // ---------------------------------------
  // Main UI
  // ---------------------------------------
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">
        My Challenges
      </h1>

      <p className="text-gray-400 mb-8">
        You currently joined{" "}
        {myChallenges.length} challenge
        {myChallenges.length > 1 ? "s" : ""}.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {myChallenges.map((userChallenge) => {
          const challenge = userChallenge.challenge;

          // Protect against deleted/missing challenges
          if (!challenge) return null;

          return (
            <ChallengeCard
              key={userChallenge._id}
              challenge={challenge}
              showLeaveButton={true}
              onLeave={() =>
                leaveChallenge(challenge._id)
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyChallenges;

