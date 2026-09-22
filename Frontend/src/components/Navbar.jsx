
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiBell,
  FiChevronDown,
  FiX,
  FiCheckCircle,
  FiUser,
  FiMail,
  FiShield,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import api from "../api/api.js";

const Navbar = () => {
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  // ================= GET LOGGED-IN USER =================
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("/auth/me");

        console.log("Logged in user:", response.data);

        setUser(response.data.user);
      } catch (error) {
        console.log("User fetch error:", error);

        // Agar user authenticated nahi hai
        if (error.response?.status === 401) {
          navigate("/");
        }
      } finally {
        setLoadingUser(false);
      }
    };

    getUser();
  }, [navigate]);

  // ================= LOGOUT =================
  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await api.post("/auth/logout");

      setUser(null);
      setShowProfile(false);

      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);

      alert(
        error.response?.data?.message ||
          "Logout failed"
      );
    } finally {
      setLoggingOut(false);
    }
  };

  // ================= USER INITIAL =================
  const getInitial = () => {
    if (!user?.name) return "U";

    return user.name.charAt(0).toUpperCase();
  };

  return (
    <header
      className="
        sticky top-0 z-30
        h-16
        bg-[#0b1120]/95
        backdrop-blur-xl
        border-b border-gray-800
        px-4 sm:px-6
        flex items-center justify-between
        shadow-lg shadow-black/10
      "
    >

      {/* ================= LEFT ================= */}
      <div className="flex items-center gap-3 min-w-0">

        {/* Sidebar Menu Space */}
        <div className="lg:hidden w-10 shrink-0" />

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="min-w-0"
        >

          <h2 className="text-lg sm:text-xl font-bold text-white truncate">
            Dashboard
          </h2>

          <p className="hidden sm:block text-xs text-gray-500 mt-0.5">
            Welcome back,{" "}
            <span className="text-blue-400">
              {loadingUser
                ? "..."
                : user?.name || "User"}
            </span>
          </p>

        </motion.div>

      </div>


      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-1 sm:gap-3">

        {/* ================= DESKTOP SEARCH ================= */}
        <div className="hidden md:block relative">

          <FiSearch
            size={17}
            className="
              absolute left-3 top-1/2
              -translate-y-1/2
              text-gray-500
              pointer-events-none
            "
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-52 lg:w-64
              pl-10 pr-4 py-2.5
              bg-[#070c18]
              border border-gray-800
              rounded-xl
              text-sm text-gray-200
              placeholder-gray-600
              outline-none
              transition-all duration-300
              hover:border-gray-700
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-500/10
              focus:w-60 lg:focus:w-72
            "
          />

        </div>


        {/* ================= MOBILE SEARCH ================= */}
        <motion.button
          whileHover={{
            scale: 1.08,
            rotate: showSearch ? 0 : 3,
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setShowSearch(!showSearch);
            setShowNotifications(false);
            setShowProfile(false);
          }}
          className="
            md:hidden
            w-10 h-10
            flex items-center justify-center
            rounded-xl
            text-gray-400
            hover:text-blue-400
            hover:bg-blue-500/10
            transition-colors
          "
          aria-label="Search"
        >

          <AnimatePresence mode="wait">

            <motion.div
              key={showSearch ? "close" : "search"}
              initial={{
                opacity: 0,
                rotate: -30,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotate: 30,
                scale: 0.7,
              }}
              transition={{ duration: 0.15 }}
            >

              {showSearch ? (
                <FiX size={20} />
              ) : (
                <FiSearch size={20} />
              )}

            </motion.div>

          </AnimatePresence>

        </motion.button>


        {/* ================= NOTIFICATION ================= */}
        <div className="relative">

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="
              relative
              w-10 h-10
              flex items-center justify-center
              rounded-xl
              text-gray-400
              hover:text-blue-400
              hover:bg-blue-500/10
              transition-colors
            "
            aria-label="Notifications"
          >

            <motion.div
              animate={
                showNotifications
                  ? { rotate: 0 }
                  : {
                      rotate: [0, -8, 8, -5, 5, 0],
                    }
              }
              transition={{
                duration: 0.5,
                repeat: showNotifications ? 0 : Infinity,
                repeatDelay: 6,
              }}
            >
              <FiBell size={20} />
            </motion.div>


            {/* Notification Dot */}
            <motion.span
              animate={{
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="
                absolute top-2 right-2
                w-2 h-2
                rounded-full
                bg-red-500
                border-2 border-[#0b1120]
              "
            />

          </motion.button>


          {/* ================= NOTIFICATION DROPDOWN ================= */}
          <AnimatePresence>

            {showNotifications && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="
                  absolute
                  right-0
                  top-12
                  w-72
                  max-w-[calc(100vw-1.5rem)]
                  bg-[#0b1120]
                  border border-gray-800
                  rounded-2xl
                  shadow-2xl shadow-black/30
                  p-4
                  overflow-hidden
                "
              >

                {/* Header */}
                <div className="flex items-center justify-between mb-3">

                  <div>

                    <h3 className="font-bold text-white">
                      Notifications
                    </h3>

                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Recent activity
                    </p>

                  </div>

                  <span
                    className="
                      text-xs
                      text-blue-400
                      font-semibold
                      bg-blue-500/10
                      border border-blue-500/20
                      px-2.5 py-1
                      rounded-full
                    "
                  >
                    3 New
                  </span>

                </div>


                {/* Notification 1 */}
                <div
                  className="
                    p-3
                    rounded-xl
                    bg-blue-500/10
                    border border-blue-500/10
                    hover:bg-blue-500/15
                    cursor-pointer
                    transition-colors
                    mb-2
                  "
                >

                  <div className="flex items-start gap-2">

                    <FiCheckCircle
                      className="text-blue-400 mt-0.5 shrink-0"
                      size={16}
                    />

                    <div>

                      <p className="text-sm font-semibold text-gray-200">
                        New lead added
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Just now
                      </p>

                    </div>

                  </div>

                </div>


                {/* Notification 2 */}
                <div
                  className="
                    p-3
                    rounded-xl
                    bg-gray-900
                    border border-gray-800
                    hover:bg-gray-800
                    cursor-pointer
                    transition-colors
                  "
                >

                  <div className="flex items-start gap-2">

                    <FiCheckCircle
                      className="text-green-400 mt-0.5 shrink-0"
                      size={16}
                    />

                    <div>

                      <p className="text-sm font-semibold text-gray-200">
                        Deal updated
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        10 minutes ago
                      </p>

                    </div>

                  </div>

                </div>


                {/* Footer */}
                <button
                  className="
                    w-full
                    mt-3
                    pt-3
                    border-t border-gray-800
                    text-xs
                    font-semibold
                    text-blue-400
                    hover:text-yellow-400
                    transition-colors
                  "
                >
                  View all notifications
                </button>

              </motion.div>
            )}

          </AnimatePresence>

        </div>


        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-gray-800" />


        {/* ================= PROFILE ================= */}
        <div className="relative">

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="
              flex items-center
              gap-2 sm:gap-3
              cursor-pointer
              rounded-xl
              px-1.5 sm:px-2
              py-1.5
              hover:bg-white/5
              transition-colors
            "
          >

            {/* ================= AVATAR ================= */}
            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 3,
              }}
              className="
                w-9 h-9 sm:w-10 sm:h-10
                rounded-xl
                bg-gradient-to-br
                from-blue-600
                to-blue-800
                text-white
                flex items-center justify-center
                font-bold
                shadow-md
                shadow-blue-600/20
                border border-blue-500/20
              "
            >
              {loadingUser ? "..." : getInitial()}
            </motion.div>


            {/* ================= USER INFO ================= */}
            <div className="hidden sm:block text-left max-w-[130px]">

              <p className="text-sm font-semibold text-white truncate">

                {loadingUser
                  ? "Loading..."
                  : user?.name || "User"}

              </p>

              <p className="text-xs text-gray-500 truncate">

                {loadingUser
                  ? "..."
                  : user?.role || "User"}

              </p>

            </div>


            <motion.div
              animate={{
                rotate: showProfile ? 180 : 0,
              }}
              transition={{ duration: 0.2 }}
              className="hidden sm:block"
            >

              <FiChevronDown
                className="text-gray-500"
                size={16}
              />

            </motion.div>

          </motion.button>


          {/* ================= PROFILE DROPDOWN ================= */}
          <AnimatePresence>

            {showProfile && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.96,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  absolute
                  right-0
                  top-12
                  w-72
                  max-w-[calc(100vw-1.5rem)]
                  bg-[#0b1120]
                  border border-gray-800
                  rounded-2xl
                  shadow-2xl shadow-black/30
                  p-3
                  overflow-hidden
                "
              >

                {/* ================= USER HEADER ================= */}
                <div
                  className="
                    p-3
                    rounded-xl
                    bg-[#070c18]
                    border border-gray-800
                    mb-2
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-12 h-12
                        rounded-xl
                        bg-gradient-to-br
                        from-blue-600
                        to-blue-800
                        flex items-center
                        justify-center
                        text-white
                        font-bold
                        text-lg
                        shrink-0
                      "
                    >
                      {getInitial()}
                    </div>


                    <div className="min-w-0">

                      <h3 className="text-sm font-bold text-white truncate">
                        {user?.name || "User"}
                      </h3>

                      <p className="text-xs text-gray-500 truncate">
                        @{user?.username || "username"}
                      </p>

                    </div>

                  </div>


                  {/* ================= EMAIL ================= */}
                  <div className="flex items-center gap-2 mt-3">

                    <FiMail
                      size={14}
                      className="text-blue-400 shrink-0"
                    />

                    <span className="text-xs text-gray-400 truncate">
                      {user?.email || "No email"}
                    </span>

                  </div>


                  {/* ================= ROLE ================= */}
                  <div className="flex items-center gap-2 mt-2">

                    <FiShield
                      size={14}
                      className="text-yellow-400 shrink-0"
                    />

                    <span className="text-xs text-gray-400 capitalize">
                      {user?.role || "User"}
                    </span>

                  </div>

                </div>


                {/* ================= PROFILE BUTTON ================= */}
                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/profile")
                  }}
                  className="
                    w-full
                    flex items-center gap-3
                    px-3 py-2.5
                    rounded-xl
                    text-sm
                    text-gray-300
                    hover:bg-blue-500/10
                    hover:text-blue-400
                    transition-colors
                  "
                >

                  <FiUser size={17} />

                  <span>
                    Profile
                  </span>

                </button>


                {/* ================= SETTINGS ================= */}
                <button
                  onClick={() => {
                    setShowProfile(false);
                  }}
                  className="
                    w-full
                    flex items-center gap-3
                    px-3 py-2.5
                    rounded-xl
                    text-sm
                    text-gray-300
                    hover:bg-blue-500/10
                    hover:text-blue-400
                    transition-colors
                  "
                >

                  <FiSettings size={17} />

                  <span>
                    Settings
                  </span>

                </button>


                <div className="my-2 border-t border-gray-800" />


                {/* ================= LOGOUT ================= */}
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="
                    w-full
                    flex items-center gap-3
                    px-3 py-2.5
                    rounded-xl
                    text-sm
                    text-red-400
                    hover:bg-red-500/10
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition-colors
                  "
                >

                  <FiLogOut size={17} />

                  <span>
                    {loggingOut
                      ? "Logging out..."
                      : "Logout"}
                  </span>

                </button>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>


      {/* ================= MOBILE SEARCH PANEL ================= */}
      <AnimatePresence>

        {showSearch && (
          <motion.div
            initial={{
              opacity: 0,
              y: -12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              absolute
              top-16
              left-0
              right-0
              md:hidden
              bg-[#0b1120]/95
              backdrop-blur-xl
              border-b border-gray-800
              p-4
              shadow-lg
            "
          >

            <div className="relative">

              <FiSearch
                size={18}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />

              <input
                autoFocus
                type="text"
                placeholder="Search customers, leads, deals..."
                className="
                  w-full
                  pl-10 pr-4
                  py-3
                  bg-[#070c18]
                  border border-gray-800
                  rounded-xl
                  text-sm
                  text-gray-200
                  placeholder-gray-600
                  outline-none
                  transition-all duration-300
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />

            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </header>
  );
};

export default Navbar;

