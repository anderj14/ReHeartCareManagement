export interface CardiacCathStudyBase {
  date: string;
  locationMainCoronaryArteries: string;
  blockageEachCoronaryArtery: number;
  descriptionAbnormalities: string;
  systolicPressureAorta: number;
  diastolicPressureAorta: number;
  chambersLeftAtrium: string;
  chambersLeftVentricle: string;
  chambersRightAtrium: string;
  chambersRightVentricle: string;
  bloodFlowCoronaryArteries: number;
  velocityBloodFlow: number;
  leftVentricularEjectionFraction: number;
  systolicPressurePulmonaryArteries: number;
  diastolicPressurePulmonaryArteries: number;
  valvularInsufficiencyAortic: string;
  valvularInsufficiencyMitral: string;
  valvularInsufficiencyPulmonary: string;
  valvularInsufficiencyTricuspid: string;
  pressureGradientValves: number;
  structuralAbnormalities: string;
  cardiacChamberFunctions: string;
  descriptionComplications: string;
  conclusion: string;
}

export interface CardiacCathStudy extends CardiacCathStudyBase {
  id: number;
  patient: string;
}

export interface FormData extends CardiacCathStudyBase {
  patientId: number;
}

export const mapFormDataToApiData = (data: FormData): any => ({
  date: data.date,
  locationMainCoronaryArteries: data.locationMainCoronaryArteries,
  blockageEachCoronaryArtery: data.blockageEachCoronaryArtery,
  descriptionAbnormalities: data.descriptionAbnormalities,
  systolicPressureAorta: data.systolicPressureAorta,
  diastolicPressureAorta: data.diastolicPressureAorta,
  chambersLeftAtrium: data.chambersLeftAtrium,
  chambersLeftVentricle: data.chambersLeftVentricle,
  chambersRightAtrium: data.chambersRightAtrium,
  chambersRightVentricle: data.chambersRightVentricle,
  bloodFlowCoronaryArteries: data.bloodFlowCoronaryArteries,
  velocityBloodFlow: data.velocityBloodFlow,
  leftVentricularEjectionFraction: data.leftVentricularEjectionFraction,
  systolicPressurePulmonaryArteries: data.systolicPressurePulmonaryArteries,
  diastolicPressurePulmonaryArteries: data.diastolicPressurePulmonaryArteries,
  valvularInsufficiencyAortic: data.valvularInsufficiencyAortic,
  valvularInsufficiencyMitral: data.valvularInsufficiencyMitral,
  valvularInsufficiencyPulmonary: data.valvularInsufficiencyPulmonary,
  valvularInsufficiencyTricuspid: data.valvularInsufficiencyTricuspid,
  pressureGradientValves: data.pressureGradientValves,
  structuralAbnormalities: data.structuralAbnormalities,
  cardiacChamberFunctions: data.cardiacChamberFunctions,
  descriptionComplications: data.descriptionComplications,
  conclusion: data.conclusion,
  patientId: data.patientId
});


export interface CardiacCathStudyParams {
  sort: string;
  pageIndex: number;
  pageSize: number;
}