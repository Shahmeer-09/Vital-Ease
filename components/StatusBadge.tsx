import { Calendar1, LucideIcon, Timer, X } from "lucide-react";
import React from "react";

const StatusBadge = ({ value }: { value: Status }) => {
  return (
    <div
      className={`
         flex items-center gap-1
         px-3 py-1 rounded-full
          w-fit
        ${
          value == "scheduled"
            ? "bg-green-500"
            : value === "pending"
            ? "bg-purple-700"
            : "bg-yellow-400"
        }`}
    >
      {value == "cancelled" ? (
        <X className=" size-4 text-yellow-200 " />
      ) : value === "scheduled" ? (
        <Calendar1 className=" size-4 text-green-300 " />
      ) : value === "pending" ? (
        <Timer className=" size-4 text-purple-200 " />
      ) : (
        <></>
      )}
   
      <p className=" text-white " >{value}</p>
    </div>
  );
};

export default StatusBadge;
