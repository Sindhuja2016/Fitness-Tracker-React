import React, { useEffect, useState } from "react";
import { User, Settings, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

const Profile = () => {
const navigate = useNavigate();

const [user, setUser] = useState({});
const [joinedChallenges, setJoinedChallenges] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchProfileData = async () => {
try {
const profileResponse = await api.get("/auth/profile");
setUser(profileResponse.data);


    const challengesResponse = await api.get(
      "/challenges/my-challenges"
    );

    setJoinedChallenges(challengesResponse.data);
  } catch (error) {
    console.error("Error loading profile:", error);
  } finally {
    setLoading(false);
  }
};

fetchProfileData();


}, []);

if (loading) {
return ( <div className="text-center p-10">
Loading profile... </div>
);
}

const activeChallenges = joinedChallenges.filter(
(item) => !item.completed
);

const completedChallenges = joinedChallenges.filter(
(item) => item.completed
);

// Overall completed days
const totalCompletedDays = joinedChallenges.reduce(
(sum, item) =>
sum + (item.completedDates?.length || 0),
0
);

// Total days from all challenges
const totalDays = joinedChallenges.reduce(
(sum, item) =>
sum + (item.challenge?.duration || 0),
0
);

const overallProgress =
totalDays > 0
? Math.round(
(totalCompletedDays / totalDays) * 100
)
: 0;

// Calculate longest/current streak for each challenge
const calculateStreak = (completedDates = []) => {
if (!completedDates.length) return 0;


const dates = [...completedDates]
  .map((date) => new Date(date))
  .sort((a, b) => b - a);

let streak = 1;

for (let i = 0; i < dates.length - 1; i++) {
  const current = new Date(dates[i]);
  const previous = new Date(dates[i + 1]);

  const difference =
    Math.round(
      (current - previous) /
        (1000 * 60 * 60 * 24)
    );

  if (difference === 1) {
    streak++;
  } else {
    break;
  }
}

return streak;


};

// Highest streak across challenges
const currentStreak = Math.max(
0,
...joinedChallenges.map((item) =>
calculateStreak(item.completedDates)
)
);

const points = totalCompletedDays * 10;

const recentActivities = joinedChallenges
.flatMap((item) =>
(item.completedDates || []).map((date) => ({
date,
challengeTitle:
item.challenge?.title || "Challenge",
}))
)
.sort(
(a, b) =>
new Date(b.date) - new Date(a.date)
)
.slice(0, 5);

const memberSince = user.createdAt
? new Date(user.createdAt).toLocaleDateString(
"en-US",
{
month: "long",
year: "numeric",
}
)
: "N/A";

const handleLogout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");
localStorage.removeItem("isPremium");


navigate("/signin");


};

return ( <div className="max-w-5xl mx-auto p-6">

```
  {/* Profile Header */}
  <div className="bg-white rounded-2xl shadow-sm border p-8">
    <div className="flex items-center justify-between gap-6">

      <div className="flex items-center gap-6">

        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <User size={40} />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            {user?.name}
          </h2>

          <p className="text-gray-500">
            {user?.email}
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Member Since {memberSince}
          </p>

          <div className="mt-2">
            {user?.isPremium ? (
              <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                <Crown size={16} />
                Premium Member
              </span>
            ) : (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                Free Member
              </span>
            )}
          </div>

        </div>

      </div>

      {!user?.isPremium && (
        <button
          onClick={() => navigate("/payment")}
          className="bg-yellow-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-yellow-600"
        >
          ⭐ Upgrade to Premium
        </button>
      )}

    </div>
  </div>


  {/* Stats */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

    <div className="bg-white border rounded-xl p-6">
      <p className="text-gray-500">
        Active Challenges
      </p>
      <h2 className="text-3xl font-bold mt-2">
        {activeChallenges.length}
      </h2>
    </div>

    <div className="bg-white border rounded-xl p-6">
      <p className="text-gray-500">
        Current Streak
      </p>
      <h2 className="text-3xl font-bold mt-2">
        {currentStreak} 🔥
      </h2>
    </div>

    <div className="bg-white border rounded-xl p-6">
      <p className="text-gray-500">
        Completed
      </p>
      <h2 className="text-3xl font-bold mt-2">
        {completedChallenges.length}
      </h2>
    </div>

    <div className="bg-white border rounded-xl p-6">
      <p className="text-gray-500">
        Points
      </p>
      <h2 className="text-3xl font-bold mt-2">
        {points}
      </h2>
    </div>

  </div>


  {/* Overall Progress */}
  <div className="bg-white border rounded-2xl p-6 mt-6">

    <h3 className="text-xl font-semibold mb-4">
      Overall Progress
    </h3>

    <div className="flex justify-between mb-2">

      <span>
        {totalCompletedDays} / {totalDays} Days Completed
      </span>

      <span>{overallProgress}%</span>

    </div>

    <div className="w-full bg-gray-200 h-3 rounded-full">

      <div
        className="bg-orange-500 h-3 rounded-full transition-all duration-500"
        style={{
          width: `${Math.min(overallProgress, 100)}%`,
        }}
      />

    </div>

  </div>


  {/* Individual Challenge Progress */}
  <div className="mt-6 space-y-4">

    <h3 className="text-xl font-semibold">
      Challenge Progress
    </h3>

    {joinedChallenges.length === 0 ? (

      <div className="bg-white border rounded-xl p-6 text-gray-500">
        You haven't joined any challenges yet.
      </div>

    ) : (

      joinedChallenges.map((item) => {

        const challenge = item.challenge;

        const totalChallengeDays =
          parseInt(challenge?.duration) || 0;

        const completedDays =
          item.completedDates?.length || 0;

        const progress =
          totalChallengeDays > 0
            ? Math.round(
                (completedDays /
                  totalChallengeDays) *
                  100
              )
            : 0;

        const challengeStreak =
          calculateStreak(
            item.completedDates
          );

        return (

          <div
            key={item._id}
            className="bg-white border rounded-xl p-5"
          >

            <div className="flex justify-between mb-3">

              <div>
                <h4 className="font-semibold text-lg">
                  {challenge?.title}
                </h4>

                <p className="text-sm text-gray-500">
                  🔥 Streak: {challengeStreak} days
                </p>
              </div>

              <span className="font-semibold">
                {progress}%
              </span>

            </div>

            <p className="text-sm text-gray-500 mb-2">
              {completedDays} / {totalChallengeDays} Days Completed
            </p>

            <div className="w-full bg-gray-200 h-3 rounded-full">

              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                }}
              />

            </div>

          </div>

        );
      })

    )}

  </div>


  {/* Recent Activity */}
  <div className="bg-white border rounded-2xl p-6 mt-6">

    <h3 className="text-xl font-semibold mb-4">
      Recent Activity
    </h3>

    <div className="space-y-4">

      {recentActivities.length === 0 ? (

        <p className="text-gray-500">
          No recent activity yet.
        </p>

      ) : (

        recentActivities.map(
          (activity, index) => (

            <div
              key={index}
              className="border-b pb-3"
            >
              ✅ {activity.challengeTitle} completed on{" "}
              {new Date(
                activity.date
              ).toLocaleDateString()}
            </div>

          )
        )

      )}

    </div>

  </div>


  {/* Account */}
  <div className="bg-white rounded-2xl shadow p-6 mt-8">

    <h2 className="text-xl font-bold mb-4">
      Account
    </h2>

    <div className="space-y-3">

      <button
        onClick={() => navigate("/settings")}
        className="w-full flex items-center gap-3 border rounded-xl p-4 hover:bg-gray-50"
      >
        <Settings size={18} />
        Settings
      </button>

      <button
        onClick={() =>
          navigate("/my-challenges")
        }
        className="w-full border rounded-xl p-4 hover:bg-gray-50 text-left"
      >
        My Challenges
      </button>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white rounded-xl py-3"
      >
        Logout
      </button>

    </div>

  </div>

</div>


);
};

export default Profile;
