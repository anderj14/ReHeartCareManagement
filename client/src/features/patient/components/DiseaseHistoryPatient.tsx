import React from 'react'
import { DiseaseHistory } from '../../../app/Models/DiseaseHistory'
import { Card, CardContent, Box } from '@mui/material'

interface Props {
    diseaseHistory: DiseaseHistory[]
}

export default function DiseaseHistoryPatient({ diseaseHistory }: Props) {
    const latestDiseaseHistory = diseaseHistory?.slice(-1)[0];
    return (
        <Card className="detailsContainer">
            <CardContent className='contentsContainer'>
                <h2>
                    Last Disease History
                </h2>
                <div className="diseaseHistoryDetails">
                    {latestDiseaseHistory && (
                        <div key={latestDiseaseHistory.id}>
                            <Box className="details">
                                <strong>Start Date: </strong>
                                <span>{new Date(latestDiseaseHistory.startDate).toLocaleDateString()}</span>
                            </Box>
                            <Box className="details">
                                <strong>Description: </strong>
                                <span>{latestDiseaseHistory.description}</span>
                            </Box>
                            <Box className="details">
                                <strong>Treatment: </strong>
                                <span>{latestDiseaseHistory.treatment}</span>
                            </Box>

                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
