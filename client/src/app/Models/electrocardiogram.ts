export interface Electrocardiogram {
    id: number
    date: string
    heartRhythm: string
    intervalsSegments: string
    characteristicWaves: string
    heartRate: string
    abnormalities: string
    artifacts: string
    interpretation: string
    detailedFindings: string
    bloodPressureSystolic: number
    bloodPressureDiastolic: number
    temperature: number
    clinicalNotes: string
    patient: number
}