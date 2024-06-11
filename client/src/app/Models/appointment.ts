import { Patient } from "./patient"

export interface Appointment {
    id: number
    date: string
    time: string
    description: string
    appointmentStatus: string
    patient: string
    patientEmail: string
    patientPhone: number
    patientAddress: string
    userDoctor: string
}

export interface AppointmentParams {
    sort: string;
    search?: string;
    pageIndex: number;
    pageSize: number;
}