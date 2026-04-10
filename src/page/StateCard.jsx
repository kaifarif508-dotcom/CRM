import React from "react";

const StateCard = ({ title, number, percentage, icon, bgColor }) => {
  return (
    <div
      className={`flex items-center justify-between p-5 rounded-2xl shadow-xl ${bgColor} 
      hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer`}
    >
      <div>
        <h4 className="text-sm text-gray-300">{title}</h4>
        <p className="text-2xl font-bold text-white mt-1">{number}</p>
        <p
          className={`text-xs mt-1 ${
            percentage.startsWith("+") ? "text-green-400" : "text-red-400"
          } font-medium`}
        >
          {percentage}
        </p>
      </div>
      <div className="text-3xl text-white">{icon}</div>
    </div>
  );
};

export default StateCard;