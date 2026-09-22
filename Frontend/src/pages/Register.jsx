
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";
import api from "../api/api";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);

      alert("Account created successfully!");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-8 relative overflow-hidden">

      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-400/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center relative z-10">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block px-8"
        >

          <div className="flex items-center gap-3 mb-8">

            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <FiUsers size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                CRM<span className="text-yellow-400">Pro</span>
              </h1>

              <p className="text-xs text-gray-500">
                Customer Relationship Management
              </p>
            </div>

          </div>

          <h2 className="text-5xl font-bold leading-tight mb-5">
            Start managing your
            <span className="block text-blue-500">
              business today.
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-lg leading-relaxed mb-8">
            Create your account and manage your entire business from one
            powerful CRM platform.
          </p>

          <div className="space-y-4">

            {[
              "Simple customer management",
              "Powerful lead tracking",
              "Deal management",
              "Organized task management",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-gray-300"
              >
                <FiCheckCircle className="text-green-400" />
                {item}
              </div>
            ))}

          </div>

        </motion.div>

        {/* REGISTER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >

          <div className="bg-[#0b1120] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl">

            {/* MOBILE LOGO */}
            <div className="lg:hidden flex justify-center items-center gap-3 mb-7">

              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
                <FiUsers size={22} />
              </div>

              <h1 className="text-2xl font-bold">
                CRM<span className="text-yellow-400">Pro</span>
              </h1>

            </div>

            {/* HEADING */}
            <div className="mb-7">

              <h2 className="text-3xl font-bold mb-2">
                Create account 🚀
              </h2>

              <p className="text-gray-400">
                Join CRMPro and manage your business smarter.
              </p>

            </div>

            <form onSubmit={handleRegister}>

              {/* NAME */}
              <div className="mb-4">

                <label className="block text-sm text-gray-300 mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-[#070c18] border border-gray-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-600 outline-none focus:border-blue-500 transition"
                  />

                </div>

              </div>

              {/* USERNAME */}
              <div className="mb-4">

                <label className="block text-sm text-gray-300 mb-2">
                  Username
                </label>

                <div className="relative">

                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="john123"
                    className="w-full bg-[#070c18] border border-gray-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-600 outline-none focus:border-blue-500 transition"
                  />

                </div>

              </div>

              {/* EMAIL */}
              <div className="mb-4">

                <label className="block text-sm text-gray-300 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-[#070c18] border border-gray-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-600 outline-none focus:border-blue-500 transition"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="mb-4">

                <label className="block text-sm text-gray-300 mb-2">
                  Password
                </label>

                <div className="relative">

                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full bg-[#070c18] border border-gray-800 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder-gray-600 outline-none focus:border-blue-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>

                </div>

              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-6">

                <label className="block text-sm text-gray-300 mb-2">
                  Confirm Password
                </label>

                <div className="relative">

                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full bg-[#070c18] border border-gray-800 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder-gray-600 outline-none focus:border-blue-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>

                </div>

              </div>

              {/* TERMS */}
              <div className="flex items-start gap-2 mb-6">

                <input
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 accent-blue-600"
                />

                <p className="text-xs text-gray-500 leading-relaxed">
                  I agree to the{" "}
                  <span className="text-blue-400 cursor-pointer">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-400 cursor-pointer">
                    Privacy Policy
                  </span>
                </p>

              </div>

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                Create Account
                <FiArrowRight />
              </button>

            </form>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 my-6">

              <div className="h-px bg-gray-800 flex-1" />

              <span className="text-xs text-gray-600">
                OR
              </span>

              <div className="h-px bg-gray-800 flex-1" />

            </div>

            {/* LOGIN */}
            <p className="text-center text-sm text-gray-400">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-blue-400 hover:text-yellow-400 font-semibold transition"
              >
                Login
              </Link>

            </p>

          </div>

          <p className="text-center text-xs text-gray-600 mt-5">
            © 2026 CRMPro. All rights reserved.
          </p>

        </motion.div>

      </div>

    </div>
  );
};

export default Register;

