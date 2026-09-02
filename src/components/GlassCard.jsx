const GlassCard = ({ children }) => {
  return (
    <div
      className="w-full max-w-md rounded-3xl
      border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-8">
    {children}
    </div>
  );
};

export default GlassCard;