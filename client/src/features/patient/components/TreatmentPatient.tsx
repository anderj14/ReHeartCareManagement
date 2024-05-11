import React from 'react'
import { Treatment } from '../../../app/Models/treatment'
import { Card, CardContent, Box } from '@mui/material';

interface Props {
    treatment: Treatment[];
}

export default function TreatmentPatient({ treatment }: Props) {

    const latestTreatment = treatment?.slice(-1)[0];

    return (
        <Card className="detailsContainer">
            <CardContent className='contentsContainer'>
                <h2>
                    Last Treatment
                </h2>
                <div>
                    {latestTreatment && (
                        <div key={latestTreatment.id}>
                            <Box className="details">
                                <strong>Date: </strong>
                                <span>{new Date(latestTreatment.date).toLocaleDateString()}</span>
                            </Box>
                            <Box className="details">
                                <strong>Medication: </strong>
                                <span>{latestTreatment.medication}</span>
                            </Box>
                            <Box className="details">
                                <strong>Dosage: </strong>
                                <span>{latestTreatment.dosage}</span>
                            </Box>
                            <Box className="details">
                                <strong>Instructions: </strong>
                                <span>{latestTreatment.instructions}</span>
                            </Box>
                            <Box className="details">
                                <strong>Other Treatments: </strong>
                                <span>{latestTreatment.otherTreatments}</span>
                            </Box>
                            <Box className="details">
                                <strong>Side Effects: </strong>
                                <span>{latestTreatment.sideEffects}</span>
                            </Box>
                            <Box className="details">
                                <strong>Treatment Monitoring: </strong>
                                <span>{latestTreatment.treatmentMonitoring}</span>
                            </Box>

                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
