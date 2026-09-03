import { Users, Calendar, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ChallengeCard = ({ challenge, showLeaveButton, onLeave }) => {
  const navigate = useNavigate();

  const favourites =
    JSON.parse(localStorage.getItem("favourites")) || [];

  const [isFavourite, setIsFavourite] = useState(
    favourites.includes(challenge._id)
  );

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const isPremiumUser = user.isPremium === true;

  const toggleFavourite = () => {
    const favourites =
      JSON.parse(localStorage.getItem("favourites")) || [];

    let updated;

    if (favourites.includes(challenge._id)) {
      updated = favourites.filter(
        (id) => id !== challenge._id
      );
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

  const handleChallengeClick = () => {
    if (challenge.isPremium && !isPremiumUser) {
      navigate("/payment");
      return;
    }

    navigate(`/challenges/${challenge._id}`);
  };

  return (
    <div
      onClick={handleChallengeClick}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col relative cursor-pointer"
    >

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

          {challenge.isPremium && (
            <span className="text-xs font-medium bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
              ⭐ Premium
            </span>
          )}
        </div>

        {/* Title */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">
            {challenge.title}
          </h3>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavourite();
            }}
          >
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
            <span>
              {challenge.participants?.toLocaleString()} joined
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar size={15} className="text-orange-400" />
            <span>{challenge.duration}</span>
          </div>

        </div>

        {/* Premium Overlay */}
        {challenge.isPremium && !isPremiumUser && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl pointer-events-none">
            <p className="text-white font-semibold text-lg">
              🔒 Premium Only
            </p>
          </div>
        )}

        {/* View Button */}
        {!showLeaveButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleChallengeClick();
            }}
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
          >
            {challenge.isPremium && !isPremiumUser
              ? "Upgrade to Access"
              : "View Challenge"}
          </button>
        )}

        {/* Leave Button */}
        {showLeaveButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLeave(challenge._id);
            }}
            className="w-full mt-2 border border-red-400 text-red-400 hover:bg-red-50 py-2.5 rounded-xl font-medium transition-all duration-200"
          >
            Leave Challenge
          </button>
        )}

      </div>
    </div>
  );
};

export default ChallengeCard;

