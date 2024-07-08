import { Box, Card, CardContent } from "@mui/material";
import { StressTest } from "../../../app/Models/stressTest"
import formatDateTime from "../../../app/components/formatDateTime";

interface Props {
    stressTest: StressTest[]
}

export default function StressTestPatient({ stressTest }: Props) {

    const latestStressTestPatient = stressTest?.slice(-1)[0];

    return (
        <div>
            <Card className="detailsContainer">
                <CardContent className="contentsContainer">
                    <h2>Last Stress Test</h2>
                    <div>
                        {latestStressTestPatient && (
                            <Box key={latestStressTestPatient.id} sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                <Box className="details">
                                    <strong>Date: </strong>
                                    <span>{formatDateTime(latestStressTestPatient.date)}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Time: </strong>
                                    <span>{latestStressTestPatient.time}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Duration: </strong>
                                    <span>{latestStressTestPatient.duration}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Maximum Heart Rate: </strong>
                                    <span>{latestStressTestPatient.maxHeartRate} bpm</span>
                                </Box>
                                <Box className="details">
                                    <strong>Peak Pressure: </strong>
                                    <span>{latestStressTestPatient.peakPressure} mmHg</span>
                                </Box>
                                <Box className="details">
                                    <strong>Exercise-induced Symptoms: </strong>
                                    <span>{latestStressTestPatient.exerciseInducedSymptoms}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Resting Heart Rate: </strong>
                                    <span>{latestStressTestPatient.restingHeartRate} bpm</span>
                                </Box>
                                <Box className="details">
                                    <strong>Max Blood Pressure Systolic: </strong>
                                    <span>{latestStressTestPatient.maxBloodPressureSystolic} mmHg</span>
                                </Box>
                                <Box className="details">
                                    <strong>Max Blood Pressure Diastolic: </strong>
                                    <span>{latestStressTestPatient.maxBloodPressureDiastolic} mmHg</span>
                                </Box>
                                <Box className="details">
                                    <strong>Exercise Protocol: </strong>
                                    <span>{latestStressTestPatient.exerciseProtocol}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Indications: </strong>
                                    <span>{latestStressTestPatient.indications}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Abnormal ECG Findings: </strong>
                                    <span>{latestStressTestPatient.abnormalEcgFindings}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Conclusion: </strong>
                                    <span>{latestStressTestPatient.conclusion}</span>
                                </Box>
                            </Box>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}