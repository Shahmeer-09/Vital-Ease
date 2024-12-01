"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import FormFieldsPatient from "./FormFieldsPatient";
import { Mail, Phone, UserIcon } from "lucide-react";
import Submitbtn from "./Submitbtn";
import { patientformSchema } from "@/lib/ZodSchema";
import { createPatient } from "@/lib/actions/patient.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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
const PatientForm = () => {
  const router = useRouter();
  const [islaoding, setisloading] = useState(false);
  const form = useForm<z.infer<typeof patientformSchema>>({
    resolver: zodResolver(patientformSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof patientformSchema>) {
    setisloading(true);
    try {
      const res = await createPatient({ name, email, phone });
      if (res?.status == "error") {
        toast.error(res.msg);
        setisloading(false);
        return;
      }
      if (res?.user) {
        router.push(`/patients/${res?.user.$id}/register`);
        setisloading(false);
      }
    } catch (error) {
      setisloading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className=" flex flex-col mb-7 space-y-2  ">
          <h3 className=" font-bold text-[26px] "> Hi there 👋 </h3>
          <p className=" text-xs text-zinc-400 ">
            {" "}
            schedule your first appoinetment{" "}
          </p>
        </div>
        <FormFieldsPatient
          type={FormFieldType.INPUT}
          name="name"
          label="Username"
          control={form.control}
          placeholder="Enter your name"
          iconSource={UserIcon}
        />
        <FormFieldsPatient
          type={FormFieldType.INPUT}
          name="email"
          label="Email"
          control={form.control}
          placeholder="xyz@gmail.com"
          iconSource={Mail}
        />
        <FormFieldsPatient
          type={FormFieldType.PHONEINPUT}
          name="phone"
          label="Phone number"
          control={form.control}
          placeholder=" 03XX XXXXXXX"
          iconSource={Phone}
        />
        <Submitbtn isloading={islaoding}>Submit</Submitbtn>
      </form>
    </Form>
  );
};

export default PatientForm;
