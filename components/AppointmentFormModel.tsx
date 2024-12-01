import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Appointmentform from "./AppointmentForm";
import { Appointment } from "@/types/appwrite";
import { useState } from "react";

type value = {
  value: "schedule" | "cancel";
  userId: string;
  patientId: string;
  appointment: Appointment;
};
export const AppointmentmModel = ({
  appointment,
  value,
  userId,
  patientId,
}: value) => {

  const [open, setopne] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setopne} >
      <DialogTrigger
        className={`${
          value == "cancel" ? "" : "bg-green-700"
        } rounded-full  px-2 py-1 text-sm text-white `}
      >
        {value}
      </DialogTrigger>
      <DialogContent className=" bg-dark-400 border-none ">
        <DialogHeader>
          <DialogTitle className=" capitalize ">
            {value} Appointment{" "}
          </DialogTitle>
          <DialogDescription className=" text-zinc-300 capitalize   ">
            please fill in the following detail to {value} the appointmet
          </DialogDescription>
        </DialogHeader>
        <Appointmentform
          type={value}
          userId={userId}
          patientId={patientId}
          appointment={appointment}
          setOpen={setopne}
        />
      </DialogContent>
    </Dialog>
  );
};
