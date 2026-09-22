
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/api.js";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      alert("Please enter username/email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        identifier,
        password,
      });

      console.log(response.data);

      alert("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-8 relative overflow-hidden">

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />

      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-400/10 blur-[120px] rounded-full" />

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
            Manage your business
            <span className="block text-blue-500">
              smarter & faster.
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-lg leading-relaxed mb-8">
            Manage customers, leads, deals and tasks from one powerful CRM
            dashboard.
          </p>

          <div className="space-y-4">

            {[
              "Manage customers easily",
              "Track leads and deals",
              "Stay on top of your tasks",
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

        {/* LOGIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >

          <div className="bg-[#0b1120] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl">

            {/* MOBILE LOGO */}
            <div className="lg:hidden flex justify-center items-center gap-3 mb-8">

              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
                <FiUsers size={22} />
              </div>

              <h1 className="text-2xl font-bold">
                CRM<span className="text-yellow-400">Pro</span>
              </h1>

            </div>

            {/* HEADING */}
            <div className="mb-8">

              <h2 className="text-3xl font-bold mb-2">
                Welcome back 👋
              </h2>

              <p className="text-gray-400">
                Login to continue to your CRM dashboard.
              </p>

            </div>

            {/* LOGIN FORM */}
            <form onSubmit={handleLogin}>

              {/* EMAIL / USERNAME */}
              <div className="mb-5">

                <label className="block text-sm text-gray-300 mb-2">
                  Email or Username
                </label>

                <div className="relative">

                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) =>
                      setIdentifier(e.target.value)
                    }
                    placeholder="you@example.com"
                    className="w-full bg-[#070c18] border border-gray-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-600 outline-none focus:border-blue-500 transition"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="mb-3">

                <div className="flex justify-between mb-2">

                  <label className="text-sm text-gray-300">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm text-blue-400 hover:text-yellow-400 transition"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    className="w-full bg-[#070c18] border border-gray-800 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder-gray-600 outline-none focus:border-blue-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? (
                      <FiEyeOff />
                    ) : (
                      <FiEye />
                    )}
                  </button>

                </div>

              </div>

              {/* REMEMBER */}
              <div className="flex items-center gap-2 mt-5 mb-7">

                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600"
                />

                <span className="text-sm text-gray-400">
                  Remember me
                </span>

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] transition rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                {loading ? "Logging in..." : "Login"}

                {!loading && <FiArrowRight />}
              </button>

            </form>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 my-7">

              <div className="h-px bg-gray-800 flex-1" />

              <span className="text-xs text-gray-600">
                OR
              </span>

              <div className="h-px bg-gray-800 flex-1" />

            </div>

            {/* REGISTER */}
            <p className="text-center text-sm text-gray-400">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-blue-400 hover:text-yellow-400 font-semibold transition"
              >
                Create account
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

export default Login;
