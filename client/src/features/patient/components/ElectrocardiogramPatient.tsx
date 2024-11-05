import { Box, Card, CardContent } from '@mui/material';
import { Electrocardiogram } from '../../../app/Models/electrocardiogram';
import formatDateTime from '../../../app/components/formatDateTime';

interface Props {
    electrocardiogram: Electrocardiogram[];
}

export default function ElectrocardiogramPatient({ electrocardiogram }: Props) {

    const latestElectrocardiogram = electrocardiogram?.slice(-1)[0];

    return (
        <Card className="detailsContainer">
            <CardContent className='contentsContainer'>
                <h2>
                    Last Electrocardiogram
                </h2>
                <div className="electrocardiogramDetails">
                    {latestElectrocardiogram && (
                        <div key={latestElectrocardiogram.id}>
                            <Box className="details">
                                <strong>Date: </strong>
                                <span>{formatDateTime(latestElectrocardiogram.date)}</span>
                            </Box>
                            <Box className="details">
                                <strong>Heart Rhythm: </strong>
                                <span>{latestElectrocardiogram.heartRhythm}</span>
                            </Box>
                            <Box className="details">
                                <strong>Interval Segments: </strong>
                                <span>{latestElectrocardiogram.intervalsSegments}</span>
                            </Box>
                            <Box className="details">
                                <strong>Characteristic Waves: </strong>
                                <span>{latestElectrocardiogram.characteristicWaves}</span>
                            </Box>
                            <Box className="details">
                                <strong>Heart Rate: </strong>
                                <span>{latestElectrocardiogram.heartRate} Bpm</span>
                            </Box>
                            <Box className="details">
                                <strong>Abnomalities: </strong>
                                <span>{latestElectrocardiogram.abnormalities}</span>
                            </Box>
                            <Box className="details">
                                <strong>Artifacts: </strong>
                                <span>{latestElectrocardiogram.artifacts}</span>
                            </Box>
                            <Box className="details">
                                <strong>Interpretation: </strong>
                                <span>{latestElectrocardiogram.interpretation}</span>
                            </Box>
                            <Box className="details">
                                <strong>Detailed Findings: </strong>
                                <span>{latestElectrocardiogram.detailedFindings}</span>
                            </Box>
                            <Box className="details">
                                <strong>Blood Pressure Systolic: </strong>
                                <span>{latestElectrocardiogram.bloodPressureSystolic} mmHg</span>
                            </Box>
                            <Box className="details">
                                <strong>Blood Pressure Diastolic: </strong>
                                <span>{latestElectrocardiogram.bloodPressureDiastolic} mmHg</span>
                            </Box>
                            <Box className="details">
                                <strong>Temperature: </strong>
                                <span>{latestElectrocardiogram.temperature}° Celcius</span>
                            </Box>
                            <Box className="details">
                                <strong>Artifacts: </strong>
                                <span>{latestElectrocardiogram.clinicalNotes}</span>
                            </Box>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
