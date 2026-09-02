import LoginForm from "../components/LoginForm";
import AuthHero from "../components/AuthHero";

const SignIn = () => {
  return (
    <div className="min-h-screen flex">
      <AuthHero />
      <LoginForm />
    </div>
  );
};

export default SignIn;
