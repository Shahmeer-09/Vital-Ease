import React from "react";
import Image from "next/image";
import Registerfrom from "@/components/RegisterForm";
import { CurrentUser, getPatient } from "@/lib/actions/patient.action";
import Appointmentform from "@/components/AppointmentForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const AppointmentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const user = await CurrentUser((await params)?.id);
  const CurrentPatient = await getPatient(user?.$id);

  return (
    <div className="flex h-screen max-h-screen  ">
      <section className=" container max-h-full  remove-scrollbar ">
        <div className="sub-container   remove-scrollbar  py-10 max-w-[800px] flex-col flex-1  ">
          <div className=" flex w-full justify-between flex-1 ">
            <div className="  mb-10 gap-1 flex items-center">
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
            
          </div>
          <Appointmentform
            type="create"
            userId={user.$id}
            patientId={CurrentPatient.documents[0].$id}
          />

          <p className=" text-dark-700  py-10   xl:text-left ">
            © 2024 VitalEase
          </p>
        </div>
      </section>
      <Image
        src={"/appointment.jpg"}
        alt="main"
        height={1000}
        width={1000}
        className=" object-cover h-[100vh ] rounded-lg hidden md:block  object-center max-w-[30%]"
      />
    </div>
  );
};

export default AppointmentPage;
