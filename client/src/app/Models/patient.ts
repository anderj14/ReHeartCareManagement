export interface Patient {
    id: number;
    patientName: string;
    carnetIdentification: string
    dob: string
    gender: string
    address: string
    phone: number
    email: string
    socialSecurity: string
}

export interface PatientParams {
    sort: string;
    search?: string;
    pageIndex: number;
    pageSize: number;
}