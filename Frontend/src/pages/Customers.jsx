import React, { useState } from "react";
import api from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit,
  FiTrash2,
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiX,
  FiMail,
} from "react-icons/fi";

const Customers = ({ customers = [], handleDelete, onEditCustomer, onOpenCustomerForm , user,page,totalPages,onPageChange}) => {

  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  

  
  // ================= SEARCH + FILTER =================

  const filteredCustomers = customers.filter((customer) => {
    const searchValue = search.toLowerCase();
    
    const name = customer.name?.toLowerCase() || "";
    const email = customer.email?.toLowerCase() || "";
    const phone = customer.phone?.toLowerCase() || "";
    const customerCompany = customer.company?.toLowerCase() || "";
    
    const matchesSearch =
    name.includes(searchValue) ||
    email.includes(searchValue) ||
    phone.includes(searchValue) ||
    customerCompany.includes(searchValue);
    
    const matchesCompany =
    company === "All" || customer.company === company;
    
    return matchesSearch && matchesCompany;
  });
  
  
  
  
  // ================= STATS =================
  
  const totalCustomers = customers.length;
  
  const companies = [
    ...new Set(
      customers
      .map((customer) => customer.company)
        .filter(Boolean)
    ),
  ];
  
  const uniqueCompanies = companies.length;
  
  const customersWithEmail = customers.filter(
    (customer) => customer.email
  ).length;
  
  const customersWithPhone = customers.filter(
    (customer) => customer.phone
  ).length;
  
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        whileHover={{ y: -4 }}
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
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
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
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
              <FiUsers size={20} />
            </motion.div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Customers
            </h1>

          </div>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Manage and track your customers
          </p>

        </div>

        <motion.button
          type="button"
          onClick={onOpenCustomerForm}
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          whileTap={{ scale: 0.97 }}
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
          Add Customer
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
          title="Total Customers"
          value={totalCustomers}
          icon={<FiUsers size={22} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          description={
            <>
              <FiUsers size={14} />
              All registered customers
            </>
          }
          delay={0.05}
        />

        <StatCard
          title="Companies"
          value={uniqueCompanies}
          icon={<FiUserCheck size={22} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          description="Unique customer companies"
          delay={0.1}
        />

        <StatCard
          title="With Email"
          value={customersWithEmail}
          icon={<FiMail size={22} />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          description="Customers with email"
          delay={0.15}
        />

        <StatCard
          title="With Phone"
          value={customersWithPhone}
          icon={<FiUserCheck size={22} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
          description="Customers with phone"
          delay={0.2}
        />

      </div>


      {/* ================= MAIN CONTAINER ================= */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
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
                Customer Directory
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Search and filter your customers
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
                  placeholder="Search customers..."
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


              {/* COMPANY FILTER */}

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
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="
                    w-full md:w-48
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
                    All Companies
                  </option>

                  {companies.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}

                </select>

              </div>

            </div>

          </div>

        </div>


        {/* ================= TABLE ================= */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-gray-950">

              <tr>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Customer
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Email
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Phone
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Company
                </th>

                <th className="text-center px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-gray-100">

              <AnimatePresence>

                {filteredCustomers.map((customer, index) => (

                  <motion.tr
                    key={customer._id}
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

                    {/* CUSTOMER */}

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
                            font-bold
                          "
                        >
                          {customer.name
                            ?.charAt(0)
                            ?.toUpperCase() || "C"}
                        </motion.div>

                        <div className="min-w-0">

                          <p className="font-semibold text-gray-900 truncate">
                            {customer.name || "Unnamed Customer"}
                          </p>

                          <p className="text-xs text-gray-400 mt-0.5">
                            CUST-{String(customer._id).slice(-4)}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td className="px-6 py-5 text-sm text-gray-600">
                      {customer.email || "—"}
                    </td>


                    {/* PHONE */}

                    <td className="px-6 py-5 text-sm text-gray-600">
                      {customer.phone || "—"}
                    </td>


                    {/* COMPANY */}

                    <td className="px-6 py-5">

                      <span className="
                        inline-flex
                        items-center
                        px-3 py-1.5
                        rounded-full
                        text-xs
                        font-semibold
                        bg-purple-50
                        text-purple-600
                        border border-purple-100
                      ">
                        {customer.company || "No Company"}
                      </span>

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
  onClick={() => setSelectedCustomer(customer)}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  title="View Customer"
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
                          onClick={()=> onEditCustomer(customer)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Edit Customer"
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

{ user?.role === "admin" && (

                        <motion.button
                        type="button"
                        onClick={()=>    handleDelete(customer._id)  }
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Delete Customer"
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
                        )
                      }

                      </div>

                    </td>

                  </motion.tr>

                ))}

              </AnimatePresence>

            </tbody>

          </table>

        </div>


        {/* ================= EMPTY STATE ================= */}

        {filteredCustomers.length === 0 && (

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
              <FiUsers size={30} />
            </motion.div>

            <h3 className="text-lg font-semibold text-gray-800">
              No customers found
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              Try changing your search or filter.
            </p>

            {(search || company !== "All") && (

              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSearch("");
                  setCompany("All");
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

        {/* ================= VIEW CUSTOMER MODAL ================= */}

<AnimatePresence>
  {selectedCustomer && (
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
      onClick={() => setSelectedCustomer(null)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md
          bg-white
          rounded-2xl
          shadow-2xl
          overflow-hidden
        "
      >

        {/* MODAL HEADER */}

        <div className="
          bg-gray-950
          px-5 py-4
          flex items-center justify-between
        ">
          <div className="flex items-center gap-3">

            <div className="
              w-11 h-11
              rounded-xl
              bg-blue-600
              text-white
              flex items-center justify-center
              font-bold
              text-lg
            ">
              {selectedCustomer.name
                ?.charAt(0)
                ?.toUpperCase() || "C"}
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                Customer Details
              </h2>

              <p className="text-xs text-gray-400">
                Customer Information
              </p>
            </div>

          </div>

          <motion.button
            type="button"
            onClick={() => setSelectedCustomer(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
          </motion.button>

        </div>


        {/* CUSTOMER DETAILS */}

        <div className="p-5 space-y-4">

          {/* NAME */}

          <div className="
            p-4
            rounded-xl
            bg-gray-50
            border border-gray-100
          ">
            <p className="text-xs text-gray-400 mb-1">
              Name
            </p>

            <p className="font-semibold text-gray-900">
              {selectedCustomer.name || "—"}
            </p>
          </div>


          {/* EMAIL */}

          <div className="
            p-4
            rounded-xl
            bg-gray-50
            border border-gray-100
          ">
            <p className="text-xs text-gray-400 mb-1">
              Email
            </p>

            <p className="font-semibold text-gray-900 break-all">
              {selectedCustomer.email || "—"}
            </p>
          </div>


          {/* PHONE */}

          <div className="
            p-4
            rounded-xl
            bg-gray-50
            border border-gray-100
          ">
            <p className="text-xs text-gray-400 mb-1">
              Phone
            </p>

            <p className="font-semibold text-gray-900">
              {selectedCustomer.phone || "—"}
            </p>
          </div>


          {/* COMPANY */}

          <div className="
            p-4
            rounded-xl
            bg-gray-50
            border border-gray-100
          ">
            <p className="text-xs text-gray-400 mb-1">
              Company
            </p>

            <span className="
              inline-flex
              px-3 py-1.5
              rounded-full
              text-xs
              font-semibold
              bg-purple-50
              text-purple-600
              border border-purple-100
            ">
              {selectedCustomer.company || "No Company"}
            </span>
          </div>


          {/* CLOSE BUTTON */}

          <motion.button
            type="button"
            onClick={() => setSelectedCustomer(null)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="
              w-full
              mt-2
              py-3
              rounded-xl
              bg-gray-950
              hover:bg-gray-800
              text-white
              font-medium
              transition
            "
          >
            Close
          </motion.button>

        </div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


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
      {filteredCustomers.length}
    </span>{" "}
    customers
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
     

    </div>
  );
};

export default Customers;