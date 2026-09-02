const Leaderboard = () => {
  const leaders = [
    { name: "Sindhuja", streak: 12 },
    { name: "Alex", streak: 10 },
    { name: "Sarah", streak: 8 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        🏆 Leaderboard
      </h2>

      {leaders.map((user, index) => (
        <div
          key={user.name}
          className="flex justify-between py-2 border-b"
        >
          <span>
            #{index + 1} {user.name}
          </span>

          <span>{user.streak} 🔥</span>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;