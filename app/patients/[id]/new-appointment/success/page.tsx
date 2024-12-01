import { Doctors } from "@/contants/options";
import { getAppointMent } from "@/lib/actions/appointment.action";
import { Appointment } from "@/types/appwrite";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatTheDate } from "@/lib/utils";
import { Calendar, CheckCircle2 } from "lucide-react";
const page = async ({ searchParams, params }: SearchParamProps) => {
  const id = (await params)?.id as string;
  const appointid = (await searchParams)?.appointmentId as string;
  const appointment: Appointment = appointid && await getAppointMent(appointid);
  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );
  console.log(appointment.schedule);
  const dateSchedule = formatTheDate(appointment?.schedule);
  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img"> 
        <Link href="/">
        <div className=" gap-1 flex items-center ">
            <Image
              src={"/icons/letter-v.png"}
              alt="patient"
              height={18}
              width={18}
              className="  w-fit h-10 "
            />
            <span className=" text-[23px] font-bold text-zinc-100  ">
              {" "}
              PatientForm{" "}
            </span>
          </div>
        </Link>

        <section className="flex flex-col items-center">
          <CheckCircle2 className=" mb-5 size-[170px] text-emerald-600   " />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Calendar />
            <p>{dateSchedule}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${id}/new-appointment`}>New Appointment</Link>
        </Button>

        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default page;
