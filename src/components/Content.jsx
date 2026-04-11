import React, { useState } from "react";
import StateCard from "../page/StateCard";

import {
  LuUsers,
  LuUserCheck,
  LuDollarSign,
  LuRepeat
} from "react-icons/lu";
import LeadForm from "./LeadForm";
import Content2 from "../components/Content2";
import LeadsOverview from "../page/LeadsOverview";
import ActivityFeed from "../page/ActivityFeed";
import PipelineBoard from "../page/PipelineBoard"
import { motion } from "framer-motion";

/* 🔥 Animation Variants */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger = {
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const Content = ({ sidebarOpen }) => {
  const [leads, setLeads] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddLead = (data) => {
    setLeads((prev) => [...prev, data]);
    setShowForm(false);
  };

  return (
    <main
      className={`
        absolute top-[72px] right-0
        transition-all duration-300 ease-in-out

        left-0
        ${sidebarOpen ? "md:left-[260px]" : "md:left-[80px]"}

        h-[calc(100dvh-72px)] overflow-y-auto
        bg-gradient-to-br from-[#0B0F19] via-[#0F172A] to-[#020617]
        text-[#E5E7EB]
        px-4 md:px-8 py-6 space-y-10
        no-scrollbar
      `}
    >
      {/* 🔷 HEADER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
      >
        <h1 className="text-2xl font-semibold md:text-3xl">
          Welcome back, <span className="text-indigo-400">Kaif</span> 👋
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 transition-transform bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 hover:scale-105"
          >
            + Add Lead
          </button>

          <button className="px-4 py-2 transition-transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105">
            🤖 AI Assist
          </button>
        </div>
      </motion.div>

      {/* 🔷 STATS */}
      <motion.div variants={stagger} initial="hidden" animate="show">
        <motion.h2
          variants={fadeUp}
          className="mb-4 text-lg font-semibold text-gray-300"
        >
          Overview
        </motion.h2>

        <motion.div
          variants={stagger}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              title: "Total Leads",
              number: "1,245",
              percentage: "+15%",
              icon: <LuUsers />,
              bg: "bg-gradient-to-br from-purple-600 to-indigo-600",
            },
            {
              title: "Active Clients",
              number: "567",
              percentage: "+8%",
              icon: <LuUserCheck />,
              bg: "bg-gradient-to-br from-emerald-500 to-teal-600",
            },
            {
              title: "Revenue",
              number: "$12,345",
              percentage: "+10%",
              icon: <LuDollarSign />,
              bg: "bg-gradient-to-br from-yellow-500 to-orange-500",
            },
            {
              title: "Follow Ups",
              number: "89",
              percentage: "-5%",
              icon: <LuRepeat />,
              bg: "bg-gradient-to-br from-pink-500 to-rose-600",
            },
          ].map((card, i) => (
            <motion.div key={i} variants={fadeUp}>
              <StateCard {...card} bgColor={card.bg} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* 🔷 PIPELINE */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <PipelineBoard />
      </motion.div>

      {/* 🔷 CONTENT2 */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <Content2 />
      </motion.div>

      {/* 🔷 ANALYTICS */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <LeadsOverview />
      </motion.div>

      {/* 🔷 ACTIVITY */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <ActivityFeed leads={leads} />
      </motion.div>

      {/* 🔷 MODAL */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <LeadForm
              onSubmit={handleAddLead}
              onClose={() => setShowForm(false)}
            />
          </motion.div>
        </motion.div>
      )}
    </main>
  );
};

export default Content;