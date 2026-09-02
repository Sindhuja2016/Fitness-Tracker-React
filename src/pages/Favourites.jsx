import React from "react";
import { challenges } from "../data/challenges";
import ChallengeCard from "../components/ChallengeCard";

const Favourites = () => {
  const favouriteIds =
    JSON.parse(localStorage.getItem("favourites")) || [];

  const favouriteChallenges = challenges.filter(
    (challenge) =>
      favouriteIds.includes(challenge.id)
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">
        Favourite Challenges
      </h1>

      {favouriteChallenges.length === 0 ? (
        <p className="text-gray-500">
          No favourites yet ❤️
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favouriteChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;