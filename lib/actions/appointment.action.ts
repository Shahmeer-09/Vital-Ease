"use server";

import { AppwriteException, ID, Query } from "node-appwrite";
import { databases} from "../appwrite.config";
import { Appointment } from "@/types/appwrite";
import { revalidatePath } from "next/cache";
import { formatTheDate } from "../utils";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const res = await databases.createDocument(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return {
      status: "success",
      data: res,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof AppwriteException) {
      return {
        status: "error",
        data: null,
      };
    }
  }
};

export const UpdateAppointment = async ({
  appointmentId,
  ...appointvalue
}: UpdateAppointmentParams) => {
  console.log(appointvalue);
  try {
    const res: Appointment = await databases.updateDocument(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      appointmentId!,
      appointvalue
    );

    const content = `
      HI form vital ease,
      your appointment for the date ${formatTheDate(res.schedule)} ${
      res.status == "scheduled"
        ? `has been sechedule for the doctor ${res.primaryPhysician}`
        : `has been cancelled bcs of ${res.reason}`
    }
      `;
    const userid = res.patientId.phone;
    console.log(userid);
    await SendMessage({ userid, content });
    revalidatePath("/admin");
    return {
      status: "success",
      data: res,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      data: null,
    };
  }
};
export const getAppointMent = async (appointid: string) => {
  try {
    const appointment = await databases.getDocument(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      appointid
    );
    return JSON.parse(JSON.stringify(appointment));
  } catch (error) {
    console.log(error);
    if (error instanceof AppwriteException) {
      return null;
    }
  }
};

export const getAppointSats = async () => {
  try {
    const appointmens = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
    const intiaal: {
      cancelled: number;
      pending: number;
      scheduled: number;
    } = {
      cancelled: 0,
      pending: 0,
      scheduled: 0,
    };

    if (appointmens.documents.length > 0) {
      (appointmens.documents as unknown as Appointment[]).forEach(
        (appointment) => {
          if (appointment.status === "cancelled") {
            intiaal.cancelled++;
          } else if (appointment.status === "pending") {
            intiaal.pending++;
          } else if (appointment.status === "scheduled") {
            intiaal.scheduled++;
          }
        }
      );
    }

    return intiaal;
  } catch (error) {
    console.log(error);
    if (error instanceof AppwriteException) {
      return null;
    }
  }
};

export const getAppointments = async () => {
  try {
    const appointments = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
    return JSON.parse(JSON.stringify(appointments));
  } catch (error) {
    console.log(error);
    return [];
  }
};
  const client = require("twilio")(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEM)
export const SendMessage = async ({
  userid,
  content,
}: {
  userid: string;
  content: string;
}) => {
  try {
     await client.messages.create({
      body: content,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: userid,
    });
  } catch (error) {
    throw error;
  }
};
