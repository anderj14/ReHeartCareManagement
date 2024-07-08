import formatDateTime from '../../../app/components/formatDateTime';
import { Echocardiogram } from '../../../app/Models/echocardiogram'
import { Card, CardContent, Box } from '@mui/material';

interface Props {
    echocardiogram: Echocardiogram[];
}

export default function EchocardiogramPatient({ echocardiogram }: Props) {
    const latestEchocardiogram = echocardiogram?.slice(-1)[0];
    return (
        <Card className="detailsContainer">
            <CardContent className='contentsContainer'>
                <h2>
                    Last Echocardiogram
                </h2>
                <div className="echocardiogramDetails">
                    {latestEchocardiogram && (
                        <div key={latestEchocardiogram.id}>
                            <Box className="details">
                                <strong>Date: </strong>
                                <span>{formatDateTime(latestEchocardiogram.date)}</span>
                            </Box>
                            <Box className="details">
                                <strong>Cardiac Dimensions: </strong>
                                <span>{latestEchocardiogram.cardiacDimensions}</span>
                            </Box>
                            <Box className="details">
                                <strong>Ejection Fraction: </strong>
                                <span>{latestEchocardiogram.ejectionFraction}</span>
                            </Box>
                            <Box className="details">
                                <strong>Valve Function : </strong>
                                <span>{latestEchocardiogram.valveFunction}</span>
                            </Box>
                            <Box className="details">
                                <strong>Velocities Blood Flows: </strong>
                                <span>{latestEchocardiogram.velocitiesBloodFlows}</span>
                            </Box>
                            <Box className="details">
                                <strong>Movement Cardiac Walls: </strong>
                                <span>{latestEchocardiogram.movementCardiacWalls}</span>
                            </Box>
                            <Box className="details">
                                <strong>Pulmonary Arterial Pressure: </strong>
                                <span>{latestEchocardiogram.pulmonaryArterialPressure}</span>
                            </Box>
                            <Box className="details">
                                <strong>Blood Flow: </strong>
                                <span>{latestEchocardiogram.bloodFlow}</span>
                            </Box>
                            <Box className="details">
                                <strong>Indications: </strong>
                                <span>{latestEchocardiogram.indications}</span>
                            </Box>
                            <Box className="details">
                                <strong>Findings: </strong>
                                <span>{latestEchocardiogram.findings}</span>
                            </Box>
                            <Box className="details">
                                <strong>Clinical Impression: </strong>
                                <span>{latestEchocardiogram.clinicalImpression}</span>
                            </Box>
                            <Box className="details">
                                <strong>Technical Details: </strong>
                                <span>{latestEchocardiogram.technicalDetails}</span>
                            </Box>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
