export const options = ["Male","Female","Other"]
export const Doctors = [
    {
      image: "/docs/doc1.jpg",
      name: "John Green",
    },
    {
      image: "/docs/doc2.jpg",
      name: "Leila Cameron",
    },
    {
      image: "/docs/doc3.jpg",
      name: "David Livingston",
    },
    {
      image: "/docs/doc4.jpg",
      name: "Evan Peter",
    },
    {
      image: "/docs/doc1.jpg",
      name: "Jane Powell",
    },
    {
      image: "/docs/doc2.jpg",
      name: "Alex Ramirez",
    },
    {
      image: "/docs/doc3.jpg",
      name: "Jasmine Lee",
    }
  ];

  export const IdentificationTypes = [
    "Birth Certificate",
    "Driver's License",
    "Medical Insurance Card/Policy",
    "Military ID Card",
    "National Identity Card",
    "Passport",
    "Resident Alien Card (Green Card)",
    "Social Security Card",
    "State ID Card",
    "Student ID Card",
    "Voter ID Card",
  ];

  export const PatientFormDefaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: new Date(Date.now()),
    gender: "Male" as Gender,
    address: "",
    occupation: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    primaryPhysician: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    allergies: "",
    currentMedication: "",
    familyMedicalHistory: "",
    pastMedicalHistory: "",
    identificationType: "Birth Certificate",
    identificationNumber: "",
    identificationDocument: [],
    treatmentConsent: false,
    disclosureConsent: false,
    privacyConsent: false,
  };