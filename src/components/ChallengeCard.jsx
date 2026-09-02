import { Users, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const ChallengeCard = ({ challenge, showLeaveButton, onLeave }) => {
  const navigate = useNavigate();
  const favourites =
    JSON.parse(localStorage.getItem("favourites")) || [];

  const [isFavourite, setIsFavourite] = useState(
    favourites.includes(challenge.id)
  );
  const toggleFavourite = () => {
    const favourites =
      JSON.parse(localStorage.getItem("favourites")) || [];

    let updated;

    if (favourites.includes(challenge._id)) {
      updated = favourites.filter(
    (id) => id !== challenge._id);
  setIsFavourite(false);
   } else {
    updated = [...favourites, challenge._id];
  setIsFavourite(true);
   }
    localStorage.setItem(
      "favourites",
      JSON.stringify(updated)
    );
  };
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const userPlan = user.plan || "Free";

  const handleChallengeClick = () => {
    if (
      challenge.type === "Premium" &&
      userPlan === "Free"
    ) {
      navigate("/upgrade");
      return;
    }

    navigate(`/challenges/${challenge._id}`);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col relative">

      {/* Image */}
      <img
        src={challenge.image}
        alt={challenge.title}
        className="h-48 w-full object-cover"
      />

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">

        {/* Category & Level Badges */}
        <div className="flex gap-2 mb-3">
          <span className="text-xs font-medium bg-orange-100 text-orange-500 px-2 py-1 rounded-full">
            {challenge.category}
          </span>
          <span className="text-xs font-medium bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
            {challenge.level}
          </span>
          <span className="text-xs font-medium bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
            {challenge.type}
          </span>
        </div>

        {/* Title */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">
            {challenge.title}
          </h3>

          <button onClick={toggleFavourite}>
            <Heart
              size={20}
              fill={isFavourite ? "currentColor" : "none"}
              className={
                isFavourite
                  ? "text-red-500"
                  : "text-gray-400"
              }
            />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 mt-1 mb-3 line-clamp-2">
          {challenge.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
          <div className="flex items-center gap-1">
            <Users size={15} className="text-orange-400" />
            <span>{challenge.participants?.toLocaleString()} joined</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={15} className="text-orange-400" />
            <span>{challenge.duration}</span>
          </div>
        </div>


        {challenge.type === "Premium" &&
          userPlan === "Free" && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
              <p className="text-white font-semibold">
                🔒 Premium Only
              </p>
            </div>
          )}

        {/* View Button */}
        {!showLeaveButton && (
          <Link
            to={
              challenge.type === "Premium" &&
                userPlan === "Free"
                ? "/upgrade"
                : `/challenges/${challenge._id}`
            }
            className="block w-full mt-4"
          >
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg">
              {challenge.type === "Premium" &&
                userPlan === "Free"
                ? "Upgrade to Access"
                : "View Challenge"}
            </button>
          </Link>
        )}

        {/* Leave Button */}

        {showLeaveButton && (
          <button
            onClick={() => onLeave(challenge.id)}
            className="w-full mt-2 border border-red-400 text-red-400 hover:bg-red-50 py-2.5 rounded-xl font-medium transition-all duration-200"
          >
            Leave Challenge
          </button>
        )}

      </div>
    </div>
  );
};
export default ChallengeCard