"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Appointment } from "@/types/appwrite";
import Image from "next/image";
import StatusBadge from "./StatusBadge";
import { formatTheDate } from "@/lib/utils";
import { Doctors } from "@/contants/options";
import { AppointmentmModel } from "./AppointmentFormModel";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => (
      <p className=" text-[15px] font-medium  ">{row.index + 1}</p>
    ),
  },
  {
    accessorKey: "patientId",
    header: "Patient",
    cell: ({ row }) => (
      <p className=" text-[14px] font-medium ">
        {row.original.patientId.name}{" "}
      </p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge value={row.original.status} />,
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => <span>{formatTheDate(row.original.schedule)}</span>,
  },
  {
    accessorKey: "primaryPhysician ",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );
      return (
        <div className=" flex items-center gap-3 ">
          <Image
            src={doctor?.image!}
            alt={doctor?.name!}
            width={18}
            height={18}
            className="rounded-full object-cover h-[22px] w-[22px] "
          />
          <p className=" ">{doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header:"Actions",
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className=" flex items-center gap-3 ">
          <AppointmentmModel value="schedule" appointment={row.original} userId={row.original.userId} patientId={row.original.patientId.$id}/>
          <AppointmentmModel value="cancel" appointment={row.original} userId={row.original.userId} patientId={row.original.patientId.$id}/>
        </div>
      )
  },

  }
];
