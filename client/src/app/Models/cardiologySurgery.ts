
export interface CardiologySurgery {
    id: number
    surgeryName: string
    date: string
    time: string
    procedureDescription: string
    notes: string
    isEmergency: boolean
    isElective: boolean
    operationRoom: string
    preOpDiagnosis: string
    postOpDiagnosis: string
    isSuccessful: boolean
    duration: number
    cardiacCondition: string
    isMinimallyInvasive: boolean
    complications: string
    postOperativeStatus: string
    anesthesiaType: string
    surgicalTeam: string
    intraoperativeFindings: string
    postOperativeInstructions: string
    patient: string
    surgeryFollowUpId: number
}

export interface CardiologySurgeryParams {
    sort: string;
    search?: string;
    pageIndex: number;
    pageSize: number;
}
