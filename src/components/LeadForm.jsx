import React, { useState } from "react";

const LeadForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    status: "",
    source: "",
    action: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ validation (proper)
    if (!formData.name.trim() || !formData.email.trim()) return;

    // 🔥 send data to parent
    onSubmit?.(formData);

    // 🔥 close modal
    onClose?.();

    // reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      status: "",
      source: "",
      action: "",
    });
  };

  return (
    <div className="bg-[#111827] p-6 rounded-2xl shadow-xl max-w-3xl w-full mx-auto relative">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-white text-lg font-bold"
      >
        ×
      </button>

      <h2 className="text-white text-xl mb-6 font-semibold">
        Add New Lead
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* INPUT FIELDS */}
        {[
          { label: "Name", name: "name", type: "text", placeholder: "Enter name" },
          { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
          { label: "Company", name: "company", type: "text", placeholder: "Enter company" },
        ].map((field) => (
          <div key={field.name}>
            <label className="text-gray-300 text-sm mb-1 block">
              {field.label}
            </label>

            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full p-2 rounded-lg bg-[#1F2937] text-white outline-none border border-gray-600 focus:border-indigo-500"
            />
          </div>
        ))}

        {/* SELECT FIELDS */}
        {[
          {
            label: "Status",
            name: "status",
            options: ["New", "Contacted", "Qualified", "Lost"],
          },
          {
            label: "Source",
            name: "source",
            options: ["Website", "Email", "Referral", "Social Media"],
          },
          {
            label: "Action",
            name: "action",
            options: ["Follow Up", "Call", "Email", "Meeting"],
          },
        ].map((field) => (
          <div key={field.name}>
            <label className="text-gray-300 text-sm mb-1 block">
              {field.label}
            </label>

            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-[#1F2937] text-white border border-gray-600 focus:border-indigo-500"
            >
              <option value="">Select {field.label}</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt.toLowerCase()}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* SUBMIT */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg mt-4"
          >
            Submit Lead
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;