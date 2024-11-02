export interface Patient {
    id: number
    patientName: string
    carnetIdentification: string
    dob: string
    gender: string
    address: string
    phone: number
    email: string
    socialSecurity: string
    policyNumber: string
    fax: string
    referringDoctor: string
    assignedDoctor: string
    familyDoctor: string
    emergencyContactName: string
    emergencyContactNumber: string
    emergencyContactRelation: string
    maritalStatus: string
    occupation: string
    status: string
}

export interface PatientParams {
    sort: string;
    search?: string;
    pageIndex: number;
    pageSize: number;
    statusId: number;
}
