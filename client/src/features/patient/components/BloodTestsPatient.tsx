import { Box, Card, CardContent } from '@mui/material';
import { BloodTest } from '../../../app/Models/bloodTest';
import formatDateTime from '../../../app/components/formatDateTime';

interface Props {
    bloodTests: BloodTest[];
}

// Define las propiedades que se mostrarán junto con sus unidades
const bloodTestProperties: { label: string; key: keyof BloodTest; formatter?: (value: any) => any; unit?: string }[] = [
    { label: 'Date', key: 'date', formatter: formatDateTime },
    { label: 'Hemoglobin', key: 'hemoglobin', unit: 'g/dL' },
    { label: 'Hematocrit', key: 'hematocrit', unit: '%' },
    { label: 'White Blood Cell', key: 'whiteBloodCell', unit: 'x10^3/µL' },
    { label: 'Platelets', key: 'platelets', unit: 'x10^3/µL' },
    { label: 'Glucose', key: 'glucose', unit: 'mg/dL' },
    { label: 'Cholesterol HDL', key: 'cholesterolHDL', unit: 'mg/dL' },
    { label: 'Cholesterol LDL', key: 'cholesterolLDL', unit: 'mg/dL' },
    { label: 'Triglycerides', key: 'triglycerides', unit: 'mg/dL' },
    { label: 'Red Blood Cell', key: 'redBloodCell', unit: 'x10^6/µL' },
    { label: 'Mean Corpuscular Volume', key: 'meanCorpuscularVolume', unit: 'fL' },
    { label: 'Mean Corpuscular Hemoglobin', key: 'meanCorpuscularHemoglobin', unit: 'pg' },
    { label: 'Mean Corpuscular Hemoglobin Concentration', key: 'meanCorpuscularHemoglobinConcentration', unit: 'g/dL' },
    { label: 'Red Cell Distribution Width', key: 'redCellDistributionWidth', unit: '%' },
    { label: 'Blood Urea Nitrogen', key: 'bloodUreaNitrogen', unit: 'mg/dL' },

];

export default function BloodTestPatient({ bloodTests }: Props) {
    const latestBloodTest = bloodTests.slice(-1)[0];

    return (
        <Card className="detailsContainer">
            <CardContent className='contentsContainer'>
                <h2>Last Blood Test</h2>
                <div className="bloodTestsDetails">
                    {latestBloodTest ? (
                        <div key={latestBloodTest.id}>
                            {bloodTestProperties.map(({ label, key, formatter, unit }) => (
                                <Box className="details" key={key}>
                                    <strong>{label}: </strong>
                                    <span>
                                        {formatter ? formatter(latestBloodTest[key]) : latestBloodTest[key]} {unit}
                                    </span>
                                </Box>
                            ))}
                        </div>
                    ) : (
                        <p>No blood test data available.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
