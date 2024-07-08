import formatDateTime from '../../../app/components/formatDateTime';
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
                                <span>{formatDateTime(latestDiseaseHistory.startDate)}</span>
                            </Box>
                            <Box className="details">
                                <strong>Description: </strong>
                                <span>{latestDiseaseHistory.description}</span>
                            </Box>
                            <Box className="details">
                                <strong>Diagnosis: </strong>
                                <span>{latestDiseaseHistory.diagnosis}</span>
                            </Box>
                            <Box className="details">
                                <strong>Severity: </strong>
                                <span>{latestDiseaseHistory.severity}</span>
                            </Box>
                            <Box className="details">
                                <strong>Notes: </strong>
                                <span>{latestDiseaseHistory.notes}</span>
                            </Box>
                            <Box className="details">
                                <strong>Is Chronic: </strong>
                                <span>{latestDiseaseHistory.isChronic ? 'YES' : 'NO'}</span>
                            </Box>
                            <Box className="details">
                                <strong>Doctor Name: </strong>
                                <span>{latestDiseaseHistory.doctorName}</span>
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
