import { Outlet } from "react-router-dom";
import bgImage from "../assets/fitness-bg.jpg";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">

      <div
        className="absolute inset-0 animate-[zoom_20s_ease-in-out_infinite_alternate]"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <Outlet />
      </div>

    </div>
  );
};

export default AuthLayout;