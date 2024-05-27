import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import { BloodTest } from '../../../app/Models/bloodTest';


interface Props {
    bloodTests: BloodTest[];
}

export default function BloodTestPatient({ bloodTests }: Props) {
    const latestBloodTest = bloodTests?.slice(-1)[0];

    return (
        <Card className="detailsContainer" >
            <CardContent className='contentsContainer'>
                <h2>
                    Last Blood Test
                </h2>
                <div className="bloodTestsDetails">
                    {latestBloodTest && (
                        <div key={latestBloodTest.id}>
                            <Box className="details">
                                <strong>Date: </strong>
                                <span>{new Date(latestBloodTest.date).toLocaleDateString()}</span>
                            </Box>
                            <Box className="details">
                                <strong>Hemoglobin: </strong>
                                <span>{latestBloodTest.hemoglobin}</span>
                            </Box>
                            <Box className="details">
                                <strong>Hematocrit: </strong>
                                <span>{latestBloodTest.hematocrit}</span>
                            </Box>
                            <Box className="details">
                                <strong>White Blood Cell: </strong>
                                <span>{latestBloodTest.whiteBloodCell}</span>
                            </Box>
                            <Box className="details">
                                <strong>Platelets: </strong>
                                <span>{latestBloodTest.platelets}</span>
                            </Box>
                            <Box className="details">
                                <strong>Glucose: </strong>
                                <span>{latestBloodTest.glucose}</span>
                            </Box>
                            <Box className="details">
                                <strong>Cholesterol HDL: </strong>
                                <span>{latestBloodTest.cholesterolHDL}</span>
                            </Box>
                            <Box className="details">
                                <strong>Cholesterol LDL: </strong>
                                <span>{latestBloodTest.cholesterolLDL}</span>
                            </Box>
                            <Box className="details">
                                <strong>Tryglycerides: </strong>
                                <span>{latestBloodTest.triglycerides}</span>
                            </Box>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
