import React from "react";

const LeadTable = ({ setOutput }) => {
  return (
    <div className="w-full bg-[#0F172A] border border-white/10 rounded-2xl p-5 shadow-xl">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        <p className="text-xs text-slate-400 mt-1">AI-powered quick actions</p>
      </div>

      {/* Cards */}
      <div className="space-y-4">

        {/* Card 1 */}
        <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 hover:shadow-lg transition-all duration-300">
          <p className="text-sm font-medium text-white">New Lead Added</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() =>
                setOutput("📞 Follow-up:\nHi, just checking in regarding our last discussion.")
              }
              className="px-3 py-1.5 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Follow-up
            </button>
            <button
              onClick={() =>
                setOutput("📄 Proposal:\nHere is your customized proposal...")
              }
              className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 border border-white/10 hover:bg-slate-700 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Proposal
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 hover:shadow-lg transition-all duration-300">
          <p className="text-sm font-medium text-white">Proposal Sent</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() =>
                setOutput("📊 Summary:\nClient is interested in your services.")
              }
              className="px-3 py-1.5 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Summary
            </button>
            <button
              onClick={() =>
                setOutput("🎯 Pitch:\nWe help you scale your business with AI solutions.")
              }
              className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 border border-white/10 hover:bg-slate-700 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Pitch
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-xl border border-pink-500/20 bg-pink-500/10 hover:bg-pink-500/20 hover:shadow-lg transition-all duration-300">
          <p className="text-sm font-medium text-white">Client Moved</p>
          <div className="mt-3">
            <button
              onClick={() =>
                setOutput("✅ Client moved to next stage successfully.")
              }
              className="px-3 py-1.5 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Update Status
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeadTable;