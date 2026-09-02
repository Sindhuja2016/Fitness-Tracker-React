import React, { useState, useRef, useEffect } from "react";
import { Camera, User } from "lucide-react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // read-only, display only
  const [avatar, setAvatar] = useState(null);
  const [theme, setTheme] = useState("light");

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

  const [plan, setPlan] = useState("Free");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        const user = res.data;

        setName(user.name || "");
        setEmail(user.email || "");
        setAvatar(user.profilePicture || null);
        setTheme(user.theme || "light");
        setAge(user.age || "");
        setGender(user.gender || "");
        setHeight(user.height || "");
        setWeight(user.weight || "");
        setGoal(user.fitnessGoal || "");
        setPlan(user.plan || "Free");
      } catch (err) {
        setError("Could not load your profile. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const togglePlan = () => {
    setPlan((prev) => (prev === "Premium" ? "Free" : "Premium"));
  };

  const handleSave = async () => {
    setError("");
    setSuccessMessage("");
    setSaving(true);

    try {
      await api.put("/auth/profile", {
        name,
        profilePicture: avatar,
        theme,
        age: age === "" ? undefined : Number(age),
        gender,
        height: height === "" ? undefined : Number(height),
        weight: weight === "" ? undefined : Number(weight),
        fitnessGoal: goal,
        plan,
      });

      setSuccessMessage("Settings saved successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}

      <div className="bg-white rounded-2xl shadow p-6 space-y-6">
        {/* Profile */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Profile</h2>

          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={36} className="text-gray-400" />
                )}
              </div>

              <button
                type="button"
                onClick={handleAvatarClick}
                className="absolute bottom-0 right-0 bg-orange-500 text-white rounded-full p-1.5 shadow hover:bg-orange-600"
                aria-label="Change profile picture"
              >
                <Camera size={14} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <p className="text-sm text-gray-500">
              Click the camera icon to update your profile picture
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full border rounded-xl p-3"
            />

            <div>
              <input
                type="email"
                value={email}
                disabled
                placeholder="Email"
                className="w-full border rounded-xl p-3 bg-gray-100 text-gray-400 blur-[2px] cursor-not-allowed select-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                Email can't be changed here
              </p>
            </div>
          </div>
        </div>

        {/* Goals & Preferences */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Goals & Preferences</h2>

          <div className="space-y-4">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="w-full border rounded-xl p-3"
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-xl p-3"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Height (cm)"
              className="w-full border rounded-xl p-3"
            />

            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight (kg)"
              className="w-full border rounded-xl p-3"
            />

            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full border rounded-xl p-3"
            >
              <option value="">Select Goal</option>
              <option value="maintain">Maintain Weight</option>
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Weight</option>
            </select>
          </div>
        </div>

        {/* Plan */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Subscription</h2>

          <div className="border rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-500">Current Plan</p>
              <h3 className="text-xl font-bold">
                {plan === "Premium" ? "⭐ Premium" : "Free"}
              </h3>
            </div>

            <button
             onClick={() => navigate("/payment")}
             className="bg-yellow-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-yellow-600"
>
                   ⭐ Upgrade to Premium
              </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-orange-500 text-white py-3 rounded-xl disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
