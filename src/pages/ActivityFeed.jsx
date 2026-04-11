import React from "react";
import { LuEye, LuPencil, LuTrash } from "react-icons/lu";

/* 🔥 FIX: lowercase support */
const getStatusColor = (status = "") => {
  switch (status.toLowerCase()) {
    case "new":
      return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
    case "contacted":
      return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
    case "converted":
      return "bg-green-500/10 text-green-400 border border-green-500/20";
    default:
      return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
  }
};

const ActivityFeed = ({ leads = [], onClick }) => {
  return (
    <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-5">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-lg font-semibold text-white">Leads</h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage and track your leads
          </p>
        </div>

        <button
          onClick={onClick}
          className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700"
        >
          + Add
        </button>
      </div>

      {/* EMPTY STATE */}
      {leads.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">
          No leads found. Add your first lead 🚀
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">

            {/* HEAD */}
            <thead className="text-[11px] uppercase tracking-wide text-slate-400 border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {leads.map((lead, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >

                  {/* NAME + EMAIL */}
                  <td className="py-4 px-4">
                    <p className="font-medium text-white">{lead.name}</p>
                    <p className="text-xs text-slate-400">{lead.email}</p>
                  </td>

                  {/* COMPANY */}
                  <td className="py-4 px-4">{lead.company}</td>

                  {/* STATUS */}
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  {/* SOURCE */}
                  <td className="py-4 px-4">{lead.source}</td>

                  {/* ACTIONS */}
                  <td className="py-4 px-4">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:text-indigo-400">
                        <LuEye size={16} />
                      </button>
                      <button className="p-2 hover:text-yellow-400">
                        <LuPencil size={16} />
                      </button>
                      <button className="p-2 hover:text-red-400">
                        <LuTrash size={16} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;