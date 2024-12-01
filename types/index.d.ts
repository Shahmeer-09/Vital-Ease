/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: Promise<{ [key: string]: string }>;
    searchParams:Promise< { [key: string]: string | string[] | undefined }>;
  };
  
  declare type Gender = "Male" | "Female" | "Other";
  declare type Status = "pending" | "scheduled" | "cancelled";
  declare type AsyncSearchParamProps = {
    params: Promise<Params>;
    searchParams: Promise<SearchParams>;
  };
  declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
  }
  declare interface User extends CreateUserParams {
    $id: string;
  }
  
  declare interface RegisterUserParams extends CreateUserParams {
    documentId?:string 
    birthDate: Date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    allergies?: string | undefined;
    currentMedication?: string | undefined;
    familyMedicalHistory?: string | undefined;
    pastMedicalHistory?: string | undefined;
    identificationType?: string | undefined;
    identificationNumber?: string | undefined;
    identificationDocument?: FormData | undefined;
    identificationDocumentId?: string | undefined;
    identificationDocumentUrl?: string | undefined;
    privacyConsent: boolean;
  }

  
  declare type CreateAppointmentParams = {
    userId: string;
    patientId: string;
    primaryPhysician: string;
    reason: string;
    schedule: Date;
    status: Status;
    note?: string | undefined;
  };
  
  declare type UpdateAppointmentParams = {
    appointmentId?: string;
    userId: string;
    schedule?: Date;
    primaryPhysician?: string;
    cancellationReason?: string | undefined;
    status: Status | undefined;
  };