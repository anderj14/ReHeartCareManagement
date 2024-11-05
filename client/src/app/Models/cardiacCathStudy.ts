
export interface CardiacCathStudy {
  id: number
  date: string
  time: string
  locationMainCoronaryArteries: string
  blockageEachCoronaryArtery: number
  descriptionAbnormalities: string
  systolicPressureAorta: number
  diastolicPressureAorta: number
  chambersLeftAtrium: string
  chambersLeftVentricle: string
  chambersRightAtrium: string
  chambersRightVentricle: string
  bloodFlowCoronaryArteries: number
  velocityBloodFlow: number
  leftVentricularEjectionFraction: number
  systolicPressurePulmonaryArteries: number
  diastolicPressurePulmonaryArteries: number
  valvularInsufficiencyAortic: string
  valvularInsufficiencyMitral: string
  valvularInsufficiencyPulmonary: string
  valvularInsufficiencyTricuspid: string
  pressureGradientValves: number
  structuralAbnormalities: string
  cardiacChamberFunctions: string
  descriptionComplications: string
  conclusion: string
  patient: string
}


export interface CardiacCathStudyParams {
  sort: string;
  pageIndex: number;
  pageSize: number;
}