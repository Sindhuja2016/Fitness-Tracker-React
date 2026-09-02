import {Flame,Trophy,Target,Users,Dumbbell} from "lucide-react";

const AuthHero = () => {
  return (
  
    <div className="hidden md:flex lg:w-5/12 bg-gray/100 text-white px-6 py-16">

      <div className="max-w-md  flex flex-col justify-center h-full">

      <Dumbbell className="text-orange-500" /><span>FitChallenge</span>
      
      <h1 className="text-4xl font-bold leading-tight mb-6">
            Fitness Challenge Tracker 
      </h1>
     <div className="mt-8 border-l-4 border-orange-500 pl-4 mb-5">
      <p className="text-xl text-orange-100 mb-10">
        Track habits. Complete challenges.
        Become stronger every day.
      </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">

        <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-4">
          <Users />
          <h3 className="font-bold mt-2">
            10,000+
          </h3>
          <p>Active Users</p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-4">
          <Flame />
          <h3 className="font-bold mt-2">
            500+
          </h3>
          <p>Daily Streaks</p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-4">
          <Trophy />
          <h3 className="font-bold mt-2">
            50+
          </h3>
          <p>Challenges</p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-4">
          <Target />
          <h3 className="font-bold mt-2">
            85%
          </h3>
          <p>Goal Success</p>
        </div>

      </div>

      <blockquote className="mt-5 text-xl italic mb-5">
        "Discipline is choosing between what you want now
        and what you want most."
      </blockquote>
    </div>
    </div>
     
  );
};

export default AuthHero;