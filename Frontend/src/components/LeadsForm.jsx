
import React, { useState,useEffect } from "react";
import api from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiGlobe,
  FiFlag,
  FiFileText,
  FiX,
  FiCheck,
} from "react-icons/fi";

const LeadsForm = ({ onClose, onAddLead , customers, editLead , onUpdateLead }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("");
  const [customer,setCustomer] = useState("");
  const [status, setStatus] = useState("New");
  const [priority, setPriority] = useState("Medium");
  const [notes, setNotes] = useState("");
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
if(editLead){
  setName(editLead.name);
  setEmail(editLead.email);
  setPhone(editLead.phone);
  setCompany(editLead.company);
  setSource(editLead.source);
  setCustomer(editLead.customer?._id || editLead.customer || "");
  setStatus(editLead.status);
  setPriority(editLead.priority);
  setNotes(editLead.notes)
}
  },[editLead])

 async function submitHandler(e) {
    e.preventDefault();

    
    try{
      if(editLead){
        setLoading(true)
        const response = await api.put(`/leads/${editLead._id}`,{

          name,
          email,
          phone,
        company,
        source,
        status,
        priority,
        customer,
        notes
      })
      
      onUpdateLead(response.data.update)
     

onClose();
return;

      }
      else{
        
      const response = await api.post("/leads",{
        name,
        email,
        phone,
        company,
        source,
        status,
        priority,
        customer,
        notes
      })
       onAddLead(response.data.lead)
       onClose();
      }
      
      
      setName("");
      setEmail("");
    setPhone("");
    setCompany("");
    setSource("");
    setCustomer("");
    setStatus("New");
    setPriority("Medium");
    setNotes("");

    
  }
  catch(error){
    console.log(error)
  }
  finally{
    setLoading(false)
  }
  }

  const inputClass =
    "w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200";

  const selectClass =
    "w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 cursor-pointer";

  const fieldAnimation = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35 },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-gray-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl max-h-[95vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl"
        >

          {/* ================= HEADER ================= */}

          <div className="sticky top-0 z-20 bg-gray-950 text-white px-4 sm:px-6 lg:px-7 py-4 sm:py-5">

            <div className="flex items-center justify-between gap-3">

              <div className="flex items-center gap-3 min-w-0">

                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30"
                >
                  <FiUser size={20} />
                </motion.div>

                <div className="min-w-0">

                  <h2 className="text-base sm:text-xl font-bold truncate">
                    {editLead ? "Update Lead" : "Add New Lead"}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5 truncate">
                    Add a potential customer to your CRM
                  </p>

                </div>

              </div>

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{
                  scale: 1.08,
                  rotate: 90,
                }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl flex items-center justify-center text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-colors duration-200"
              >
                <FiX size={20} />
              </motion.button>

            </div>

          </div>


          {/* ================= FORM ================= */}

          <form
            onSubmit={submitHandler}
            className="p-4 sm:p-6 lg:p-7"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

              {/* ================= NAME ================= */}

              <motion.div {...fieldAnimation}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lead Name
                </label>

                <div className="relative">

                  <FiUser
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"
                    size={17}
                  />

                  <input
                    type="text"
                    value={name}
                    placeholder="Enter lead name"
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    required
                  />

                </div>
              </motion.div>


              {/* ================= EMAIL ================= */}

              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>

                <div className="relative">

                  <FiMail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"
                    size={17}
                  />

                  <input
                    type="email"
                    value={email}
                    placeholder="Enter email address"
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    required
                  />

                </div>
              </motion.div>


              {/* ================= PHONE ================= */}

              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.08 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>

                <div className="relative">

                  <FiPhone
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none"
                    size={17}
                  />

                  <input
                    type="tel"
                    value={phone}
                    placeholder="+92 300 1234567"
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    required
                  />

                </div>
              </motion.div>


              {/* ================= COMPANY ================= */}

              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.12 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company
                </label>

                <div className="relative">

                  <FiBriefcase
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-yellow-500 pointer-events-none"
                    size={17}
                  />

                  <input
                    type="text"
                    value={company}
                    placeholder="Company name"
                    onChange={(e) => setCompany(e.target.value)}
                    className={inputClass}
                    required
                  />

                </div>
              </motion.div>

<motion.div
  {...fieldAnimation}
  transition={{ duration: 0.35, delay: 0.16 }}
>
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Customer
  </label>

  <div className="relative">
    <FiUser
      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-500 pointer-events-none"
      size={17}
    />

    <select
      value={customer}
      onChange={(e) => setCustomer(e.target.value)}
      className={selectClass}
    >
      <option value="">Select customer</option>

      {customers?.map((item) => (
        <option key={item._id} value={item._id}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
</motion.div>
              {/* ================= SOURCE ================= */}

              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.16 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lead Source
                </label>

                <div className="relative">

                  <FiGlobe
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"
                    size={17}
                  />

                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className={selectClass}
                    required
                  >
                    <option value="">Select source</option>
                    <option value="Website">Website</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Referral">Referral</option>
                    <option value="Other">Other</option>
                  </select>

                </div>
              </motion.div>


              {/* ================= STATUS ================= */}

              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.20 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 cursor-pointer"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Lost">Lost</option>
                </select>

                <div className="flex items-center gap-2 mt-2">

                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />

                  <p className="text-xs text-gray-400">
                    Choose the current lead status
                  </p>

                </div>

              </motion.div>


              {/* ================= PRIORITY ================= */}

              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.24 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority
                </label>

                <div className="relative">

                  <FiFlag
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none"
                    size={17}
                  />

                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className={selectClass}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>

                </div>
              </motion.div>


              {/* ================= NOTES ================= */}

              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.28 }}
                className="md:col-span-2"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes
                </label>

                <div className="relative">

                  <FiFileText
                    className="absolute left-3.5 top-4 text-purple-500 pointer-events-none"
                    size={17}
                  />

                  <textarea
                    value={notes}
                    rows={4}
                    placeholder="Add notes about this lead..."
                    onChange={(e) => setNotes(e.target.value)}
                    className={`${inputClass} resize-none min-h-[110px]`}
                  />

                </div>
              </motion.div>

            </div>


            {/* ================= FOOTER ================= */}

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7 pt-5 border-t border-gray-100">

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{
                  scale: 1.02,
                  y: -1,
                }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                Cancel
              </motion.button>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{
                  scale: 1.02,
                  y: -1,
                }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FiCheck size={18} />

                {loading
                ?
              (editLead ? "Updating..." : "Adding...")
            :
            (editLead ? "Update Lead" : "Add New Lead")
            }
                
              </motion.button>

            </div>

          </form>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LeadsForm;

