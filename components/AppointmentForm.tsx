"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { Form } from "@/components/ui/form";
import FormFieldsPatient from "./FormFieldsPatient";
import Submitbtn from "./Submitbtn";
import { getAppointmentSchema, patientformSchema } from "@/lib/ZodSchema";
import { createPatient } from "@/lib/actions/patient.action";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { SelectItem } from "./ui/select";
import { Doctors } from "@/contants/options";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Appointment, Patient } from "@/types/appwrite";
import {
  createAppointment,
  UpdateAppointment,
} from "@/lib/actions/appointment.action";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "./ui/button";
export enum FormFieldType {
  INPUT = "input",
  PHONEINPUT = "phoneinput",
  DATEPICKER = "datepicker",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  SELECT = "select",
  SKELETON = "skeleton",
  TEXTAREA = "textarea",
}
const Appointmentform = ({
  type,
  userId,
  patientId,
  appointment,
  setOpen,
}: {
  type: "create" | "cancel" | "schedule";
  userId: string;
  patientId: string;
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [islaoding, setisloading] = useState(false);
  const AppintFormSchemaValidaton = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppintFormSchemaValidaton>>({
    resolver: zodResolver(AppintFormSchemaValidaton),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician ?? "",
      schedule: new Date(appointment?.schedule ?? Date.now()),
      reason: appointment?.reason ?? "",
      note: appointment?.note ?? "",
      cancellationReason: appointment?.cancellationReason ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppintFormSchemaValidaton>) {
    let status: Status =
      type === "schedule"
        ? "scheduled"
        : type === "cancel"
        ? "cancelled"
        : "pending";

    setisloading(true);
    try {
      if (type == "create" && patientId) {
        const data = {
          userId: userId,
          patientId: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason as string,
          note: values.note || "",
          status,
        };
        const res = await createAppointment(data);
        if (res?.status == "error") {
          toast.error("something went wron with appointment creation");
          setisloading(false);
          return;
        }

        router.push(
          `/patients/${userId}/new-appointment/success?appointmentId=${res?.data?.$id}`
        );
      } else {
        const data = {
          userId,
          appointmentId: appointment?.$id.toString(),
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          cancellationReason: values.cancellationReason,
          status,
        };
        const res = await UpdateAppointment(data);
        if (res?.status == "error") {
          toast.error("something went wrong try again");
          setisloading(false);
          setOpen && setOpen(false);
          return;
        }
        if (res) {
          form.reset();
          setOpen && setOpen(false);
          toast.success("appointment updated successfully");
          setisloading(false);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      setisloading(false);
    }
  }

  let buttontext =
    type === "schedule"
      ? "Schedule Appointment"
      : type === "cancel"
      ? "Cancel Appointment"
      : "Make Appointment";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className=" flex flex-col mb-7 space-y-2  ">
          <h3 className=" font-bold text-[26px] "> New Appointment </h3>
          <p className=" text-xs text-zinc-400 ">
            {" "}
            Request a new appointment with in 10 sec
          </p>
        </div>
        {type !== "cancel" && (
          <>
            <FormFieldsPatient
              type={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Doctor"
              control={form.control}
              placeholder="Select the Physician  "
              renderphysicianoption={() => {
                return Doctors.map((doct) => (
                  <SelectItem key={doct.name} value={doct?.name}>
                    <div className=" flex items-center gap-2 ">
                      <Image
                        alt={doct.name}
                        src={doct.image}
                        height={22}
                        width={18}
                        className=" rounded-3xl border-2 border-zinc-700 object-cover h-[28px] w-[28px]  "
                      />
                      <p className="  text-xs ">{doct.name}</p>
                    </div>
                  </SelectItem>
                ));
              }}
            />
            <FormFieldsPatient
              type={FormFieldType.DATEPICKER}
              name="schedule"
              label="Expected appointment date"
              control={form.control}
              iconSource={Calendar}
              showtimeselected
              dateformat="MM/dd/YYYY - h:mm aa"
            />
            <div className="xl:flex-row flex-col flex gap-6">
              <FormFieldsPatient
                type={FormFieldType.TEXTAREA}
                name="reason"
                label="Reason for appointment"
                control={form.control}
                placeholder="Enter the reason"
                disabled={type === "schedule"}
              />
              <FormFieldsPatient
                type={FormFieldType.TEXTAREA}
                name="note"
                label="Enter any additional info"
                control={form.control}
                placeholder=""
              />
            </div>
          </>
        )}
        {type == "cancel" && (
          <FormFieldsPatient
            type={FormFieldType.TEXTAREA}
            name="cancellationReason"
            label="Enter the reason"
            control={form.control}
            placeholder=""
          />
        )}

        <div className=" flex gap-2 items-center">
          <Submitbtn isloading={islaoding}>{buttontext}</Submitbtn>
          {type === "create" && (
            <Link href={`/patients/${userId}/update`}>
              <Button className="shad-primary-btn w-full text-[18px]    ">
                Update your info
              </Button>
            </Link>
          )}
        </div>
      </form>
    </Form>
  );
};

export default Appointmentform;
