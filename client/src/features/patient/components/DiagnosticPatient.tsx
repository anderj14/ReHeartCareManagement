import { Card, CardContent, Box } from '@mui/material';
import React from 'react'
import { Diagnostics } from '../../../app/Models/diagnostic';

interface Props {
    diagnostic: Diagnostics[];
}

export default function DiagnosticPatient({ diagnostic }: Props) {

    const latestDiagnostic = diagnostic?.slice(-1)[0];

    return (
        <Card className="detailsContainer">
            <CardContent className='contentsContainer'>
                <h2>
                    Last Diagnostic
                </h2>
                <div>
                    {latestDiagnostic && (
                        <div key={latestDiagnostic.id}>
                            <Box className="details">
                                <strong>Date: </strong>
                                <span>{new Date(latestDiagnostic.date).toLocaleDateString()}</span>
                            </Box>
                            <Box className="details">
                                <strong>Condition Name: </strong>
                                <span>{latestDiagnostic.conditionName}</span>
                            </Box>
                            <Box className="details">
                                <strong>Description: </strong>
                                <span>{latestDiagnostic.description}</span>
                            </Box>
                            <Box className="details">
                                <strong>Classification of Condition: </strong>
                                <span>{latestDiagnostic.classificationCondition}</span>
                            </Box>
                            <Box className="details">
                                <strong>Severity: </strong>
                                <span>{latestDiagnostic.severity}</span>
                            </Box>
                            <Box className="details">
                                <strong>Risk Assessment: </strong>
                                <span>{latestDiagnostic.riskAssessment}</span>
                            </Box>
                            <Box className="details">
                                <strong>Conclusions: </strong>
                                <span>{latestDiagnostic.conclusions}</span>
                            </Box>

                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
