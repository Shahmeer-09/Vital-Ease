import { LucideIcon } from "lucide-react";
import React from "react";

interface StatCardProps {
  type: "cancelled" | "pending" | "scheduled";
  icon: LucideIcon;
  count: number;
}

const StatCard = ({ type, icon: Icon, count }: StatCardProps) => {
  return (
    <div className=" flex-1  bg-gray-900 rounded-xl  ">
      <div
        className={` rounded-xl flex flex-col gap-4  w-full px-5 py-8 ${
          type == "scheduled"
            ? "bg-scheduled"
            : type === "pending"
            ? "bg-pending"
            : "bg-cancelled"
        }  `}
      >
        <div className="flex items-center gap-x-2 ">
          <Icon
            className={` size-8  ${
              type == "scheduled"
                ? "text-green-300 "
                : type === "pending"
                ? "text-yellow-300"
                : "text-red-400"
            }`}
          />
          <span className=" text-[20px] font-medium "> {count}</span>
        </div>
        <div className=" text-sm text-zinc-300 ">
          Total number of pending of {type} assignments
        </div>
      </div>
    </div>
  );
};

export default StatCard;
