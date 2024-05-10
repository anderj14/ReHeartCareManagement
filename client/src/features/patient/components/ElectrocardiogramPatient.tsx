import { Box, Card, CardContent } from '@mui/material';
import { Electrocardiogram } from '../../../app/Models/electrocardiogram';

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
                                <span>{new Date(latestElectrocardiogram.date).toLocaleDateString()}</span>
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
                                <span>{latestElectrocardiogram.heartRate}</span>
                            </Box>
                            <Box className="details">
                                <strong>Abnomalities: </strong>
                                <span>{latestElectrocardiogram.abnormalities}</span>
                            </Box>
                            <Box className="details">
                                <strong>Artifacts: </strong>
                                <span>{latestElectrocardiogram.artifacts}</span>
                            </Box>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
