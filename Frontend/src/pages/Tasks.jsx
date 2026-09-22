import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit,
  FiTrash2,
  FiCheckSquare,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";

const Tasks = ({ tasks = [], onOpenTaskForm , handleDeleteTask,  handleEditTask , user,page,totalPages,onPageChange }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [viewTask, setViewTask] = useState(null);

  // ================= FILTER =================

  const filteredTasks = tasks.filter((task) => {
    const title = task.title?.toLowerCase() || "";
    const customer = task.customer?.name?.toLowerCase() || "";
    const assignedTo = task.team?.toLowerCase() || "";

    const searchValue = search.toLowerCase();

    const matchesSearch =
      title.includes(searchValue) ||
      customer.includes(searchValue) ||
      assignedTo.includes(searchValue);

    const matchesStatus =
      status === "All" || task.status === status;

    const matchesPriority =
      priority === "All" || task.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // ================= STATS =================

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "InProgress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Complete"
  ).length;

  // ================= STATUS STYLE =================

  const getStatusStyle = (taskStatus) => {
    switch (taskStatus) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border border-amber-100";

      case "InProgress":
        return "bg-blue-50 text-blue-700 border border-blue-100";

      case "Complete":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";

      default:
        return "bg-gray-50 text-gray-600 border border-gray-100";
    }
  };

  // ================= PRIORITY STYLE =================

  const getPriorityStyle = (taskPriority) => {
    switch (taskPriority) {
      case "High":
        return "bg-red-50 text-red-700 border border-red-100";

      case "Medium":
        return "bg-amber-50 text-amber-700 border border-amber-100";

      case "Low":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";

      default:
        return "bg-gray-50 text-gray-600 border border-gray-100";
    }
  };

  // ================= STAT CARD =================

  const StatCard = ({
    title,
    value,
    icon,
    iconBg,
    iconColor,
    description,
    delay,
  }) => {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          delay,
        }}
        whileHover={{
          y: -4,
        }}
        className="
          bg-white
          border border-gray-100
          rounded-2xl
          p-5
          shadow-sm
          hover:shadow-lg
          transition-all duration-300
        "
      >

        <div className="flex items-center justify-between gap-4">

          <div>

            <p className="text-sm font-medium text-gray-500">
              {title}
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              {value}
            </h2>

          </div>

          <div
            className={`
              w-12 h-12
              shrink-0
              rounded-xl
              ${iconBg}
              ${iconColor}
              flex items-center justify-center
            `}
          >
            {icon}
          </div>

        </div>

        <div
          className={`
            mt-4
            flex items-center gap-2
            text-xs font-medium
            ${iconColor}
          `}
        >
          {description}
        </div>

      </motion.div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-3 sm:p-5 lg:p-6">

      {/* ================= HEADER ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
        }}
        className="
          flex flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-6 sm:mb-8
        "
      >

        <div>

          <div className="flex items-center gap-3">

            <motion.div
              initial={{
                scale: 0,
                rotate: -10,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: 0.1,
                type: "spring",
                stiffness: 180,
              }}
              className="
                w-10 h-10 sm:w-11 sm:h-11
                rounded-xl
                bg-gray-950
                text-white
                flex items-center justify-center
                shadow-sm
              "
            >
              <FiCheckSquare size={20} />
            </motion.div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Tasks
            </h1>

          </div>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Manage and track your team's tasks
          </p>

        </div>

        <motion.button
          type="button"
          onClick={onOpenTaskForm}
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="
            w-full md:w-auto
            flex items-center justify-center gap-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5 py-3
            rounded-xl
            font-medium
            shadow-sm
            hover:shadow-lg
            transition-all duration-200
          "
        >
          <FiPlus size={19} />
          Add Task
        </motion.button>

      </motion.div>


      {/* ================= STATS ================= */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4 sm:gap-5
        mb-6 sm:mb-8
      ">

        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={<FiCheckSquare size={22} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          description="All assigned tasks"
          delay={0.05}
        />

        <StatCard
          title="Pending"
          value={pendingTasks}
          icon={<FiClock size={22} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          description="Waiting to start"
          delay={0.1}
        />

        <StatCard
          title="In Progress"
          value={inProgressTasks}
          icon={<FiAlertCircle size={22} />}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
          description="Currently active"
          delay={0.15}
        />

        <StatCard
          title="Completed"
          value={completedTasks}
          icon={<FiCheckCircle size={22} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          description="Successfully completed"
          delay={0.2}
        />

      </div>


      {/* ================= MAIN CONTAINER ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
        className="
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-sm
          overflow-hidden
        "
      >

        {/* ================= FILTER HEADER ================= */}

        <div className="p-4 sm:p-5 border-b border-gray-100">

          <div className="
            flex flex-col
            xl:flex-row
            gap-4
            xl:items-center
            xl:justify-between
          ">

            <div>

              <h2 className="font-bold text-gray-900">
                Task Management
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Search and filter your team's tasks
              </p>

            </div>


            {/* CONTROLS */}

            <div className="
              flex flex-col
              md:flex-row
              gap-3
              w-full xl:w-auto
            ">

              {/* SEARCH */}

              <div className="relative w-full md:w-80 lg:w-96">

                <FiSearch
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Search tasks, customers or users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="
                    w-full
                    pl-11 pr-11
                    py-3
                    bg-gray-50
                    border border-gray-200
                    rounded-xl
                    outline-none
                    text-sm
                    text-gray-700
                    placeholder:text-gray-400
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    transition-all duration-200
                  "
                />

                {search && (
                  <motion.button
                    type="button"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearch("")}
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      w-7 h-7
                      rounded-lg
                      flex items-center justify-center
                      text-gray-400
                      hover:bg-red-50
                      hover:text-red-500
                      transition
                    "
                  >
                    <FiX size={15} />
                  </motion.button>
                )}

              </div>


              {/* FILTERS */}

              <div className="flex flex-col sm:flex-row gap-3">

                {/* STATUS */}

                <div className="relative">

                  <FiFilter
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      pointer-events-none
                    "
                    size={16}
                  />

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="
                      w-full sm:w-44
                      pl-9 pr-8
                      py-3
                      bg-gray-50
                      border border-gray-200
                      rounded-xl
                      outline-none
                      text-sm
                      text-gray-700
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                      transition-all duration-200
                      cursor-pointer
                    "
                  >

                    <option value="All">
                      All Status
                    </option>

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

                </div>


                {/* PRIORITY */}

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="
                    w-full sm:w-44
                    px-4
                    py-3
                    bg-gray-50
                    border border-gray-200
                    rounded-xl
                    outline-none
                    text-sm
                    text-gray-700
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    transition-all duration-200
                    cursor-pointer
                  "
                >

                  <option value="All">
                    All Priority
                  </option>

                  <option value="High">
                    High
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Low">
                    Low
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>


        {/* ================= TABLE ================= */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead className="bg-gray-950">

              <tr>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Task
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Assigned To
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Customer
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Due Date
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Priority
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Status
                </th>

                <th className="text-center px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-gray-100">

              <AnimatePresence>

                {filteredTasks.map((task, index) => (

                  <motion.tr
                    key={task._id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.04,
                    }}
                    className="
                      hover:bg-blue-50/40
                      transition-colors duration-200
                    "
                  >

                    {/* TASK */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <motion.div
                          whileHover={{
                            scale: 1.08,
                            rotate: 3,
                          }}
                          className="
                            w-11 h-11
                            shrink-0
                            rounded-xl
                            bg-blue-100
                            text-blue-600
                            flex items-center justify-center
                          "
                        >
                          <FiCheckSquare size={19} />
                        </motion.div>

                        <div className="min-w-0">

                          <p className="
                            font-semibold
                            text-gray-900
                            truncate
                            max-w-[220px]
                          ">
                            {task.title || "Untitled Task"}
                          </p>

                          <p className="text-xs text-gray-400 mt-0.5">
                            TASK-{String(task._id).slice(-4)}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* ASSIGNED */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <motion.div
                          whileHover={{ scale: 1.08 }}
                          className="
                            w-8 h-8
                            shrink-0
                            rounded-full
                            bg-indigo-50
                            text-indigo-600
                            border border-indigo-100
                            flex items-center justify-center
                            text-xs
                            font-bold
                          "
                        >
                          {task.team
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </motion.div>

                        <span className="text-gray-700 font-medium">
                          {task.team || "Unassigned"}
                        </span>

                      </div>

                    </td>


                    {/* CUSTOMER */}

                    <td className="px-6 py-5 text-gray-700 font-medium">
                      {task.customer?.name || "—"}
                    </td>


                    {/* DATE */}

                    <td className="px-6 py-5 text-gray-600">
                      {task.date || "—"}
                    </td>


                    {/* PRIORITY */}

                    <td className="px-6 py-5">

                      <motion.span
                        whileHover={{ scale: 1.04 }}
                        className={`
                          inline-flex
                          items-center
                          px-3 py-1.5
                          rounded-full
                          text-xs
                          font-bold
                          ${getPriorityStyle(task.priority)}
                        `}
                      >
                        {task.priority || "—"}
                      </motion.span>

                    </td>


                    {/* STATUS */}

                    <td className="px-6 py-5">

                      <motion.span
                        whileHover={{ scale: 1.04 }}
                        className={`
                          inline-flex
                          items-center
                          px-3 py-1.5
                          rounded-full
                          text-xs
                          font-bold
                          ${getStatusStyle(task.status)}
                        `}
                      >
                        {task.status || "—"}
                      </motion.span>

                    </td>


                    {/* ACTIONS */}

                    <td className="px-6 py-5">

                      <div className="
                        flex
                        items-center
                        justify-center
                        gap-1.5
                      ">

                        <motion.button
                          type="button"
                          onClick={() => setViewTask(task)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="View Task"
                          className="
                            w-9 h-9
                            rounded-lg
                            flex items-center justify-center
                            text-gray-500
                            hover:bg-blue-50
                            hover:text-blue-600
                            transition
                          "
                        >
                          <FiEye size={17} />
                        </motion.button>

                        <motion.button
                          type="button"
                          onClick={()=>{
                            handleEditTask(task)
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Edit Task"
                          className="
                            w-9 h-9
                            rounded-lg
                            flex items-center justify-center
                            text-gray-500
                            hover:bg-green-50
                            hover:text-green-600
                            transition
                          "
                        >
                          <FiEdit size={17} />
                        </motion.button>


{user?.role === "admin" &&(

                        <motion.button
                          type="button"
                          onClick={() => handleDeleteTask(task._id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Delete Task"
                          className="
                            w-9 h-9
                            rounded-lg
                            flex items-center justify-center
                            text-gray-500
                            hover:bg-red-50
                            hover:text-red-600
                            transition
                          "
                        >
                          <FiTrash2 size={17} />
                        </motion.button>
)}

                      </div>

                    </td>

                  </motion.tr>

                ))}

              </AnimatePresence>

            </tbody>

          </table>

        </div>


        {/* ================= EMPTY STATE ================= */}

        {filteredTasks.length === 0 && (

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="py-16 px-5 text-center"
          >

            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                w-16 h-16
                mx-auto
                rounded-2xl
                bg-gray-100
                text-gray-400
                flex items-center justify-center
                mb-4
              "
            >
              <FiCheckSquare size={30} />
            </motion.div>

            <h3 className="text-lg font-semibold text-gray-800">
              No tasks found
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
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  px-4 py-2.5
                  rounded-xl
                  bg-gray-950
                  text-white
                  text-sm
                  font-medium
                  hover:bg-gray-800
                  transition
                "
              >
                <FiX size={15} />
                Clear Filters
              </motion.button>

            )}

          </motion.div>

        )}


        {/* ================= FOOTER ================= */}

       {/* ================= FOOTER ================= */}

<div className="
  px-4 sm:px-6
  py-4
  border-t border-gray-100
  bg-gray-50/50
  flex flex-col
  sm:flex-row
  items-center
  justify-between
  gap-4
">

  <p className="text-xs sm:text-sm text-gray-500">
    Showing{" "}
    <span className="font-semibold text-gray-700">
      {filteredTasks.length}
    </span>{" "}
    tasks
  </p>

  <div className="flex items-center gap-2">

    <button
      type="button"
      disabled={page === 1}
      onClick={() => onPageChange(page - 1)}
      className="
        px-4 py-2
        rounded-lg
        border border-gray-200
        bg-white
        text-sm
        font-medium
        text-gray-700
        disabled:opacity-40
        disabled:cursor-not-allowed
        hover:bg-gray-50
      "
    >
      Previous
    </button>

    <span className="
      px-4 py-2
      rounded-lg
      bg-gray-950
      text-white
      text-sm
      font-medium
    ">
      {page} / {totalPages}
    </span>

    <button
      type="button"
      disabled={page === totalPages}
      onClick={() => onPageChange(page + 1)}
      className="
        px-4 py-2
        rounded-lg
        border border-gray-200
        bg-white
        text-sm
        font-medium
        text-gray-700
        disabled:opacity-40
        disabled:cursor-not-allowed
        hover:bg-gray-50
      "
    >
      Next
    </button>

  </div>

</div>

      </motion.div>
      {/* ================= VIEW TASK MODAL ================= */}

<AnimatePresence>
  {viewTask && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed inset-0 z-50
        bg-black/50
        backdrop-blur-sm
        flex items-center justify-center
        p-4
      "
      onClick={() => setViewTask(null)}
    >

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-2xl
          bg-white
          rounded-2xl
          shadow-2xl
          overflow-hidden
        "
      >

        {/* HEADER */}

        <div className="
          px-5 sm:px-6
          py-5
          bg-gray-950
          text-white
          flex items-center justify-between
        ">

          <div className="flex items-center gap-3">

            <div className="
              w-11 h-11
              rounded-xl
              bg-blue-600
              flex items-center justify-center
            ">
              <FiCheckSquare size={20} />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                Task Details
              </h2>

              <p className="text-xs text-gray-400 mt-0.5">
                TASK-{String(viewTask._id).slice(-4)}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setViewTask(null)}
            className="
              w-9 h-9
              rounded-lg
              flex items-center justify-center
              text-gray-400
              hover:bg-white/10
              hover:text-white
              transition
            "
          >
            <FiX size={20} />
          </button>

        </div>


        {/* BODY */}

        <div className="p-5 sm:p-6">

          {/* TASK TITLE */}

          <div className="mb-6">

            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Task
            </p>

            <h3 className="text-xl font-bold text-gray-900">
              {viewTask.title || "Untitled Task"}
            </h3>

          </div>


          {/* DETAILS GRID */}

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4
          ">

            {/* ASSIGNED TO */}

            <div className="
              p-4
              rounded-xl
              bg-gray-50
              border border-gray-100
            ">

              <p className="text-xs font-semibold text-gray-400 uppercase">
                Assigned To
              </p>

              <div className="flex items-center gap-2 mt-2">

                <div className="
                  w-9 h-9
                  rounded-full
                  bg-indigo-50
                  text-indigo-600
                  border border-indigo-100
                  flex items-center justify-center
                  text-sm font-bold
                ">
                  {viewTask.team
                    ?.charAt(0)
                    ?.toUpperCase() || "U"}
                </div>

                <span className="font-semibold text-gray-800">
                  {viewTask.team || "Unassigned"}
                </span>

              </div>

            </div>


            {/* CUSTOMER */}

            <div className="
              p-4
              rounded-xl
              bg-gray-50
              border border-gray-100
            ">

              <p className="text-xs font-semibold text-gray-400 uppercase">
                Customer
              </p>

              <p className="font-semibold text-gray-800 mt-2">
                {viewTask.customer?.name || "—"}
              </p>

            </div>


            {/* DUE DATE */}

            <div className="
              p-4
              rounded-xl
              bg-gray-50
              border border-gray-100
            ">

              <p className="text-xs font-semibold text-gray-400 uppercase">
                Due Date
              </p>

              <p className="font-semibold text-gray-800 mt-2">
                {viewTask.date || "—"}
              </p>

            </div>


            {/* PRIORITY */}

            <div className="
              p-4
              rounded-xl
              bg-gray-50
              border border-gray-100
            ">

              <p className="text-xs font-semibold text-gray-400 uppercase">
                Priority
              </p>

              <motion.span
                className={`
                  inline-flex
                  mt-2
                  px-3 py-1.5
                  rounded-full
                  text-xs
                  font-bold
                  ${getPriorityStyle(viewTask.priority)}
                `}
              >
                {viewTask.priority || "—"}
              </motion.span>

            </div>


            {/* STATUS */}

            <div className="
              p-4
              rounded-xl
              bg-gray-50
              border border-gray-100
              sm:col-span-2
            ">

              <p className="text-xs font-semibold text-gray-400 uppercase">
                Status
              </p>

              <motion.span
                className={`
                  inline-flex
                  mt-2
                  px-3 py-1.5
                  rounded-full
                  text-xs
                  font-bold
                  ${getStatusStyle(viewTask.status)}
                `}
              >
                {viewTask.status === "InProgress"
                  ? "In Progress"
                  : viewTask.status === "Complete"
                  ? "Completed"
                  : viewTask.status || "—"}
              </motion.span>

            </div>

          </div>


          {/* NOTES */}

          <div className="
            mt-5
            p-4
            rounded-xl
            bg-gray-50
            border border-gray-100
          ">

            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
              Notes
            </p>

            <p className="
              text-sm
              text-gray-600
              leading-relaxed
              whitespace-pre-wrap
            ">
              {viewTask.notes || "No notes available."}
            </p>

          </div>

        </div>


        {/* FOOTER */}

        <div className="
          px-5 sm:px-6
          py-4
          border-t border-gray-100
          bg-gray-50
          flex justify-end
        ">

          <button
            type="button"
            onClick={() => setViewTask(null)}
            className="
              px-5 py-2.5
              rounded-xl
              bg-gray-950
              text-white
              text-sm
              font-medium
              hover:bg-gray-800
              transition
            "
          >
            Close
          </button>

        </div>

      </motion.div>

    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default Tasks;