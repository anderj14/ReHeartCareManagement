import { Card, CardContent, Box } from "@mui/material";
import { CardiologySurgery } from "../../../app/Models/cardiologySurgery";
import formatDateTime from "../../../app/components/formatDateTime";
import convertToHoursAndMinutes from "../../../app/components/convertToHoursAndMinutes";

interface Props {
    cardiologySurgery: CardiologySurgery[];
}

export default function CardiologySurgeryPatient({ cardiologySurgery }: Props) {

    const latestSurgery = cardiologySurgery.slice(-1)[0];

    return (
        <Card className="detailsContainer">
            <CardContent className='contentsContainer'>
                <h2>
                    Last Cardiology Surgery
                </h2>
                <div>
                    {latestSurgery && (
                        <Box key={latestSurgery.id} sx={{display: 'flex', gap: '25px'}}>
                            <section>
                                <Box className="details">
                                    <strong>Date: </strong>
                                    <span>{formatDateTime(latestSurgery.date)}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Time: </strong>
                                    <span>{latestSurgery.time}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Procedure Description: </strong>
                                    <span>{latestSurgery.procedureDescription}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Notes: </strong>
                                    <span>{latestSurgery.notes}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Is Emergency: </strong>
                                    <span>{latestSurgery.isEmergency ? 'YES' : 'NO'}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Is Elective: </strong>
                                    <span>{latestSurgery.isElective ? 'YES' : 'NO'}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Operation Room: </strong>
                                    <span>{latestSurgery.operationRoom}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Pre-Operation Diagnosis: </strong>
                                    <span>{latestSurgery.preOpDiagnosis}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Post-Operation Diagnosis: </strong>
                                    <span>{latestSurgery.postOpDiagnosis}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Is Successful: </strong>
                                    <span>{latestSurgery.isSuccessful ? 'YES' : 'NO'}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Duration: </strong>
                                    <span>{convertToHoursAndMinutes(latestSurgery.duration)}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Cardiac Condition: </strong>
                                    <span>{latestSurgery.cardiacCondition}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Is Minimally Invasive: </strong>
                                    <span>{latestSurgery.isMinimallyInvasive ? 'YES' : 'NO'}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Complications: </strong>
                                    <span>{latestSurgery.complications}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Post Operative Status: </strong>
                                    <span>{latestSurgery.postOperativeStatus}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Anesthesia Type: </strong>
                                    <span>{latestSurgery.anesthesiaType}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Surgical Team: </strong>
                                    <span>{latestSurgery.surgicalTeam}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Intraoperative Findings: </strong>
                                    <span>{latestSurgery.intraoperativeFindings}</span>
                                </Box>
                                <Box className="details">
                                    <strong>Post Operative Instructions: </strong>
                                    <span>{latestSurgery.postOperativeInstructions}</span>
                                </Box>
                            </section>
                        </Box>
                    )}
                </div>
            </CardContent>
        </Card>
    )

}
