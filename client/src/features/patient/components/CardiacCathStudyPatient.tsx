import { CardiacCathStudy } from '../../../app/Models/cardiacCathStudy'
import { Card, CardContent, Box } from '@mui/material';
import formatDateTime from '../../../app/components/formatDateTime';

interface Props {
    cardiacCathStudy: CardiacCathStudy[];
}

export default function CardiacCathStudyPatient({ cardiacCathStudy }: Props) {

    const latestCardiacCathStudyPatient = cardiacCathStudy?.slice(-1)[0];

    return (
        <Card className="detailsContainer">
            <CardContent className='contentsContainer'>
                <h2>
                    Last Cardiac Catheterization Study
                </h2>
                <div className="">
                    {latestCardiacCathStudyPatient && (
                        <div key={latestCardiacCathStudyPatient.id} className='cathStudy'>
                            <section>
                                <Box className="details">
                                    <strong>Date: </strong>
                                    <span>{formatDateTime(latestCardiacCathStudyPatient.date)}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Time: </strong>
                                    <span>{latestCardiacCathStudyPatient.time}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Location of Main Coronary Artery: </strong>
                                    <span>{latestCardiacCathStudyPatient.locationMainCoronaryArteries}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Blockage in Each Coronary Artery: </strong>
                                    <span>{latestCardiacCathStudyPatient.blockageEachCoronaryArtery}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Description of Abnormalities: </strong>
                                    <span>{latestCardiacCathStudyPatient.descriptionAbnormalities}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Blood Pressure in Aorta: </strong>
                                    {/* <span>{latestCardiacCathStudyPatient.bloodPressureAorta}</span> */}
                                </Box>
                                <Box className="details">
                                    <strong>Left Atrium Chambers: </strong>
                                    <span>{latestCardiacCathStudyPatient.chambersLeftAtrium}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Left Ventricle Chambers: </strong>
                                    <span>{latestCardiacCathStudyPatient.chambersLeftVentricle}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Right Atrium Chambers: </strong>
                                    <span>{latestCardiacCathStudyPatient.chambersRightAtrium}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Right Ventricle Chambers: </strong>
                                    <span>{latestCardiacCathStudyPatient.chambersRightVentricle}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Blood Flow in Coronary Arteries: </strong>
                                    <span>{latestCardiacCathStudyPatient.bloodFlowCoronaryArteries}</span>
                                </Box>
                            </section>
                            <section>
                                <Box className="details">
                                    <strong>Velocity of Blood Flow: </strong>
                                    <span>{latestCardiacCathStudyPatient.velocityBloodFlow}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Left Ventricular Ejection Fraction: </strong>
                                    <span>{latestCardiacCathStudyPatient.leftVentricularEjectionFraction}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Blood Pressure in Pulmonary Arteries: </strong>
                                    {/* <span>{latestCardiacCathStudyPatient.bloodPressurePulmonaryArteries}</span> */}
                                </Box>
                                <Box className="details">
                                    <strong>Valvular Insufficiency in Aortic Valve: </strong>
                                    <span>{latestCardiacCathStudyPatient.valvularInsufficiencyAortic}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Valvular Insufficiency in Mitral Valve: </strong>
                                    <span>{latestCardiacCathStudyPatient.valvularInsufficiencyMitral}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Valvular Insufficiency in Pulmonary Valve: </strong>
                                    <span>{latestCardiacCathStudyPatient.valvularInsufficiencyPulmonary}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Valvular Insufficiency in Tricuspid Valve: </strong>
                                    <span>{latestCardiacCathStudyPatient.valvularInsufficiencyTricuspid}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Pressure Gradient in Valves: </strong>
                                    <span>{latestCardiacCathStudyPatient.pressureGradientValves}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Structural Abnormalities: </strong>
                                    <span>{latestCardiacCathStudyPatient.structuralAbnormalities}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Functional Status of Cardiac Chambers: </strong>
                                    <span>{latestCardiacCathStudyPatient.cardiacChamberFunctions}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Description of Complications: </strong>
                                    <span>{latestCardiacCathStudyPatient.descriptionComplications}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Conclusion: </strong>
                                    <span>{latestCardiacCathStudyPatient.conclusion}</span>
                                </Box>
                            </section>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
