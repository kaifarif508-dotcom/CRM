import React, { useState } from "react";
import {
  LuSearch,
  LuBell,
  LuMoon,
  LuSun,
  LuBadgeCheck,
  LuLogOut,
  LuUser,
  LuSettings,
  LuMenu
} from "react-icons/lu";
import { useDarkMode } from "../Context/DarkMode";

const Nav = ({ sidebarOpen, setSidebarOpen }) => {
  const [notifications, setNotifications] = useState([
    "New lead added",
    "Proposal sent",
    "Client moved"
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleLogout = () => alert("Logged out!");
  const clearNotifications = () => setNotifications([]);

  return (
    <header
      className={`
        fixed top-0 right-0
        h-[72px]
        border-b border-white/10
        bg-[#1D2939] backdrop-blur-md
        flex items-center
        px-3 sm:px-4 md:px-6
        transition-all duration-300
        z-30

        left-0
        ${sidebarOpen ? "md:left-[260px]" : "md:left-[80px]"}
      `}
    >
      <div className="flex items-center justify-between w-full gap-2 sm:gap-4">

        {/* 🔷 LEFT */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-[120px]">
          
          {/* ✅ Mobile Menu Button */}
          <button
            className="md:hidden h-9 w-9 flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 text-white"
            onClick={() => setSidebarOpen(prev => !prev)}
          >
            <LuMenu />
          </button>

          {/* Logo */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-md">
            <LuBadgeCheck className="text-white text-lg" />
          </div>

          <div className="hidden sm:flex flex-col">
            <h1 className="text-white text-sm sm:text-base font-semibold leading-none">
              AI CRM
            </h1>
            <p className="text-slate-400 text-[10px] sm:text-[11px]">
              Dashboard
            </p>
          </div>
        </div>

        {/* 🔷 CENTER SEARCH */}
        <div className="flex-1 hidden md:flex justify-center">
          <div className="relative w-full max-w-lg">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 rounded-xl border border-white/10 bg-slate-900/70 pl-10 pr-4 text-sm text-white outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>
        </div>

        {/* 🔷 RIGHT */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">

          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 text-white hover:bg-slate-800"
          >
            {darkMode ? <LuSun /> : <LuMoon />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 text-white relative"
            >
              <LuBell />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-white/10 rounded-xl shadow-lg p-2 z-50">
                <div className="max-h-40 overflow-y-auto">
                  {notifications.map((n, i) => (
                    <div key={i} className="p-2 text-sm hover:bg-slate-800 rounded">
                      {n}
                    </div>
                  ))}
                </div>

                {notifications.length > 0 && (
                  <div
                    onClick={clearNotifications}
                    className="text-center text-indigo-400 text-sm mt-2 cursor-pointer"
                  >
                    Clear All
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-2 py-1 rounded-xl border border-white/10 bg-slate-900/70 cursor-pointer"
            >
              <img
                src="https://i.pravatar.cc/100?img=12"
                className="h-7 w-7 rounded-lg"
              />
              <span className="hidden md:block text-sm text-white">Kaif</span>
            </div>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-white/10 rounded-xl shadow-lg py-2 z-50">
                <div className="px-3 py-2 flex gap-2 hover:bg-slate-800">
                  <LuUser /> Profile
                </div>
                <div className="px-3 py-2 flex gap-2 hover:bg-slate-800">
                  <LuSettings /> Settings
                </div>
                <div
                  onClick={handleLogout}
                  className="px-3 py-2 flex gap-2 text-red-500 hover:bg-slate-800"
                >
                  <LuLogOut /> Logout
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Nav;