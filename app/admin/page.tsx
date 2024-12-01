import React from "react";
import Image from "next/image";
import StatCard from "@/components/StatCard";
import { Calendar1, TimerIcon, TriangleAlert } from "lucide-react";
import {
  getAppointments,
  getAppointSats,
} from "@/lib/actions/appointment.action";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/Data-Table";
import Link from "next/link";

const page = async () => {
  const appointments = await getAppointments();
  const stats = await getAppointSats();

  return (
    <div className=" mx-auto max-w-7xl flex flex-col    ">
      <header className=" flex  justify-between items-center py-4 px-5 bg-dark-200 w-full ">
        <Link href={'/'}>
          <div className="   gap-1 flex items-center h-full  ">
            <Image
              src={"/icons/letter-v.png"}
              alt="patient"
              height={16}
              width={16}
              className="  w-fit h-10 "
            />
            <span className=" text-[20px] font-bold text-zinc-100  ">
              {" "}
              PatientForm{" "}
            </span>
          </div>
        </Link>
        <h2 className=" text-lg   font-medium ">AdminDashbord</h2>
      </header>
      <main className=" mx-auto px-[30px] w-full ">
        <section className=" flex flex-col gap-2  mt-[2rem]  ">
          <h1 className=" text-[36px] font-bold ">Welcome 👋 </h1>
          <p className=" text-sm capitalize  tracking-widest opacity-55 ">
            start day with managing new appoitments{" "}
          </p>
        </section>
        <section className=" mt-12 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1   gap-4 ">
          <StatCard
            type={"scheduled"}
            icon={Calendar1}
            count={stats?.scheduled!}
          />
          <StatCard type={"pending"} icon={TimerIcon} count={stats?.pending!} />
          <StatCard
            type={"cancelled"}
            icon={TriangleAlert}
            count={stats?.cancelled!}
          />
        </section>
        <section className=" my-7  ">
          <DataTable data={appointments?.documents ?? []} columns={columns} />
        </section>
      </main>
    </div>
  );
};

export default page;
