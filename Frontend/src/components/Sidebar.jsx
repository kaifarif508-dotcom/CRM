import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import api  from "../api/api"
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiUsers,
  FiShield,
  FiUserPlus,
  FiDollarSign,
  FiCheckSquare,
  FiX,
  FiMenu,
} from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user,setUser] = useState(null);
  useEffect(()=>{
async function getUser(){
try{
const response = await api.get("/auth/me")
setUser(response.data.user)
}
catch(error){
  console.log(error)
}
}
getUser()
  },[])

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiHome,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: FiUsers,
    },
    {
      name: "Leads",
      path: "/leads",
      icon: FiUserPlus,
    },
    {
      name: "Deals",
      path: "/deals",
      icon: FiDollarSign,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: FiCheckSquare,
    },
  ];
  const adminItems =[
    {
      name : "Admin Panel",
      path : "/admin",
      icon : FiShield

    },
  ]

  return (
    <>
      {/* ================= MOBILE MENU BUTTON ================= */}

      <motion.button
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.92 }}
        className="
          fixed
          top-4
          left-4
          z-40

          lg:hidden

          w-11
          h-11

          flex
          items-center
          justify-center

          rounded-xl

          bg-white
          text-gray-700

          border
          border-gray-200

          shadow-md

          hover:bg-blue-50
          hover:text-blue-600
          hover:border-blue-200

          transition-all
        "
      >
        <FiMenu size={21} />
      </motion.button>

      {/* ================= MOBILE OVERLAY ================= */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="
              fixed
              inset-0
              z-40

              bg-black/50
              backdrop-blur-[2px]

              lg:hidden
            "
          />
        )}
      </AnimatePresence>

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50

          w-64
          h-screen

          bg-gray-950
          text-white

          border-r
          border-gray-800

          shadow-2xl

          transform
          transition-transform
          duration-300
          ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          lg:sticky
          lg:top-0
          lg:z-30
          lg:translate-x-0
        `}
      >
        {/* ================= SIDEBAR CONTENT ================= */}

        <div className="h-full flex flex-col p-5">

          {/* ================= LOGO ================= */}

          <div className="flex items-start justify-between mb-9">

            <div className="flex items-center gap-3">

              {/* Logo Icon */}

              <div
                className="
                  w-10
                  h-10
                  shrink-0

                  rounded-xl

                  bg-blue-600

                  flex
                  items-center
                  justify-center

                  shadow-lg
                  shadow-blue-600/20
                "
              >
                <span className="text-lg font-bold">
                  C
                </span>
              </div>

              {/* Logo Text */}

              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  CRM
                </h1>

                <p className="text-xs text-gray-400 mt-0.5">
                  Management System
                </p>
              </div>

            </div>

            {/* ================= MOBILE CLOSE ================= */}

            <motion.button
              onClick={() => setIsOpen(false)}
              whileTap={{ scale: 0.9 }}
              className="
                lg:hidden

                p-2

                rounded-lg

                text-gray-400

                hover:text-white
                hover:bg-gray-800

                transition-all
              "
            >
              <FiX size={20} />
            </motion.button>

          </div>

          {/* ================= MENU LABEL ================= */}

          <p
            className="
              px-3
              mb-3

              text-[11px]
              uppercase
              tracking-wider

              font-semibold

              text-gray-500
            "
          >
            Main Menu
          </p>

          {/* ================= NAVIGATION ================= */}

    <nav className="space-y-2">

  {/* Normal Menu */}
  {navItems.map((item) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `
          group relative
          flex items-center gap-3
          px-4 py-3
          rounded-xl
          text-sm font-medium
          transition-all duration-200

          ${
            isActive
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "text-gray-400 hover:bg-gray-900 hover:text-white"
          }
          `
        }
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <motion.span
                layoutId="activeSidebar"
                className="
                  absolute
                  left-0
                  top-1/2
                  -translate-y-1/2
                  w-1
                  h-7
                  rounded-r-full
                  bg-white
                "
              />
            )}

            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.15 }}
              className="
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <Icon size={19} />
            </motion.div>

            <span>{item.name}</span>
          </>
        )}
      </NavLink>
    );
  })}

  {/* Admin Menu */}
  {user?.role === "admin" &&
    adminItems.map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `
            group relative
            flex items-center gap-3
            px-4 py-3
            rounded-xl
            text-sm font-medium
            transition-all duration-200

            ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "text-gray-400 hover:bg-gray-900 hover:text-white"
            }
            `
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  layoutId="activeAdmin"
                  className="
                    absolute
                    left-0
                    top-1/2
                    -translate-y-1/2
                    w-1
                    h-7
                    rounded-r-full
                    bg-white
                  "
                />
              )}

              <Icon size={19} />

              <span>{item.name}</span>
            </>
          )}
        </NavLink>
      );
    })}
</nav>

          {/* ================= BOTTOM INFO ================= */}

          <div className="mt-auto">
            <div
              className="
                p-4
                rounded-2xl
                bg-gray-900
                border
                border-gray-800
              "
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-blue-600/10
                    text-blue-500
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FiHome size={16} />
                </div>

                <p className="text-sm font-semibold text-white">
                  CRM Dashboard
                </p>
              </div>

              <p
                className="
                  text-xs
                  text-gray-500
                  leading-relaxed
                "
              >
                Manage your customers, leads, deals and tasks.
              </p>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;