import React from 'react'
import { PhysicalExamination } from '../../../app/Models/physicalExamination'
import { Box, Card, CardContent } from '@mui/material';

interface Props {
    physicalExamination: PhysicalExamination[]
}

export default function PhysicalExaminationPatient({ physicalExamination }: Props) {

    const latestPhysicalExaminationPatient = physicalExamination?.slice(-1)[0];

    return (
        <div>
            <Card className="detailsContainer">
                <CardContent className="contentsContainer">
                    <h2>Last Physical Examination</h2>
                    <div>
                        {latestPhysicalExaminationPatient && (
                            <div key={latestPhysicalExaminationPatient.id} className='physicalExam'>
                                <section>
                                    <Box className="details">
                                        <strong>Date: </strong>
                                        <span>{new Date(latestPhysicalExaminationPatient.date).toLocaleDateString()}</span>
                                    </Box>
                                    <Box className="details">
                                        <strong>Time: </strong>
                                        <span>{latestPhysicalExaminationPatient.time}</span>
                                    </Box>
                                    <Box className="details">
                                        <strong>Duration: </strong>
                                        <span>{latestPhysicalExaminationPatient.duration}</span>
                                    </Box>
                                    <Box className="details">
                                        <strong>Maximum Heart Rate: </strong>
                                        <span>{latestPhysicalExaminationPatient.maxHeartRate}</span>
                                    </Box>
                                    <Box className="details">
                                        <strong>Peak Pressure: </strong>
                                        <span>{latestPhysicalExaminationPatient.peakPressure}</span>
                                    </Box>
                                </section>
                                <section>
                                    <Box className="details">
                                        <strong>Exercise-induced Symptoms: </strong>
                                        <span>{latestPhysicalExaminationPatient.exerciseInducedSymptoms}</span>
                                    </Box>
                                    <Box className="details">
                                        <strong>Abnormal ECG Findings: </strong>
                                        <span>{latestPhysicalExaminationPatient.abnormalEcgFindings}</span>
                                    </Box>
                                    <Box className="details">
                                        <strong>Echocardiogram Image: </strong>
                                        <span>{latestPhysicalExaminationPatient.imageEco}</span>
                                    </Box>
                                    <Box className="details">
                                        <strong>Stress Test Image: </strong>
                                        <span>{latestPhysicalExaminationPatient.imageStress}</span>
                                    </Box>
                                    <Box className="details">
                                        <strong>Conclusion: </strong>
                                        <span>{latestPhysicalExaminationPatient.conclusion}</span>
                                    </Box>
                                </section>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
