import { Models} from "appwrite";


export interface Patient extends Models.Document {
  $id:string
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  identificationDocumenId?: string 
  identificationDocumentUrl?: string

  privacyConsent: boolean;
}

 export interface UpdatePatient {
  $id:string
  name: string;
  email: string;
  phone: string;
  userId: string;
  privacyConsent: boolean;
  gender: string;
  birthDate: string; // Assuming birthDate is a valid ISO 8601 date string
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string;
  currentMedication: string;
  familyMedicalHistory: string;
  pastMedicalHistory: string;
  identificationType: string;
  identificationNumber: string;
  identificationDocumentId: string;
  identificationDocumentUrl: string;
  primaryPhysician: string;
  $id: string;
}
export interface Appointment extends Models.Document {
  $id:string
  patientId: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason?: string | null;
}