import React from "react";
import {
  LuLayoutDashboard,
  LuPanelTop,
  LuGitBranch,
  LuBot,
  LuCreditCard,
  LuSettings,
  LuBadgeCheck,
  LuX
} from "react-icons/lu";
import { useDarkMode } from "../Context/DarkMode";

const menuItems = [
  { name: "Dashboard", icon: <LuLayoutDashboard /> },
  { name: "Leads", icon: <LuPanelTop /> },
  { name: "Pipeline", icon: <LuGitBranch /> },
  { name: "AI Assistant", icon: <LuBot /> },
  { name: "Billing", icon: <LuCreditCard /> },
  { name: "Settings", icon: <LuSettings /> },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { darkMode } = useDarkMode();

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-[100dvh]
          flex flex-col justify-between
          transition-all duration-300 ease-in-out
          z-40 overflow-hidden

          w-[260px]

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0

          ${sidebarOpen ? "md:w-[260px]" : "md:w-[80px]"}

          ${
            darkMode
              ? "bg-gray-900 text-gray-200 border-gray-700"
              : "bg-[#0F172A] text-slate-200 border-white/10"
          }
          border-r
        `}
      >
        <div className="flex flex-col h-full px-4 py-6 overflow-y-auto scrollbar-hide">

          {/* 🔴 TOP BAR (LOGO + CLOSE BTN) */}
          <div className="flex items-center justify-between pb-6 border-b"
            style={{
              borderColor: darkMode
                ? "rgba(255,255,255,0.05)"
                : "rgba(255,255,255,0.1)",
            }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl shadow-md"
                style={{
                  background: darkMode
                    ? "linear-gradient(to bottom right, #7F00FF, #00BFFF)"
                    : "linear-gradient(to bottom right, #8B5CF6, #3B82F6)",
                }}
              >
                <LuBadgeCheck className="text-white text-xl" />
              </div>

              {sidebarOpen && (
                <div>
                  <h1 className="text-lg font-semibold leading-none">
                    AI CRM
                  </h1>
                  <p className="text-xs text-slate-400">
                    Smart Dashboard
                  </p>
                </div>
              )}
            </div>

            {/* ❌ CLOSE BUTTON (MOBILE ONLY) */}
            <button
              className="md:hidden text-white text-xl p-2 rounded-lg hover:bg-white/10"
              onClick={() => setSidebarOpen(false)}
            >
              <LuX />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 mt-6">
            <ul className="flex flex-col gap-2">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setSidebarOpen(false)} // auto close mobile
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left
                      transition-all duration-200
                      hover:text-cyan-400
                      ${
                        darkMode
                          ? "hover:bg-gray-800"
                          : "hover:bg-white/5"
                      }
                    `}
                  >
                    <span className="text-xl">{item.icon}</span>

                    {sidebarOpen && (
                      <span className="text-sm">{item.name}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          {sidebarOpen && (
            <div
              className="text-xs pt-4 border-t"
              style={{
                borderColor: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.1)",
              }}
            >
              © {new Date().getFullYear()} AI CRM
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;