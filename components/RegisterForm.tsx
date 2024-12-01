"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import FormFieldsPatient from "./FormFieldsPatient";
import { Calendar, Mail, Phone, UserIcon } from "lucide-react";
import Submitbtn from "./Submitbtn";
import { patientformSchema, PatientFormValidation } from "@/lib/ZodSchema";
import { createPatient, RegiserUser } from "@/lib/actions/patient.action";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Doctors,
  IdentificationTypes,
  options,
  PatientFormDefaultValues,
} from "@/contants/options";
import { Label } from "./ui/label";
import { SelectItem } from "./ui/select";
import Image from "next/image";
import FileUploader from "./FileUploader";
import { toast } from "sonner";
const Registerfrom = ({ user }: { user: User }) => {
  console.log(user)
  const router = useRouter();
  const [islaoding, setisloading] = useState(false);
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setisloading(true);
    let formdata: FormData | undefined;

    if (
      values.identificationDocument &&
      values?.identificationDocument.length > 0
    ) {
      let blobfile = new Blob([values?.identificationDocument[0]], {
        type: values?.identificationDocument[0].type,
      });
      formdata = new FormData();
      formdata.append("filename", values.identificationDocument[0].name);
      formdata.append("file", blobfile);
    }
    try {
      const { treatmentConsent, disclosureConsent, ...rest } = values;
      const data = {
        ...rest,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument:values.identificationDocument
          ? formdata
          : undefined,
          privacyConsent:values.privacyConsent as true
      };
      const res = await RegiserUser(data);
      if (res?.status == "error") {
        toast.error("something went wrong try again");
        setisloading(false);
        return;
      }
      router.push(`/patients/${user.$id}/new-appointment`);
      setisloading(false);
    } catch (error) {
      setisloading(false);
       return;
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className=" flex flex-col mb-7 space-y-2  ">
          <h3 className=" font-bold text-[26px] "> Welcome 😇</h3>
          <p className=" text-xs text-zinc-400 ">
            We need to know a little bit more about you.
          </p>
        </div>
        <div className="  mb-7 space-y-6  ">
          <h3 className=" font-bold text-[20px] "> Personal Information </h3>
        </div>
        <FormFieldsPatient
          type={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          control={form.control}
          placeholder="Enter your name"
          iconSource={UserIcon}
          disabled
        />
        <div className=" xl:flex-row  flex-col flex gap-6 ">
          <FormFieldsPatient
            type={FormFieldType.INPUT}
            name="email"
            label="Email"
            control={form.control}
            placeholder="ex: xyz@gmail.com"
            iconSource={Mail}
            disabled
          />
          <FormFieldsPatient
            type={FormFieldType.PHONEINPUT}
            name="phone"
            label="Phone number"
            control={form.control}
            placeholder="ex: 03XX XXXXXXX"
            iconSource={Phone}
            disabled
          />
        </div>
        <div className=" xl:flex-row flex-col flex gap-6 ">
          <FormFieldsPatient
            type={FormFieldType.DATEPICKER}
            name="birthDate"
            label="Date of Birth"
            control={form.control}
            iconSource={Calendar}
          />
          <FormFieldsPatient
            type={FormFieldType.SKELETON}
            name="gender"
            label="Gender"
            control={form.control}
            renderfieldsradio={(field) => {
              return (
                <FormControl>
                  <RadioGroup
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className=" gap-6 h-11 flex xl:justify-between "
                  >
                    {options.map((option) => (
                      <div key={option} className=" radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label
                          className=" cursor-pointer capitalize"
                          htmlFor={option}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              );
            }}
          />
        </div>
        <div className=" flex xl:flex-row w-full flex-col gap-8 ">
          <FormFieldsPatient
            type={FormFieldType.INPUT}
            name="address"
            label="Address"
            control={form.control}
            placeholder="ex: 14th Street, city XYZ"
          />
          <FormFieldsPatient
            type={FormFieldType.INPUT}
            name="occupation"
            label="Occupation"
            control={form.control}
            placeholder=" e.g, Engineer "
          />
        </div>
        <div className=" flex xl:flex-row w-full flex-col gap-8 ">
          <FormFieldsPatient
            type={FormFieldType.INPUT}
            name="emergencyContactName"
            label="EmergencyContactName"
            control={form.control}
            placeholder="ex: john"
          />
          <FormFieldsPatient
            type={FormFieldType.PHONEINPUT}
            name="emergencyContactNumber"
            label="EmergencyContactNumber"
            control={form.control}
          />
        </div>
        <div className=" space-y-4 ">
          <span className=" font-bold text-[20px] capitalize">
            Medical information
          </span>
        </div>
        <FormFieldsPatient
          type={FormFieldType.SELECT}
          name="primaryPhysician"
          label="PrimaryPhsician"
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
        <div className=" flex xl:flex-row w-full flex-col gap-8 ">
          <FormFieldsPatient
            type={FormFieldType.INPUT}
            name="insuranceProvider"
            label="InsuranceProvider"
            control={form.control}
            placeholder="ex: John doe"
          />
          <FormFieldsPatient
            type={FormFieldType.INPUT}
            name="insurancePolicyNumber"
            label="InsurancePolicyNumber"
            control={form.control}
            placeholder="ex:  ABC1236666878 "
          />
        </div>
        <div className=" flex xl:flex-row w-full flex-col gap-8 ">
          <FormFieldsPatient
            type={FormFieldType.TEXTAREA}
            name="allergies"
            label="Allergiec (if any)"
            control={form.control}
            placeholder="ex: nuts, flowers, lilly, rose, garlic, redonion"
          />
          <FormFieldsPatient
            type={FormFieldType.TEXTAREA}
            name="currentMedication"
            label="CurrentMedication"
            control={form.control}
            placeholder="ex: paracetamol 500mg, Risek 40mg,"
          />
        </div>
        <div className=" flex xl:flex-row w-full flex-col gap-8 ">
          <FormFieldsPatient
            type={FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            label="Past Medical History"
            control={form.control}
            placeholder="ex:had insomnia"
          />
          <FormFieldsPatient
            type={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            label="Family Medical History"
            control={form.control}
            placeholder="ex: Father had liver problems"
          />
        </div>
        <div className=" space-y-4 ">
          <span className=" font-bold text-[20px] capitalize">
            Identification and Verification
          </span>
        </div>
        <FormFieldsPatient
          type={FormFieldType.SELECT}
          name="identificationType"
          label="Identification Type"
          control={form.control}
          placeholder="Select the Identification type "
          renderphysicianoption={() => {
            return IdentificationTypes.map((id) => (
              <SelectItem key={id} value={id}>
                <p className="  text-xs ">{id}</p>
              </SelectItem>
            ));
          }}
        />
        <FormFieldsPatient
          type={FormFieldType.INPUT}
          name="identificationNumber"
          label="Identification Number"
          control={form.control}
          placeholder="ex:  ABC1236666878 "
        />
        <FormFieldsPatient
          type={FormFieldType.SKELETON}
          name="identificationDocument"
          label="Identification Document"
          control={form.control}
          renderfieldsradio={(field) => {
            return (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            );
          }}
        />
        <div className=" space-y-4 ">
          <span className=" font-bold text-[20px] capitalize">
            Concent and Privacy
          </span>
        </div>
        <FormFieldsPatient
          type={FormFieldType.CHECKBOX}
          name="treatmentConsent"
          label="I consent to treatment"
          control={form.control}
        />
        <FormFieldsPatient
          type={FormFieldType.CHECKBOX}
          name="disclosureConsent"
          label="I consent to disclosure of info"
          control={form.control}
        />
        <FormFieldsPatient
          type={FormFieldType.CHECKBOX}
          name="privacyConsent"
          label="I consent to privacy policy"
          control={form.control}
        />
        <Submitbtn isloading={islaoding}>Submit</Submitbtn>
      </form>
    </Form>
  );
};

export default Registerfrom;
