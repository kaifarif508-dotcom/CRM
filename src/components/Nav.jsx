import React, { useState } from "react";
import {
  LuSearch,
  LuBell,
  LuBadgeCheck,
  LuLogOut,
  LuUser,
  LuSettings,
  LuMenu
} from "react-icons/lu";


const Nav = ({ sidebarOpen, setSidebarOpen }) => {
  const [notifications, setNotifications] = useState([
    "New lead added",
    "Proposal sent",
    "Client moved"
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  

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
            className="flex items-center justify-center text-white border md:hidden h-9 w-9 rounded-xl border-white/10 bg-slate-900/70"
            onClick={() => setSidebarOpen(prev => !prev)}
          >
            <LuMenu />
          </button>

          {/* Logo */}
          <div className="flex items-center justify-center shadow-md h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
            <LuBadgeCheck className="text-lg text-white" />
          </div>

          <div className="flex-col hidden sm:flex">
            <h1 className="text-sm font-semibold leading-none text-white sm:text-base">
              AI CRM
            </h1>
            <p className="text-slate-400 text-[10px] sm:text-[11px]">
              Dashboard
            </p>
          </div>
        </div>

        {/* 🔷 CENTER SEARCH */}
        <div className="justify-center flex-1 hidden md:flex">
          <div className="relative w-full max-w-lg">
            <LuSearch className="absolute -translate-y-1/2 left-3 top-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-sm text-white border outline-none rounded-xl border-white/10 bg-slate-900/70 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>
        </div>

        {/* 🔷 RIGHT */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">

          {/* Dark Mode */}
          <button
            
            className="flex items-center justify-center text-white border h-9 w-9 sm:h-10 sm:w-10 rounded-xl border-white/10 bg-slate-900/70 hover:bg-slate-800"
          >
            
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative flex items-center justify-center text-white border h-9 w-9 sm:h-10 sm:w-10 rounded-xl border-white/10 bg-slate-900/70"
            >
              <LuBell />
              {notifications.length > 0 && (
                <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1 animate-pulse"></span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 z-50 w-56 p-2 mt-2 border shadow-lg bg-slate-900 border-white/10 rounded-xl">
                <div className="overflow-y-auto max-h-40">
                  {notifications.map((n, i) => (
                    <div key={i} className="p-2 text-sm rounded hover:bg-slate-800">
                      {n}
                    </div>
                  ))}
                </div>

                {notifications.length > 0 && (
                  <div
                    onClick={clearNotifications}
                    className="mt-2 text-sm text-center text-indigo-400 cursor-pointer"
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
              className="flex items-center gap-2 px-2 py-1 border cursor-pointer rounded-xl border-white/10 bg-slate-900/70"
            >
              <img
                src="https://i.pravatar.cc/100?img=12"
                className="rounded-lg h-7 w-7"
              />
              <span className="hidden text-sm text-white md:block">Kaif</span>
            </div>

            {profileOpen && (
              <div className="absolute right-0 z-50 py-2 mt-2 border shadow-lg w-44 bg-slate-900 border-white/10 rounded-xl">
                <div className="flex gap-2 px-3 py-2 hover:bg-slate-800">
                  <LuUser /> Profile
                </div>
                <div className="flex gap-2 px-3 py-2 hover:bg-slate-800">
                  <LuSettings /> Settings
                </div>
                <div
                  onClick={handleLogout}
                  className="flex gap-2 px-3 py-2 text-red-500 hover:bg-slate-800"
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