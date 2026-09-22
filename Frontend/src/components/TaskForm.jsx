import React, { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import  api from '../api/api.js';
import {
  FiCheckSquare,
  FiUser,
  FiUsers,
  FiCalendar,
  FiFlag,
  FiFileText,
  FiX,
  FiCheck,
} from "react-icons/fi";

const TaskForm = ({ onClose, onAddTask,customers,handleUpdateTask ,editTask }) => {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [customer, setCustomer] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [description, setDescription] = useState("");
  const [loading,setLoading] = useState(false);

useEffect(()=>{
  if(editTask){
    setTitle(editTask.title)
    setAssignedTo(editTask.team)
    setCustomer(editTask.customer?._id || editTask.customer || "")
    setDueDate(editTask.date)
    setPriority(editTask.priority)
    setStatus(editTask.status)
    setDescription(editTask.notes)
  }

},[editTask])

 async function submitHandler(e) {
    e.preventDefault();

    try{
      if(editTask){
        setLoading(true)
const response = await api.put(`/tasks/${editTask._id}`,{
        
        title,
      team:assignedTo,
      customer,
   date: dueDate,
      priority,
      status,
     notes: description,

      })
      handleUpdateTask(response.data.update)
      
    
    }
    else{
      const response = await api.post("/tasks",{
        title,
       team : assignedTo,
        customer,
        date : dueDate,
        priority,
        status,
        notes :description
      })

      onAddTask(response.data.task)
      onClose()
      
    }
    
    setTitle("");
    setAssignedTo("");
    setCustomer("");
    setDueDate("");
    setPriority("Medium");
    setStatus("Pending");
    setDescription("");

    
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

  const normalSelectClass =
    "w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 cursor-pointer";

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
                  <FiCheckSquare size={20} />
                </motion.div>

                <div className="min-w-0">
                  <h2 className="text-base sm:text-xl font-bold truncate">
                  {editTask ? "Update Task" : "Add Task"}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5 truncate">
                    Create and assign a new task
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

              {/* ================= TASK TITLE ================= */}

              <motion.div
                {...fieldAnimation}
                className="md:col-span-2"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Task Title
                </label>

                <div className="relative">

                  <FiCheckSquare
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"
                    size={17}
                  />

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    className={inputClass}
                    required
                  />

                </div>
              </motion.div>

              {/* ================= ASSIGNED TO ================= */}

              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Assigned To
                </label>

                <div className="relative">

                  <FiUser
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-500 pointer-events-none"
                    size={17}
                  />

                  <input
                    type="text"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    placeholder="Team member"
                    className={inputClass}
                    required
                  />

                </div>
              </motion.div>

              {/* ================= CUSTOMER ================= */}

              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.08 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Related Customer
                </label>

                <div className="relative">

                  <FiUsers
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none"
                    size={17}
                  />

                 <select
  value={customer}
  onChange={(e) => setCustomer(e.target.value)}
  className={selectClass}
  required
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

              {/* ================= DUE DATE ================= */}

              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.12 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Due Date
                </label>

                <div className="relative">

                  <FiCalendar
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"
                    size={17}
                  />

                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className={inputClass}
                    required
                  />

                </div>
              </motion.div>

              {/* ================= PRIORITY ================= */}

              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.16 }}
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

                <div className="flex items-center gap-2 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />

                  <p className="text-xs text-gray-400">
                    Set the urgency of this task
                  </p>
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
                  className={normalSelectClass}
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="InProgress">
                    In Progress
                  </option>

                  <option value="Complete">
                    Completed
                  </option>
                </select>

                <div className="flex items-center gap-2 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />

                  <p className="text-xs text-gray-400">
                    Choose the current task status
                  </p>
                </div>
              </motion.div>

              {/* ================= DESCRIPTION ================= */}

              <motion.div
                {...fieldAnimation}
                transition={{ duration: 0.35, delay: 0.24 }}
                className="md:col-span-2"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>

                <div className="relative">

                  <FiFileText
                    className="absolute left-3.5 top-4 text-purple-500 pointer-events-none"
                    size={17}
                  />

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Add task description..."
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
              (editTask ? "Updating..." : "Adding...")
            :
            (editTask ? "Update Task" : "Add Task")
            }
               
              </motion.button>

            </div>
          </form>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskForm;