
import React from "react";
import {useState,useEffect} from "react"
import api  from '../api/api.js'
import {
  FiUsers,
  FiUserPlus,
  FiBriefcase,
  FiDollarSign,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiActivity,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(false)
  
  const fetchDashboard= async ()=>{
      try{
    const response = await api.get('/dashboard')
    
    setData(response.data)
    console.log(response.data)
  }

  catch(error){
console.log(error)
  }
  finally{
setLoading(false)
  }
  }

useEffect(()=>{
  

  fetchDashboard();

},[])




  const summaryCards = [
    {
      title: "Total Customers",
      value: data?.totalCustomer ?? 0,
      growth: "+12%",
      icon: FiUsers,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Leads",
      value: data?.totalLead ?? 0,
      growth: "+8%",
      icon: FiUserPlus,
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      title: "Total Deals",
      value: data?.totalDeal ?? 0,
      growth: "+15%",
      icon: FiBriefcase,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Revenue",
      value: `$${data?.revenue ?? 0}`,
      growth: "+18%",
      icon: FiDollarSign,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  const  recentDeals = data?.recentDeal  || [];

  const pendingTasks = data?.pendingTasks || [];

  const revenueData = data?.monthlyRevenue || [];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="w-full">

      {/* ================= HEADER ================= */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

          <div>
            <p className="text-sm font-medium text-blue-600 mb-1">
              Overview
            </p>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-1.5 text-sm sm:text-base">
              Welcome back! Here's what's happening with your CRM.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm"
          >
            <FiActivity className="text-green-500" size={17} />

            <span className="text-sm font-medium text-gray-600">
              Live Overview
            </span>

            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </motion.div>

        </div>
      </motion.div>


      {/* ================= SUMMARY CARDS ================= */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5"
      >

        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              variants={itemVariants}
              whileHover={{
                y: -6,
                scale: 1.01,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden"
            >

              {/* Hover decoration */}

              <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors duration-500" />

              <div className="relative flex items-start justify-between">

                <div className="min-w-0">

                  <p className="text-sm font-medium text-gray-500 truncate">
                    {card.title}
                  </p>

                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2"
                  >
                    {card.value}
                  </motion.h2>

                </div>

                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.12,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${card.iconBg} ${card.iconColor} shadow-sm`}
                >
                  <Icon size={22} />
                </motion.div>

              </div>


              {/* Growth */}

              <div className="relative flex items-center gap-2 mt-5">

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  <FiArrowUpRight size={14} />
                  {card.growth}
                </span>

                <span className="text-xs sm:text-sm text-gray-400">
                  this month
                </span>

              </div>

            </motion.div>
          );
        })}

      </motion.div>


      {/* ================= CONTENT SECTION ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5 lg:mt-6">


        {/* ================= RECENT DEALS ================= */}

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        >

          {/* Header */}

          <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-gray-100">

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Recent Deals
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Latest business opportunities
              </p>
            </div>

            <motion.div
              whileHover={{ rotate: 8, scale: 1.08 }}
              className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"
            >
              <FiBriefcase size={19} />
            </motion.div>

          </div>


          {/* Deals */}

          <div className="p-4 sm:p-5 lg:p-6 space-y-2">

            {recentDeals.map((deal, index) => (
              <motion.div
                key={deal._id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.5 + index * 0.1,
                }}
                whileHover={{
                  x: 5,
                  scale: 1.01,
                }}
                className="group flex items-center justify-between gap-3 p-3.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200"
              >

                <div className="flex items-center gap-3 min-w-0">

                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <FiBriefcase size={16} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-gray-700 group-hover:text-gray-900 truncate transition-colors">
                      {deal.title}
                    </p>

                    <p className="text-xs text-gray-400 mt-0.5">
                      Business opportunity
                    </p>
                  </div>

                </div>

                <span className="font-bold text-gray-900 text-sm sm:text-base whitespace-nowrap">
                  {deal.value}
                </span>

              </motion.div>
            ))}

          </div>

        </motion.div>


        {/* ================= PENDING TASKS ================= */}

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        >

          {/* Header */}

          <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-gray-100">

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Pending Tasks
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Tasks that need your attention
              </p>
            </div>

            <motion.div
              whileHover={{ rotate: -8, scale: 1.08 }}
              className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center"
            >
              <FiClock size={19} />
            </motion.div>

          </div>


          {/* Tasks */}

          <div className="p-4 sm:p-5 lg:p-6 space-y-2">

            {pendingTasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.55 + index * 0.1,
                }}
                whileHover={{
                  x: 5,
                  scale: 1.01,
                }}
                className="group flex items-center justify-between gap-3 p-3.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200"
              >

                <div className="flex items-center gap-3 min-w-0">

                  <div className="w-10 h-10 shrink-0 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                    <FiClock size={16} />
                  </div>

                  <span className="text-sm sm:text-base font-semibold text-gray-700 group-hover:text-gray-900 truncate transition-colors">
                    {task.title}
                  </span>

                </div>

                <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-yellow-600 bg-yellow-50 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                  Pending
                </span>

              </motion.div>
            ))}

          </div>

        </motion.div>

      </div>
      {/* ================= CHARTS ================= */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5 lg:mt-6">

  {/* Revenue Chart */}

  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.55 }}
    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6"
  >

    <div className="mb-5">
      <h2 className="text-lg font-bold text-gray-900">
        Revenue Overview
      </h2>

      <p className="text-sm text-gray-400 mt-1">
        Monthly revenue performance
      </p>
    </div>

    <div className="w-full h-[300px]">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={revenueData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  </motion.div>


  {/* Deals Chart */}

  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.65 }}
    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6"
  >

    <div className="mb-5">
      <h2 className="text-lg font-bold text-gray-900">
        CRM Statistics
      </h2>

      <p className="text-sm text-gray-400 mt-1">
        Current CRM overview
      </p>
    </div>

    <div className="w-full h-[300px]">

      <ResponsiveContainer width="100%" height="100%">

        <BarChart
          data={[
            {
              name: "Customers",
              value: data?.totalCustomer ?? 0,
            },
            {
              name: "Leads",
              value: data?.totalLead ?? 0,
            },
            {
              name: "Deals",
              value: data?.totalDeal ?? 0,
            },
          ]}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  </motion.div>

</div>


      {/* ================= QUICK STATUS ================= */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.65 }}
        whileHover={{ scale: 1.005 }}
        className="relative mt-5 lg:mt-6 bg-gray-950 rounded-2xl p-5 sm:p-6 lg:p-7 text-white overflow-hidden shadow-lg"
      >

        {/* Decorative Background */}

        <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />

        <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          <div>
            <div className="flex items-center gap-2 mb-1">

              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <p className="text-gray-400 text-xs sm:text-sm font-medium">
                CRM STATUS
              </p>

            </div>

            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
              Everything is running smoothly
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Your CRM system is operating normally.
            </p>
          </div>


          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-green-400 font-semibold text-sm bg-green-400/10 border border-green-400/20 px-4 py-2.5 rounded-xl whitespace-nowrap"
          >
            <FiCheckCircle size={19} />
            All Systems Operational
          </motion.div>

        </div>

      </motion.div>

    </div>
  );
};

export default Dashboard;
