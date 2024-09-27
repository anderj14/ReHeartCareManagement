import { Box, Card, CardContent } from '@mui/material';
import { BloodTest } from '../../../app/Models/bloodTest';
import formatDateTime from '../../../app/components/formatDateTime';

interface Props {
    bloodTests: BloodTest[];
}

export default function BloodTestPatient({ bloodTests }: Props) {
    const latestBloodTest = bloodTests.slice(-1)[0];

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
                                <span>{formatDateTime(latestBloodTest.date)}</span>
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
                            <Box className="details">
                                <strong>Red Blood Cell: </strong>
                                <span>{latestBloodTest.redBloodCell}</span>
                            </Box>
                            <Box className="details">
                                <strong>Mean Corpuscular Volume: </strong>
                                <span>{latestBloodTest.meanCorpuscularVolume}</span>
                            </Box>
                            <Box className="details">
                                <strong>Mean Corpuscular Hemoglobin: </strong>
                                <span>{latestBloodTest.meanCorpuscularHemoglobin}</span>
                            </Box>
                            <Box className="details">
                                <strong>Mean Corpuscular Hemoglobin Concentration: </strong>
                                <span>{latestBloodTest.meanCorpuscularHemoglobinConcentration}</span>
                            </Box>
                            <Box className="details">
                                <strong>Red Cell Distribution Width: </strong>
                                <span>{latestBloodTest.redCellDistributionWidth}</span>
                            </Box>
                            <Box className="details">
                                <strong>Blood Urea Nitrogen: </strong>
                                <span>{latestBloodTest.bloodUreaNitrogen}</span>
                            </Box>
                            <Box className="details">
                                <strong>Creatinine: </strong>
                                <span>{latestBloodTest.creatinine}</span>
                            </Box>
                            <Box className="details">
                                <strong>Sodium: </strong>
                                <span>{latestBloodTest.sodium}</span>
                            </Box>
                            <Box className="details">
                                <strong>Potassium: </strong>
                                <span>{latestBloodTest.potassium}</span>
                            </Box>
                            <Box className="details">
                                <strong>Chloride: </strong>
                                <span>{latestBloodTest.chloride}</span>
                            </Box>
                            <Box className="details">
                                <strong>Bicarbonate: </strong>
                                <span>{latestBloodTest.bicarbonate}</span>
                            </Box>
                            <Box className="details">
                                <strong>Calcium: </strong>
                                <span>{latestBloodTest.calcium}</span>
                            </Box>
                            <Box className="details">
                                <strong>Magnesium: </strong>
                                <span>{latestBloodTest.magnesium}</span>
                            </Box>
                            <Box className="details">
                                <strong>Neutrophils: </strong>
                                <span>{latestBloodTest.neutrophils}</span>
                            </Box>
                            <Box className="details">
                                <strong>Lymphocytes: </strong>
                                <span>{latestBloodTest.lymphocytes}</span>
                            </Box>
                            <Box className="details">
                                <strong>Monocytes: </strong>
                                <span>{latestBloodTest.monocytes}</span>
                            </Box>
                            <Box className="details">
                                <strong>Eosinophils: </strong>
                                <span>{latestBloodTest.eosinophils}</span>
                            </Box>
                            <Box className="details">
                                <strong>Basophils: </strong>
                                <span>{latestBloodTest.basophils}</span>
                            </Box>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
