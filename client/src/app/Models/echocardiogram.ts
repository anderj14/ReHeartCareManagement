export interface Echocardiogram {
    id: number
    date: string
    cardiacDimensions: string
    ejectionFraction: string
    valveFunction: string
    velocitiesBloodFlows: string
    movementCardiacWalls: string
    pulmonaryArterialPressure: string
    bloodFlow: string
    indications: string
    findings: string
    clinicalImpression: string
    technicalDetails: string
    patient: string
}


export interface EchocardiogramParams {
    sort: string;
    pageIndex: number;
    pageSize: number;
  }