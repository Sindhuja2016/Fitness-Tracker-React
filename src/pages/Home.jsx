import { Link } from "react-router-dom";
import { challenges } from "../data/challenges";
import ChallengeCard from "../components/ChallengeCard";
import { Trophy, Users, Zap } from "lucide-react";

const Home = () => {
  return (
    <div>

      {/* Hero Section */}
      <div className="text-center py-24 bg-gradient-to-br from-orange-50 via-white to-amber-50 px-6">
        <span className="bg-orange-100 text-orange-500 text-sm font-medium px-4 py-1.5 rounded-full">
          🔥 New challenges every week
        </span>
        <h1 className="text-5xl font-bold text-gray-800 mt-4 mb-4 leading-tight">
          Push Your Limits with <br />
          <span className="text-orange-500">FitChallenge</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          Join thousands of people building better habits through daily fitness challenges. Track progress, compete, and grow.
        </p>
        <Link to="/browsechallenges">
          <button className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-8 py-3 rounded-xl font-semibold transition-all">
            Get Started →
          </button>
        </Link>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-y py-6 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-orange-500">10K+</p>
            <p className="text-gray-400 text-sm">Active Users</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-500">50+</p>
            <p className="text-gray-400 text-sm">Challenges</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-500">95%</p>
            <p className="text-gray-400 text-sm">Completion Rate</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Why FitChallenge?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-orange-50 rounded-2xl p-6">
            <Trophy className="text-orange-500 mb-3" />
            <h3 className="font-bold text-gray-800 mb-1">Compete & Win</h3>
            <p className="text-gray-400 text-sm">Climb leaderboards and earn badges as you complete challenges.</p>
          </div>
          <div className="bg-orange-50 rounded-2xl p-6">
            <Users className="text-orange-500 mb-3" />
            <h3 className="font-bold text-gray-800 mb-1">Community Driven</h3>
            <p className="text-gray-400 text-sm">Join a supportive community of fitness enthusiasts worldwide.</p>
          </div>
          <div className="bg-orange-50 rounded-2xl p-6">
            <Zap className="text-orange-500 mb-3" />
            <h3 className="font-bold text-gray-800 mb-1">All Levels</h3>
            <p className="text-gray-400 text-sm">From beginner to advanced — there's a challenge for everyone.</p>
          </div>
        </div>
      </div>

      {/* Featured Challenges */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Challenges</h2>
          <Link to="/browsechallenges" className="text-orange-500 hover:underline text-sm font-medium">
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.slice(0, 3).map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;