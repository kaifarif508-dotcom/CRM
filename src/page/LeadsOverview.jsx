import React, { useState } from "react";

const LeadsOverview = ({ onAddLead }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [leads, setLeads] = useState([
    { name: "Ali Khan", status: "New" },
    { name: "Sara Ahmed", status: "Contacted" },
    { name: "Usman Tariq", status: "Closed" },
    { name: "Ayesha Malik", status: "New" },
    { name: "Bilal Raza", status: "Contacted" },
    { name: "Fatima Noor", status: "New" },
    { name: "Hassan Ali", status: "Closed" },
    { name: "Maria Khan", status: "New" },
    { name: "Zain Malik", status: "Contacted" },
    { name: "Hira Shah", status: "New" },
  ]);

  // Filter + Search
  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || lead.status === filter)
  );

  const handleAddLead = () => {
    const name = prompt("Enter Lead Name:");
    if (!name) return;
    const status = prompt("Enter Lead Status (New / Contacted / Closed):", "New");
    if (!status) return;

    setLeads([{ name, status }, ...leads]);
    if (onAddLead) onAddLead();
  };

  return (
    <div className="bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#020617] border border-gray-800 rounded-2xl p-5 shadow-xl">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-white">
          📋 Leads Overview
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

          {/* Search */}
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#020617] border border-gray-700 text-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300"
          />

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#020617] border border-gray-700 text-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300"
          >
            <option>All</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Closed</option>
          </select>

          {/* Add Lead */}
          <button
            onClick={handleAddLead}
            className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
          >
            + Add Lead
          </button>

        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-[#020617] border border-gray-800 p-3 rounded-lg hover:bg-[#0B1220] hover:scale-105 transition-all duration-300"
            >
              <p className="text-gray-200">{lead.name}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  lead.status === "New"
                    ? "bg-blue-500/20 text-blue-400"
                    : lead.status === "Contacted"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {lead.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-6">
            No leads found...
          </p>
        )}
      </div>
    </div>
  );
};

export default LeadsOverview;