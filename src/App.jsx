import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import VerifyOtp from "./pages/VerifyOtp";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

import Favourites from "./pages/Favourites";
import ChallengeDetails from "./pages/ChallengeDetails";
import NotFound from "./pages/NotFound";
import Onboarding from './pages/OnBoarding';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import MyChallenges from './pages/MyChallenges';
import BrowseChallenges from './pages/BrowseChallenges';
import ForgotPassword from './pages/ForgotPassword';
import Payment from "./pages/Payment";


function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isNewUser = localStorage.getItem("isNewUser"); // set this on signup


  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={ isLoggedIn ? isNewUser
                ? <Navigate to="/onboarding" />
                : <Navigate to="/browsechallenges" />
                : <Navigate to="/signin" />}/>


        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
         
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/challenges/:id" element={<ChallengeDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-challenges" element={<MyChallenges />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/browsechallenges" element={<BrowseChallenges/>}></Route>
          <Route path="/payment" element={<Payment />} />

        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
