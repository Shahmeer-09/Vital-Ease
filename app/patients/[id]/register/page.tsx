import React from "react";
import Image from "next/image";
import Registerfrom from "@/components/RegisterForm";
import { CurrentUser, getPatient } from "@/lib/actions/patient.action";
import { redirect } from "next/navigation";
const Register = async ({ params }: { params: Promise<{ id: string }> }) => {
  const user = await CurrentUser((await params)?.id);

   const getCurrentPatient = await getPatient(user?.$id)
  if(getCurrentPatient&& getCurrentPatient.documents.length>0){
    return redirect(`/patients/${user.$id}/new-appointment  `)
  }
  return (
    <div className="flex h-screen max-h-screen  ">
      <section className=" container max-h-full  remove-scrollbar ">
        <div className="sub-container   remove-scrollbar  py-10 max-w-[800px] flex-col flex-1  ">
          <div className="   mb-10 gap-1 flex items-center ">
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
          <Registerfrom user={user} />
          <p className=" text-dark-700  py-10   xl:text-left ">
            © 2024 VitalEase
          </p>
        </div>
      </section>
      <Image
        src={"/register.jpg"}
        alt="main"
        height={1000}
        width={1000}
        className=" object-cover h-[100vh ] rounded-lg hidden md:block  object-center max-w-[30%]"
      />
    </div>
  );
};

export default Register;
