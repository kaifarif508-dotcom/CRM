import React from "react";

const AiPanel = ({ output }) => {
  return (
    <div className="bg-[#0F172A] border border-gray-800 p-6 rounded-2xl shadow-lg flex flex-col">

      {/* Header */}
      <h2 className="text-xl font-semibold mb-5 text-white">
        🤖 AI Output Preview
      </h2>

      {/* Output Box */}
      <div className="flex-1 bg-gradient-to-br from-[#020617] to-[#0B1220] border border-gray-700 p-4 rounded-xl min-h-[220px] text-gray-300 whitespace-pre-line relative">

        {output ? (
          output
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            Click any action to see output...
          </div>
        )}

      </div>

      {/* Optional Footer Actions */}
      {output && (
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="btn-secondary"
          >
            Copy
          </button>

          <button
            onClick={() => alert("Sent 🚀")}
            className="btn-primary"
          >
            Send
          </button>
        </div>
      )}

      {/* Button Styles */}
      <style jsx>{`
        .btn-primary {
          background: linear-gradient(to right, #6366f1, #4f46e5);
          color: white;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          transform: scale(1.05);
          opacity: 0.9;
        }

        .btn-secondary {
          background: #1f2937;
          color: #e5e7eb;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid #374151;
        }

        .btn-secondary:hover {
          background: #374151;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default AiPanel;