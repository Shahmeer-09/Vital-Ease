import { OTPDialogue } from "@/components/OTPDialogue";
import PatientForm from "@/components/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen  ">
      <section className=" container  max-h-full remove-scrollbar  my-auto">
        <div className="sub-container  overflow-y-scroll   remove-scrollbar  max-w-[496px] ">
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
          <PatientForm />
          <div className=" flex justify-between mt-20 text-[14px] font-medium  ">
            <p className=" text-dark-700 justify-items-end  xl:text-left ">
              © 2024 VitalEase
            </p>
            <OTPDialogue/>
          </div>
        </div>
      </section>
      <Image
        src={"/MainDoc.jpg"}
        alt="main"
        height={1000}
        width={1000}
        className=" object-cover hidden md:block  h-[100vh] rounded-lg  object-top  max-w-[50%]"
      />
    </div>
  );
}
