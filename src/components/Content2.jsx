import React, { useState } from "react";
import ActivityFeed from "../page/ActivityFeed";
import AiPanel from "../page/AiPanel";
import LeadTable from "../page/LeadTable";

const Content2 = () => {
  const [output, setOutput] = useState("");

  return (
    <div className="mt-8">

      {/* Wrapper */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#020617] border border-white/10 rounded-2xl p-5 md:p-6 shadow-lg">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white md:text-xl">
            Activity & AI Panel
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Track leads and generate AI responses
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* LEFT (Table Big) */}
          <div className="xl:col-span-2">
          <LeadTable setOutput={setOutput} />
          </div>

          {/* RIGHT (AI Panel) */}
          <div>
            <AiPanel output={output} />
          </div>

        </div>
         

      </div>

    </div>
  );
};

export default Content2;