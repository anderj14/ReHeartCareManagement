export interface Diagnostics {
    id: number
    date: string
    conditionName: string
    description: string
    classificationCondition: string
    severity: string
    riskAssessment: string
    conclusions: string
    recommendations: string
    followUpPlan: string
    patient: string
}

export interface DiagnosticParams {
    sort: string;
    pageIndex: number;
    pageSize: number;
}