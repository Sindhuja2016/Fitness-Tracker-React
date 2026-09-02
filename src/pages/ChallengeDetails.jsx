import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Users, Calendar, Trophy } from "lucide-react";
import api from "../services/api";

const ChallengeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Challenge ID:", id);
  const [challenge, setChallenge] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchChallenge = async () => {
    if (!id || id === "undefined") {
      console.error("Invalid challenge ID:", id);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/challenges/${id}`);
      setChallenge(response.data);
    } catch (error) {
      console.error(
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  fetchChallenge();
}, [id]);


  const joinChallenge = async () => {
  console.log("Join button clicked");
  console.log("Challenge:", challenge);
  console.log("Challenge ID:", challenge?._id);

  if (!challenge?._id) {
    console.error("❌ Challenge ID is missing");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    console.log("Token exists:", !!token);
    console.log("Joining:", `/challenges/${challenge._id}/join`);

    const response = await api.post(
      `/challenges/${challenge._id}/join`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Joined successfully:", response.data);

    setIsJoined(true);
    navigate("/my-challenges");

  } catch (error) {
  console.error("Join failed:", error.response?.data);

  if (
    error.response?.status === 400 &&
    error.response?.data?.message ===
      "You've already joined this challenge"
  ) {
    setIsJoined(true);
    navigate("/my-challenges");
    return;
  }

  console.error(
    error.response?.data?.message || error.message
  );
}
};
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!challenge) {
    return <h1>Challenge not found</h1>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <img
        src={challenge.image}
        alt={challenge.title}
        className="w-full h-96 object-cover rounded-2xl"
      />

      <div className="mt-6">
        <h1 className="text-4xl font-bold">
          {challenge.title}
        </h1>

        <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Users size={18} />
            {challenge.participants} Participants
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} />
            {challenge.duration} Days
          </div>

          <div className="flex items-center gap-2">
            <Trophy size={18} />
            {challenge.level}
          </div>
        </div>

        <p className="mt-6 text-gray-600 leading-7">
          {challenge.description}
        </p>

        {challenge.instruction && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold">
              Instructions
            </h2>

            <p className="mt-2 text-gray-600">
              {challenge.instruction}
            </p>
          </div>
        )}

        <button
          disabled={isJoined}
          onClick={joinChallenge}
          className={`mt-8 px-6 py-3 rounded-xl text-white ${
            isJoined
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {isJoined ? "✓ Joined" : "Join Challenge"}
        </button>
      </div>
    </div>
  );
};

export default ChallengeDetails;