import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit,
  FiTrash2,
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiClock,
  FiX,
} from "react-icons/fi";

const Leads = ({ onAddLead, leads ,handleEditLead, handleDeleteLead ,customers , user, page,totalPages,onPageChange }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  const [selectedLead, setSelectedLead] = useState(null);
const [showViewModal, setShowViewModal] = useState(false);

  const filteredLeads = leads.filter((lead) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      lead.name.toLowerCase().includes(searchValue) ||
      lead.email.toLowerCase().includes(searchValue) ||
      lead.company.toLowerCase().includes(searchValue);

    const matchesStatus =
      status === "All" || lead.status === status;

    const matchesPriority =
      priority === "All" || lead.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const lostLeads = leads.filter(
    (lead) => lead.status === "Lost"
  ).length;

  const getStatusStyle = (leadStatus) => {
    switch (leadStatus) {
      case "New":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Contacted":
        return "bg-yellow-50 text-yellow-600 border-yellow-100";
      case "Qualified":
        return "bg-green-50 text-green-600 border-green-100";
      case "Lost":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const getPriorityStyle = (leadPriority) => {
    switch (leadPriority) {
      case "High":
        return "bg-red-50 text-red-600 border-red-100";
      case "Medium":
        return "bg-yellow-50 text-yellow-600 border-yellow-100";
      case "Low":
        return "bg-green-50 text-green-600 border-green-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-3 sm:p-5 lg:p-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-8"
      >
        <div>
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gray-950 text-white flex items-center justify-center shadow-md"
            >
              <FiUsers size={20} />
            </motion.div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Leads
            </h1>
          </div>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Manage and track your potential customers
          </p>
        </div>

        <motion.button
          type="button"
          onClick={onAddLead}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
        >
          <FiPlus size={19} />
          Add Lead
        </motion.button>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">

        <StatCard
          title="Total Leads"
          value={totalLeads}
          icon={<FiUsers size={22} />}
          iconClass="bg-blue-50 text-blue-600"
          textClass="text-blue-600"
          footer="All potential customers"
          delay={0.1}
        />

        <StatCard
          title="New Leads"
          value={newLeads}
          icon={<FiUserCheck size={22} />}
          iconClass="bg-blue-50 text-blue-600"
          textClass="text-blue-600"
          footer="Recently added"
          delay={0.2}
        />

        <StatCard
          title="Contacted"
          value={contactedLeads}
          icon={<FiClock size={22} />}
          iconClass="bg-yellow-50 text-yellow-600"
          textClass="text-yellow-600"
          footer="Currently in contact"
          delay={0.3}
        />

        <StatCard
          title="Lost Leads"
          value={lostLeads}
          icon={<FiUserX size={22} />}
          iconClass="bg-red-50 text-red-600"
          textClass="text-red-600"
          footer="Unsuccessful leads"
          delay={0.4}
        />

      </div>

      {/* MAIN CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >

        {/* FILTER HEADER */}
        <div className="p-4 sm:p-5 border-b border-gray-100">

          <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">

            <div>
              <h2 className="font-bold text-gray-900">
                Leads Pipeline
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Search and filter your potential customers
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">

              {/* SEARCH */}
              <div className="relative w-full md:w-80 lg:w-96">

                <FiSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Search leads..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
                  >
                    <FiX size={15} />
                  </button>
                )}

              </div>

              {/* STATUS */}
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
                  <option value="All">All Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Lost">Lost</option>
                </select>

              </div>

              {/* PRIORITY */}
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full md:w-40 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-700 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 cursor-pointer"
              >
                <option value="All">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead className="bg-gray-950">

              <tr>
                {[
                  "Lead",
                  "Company",
                  "Customer",
                  "Phone",
                  "Source",
                  "Status",
                  "Priority",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300 ${
                      heading === "Actions"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredLeads.map((lead, index) => (

                <motion.tr
                  key={lead._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.04,
                  }}
                  className="hover:bg-blue-50/40 transition-colors duration-200"
                >

                  <td className="px-6 py-4 sm:py-5">

                    <div className="flex items-center gap-3">

                      <motion.div
                        whileHover={{ scale: 1.08, rotate: 3 }}
                        className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold"
                      >
                        {lead.name.charAt(0).toUpperCase()}
                      </motion.div>

                      <div className="min-w-0">

                        <p className="font-semibold text-gray-900 truncate">
                          {lead.name}
                        </p>

                        <p className="text-xs text-gray-400 mt-0.5 truncate">
                          {lead.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-gray-700">
                    {lead.company}
                  </td>
                  <td className="px-5 py-4">
  {lead.customer ? (
    <div>
      <p className="font-semibold text-gray-800">
        {lead.customer.name}
      </p>

      <p className="text-xs text-gray-500">
        {lead.customer.email}
      </p>

      <p className="text-xs text-gray-500">
        {lead.customer.phone}
      </p>
    </div>
  ) : (
    <span className="text-gray-400">
      No customer
    </span>
  )}
</td>

                  <td className="px-6 py-5 text-sm text-gray-600">
                    {lead.phone}
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-600">
                    {lead.source}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusStyle(
                        lead.status
                      )}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {lead.status}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getPriorityStyle(
                        lead.priority
                      )}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {lead.priority}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex items-center justify-center gap-1.5">

                      <ActionButton
                        title="View Lead"
                        onClick={ () => {
                          setSelectedLead(lead)
                          setShowViewModal(true)
                        }
                        }
                        icon={<FiEye size={17} />}
                        hover="hover:bg-blue-50 hover:text-blue-600"
                      />

                      <ActionButton
                        title="Edit Lead"
                        onClick={ () =>  handleEditLead(lead)}
                        icon={<FiEdit size={17} />}
                        hover="hover:bg-green-50 hover:text-green-600"
                      />


{user?.role === "admin" &&(
  
                      <ActionButton
                        title="Delete Lead"
                        onClick ={ () => {
                            
                            handleDeleteLead(lead._id);

                            }}
                        icon={<FiTrash2 size={17} />}
                        hover="hover:bg-red-50 hover:text-red-600"
                      />
)}

                    </div>

                  </td>

                </motion.tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* EMPTY STATE */}
        <AnimatePresence>

          {filteredLeads.length === 0 && (

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 px-5 text-center"
            >

              <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mb-4">
                <FiUsers size={30} />
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                No leads found
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Try changing your search or filters.
              </p>

              {(search || status !== "All" || priority !== "All") && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSearch("");
                    setStatus("All");
                    setPriority("All");
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

        {/* FOOTER */}
       <div className="px-4 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">

  <p className="text-xs sm:text-sm text-gray-500">
    Showing{" "}
    <span className="font-semibold text-gray-700">
      {filteredLeads.length}
    </span>{" "}
    leads
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
      {/* ================= VIEW LEAD MODAL ================= */}

<AnimatePresence>
  {showViewModal && selectedLead && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={() => {
        setShowViewModal(false)
        setSelectedLead(null)


      }
      }
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >

        {/* MODAL HEADER */}
        <div className="bg-gray-950 px-5 sm:px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
              {selectedLead.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Lead Details
              </h2>

              <p className="text-sm text-gray-400">
                View complete lead information
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowViewModal(false)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition"
          >
            <FiX size={20} />
          </button>

        </div>

        {/* MODAL BODY */}
        <div className="p-5 sm:p-6">

          {/* NAME + STATUS */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedLead.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {selectedLead.company}
              </p>
            </div>

            <div className="flex gap-2">

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusStyle(
                  selectedLead.status
                )}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {selectedLead.status}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getPriorityStyle(
                  selectedLead.priority
                )}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {selectedLead.priority}
              </span>

            </div>

          </div>

          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* EMAIL */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Email
              </p>

              <p className="text-sm font-semibold text-gray-800 mt-1 break-all">
                {selectedLead.email || "N/A"}
              </p>
            </div>

            {/* PHONE */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Phone
              </p>

              <p className="text-sm font-semibold text-gray-800 mt-1">
                {selectedLead.phone || "N/A"}
              </p>
            </div>

            {/* COMPANY */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Company
              </p>

              <p className="text-sm font-semibold text-gray-800 mt-1">
                {selectedLead.company || "N/A"}
              </p>
            </div>

            {/* SOURCE */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Source
              </p>

              <p className="text-sm font-semibold text-gray-800 mt-1">
                {selectedLead.source || "N/A"}
              </p>
            </div>

          </div>

          {/* CUSTOMER */}
          <div className="mt-4 bg-blue-50/60 border border-blue-100 rounded-xl p-4">

            <p className="text-xs font-medium text-blue-500 uppercase tracking-wide">
              Customer
            </p>

            {selectedLead.customer ? (
              <div className="mt-2">
                <p className="font-semibold text-gray-900">
                  {selectedLead.customer.name}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {selectedLead.customer.email}
                </p>

                <p className="text-sm text-gray-500">
                  {selectedLead.customer.phone}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-400 mt-1">
                No customer assigned
              </p>
            )}

          </div>

          {/* NOTES */}
          <div className="mt-4">

            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              Notes
            </p>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 min-h-[80px]">
              <p className="text-sm text-gray-600 leading-relaxed">
                {selectedLead.notes || "No notes available."}
              </p>
            </div>

          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="px-5 sm:px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowViewModal(false)}
            className="px-5 py-2.5 rounded-xl bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            Close
          </motion.button>

        </div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};


/* ================= STAT CARD ================= */

const StatCard = ({
  title,
  value,
  icon,
  iconClass,
  textClass,
  footer,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            {value}
          </h2>
        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconClass}`}
        >
          {icon}
        </div>

      </div>

      <div
        className={`mt-4 flex items-center gap-2 text-xs font-medium ${textClass}`}
      >
        {icon}
        {footer}
      </div>

    </motion.div>
  );
};


/* ================= ACTION BUTTON ================= */

const ActionButton = ({ icon, title, hover , onClick }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={title}
      className={`w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 transition ${hover}`}
    >
      {icon}
    </motion.button>
  );
};

export default Leads;