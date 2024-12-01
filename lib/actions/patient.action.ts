"use server";

import { AppwriteException, ID, InputFile, Query } from "node-appwrite";
import { databases, storage, users } from "../appwrite.config";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const createPatient = async (user: CreateUserParams) => {
  console.log(user);
  try {
    const existingUser = await users.list([Query.equal("email", [user.email])]);
    if (existingUser.users.length > 0) {
      return {
        msg: "User already exists",
        user: existingUser.users[0],
      };
    }
    const User = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return {
      status: "success",
      msg: "User created successfully",
      user: User,
    };
  } catch (error: any) {
    console.log(error);
    if (error instanceof AppwriteException) {
      return {
        status: "error",
        msg: error.message,
        user: null,
      };
    }
  }
};

export const CurrentUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return user;
  } catch (error) {
    console.log(error);
    return redirect("/");
  }
};

export const UpdateUser = async ({
  identificationDocument,
  identificationDocumentUrl,
  documentId,
  ...patient
}: RegisterUserParams) => {
  // console.log(documentId);
  let file;
  try {
    if (identificationDocument !== undefined) {
      const inputfile = await InputFile.fromBlob(
        identificationDocument?.get("file") as Blob,
        identificationDocument?.get("filename") as string
      );
      file = await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID!,
        ID.unique(),
        inputfile
      );
    }
    const identificationDocumentUrlVal = file?.$id
      ? `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view?project=${process.env.PROJECT_ID}`
      : identificationDocumentUrl?.toString() ?? null;
    const data = {
      ...patient,
      identificationDocumentId: file?.$id ?? patient.identificationDocumentId,
      identificationDocumentUrl: identificationDocumentUrlVal,
    };
    const response = await databases.updateDocument(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      documentId!,
      data
    );
    revalidatePath(`/`);
    return {
      status: "success",
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error) {
    console.log(error);
    if (error instanceof AppwriteException)
      return {
        status: "error",
        data: error.message,
      };
  }
};
export const RegiserUser = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  let file;
  try {
    if (identificationDocument) {
      const inputfile = await InputFile.fromBlob(
        identificationDocument?.get("file") as Blob,
        identificationDocument?.get("filename") as string
      );
      file = await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID!,
        ID.unique(),
        inputfile
      );
    }
    const identificationDocumentUrl = file?.$id
      ? `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view?project=${process.env.PROJECT_ID}`
      : null;
    const patientres = await databases.createDocument(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...patient,
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl,
      }
    );

    return {
      status: "success",
      data: JSON.parse(JSON.stringify(patientres)),
    };
  } catch (error) {
    console.log(error);
    if (error instanceof AppwriteException)
      return {
        status: "error",
        data: error.message,
      };
  }
};

export const getPatient = async (userId: string) => {
  try {
    const getCurrentPatient = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    return getCurrentPatient;
  } catch (error) {
    console.log(error);
    return redirect("/");
  }
};

export async function getFilePreview(fileId: string) {
  try {
    const result = await storage.getFilePreview(
      process.env.NEXT_PUBLIC_BUCKET_ID!,
      fileId
    );
    const base64 = Buffer.from(result).toString("base64");
    return `data:image/webp;base64,${base64}`;
  } catch (error) {
    console.error("Error fetching file preview:", error);
    return null;
  }
}
