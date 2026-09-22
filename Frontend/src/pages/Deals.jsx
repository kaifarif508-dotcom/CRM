
import React, { useState } from "react";
import { motion, AnimatePresence, } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit,
  FiTrash2,
  FiDollarSign,
  FiTrendingUp,
  FiCheckCircle,
  FiXCircle,
  FiX,
} from "react-icons/fi";

const Deals = ({ deals,customers, onOpenDealForm , handleDeleteDeal , handleEditDeal , user,page,onPageChange,totalPages }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [stage, setStage] = useState("All");
  const [showModal, setShowModal] = useState(false);
const [selectedDeal, setSelectedDeal] = useState(null);

  // ================= SEARCH + FILTER =================

  const filteredDeals = deals.filter((deal) => {
  const searchValue = search.toLowerCase();

  const customer =
    typeof deal.customer === "object"
      ? deal.customer
      : customers.find(
          (customer) =>
            String(customer._id) === String(deal.customer)
        );

  const customerName = customer?.name || "";

  const matchesSearch =
    deal.title?.toLowerCase().includes(searchValue) ||
    customerName.toLowerCase().includes(searchValue);

  const matchesStatus =
    status === "All" || deal.status === status;

  const matchesStage =
    stage === "All" || deal.stage === stage;

  return matchesSearch && matchesStatus && matchesStage;
});

  // ================= STATS =================

  const totalDeals = deals.length;

  const openDeals = deals.filter(
    (deal) => deal.status === "Open"
  ).length;

  const wonDeals = deals.filter(
    (deal) => deal.status === "Won"
  ).length;

  const lostDeals = deals.filter(
    (deal) => deal.status === "Lost"
  ).length;

  // ================= STATUS STYLE =================

  const getStatusStyle = (dealStatus) => {
    switch (dealStatus) {
      case "Open":
        return "bg-blue-50 text-blue-600 border border-blue-100";

      case "Won":
        return "bg-green-50 text-green-600 border border-green-100";

      case "Lost":
        return "bg-red-50 text-red-600 border border-red-100";

      default:
        return "bg-gray-50 text-gray-600 border border-gray-100";
    }
  };

  // ================= STAGE STYLE =================

  const getStageStyle = (dealStage) => {
    switch (dealStage) {
      case "New":
        return "bg-blue-50 text-blue-600 border border-blue-100";

      case "Proposal":
        return "bg-purple-50 text-purple-600 border border-purple-100";

      case "Negotiation":
        return "bg-yellow-50 text-yellow-600 border border-yellow-100";

      case "Closed":
        return "bg-green-50 text-green-600 border border-green-100";

      default:
        return "bg-gray-50 text-gray-600 border border-gray-100";
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-3 sm:p-5 lg:p-6">

      {/* ================= HEADER ================= */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-8"
      >

        <div>

          <div className="flex items-center gap-3">

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.1,
                type: "spring",
                stiffness: 180,
              }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gray-950 text-white flex items-center justify-center shadow-sm"
            >
              <FiDollarSign size={20} />
            </motion.div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Deals
            </h1>

          </div>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Manage and track your sales deals
          </p>

        </div>

        <motion.button
          type="button"
          onClick={onOpenDealForm}
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          whileTap={{ scale: 0.97 }}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <FiPlus size={19} />
          Add Deal
        </motion.button>

      </motion.div>


      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">

        {/* Total */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Total Deals
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {totalDeals}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FiDollarSign size={22} />
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-blue-600">
            <FiDollarSign size={14} />
            All sales opportunities
          </div>

        </motion.div>


        {/* Open */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Open Deals
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {openDeals}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
              <FiTrendingUp size={22} />
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-yellow-600">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            Currently active
          </div>

        </motion.div>


        {/* Won */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileHover={{ y: -4 }}
          className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Won Deals
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {wonDeals}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <FiCheckCircle size={22} />
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-green-600">
            <FiCheckCircle size={14} />
            Successfully closed
          </div>

        </motion.div>


        {/* Lost */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ y: -4 }}
          className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Lost Deals
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {lostDeals}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <FiXCircle size={22} />
            </div>

          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-red-600">
            <FiXCircle size={14} />
            Unsuccessful deals
          </div>

        </motion.div>

      </div>


      {/* ================= DEALS CONTAINER ================= */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >

        {/* ================= FILTER HEADER ================= */}

        <div className="p-4 sm:p-5 border-b border-gray-100">

          <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">

            <div>

              <h2 className="font-bold text-gray-900">
                Sales Pipeline
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Search and filter your sales deals
              </p>

            </div>


            {/* Controls */}

            <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">

              {/* Search */}

              <div className="relative w-full md:w-80 lg:w-96">

                <FiSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Search deals..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                />

                {search && (
                  <motion.button
                    type="button"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                  >
                    <FiX size={15} />
                  </motion.button>
                )}

              </div>


              {/* Status */}

              <div className="relative w-full md:w-auto">

                <FiFilter
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full md:w-40 pl-9 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-700 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 cursor-pointer"
                >

                  <option value="All">
                    All Status
                  </option>

                  <option value="Open">
                    Open
                  </option>

                  <option value="Won">
                    Won
                  </option>

                  <option value="Lost">
                    Lost
                  </option>

                </select>

              </div>


              {/* Stage */}

              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full md:w-40 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-700 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 cursor-pointer"
              >

                <option value="All">
                  All Stages
                </option>

                <option value="New">
                  New
                </option>

                <option value="Proposal">
                  Proposal
                </option>

                <option value="Negotiation">
                  Negotiation
                </option>

                <option value="Closed">
                  Closed
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* ================= TABLE ================= */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1050px]">

            <thead className="bg-gray-950">

              <tr>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Deal
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Customer
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Value
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Stage
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Expected Close
                </th>

                <th className="text-center px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-gray-100">

              <AnimatePresence>

                {filteredDeals.map((deal, index) => (

                  <motion.tr
                    key={deal._id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.04,
                    }}
                    className="hover:bg-blue-50/40 transition-colors duration-200"
                  >

                    {/* Deal */}

                    <td className="px-6 py-4 sm:py-5">

                      <div className="flex items-center gap-3">

                        <motion.div
                          whileHover={{
                            scale: 1.08,
                            rotate: 3,
                          }}
                          className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold"
                        >
                          {deal.title.charAt(0).toUpperCase()}
                        </motion.div>

                        <div className="min-w-0">

                          <p className="font-semibold text-gray-900 truncate">
                            {deal.title}
                          </p>

                          <p className="text-xs text-gray-400 mt-0.5">
                            DEAL-{String(deal._id).padStart(3, "0")}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Customer */}

                    <td className="px-6 py-5 text-sm font-medium text-gray-700">
  {(() => {
    const customer =
      typeof deal.customer === "object"
        ? deal.customer
        : customers.find(
            (customer) =>
              String(customer._id) === String(deal.customer)
          );

    return customer?.name || "Unknown Customer";
  })()}
</td>


                    {/* Value */}

                    <td className="px-6 py-5">

                      <p className="font-semibold text-gray-900">
                        ${Number(deal.value).toLocaleString()}
                      </p>

                    </td>


                    {/* Stage */}

                    <td className="px-6 py-5">

                      <motion.span
                        whileHover={{ scale: 1.04 }}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStageStyle(
                          deal.stage
                        )}`}
                      >
                        {deal.stage}
                      </motion.span>

                    </td>


                    {/* Status */}

                    <td className="px-6 py-5">

                      <motion.span
                        whileHover={{ scale: 1.04 }}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusStyle(
                          deal.status
                        )}`}
                      >
                        {deal.status}
                      </motion.span>

                    </td>


                    {/* Close Date */}

                    <td className="px-6 py-5 text-sm text-gray-600">
                      {deal.date}
                    </td>


                    {/* Actions */}

                    <td className="px-6 py-5">

                      <div className="flex items-center justify-center gap-1.5">

                        <motion.button
                          type="button"
                          onClick={
                            ()=>{
                              setShowModal(true)
                              setSelectedDeal(deal)
                            }
                          }
                          whileHover={{
                            scale: 1.1,
                          }}
                          whileTap={{
                            scale: 0.9,
                          }}
                          title="View Deal"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                          <FiEye size={17} />
                        </motion.button>

                        <motion.button
                          type="button"
                          whileHover={{
                            scale: 1.1,
                          }}
                          whileTap={{
                            scale: 0.9,
                          }}
                          title="Edit Deal"
                          onClick={()=>{
                            handleEditDeal(deal)
                            
                          }}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-600 transition"
                        >
                          <FiEdit size={17} />
                        </motion.button>

                        {user?.role === "admin" &&(

                        <motion.button
                          type="button"
                          onClick ={
                            () => handleDeleteDeal(deal._id)
                          }
                          whileHover={{
                            scale: 1.1,
                          }}
                          whileTap={{
                            scale: 0.9,
                          }}
                          title="Delete Deal"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                        >

                          <FiTrash2 size={17} />
                        </motion.button>
                        )}

                      </div>

                    </td>

                  </motion.tr>

                ))}

              </AnimatePresence>

            </tbody>

          </table>

        </div>


        {/* ================= EMPTY STATE ================= */}

        <AnimatePresence>

          {filteredDeals.length === 0 && (

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="py-16 px-5 text-center"
            >

              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mb-4"
              >
                <FiDollarSign size={30} />
              </motion.div>

              <h3 className="text-lg font-semibold text-gray-800">
                No deals found
              </h3>

              <p className="text-sm text-gray-400 mt-1 max-w-sm mx-auto">
                Try changing your search or filters.
              </p>

              {(search || status !== "All" || stage !== "All") && (

                <motion.button
                  type="button"
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() => {
                    setSearch("");
                    setStatus("All");
                    setStage("All");
                  }}
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition"
                >
                  <FiX size={15} />
                  Clear Filters
                </motion.button>

              )}

            </motion.div>

          )}

        </AnimatePresence>


        {/* ================= FOOTER ================= */}

        <div className="px-4 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">

  <p className="text-xs sm:text-sm text-gray-500">
    Showing{" "}
    <span className="font-semibold text-gray-700">
      {filteredDeals.length}
    </span>{" "}
    deals
  </p>

  <div className="flex items-center gap-2">

    <button
      type="button"
      disabled={page === 1}
      onClick={() => onPageChange(page - 1)}
      className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
    >
      Previous
    </button>

    <span className="px-4 py-2 rounded-lg bg-gray-950 text-white text-sm font-medium">
      {page} / {totalPages}
    </span>

    <button
      type="button"
      disabled={page === totalPages}
      onClick={() => onPageChange(page + 1)}
      className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
    >
      Next
    </button>

  </div>

</div>

      </motion.div>
      <AnimatePresence>
  {showModal && selectedDeal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setShowModal(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >

        {/* Header */}
        <div className="bg-gray-950 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              Deal Details
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              {selectedDeal.title}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Deal Details */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Deal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400">
                  Deal Title
                </p>
                <p className="font-semibold text-gray-900 mt-1">
                  {selectedDeal.title}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400">
                  Deal Value
                </p>
                <p className="font-semibold text-gray-900 mt-1">
                  ${Number(selectedDeal.value).toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400">
                  Stage
                </p>
                <p className="font-semibold text-gray-900 mt-1">
                  {selectedDeal.stage}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400">
                  Status
                </p>
                <p className="font-semibold text-gray-900 mt-1">
                  {selectedDeal.status}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 sm:col-span-2">
                <p className="text-xs text-gray-400">
                  Expected Close
                </p>
                <p className="font-semibold text-gray-900 mt-1">
                  {selectedDeal.date}
                </p>
              </div>

            </div>
          </div>

          {/* Customer Details */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Customer Information
            </h3>

            {(() => {
              const customer =
  selectedDeal?.customer &&
  typeof selectedDeal.customer === "object"
    ? selectedDeal.customer
    : customers.find(
        (customer) =>
          String(customer._id) === String(selectedDeal?.customer)
      );

              return customer ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400">
                      Customer Name
                    </p>
                    <p className="font-semibold text-gray-900 mt-1">
                      {customer.name}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400">
                      Company
                    </p>
                    <p className="font-semibold text-gray-900 mt-1">
                      {customer.company || "N/A"}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400">
                      Email
                    </p>
                    <p className="font-semibold text-gray-900 mt-1 break-all">
                      {customer.email}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400">
                      Phone
                    </p>
                    <p className="font-semibold text-gray-900 mt-1">
                      {customer.phone || "N/A"}
                    </p>
                  </div>

                </div>
              ) : (
                <div className="bg-yellow-50 text-yellow-700 rounded-xl p-4 text-sm">
                  Customer details not found.
                </div>
              );
            })()}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-5 py-2.5 rounded-xl bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default Deals;

