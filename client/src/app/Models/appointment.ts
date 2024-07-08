
export interface Appointment {
    id: number
    startDate: string
    endDate: string
    description: string
    location: string
    appointmentStatus: string
    appointmentType: string
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
