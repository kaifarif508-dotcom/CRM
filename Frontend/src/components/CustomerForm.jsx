import React, { useState,useEffect } from "react";
import api from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiX,
  FiCheck,
} from "react-icons/fi";

const CustomerForm = ({ onAddCustomer,editCustomer,onUpdateCustomer ,onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [loading,setLoading] = useState(false);
  useEffect(() => {
  if (editCustomer) {
    setName(editCustomer.name);
    setEmail(editCustomer.email);
    setPhone(editCustomer.phone);
    setCompany(editCustomer.company);
  }
}, [editCustomer]);

  async function submitHandler(e) {
    e.preventDefault();

    try{
      if(editCustomer){
        setLoading(true)
       const response = await api.put(`/customers/${editCustomer._id}`,{
          name,
          email,
          phone,
          company
        })
        onUpdateCustomer(response.data.customer);
      }
      else{
setLoading(true)
        const response = await api.post("/customers",{
          name,
          email,
          phone,
          company
        })
        onAddCustomer(response.data.customer);
      }
      
      
      setName("");
    setEmail("");
    setPhone("");
    setCompany("");

    onClose();
  } catch(error){
    console.log(error)
    console.log(error.response?.data)
  }
  finally{
    setLoading(false)
  }
  }

  // ================= INPUT STYLE =================

  const inputClass =
    "w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200";

  // ================= FIELD ANIMATION =================

  const fieldAnimation = {
    initial: {
      opacity: 0,
      y: 15,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: 0.35,
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="
          fixed
          inset-0
          z-50

          bg-gray-950/70
          backdrop-blur-sm

          flex
          items-center
          justify-center

          p-3
          sm:p-5
        "
      >

        {/* ================= MODAL ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 30,
            scale: 0.96,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          onClick={(e) => e.stopPropagation()}
          className="
            w-full
            max-w-3xl

            max-h-[95vh]
            overflow-y-auto

            bg-white

            rounded-2xl
            sm:rounded-3xl

            shadow-2xl
          "
        >

          {/* ================= HEADER ================= */}

          <div
            className="
              sticky
              top-0
              z-20

              bg-gray-950
              text-white

              px-4
              sm:px-6
              lg:px-7

              py-4
              sm:py-5
            "
          >

            <div className="flex items-center justify-between gap-3">

              {/* Header Left */}

              <div className="flex items-center gap-3 min-w-0">

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
                    delay: 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="
                    w-10
                    h-10
                    sm:w-11
                    sm:h-11
                    shrink-0

                    rounded-xl

                    bg-blue-600
                    text-white

                    flex
                    items-center
                    justify-center

                    shadow-lg
                    shadow-blue-600/30
                  "
                >
                  <FiUser size={20} />
                </motion.div>

                <div className="min-w-0">

                  <h2 className="text-base sm:text-xl font-bold truncate">
                    Add New Customer
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5 truncate">
                    Add a new customer to your CRM
                  </p>

                </div>

              </div>

              {/* Close Button */}

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{
                  scale: 1.08,
                  rotate: 90,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  shrink-0

                  rounded-xl

                  flex
                  items-center
                  justify-center

                  text-gray-400

                  hover:bg-red-500/20
                  hover:text-red-400

                  transition-colors
                  duration-200
                "
              >
                <FiX size={20} />
              </motion.button>

            </div>

          </div>

          {/* ================= FORM ================= */}

          <form
            onSubmit={submitHandler}
            className="
              p-4
              sm:p-6
              lg:p-7
            "
          >

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2

                gap-4
                sm:gap-5
              "
            >

              {/* ================= NAME ================= */}

              <motion.div {...fieldAnimation}>

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Customer Name
                </label>

                <div className="relative">

                  <FiUser
                    size={17}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2

                      text-blue-500

                      pointer-events-none
                    "
                  />

                  <input
                    type="text"
                    value={name}
                    placeholder="Enter customer name"
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    required
                  />

                </div>

              </motion.div>

              {/* ================= EMAIL ================= */}

              <motion.div
                {...fieldAnimation}
                transition={{
                  duration: 0.35,
                  delay: 0.05,
                }}
              >

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Email Address
                </label>

                <div className="relative">

                  <FiMail
                    size={17}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2

                      text-blue-500

                      pointer-events-none
                    "
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
                transition={{
                  duration: 0.35,
                  delay: 0.10,
                }}
              >

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Phone Number
                </label>

                <div className="relative">

                  <FiPhone
                    size={17}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2

                      text-emerald-500

                      pointer-events-none
                    "
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
                transition={{
                  duration: 0.35,
                  delay: 0.15,
                }}
              >

                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Company
                </label>

                <div className="relative">

                  <FiBriefcase
                    size={17}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2

                      text-amber-500

                      pointer-events-none
                    "
                  />

                  <input
                    type="text"
                    value={company}
                    placeholder="Enter company name"
                    onChange={(e) => setCompany(e.target.value)}
                    className={inputClass}
                    required
                  />

                </div>

              </motion.div>

            </div>

            {/* ================= FOOTER ================= */}

            <div
              className="
                flex
                flex-col-reverse
                sm:flex-row
                sm:justify-end

                gap-3

                mt-7
                pt-5

                border-t
                border-gray-100
              "
            >

              {/* Cancel */}

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{
                  scale: 1.02,
                  y: -1,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  w-full
                  sm:w-auto

                  px-5
                  py-3

                  rounded-xl

                  border
                  border-gray-200

                  text-gray-700
                  font-medium

                  hover:bg-gray-50
                  hover:border-gray-300

                  transition-all
                  duration-200
                "
              >
                Cancel
              </motion.button>

              {/* Add Customer */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{
                  scale: 1.02,
                  y: -1,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  w-full
                  sm:w-auto

                  px-6
                  py-3

                  rounded-xl

                  bg-blue-600
                  hover:bg-blue-700

                  text-white
                  font-semibold

                  shadow-lg
                  shadow-blue-600/20

                  hover:shadow-blue-600/30

                  transition-all
                  duration-200

                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
              

              <FiCheck size={18} />
{loading
 ?
(editCustomer ? "Updating..." : "Adding...")
:
(editCustomer ? "Update Customer" : "Add Customer")
}

              </motion.button>

            </div>

          </form>

        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
};

export default CustomerForm;