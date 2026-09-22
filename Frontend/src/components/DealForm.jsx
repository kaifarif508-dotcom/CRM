
import React, { useState ,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiDollarSign,
  FiUser,
  FiCalendar,
  FiFileText,
  FiX,
  FiCheck,
  FiTrendingUp,
} from "react-icons/fi";
import api from '../api/api'

const DealForm = ({ onClose, onAddDeal , customers , editDeal, handleUpdateDeal }) => {
  const [title, setTitle] = useState("");
  const [customer, setCustomer] = useState("");
  const [value, setValue] = useState("");
  const [stage, setStage] = useState("");
  const [status, setStatus] = useState("Open");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading,setLoading] = useState(false);
useEffect(() => {
  if (editDeal) {
    setTitle(editDeal.title || "");

    setCustomer(
      typeof editDeal.customer === "object"
        ? editDeal.customer?._id || ""
        : editDeal.customer || ""
    );

    setValue(editDeal.value || "");
    setStage(editDeal.stage || "");
    setStatus(editDeal.status || "Open");
    setDate(editDeal.date || "");
    setNotes(editDeal.notes || "");
  } else {
    setTitle("");
    setCustomer("");
    setValue("");
    setStage("");
    setStatus("Open");
    setDate("");
    setNotes("");
  }
}, [editDeal]);


  async function submitHandler(e) {
    e.preventDefault();


    try{
setLoading(true)
      if(editDeal){
        
      
const response = await api.put(`/deals/${editDeal._id}`,{
  title,
  customer,
  value,
  stage,
  status,
  date,
  notes
})

handleUpdateDeal(response.data.update)

      
      

    }
    else{

      const response = await api.post(`/deals`,{
        title,
        customer,
        value,
        stage,
        status,
        date,
        notes
      })
      
      onAddDeal(response.data.deal);
    }

    setTitle("");
    setCustomer("");
    setValue("");
    setStage("");
    setStatus("Open");
    setDate("");
    setNotes("");
    
    onClose();
  } catch(error){
console.log(error)
  }
  finally{
    setLoading(false)
  }
  }


  const inputClass =
    "w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200";

  const selectClass =
    "w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 cursor-pointer";

  const fieldAnimation = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
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
          {/* HEADER */}
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
                  className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30"
                >
                  <FiTrendingUp size={20} />
                </motion.div>

                <div className="min-w-0">
                  <h2 className="text-base sm:text-xl font-bold truncate">
                    {editDeal ? "Update Deal " : "Add  Deal"}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5 truncate">
                    Create and manage a new sales opportunity
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
                className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl flex items-center justify-center text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
              >
                <FiX size={20} />
              </motion.button>

            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={submitHandler}
            className="p-4 sm:p-6 lg:p-7"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

              {/* DEAL TITLE */}
              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deal Title
                </label>

                <div className="relative">
                  <FiFileText
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"
                    size={17}
                  />

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter deal title"
                    className={inputClass}
                    required
                  />
                </div>
              </motion.div>

              {/* CUSTOMER */}
              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.08 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Customer
                </label>

                <div className="relative">
  <FiUser
    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none"
    size={17}
  />

  <select
    value={customer}
    onChange={(e) => setCustomer(e.target.value)}
    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 cursor-pointer"
    required
  >
    <option value="">Select customer</option>

    {customers.map((customer) => (
      <option key={customer._id} value={customer._id}>
        {customer.name}
      </option>
    ))}
  </select>
</div>
              </motion.div>

              {/* VALUE */}
              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.12 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deal Value
                </label>

                <div className="relative">
                  <FiDollarSign
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-yellow-500 pointer-events-none"
                    size={17}
                  />

                  <input
                    type="number"
                    min="0"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter deal value"
                    className={inputClass}
                    required
                  />
                </div>
              </motion.div>

              {/* STAGE */}
              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.16 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stage
                </label>

                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className={selectClass}
                  required
                >
                  <option value="">Select stage</option>
                  <option value="New">New</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Closed">Closed</option>
                </select>
              </motion.div>

              {/* STATUS */}
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
                  className={selectClass}
                  required
                >
                  <option value="Open">Open</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>

                <div className="flex items-center gap-2 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />

                  <p className="text-xs text-gray-400">
                    Select the current deal status
                  </p>
                </div>
              </motion.div>

              {/*  DATE */}
              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.24 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expected Close Date
                </label>

                <div className="relative">
                  <FiCalendar
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-500 pointer-events-none"
                    size={17}
                  />

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
              </motion.div>

              {/* NOTES */}
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
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Add notes about this deal..."
                    className={`${inputClass} resize-none min-h-[110px]`}
                  />
                </div>
              </motion.div>

            </div>

            {/* FOOTER */}
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
                (editDeal ? "Updating..." :"Adding...")
                :
                (editDeal ? "Update Deal" : "Add Deal")
                }
              
              </motion.button>

            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DealForm;
