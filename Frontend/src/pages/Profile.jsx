
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiShield,
  FiEdit3,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= GET USER =================
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("/auth/me");

        setUser(response.data.user);
      } catch (error) {
        console.log("Profile error:", error);

        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigate]);

  // ================= INITIAL =================
  const getInitial = () => {
    if (!user?.name) return "U";

    return user.name.charAt(0).toUpperCase();
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#070c18] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto" />

          <p className="text-gray-500 text-sm mt-4">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#070c18] p-4 sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            My Profile
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your account information
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="
            flex items-center justify-center gap-2
            px-4 py-2.5
            rounded-xl
            bg-gray-900
            border border-gray-800
            text-sm font-medium text-gray-300
            hover:border-blue-500/40
            hover:text-blue-400
            transition-all
          "
        >
          <FiArrowLeft size={17} />
          Dashboard
        </button>
      </motion.div>

      {/* ================= PROFILE CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          max-w-4xl
          mx-auto
          bg-[#0b1120]
          border border-gray-800
          rounded-2xl
          overflow-hidden
          shadow-2xl shadow-black/20
        "
      >

        {/* ================= TOP BANNER ================= */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-900/40 via-blue-600/20 to-yellow-500/10 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b1120]" />
        </div>

        {/* ================= USER HEADER ================= */}
        <div className="px-5 sm:px-8 pb-7">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-14 relative">

            {/* AVATAR + NAME */}
            <div className="flex items-end gap-4">

              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotate: 3,
                }}
                className="
                  w-24 h-24
                  sm:w-28 sm:h-28
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-600
                  to-blue-900
                  border-4
                  border-[#0b1120]
                  shadow-xl
                  flex items-center
                  justify-center
                  text-white
                  text-4xl
                  font-bold
                  shrink-0
                "
              >
                {getInitial()}
              </motion.div>

              <div className="pb-1 min-w-0">

                <h2 className="text-xl sm:text-2xl font-bold text-white truncate">
                  {user?.name || "User"}
                </h2>

                <p className="text-sm text-gray-500 truncate">
                  @{user?.username || "username"}
                </p>

              </div>

            </div>

            {/* EDIT BUTTON */}
            <button
              className="
                flex items-center justify-center gap-2
                px-4 py-2.5
                rounded-xl
                bg-blue-600
                hover:bg-blue-500
                text-white
                text-sm
                font-semibold
                shadow-lg shadow-blue-600/20
                transition-all
              "
            >
              <FiEdit3 size={16} />
              Edit Profile
            </button>

          </div>

          {/* ================= INFORMATION ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

            {/* NAME */}
            <div
              className="
                p-4
                rounded-xl
                bg-[#070c18]
                border border-gray-800
                hover:border-blue-500/30
                transition-colors
              "
            >
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <FiUser size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Full Name
                  </p>

                  <p className="text-sm font-semibold text-gray-200 mt-1">
                    {user?.name || "Not available"}
                  </p>
                </div>

              </div>
            </div>

            {/* EMAIL */}
            <div
              className="
                p-4
                rounded-xl
                bg-[#070c18]
                border border-gray-800
                hover:border-blue-500/30
                transition-colors
              "
            >
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center">
                  <FiMail size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">
                    Email Address
                  </p>

                  <p className="text-sm font-semibold text-gray-200 mt-1 truncate">
                    {user?.email || "Not available"}
                  </p>
                </div>

              </div>
            </div>

            {/* USERNAME */}
            <div
              className="
                p-4
                rounded-xl
                bg-[#070c18]
                border border-gray-800
                hover:border-blue-500/30
                transition-colors
              "
            >
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
                  <FiUser size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Username
                  </p>

                  <p className="text-sm font-semibold text-gray-200 mt-1">
                    @{user?.username || "Not available"}
                  </p>
                </div>

              </div>
            </div>

            {/* ROLE */}
            <div
              className="
                p-4
                rounded-xl
                bg-[#070c18]
                border border-gray-800
                hover:border-blue-500/30
                transition-colors
              "
            >
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <FiShield size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Account Role
                    </p>

                    <p className="text-sm font-semibold text-gray-200 mt-1 capitalize">
                      {user?.role || "User"}
                    </p>
                  </div>

                </div>
              </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default Profile;
