
import React, { useState, useEffect, useCallback } from "react";
import { Target, Flame, Trophy, CheckCircle } from "lucide-react";
import Calendar from "react-calendar";
import api from "../services/api";
import "react-calendar/dist/Calendar.css";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [userName, setUserName] = useState("User");
  const [stats, setStats] = useState({
    streak: 0,
    completionRate: 0,
  });

  const [myChallenges, setMyChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState("");

  const getLocalDate = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getStreak = (completedDates) => {
    const dates = Array.isArray(completedDates) ? completedDates : [];
    const dateSet = new Set(dates);

    let streak = 0;
    const cursor = new Date();

    while (true) {
      const iso = getLocalDate(cursor);
      if (dateSet.has(iso)) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const fetchDashboardData = useCallback(async () => {
    try {
      setError("");

      const [profileRes, statsRes, myChallengesRes] = await Promise.all([
        api.get("/auth/profile"),
        api.get("/stats"),
        api.get("/challenges/my-challenges"),
      ]);

      setUserName(profileRes.data?.name || "User");

      setStats({
        streak: Number(statsRes.data?.streak) || 0,
        completionRate: Number(statsRes.data?.completionRate) || 0,
      });

      const challenges = Array.isArray(myChallengesRes.data)
        ? myChallengesRes.data
        : [];

      setMyChallenges(challenges);
    } catch (err) {
      console.error("Dashboard error:", err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Could not load dashboard. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const allCompletedDates = new Set();

  myChallenges.forEach((userChallenge) => {
    const completedDates = Array.isArray(userChallenge?.completedDates)
      ? userChallenge.completedDates
      : [];

    completedDates.forEach((date) => {
      allCompletedDates.add(
        typeof date === "string" ? date.split("T")[0] : getLocalDate(new Date(date))
      );
    });
  });

  const markChallengeComplete = async (challengeId) => {
    const today = getLocalDate();

    try {
      setCompleting(true);
      setError("");

      await api.post(`/challenges/${challengeId}/complete`, {
        date: today,
      });

      await fetchDashboardData();
    } catch (err) {
      console.error("Complete challenge error:", err);
      setError(
        err.response?.data?.message ||
          "Could not mark challenge complete. Please try again."
      );
    } finally {
      setCompleting(false);
    }
  };

  const markTodayComplete = async () => {
    try {
      setCompleting(true);
      setError("");

      for (const userChallenge of myChallenges) {
        const challengeId = userChallenge?.challenge?._id;
        if (!challengeId) continue;

        const completedDates = Array.isArray(userChallenge.completedDates)
          ? userChallenge.completedDates
          : [];

        const today = getLocalDate();

        if (completedDates.includes(today)) continue;
        if (userChallenge.completed) continue;

        await api.post(`/challenges/${challengeId}/complete`, {
          date: today,
        });
      }

      await fetchDashboardData();
    } catch (err) {
      console.error("Mark today complete error:", err);
      setError(
        err.response?.data?.message || "Could not mark today's challenges complete."
      );
    } finally {
      setCompleting(false);
    }
  };

  const hour = new Date().getHours();
  let greeting;
  if (hour >= 5 && hour < 12) greeting = "Good Morning";
  else if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
  else if (hour >= 17 && hour < 21) greeting = "Good Evening";
  else greeting = "Good Night";

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <p className="text-gray-500">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          {greeting}, {userName} 👋
        </h1>
        <p className="text-gray-500 mt-2">Track your fitness journey.</p>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-600 rounded-lg p-3">
            {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-3">
            <Target className="text-orange-500" />
            <h3 className="font-semibold">Active Challenges</h3>
          </div>
          <p className="text-4xl font-bold">{myChallenges.length}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-3">
            <Flame className="text-orange-500" />
            <h3 className="font-semibold">Current Streak</h3>
          </div>
          <p className="text-4xl font-bold">{stats.streak} 🔥</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="text-orange-500" />
            <h3 className="font-semibold">Completion Rate</h3>
          </div>
          <p className="text-4xl font-bold">{stats.completionRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Challenge Calendar</h2>

            <Calendar
              onChange={setDate}
              value={date}
              tileContent={({ date }) => {
                const formattedDate = getLocalDate(date);
                if (allCompletedDates.has(formattedDate)) {
                  return <div className="text-xs text-orange-500 font-bold">✓</div>;
                }
                return null;
              }}
            />

            <p className="mt-4 text-gray-500">Selected Date: {date.toDateString()}</p>

            <button
              onClick={markTodayComplete}
              disabled={myChallenges.length === 0 || completing}
              className="mt-4 w-full bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {completing ? "Saving..." : "Mark Today Complete (All)"}
            </button>

            {myChallenges.length === 0 && (
              <p className="mt-2 text-sm text-gray-400">
                Join a challenge to start tracking progress.
              </p>
            )}

            <p className="mt-4 font-semibold">
              Total Active Days: {allCompletedDates.size}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Active Challenges</h2>

        {myChallenges.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow text-center">
            <Target className="mx-auto text-gray-400 mb-3" size={40} />
            <p className="text-gray-500">No active challenges yet.</p>
            <p className="text-sm text-gray-400 mt-2">
              Join a challenge to start your fitness journey.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {myChallenges.map((userChallenge) => {
              const challenge = userChallenge?.challenge;
              if (!challenge) return null;

              const completedDates = Array.isArray(userChallenge.completedDates)
                ? userChallenge.completedDates
                : [];

              const durationDays = Number.parseInt(challenge.duration) || 30;

              const progress = Math.min(
                Math.round((completedDates.length / durationDays) * 100),
                100
              );

              return (
                <div
                  key={userChallenge._id}
                  className="bg-white rounded-2xl shadow overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="h-52 w-full object-cover"
                    />

                    {progress >= 100 && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <CheckCircle size={15} />
                        Completed
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold">{challenge.title}</h3>
                    <p className="text-gray-500 mt-2">{challenge.duration} Days</p>

                    <div className="mt-5">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span className="font-semibold">{progress}%</span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      {completedDates.length} of {durationDays} days completed
                    </p>

                    <div className="flex justify-between mt-3 text-sm">
                      <span className="text-gray-500">🔥 Current Streak</span>
                      <span className="font-semibold">
                        {getStreak(completedDates)} days
                      </span>
                    </div>

                    <button
                      onClick={() => markChallengeComplete(challenge._id)}
                      disabled={completing}
                      className="mt-4 w-full bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {completing ? "Saving..." : "Mark Today Complete"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
