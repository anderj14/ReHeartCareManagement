export interface CardiologySurgery {
    id: number
    surgeryName: string
    date: string
    time: string
    procedureDescription: string
    notes: string
    isEmergency: string
    isElective: string
    operationRoom: string
    preOpDiagnosis: string
    postOpDiagnosis: string
    isSuccessful: string
    duration: number
    cardiacCondition: string
    isMinimallyInvasive: string
    patient: string
}

export interface CardiologySurgeryParams {
    sort: string;
    search?: string;
    pageIndex: number;
    pageSize: number;
}