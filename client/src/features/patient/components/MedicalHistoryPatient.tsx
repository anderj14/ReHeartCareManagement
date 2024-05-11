import React from 'react'
import { MedicalHistory } from '../../../app/Models/MedicalHistory'
import { Card, CardContent, Box } from '@mui/material';

interface Props {
    medicalHistory: MedicalHistory[];
}

export default function MedicalHistoryPatient({ medicalHistory }: Props) {

    const latestMedicalHistory = medicalHistory.slice(-1)[0];

    return (
        <Card className="detailsContainer">
            <CardContent className='contentsContainer'>
                <h2>
                    Last Medical History
                </h2>
                <div>
                    {latestMedicalHistory && (
                        <div key={latestMedicalHistory.id}>
                            <Box className="details">
                                <strong>Date: </strong>
                                <span>{new Date(latestMedicalHistory.date).toLocaleDateString()}</span>
                            </Box>
                            <Box className="details">
                                <strong>Previous Heart Disease: </strong>
                                <span>{latestMedicalHistory.previousHeartDisease}</span>
                            </Box>
                            <Box className="details">
                                <strong>High Blood Pressure: </strong>
                                <span>{latestMedicalHistory.highBloodPressure}</span>
                            </Box>
                            <Box className="details">
                                <strong>Diabetes: </strong>
                                <span>{latestMedicalHistory.diabetes}</span>
                            </Box>
                            <Box className="details">
                                <strong>Hyperlipidemia: </strong>
                                <span>{latestMedicalHistory.hyperlipidemia}</span>
                            </Box>
                            <Box className="details">
                                <strong>Obesity: </strong>
                                <span>{latestMedicalHistory.obesity}</span>
                            </Box>
                            <Box className="details">
                                <strong>Smoking: </strong>
                                <span>{latestMedicalHistory.smoking}</span>
                            </Box>
                            <Box className="details">
                                <strong>Cardiac Procedures/Surgeries: </strong>
                                <span>{latestMedicalHistory.cardiacProceduresSurgeries}</span>
                            </Box>
                            <Box className="details">
                                <strong>Systemic Diseases: </strong>
                                <span>{latestMedicalHistory.systemicDiseases}</span>
                            </Box>
                            <Box className="details">
                                <strong>Medications: </strong>
                                <span>{latestMedicalHistory.medications}</span>
                            </Box>
                            <Box className="details">
                                <strong>Family Diseases: </strong>
                                <span>{latestMedicalHistory.familyDiseases}</span>
                            </Box>

                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
