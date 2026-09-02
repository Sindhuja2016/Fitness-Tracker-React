import ChallengeCard from "../components/ChallengeCard";
import { Search, ChevronDown } from "lucide-react";
import { useState,useEffect } from "react";
import api from "../services/api";

import React from 'react'

const BrowseChallenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Categories");
    const [level, setLevel] = useState("All levels");
    const levels = ["All levels", "Beginner", "Intermediate", "Advanced"];

    useEffect(() => {
    const fetchChallenges = async () => {
    try {
      const response = await api.get("/challenges");

      console.log("Challenges from MongoDB:", response.data);

      setChallenges(response.data);
    } catch (error) {
      console.error(
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  fetchChallenges();
}, []);
    // Filtering logic

    const suggestions = search.length > 0 ? challenges.filter((challenge) =>
        challenge.title
            .toLowerCase()
            .includes(search.toLowerCase())) : [];

    const categories = [
        "All Categories",
        ...new Set(challenges.map(challenge => challenge.category))
    ];
    const user =
        JSON.parse(localStorage.getItem("user")) || {};

    const userPlan = user.plan || "free";

    const filteredChallenges = challenges.filter((challenge) => {
        const matchesSearch =
            challenge.title
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            category === "All Categories" ||
            challenge.category === category;

        const matchesLevel =
            level === "All levels" ||
            challenge.level === level;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesLevel
        );
    });

    console.log("challenges:", challenges);
    console.log("filteredChallenges:", filteredChallenges);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-6 py-10">

            {/* Heading */}
            <h1 className="text-4xl font-bold mt-3 mb-2 text-center text-gray-800 tracking-tight">
                Browse Challenges
            </h1>
            <p className="text-center text-gray-400 mb-8 text-sm">Find the perfect challenge for your fitness journey</p>

            {/* Search & Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">

                {/* Search Box */}
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search challenges..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all" />

                    {search && suggestions.length > 0 && (
                        <div className="absolute left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                            {suggestions.map((challenge) => (
                                <div
                                    key={challenge.id}
                                    onClick={() => setSearch(challenge.title)}
                                    className="px-4 py-3 cursor-pointer hover:bg-gray-200">
                                    {challenge.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Category Filter */}
                <div className="relative">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`appearance-none w-full min-w-[200px] px-4 py-3 pr-10 bg-white border border-gray-200 
            rounded-xl shadow-sm text-gray-700 cursor-pointer transition-all focus:outline-none 
            focus:ring-2 focus:ring-orange-400 focus:border-orange-400 hover:border-orange-300`}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Level Filter */}
                <div className="relative">
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="appearance-none w-full min-w-[200px] px-4 py-3 pr-10 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-700 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 hover:border-orange-300"
                    >
                        {levels.map((lvl) => (
                            <option key={lvl} value={lvl}>
                                {lvl}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChallenges.map((challenge) => (
                    <ChallengeCard key={challenge._id} challenge={challenge} />
                ))}
            </div>

        </div>
    )
}

export default BrowseChallenges