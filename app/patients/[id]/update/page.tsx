import React from "react";
import Image from "next/image";
import { CurrentUser,  getFilePreview,  getPatient } from "@/lib/actions/patient.action";
import Updatefrom from "@/components/Updateinfo";
import { UpdatePatient } from "@/types/appwrite";

// import Updatefrom from "@/components/Updateinfo";

const Update = async ({ params }: { params: Promise<{ id: string }> }) => {
  const user = await CurrentUser((await params)?.id);
   const CurrentPatient = await getPatient(user?.$id)
   const patientdata:Partial<UpdatePatient> =CurrentPatient?.documents[0] 
   const imageUrl  = await getFilePreview(patientdata.identificationDocumentId!)
   const url = await getFilePreview(patientdata.identificationDocumentId!)
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
          <Updatefrom patient={CurrentPatient.documents[0]} imageUrl={url} />
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

export default Update;
