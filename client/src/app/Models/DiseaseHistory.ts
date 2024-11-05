export interface DiseaseHistory {
    id: number
    startDate: string
    description: string
    diagnosis: string
    severity: string
    notes: string
    isChronic: boolean
    doctorName: string
    treatment: string
    patient: string
    attachments: Attachment[]
}

export interface Attachment {
    filePath: string
    fileName: string
    diseaseHistoryId: number
}

export interface DiseaseHistoryParams {
    sort: string;
    pageIndex: number;
    pageSize: number;
}