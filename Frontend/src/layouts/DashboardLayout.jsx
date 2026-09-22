
import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          className="
            flex-1
            p-4
            sm:p-5
            md:p-6
            lg:p-8
            overflow-x-hidden
          "
        >
          <div className="w-full max-w-[1600px] mx-auto">
            {children}
          </div>
        </motion.main>

      </div>

    </div>
  );
};

export default DashboardLayout;
