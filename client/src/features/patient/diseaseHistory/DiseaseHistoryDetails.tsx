import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { diseaseHistorySelectors, fetchDiseaseHistoryByPatientAsync } from "./diseaseHistorySlice";
import { useEffect } from "react";
import NotFound from "../../../app/errors/NotFound";
import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import Breadcrumb from "../../../app/components/Breadcrumb";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import formatDateTime from "../../../app/components/formatDateTime";

export default function DiseaseHistoryDetails() {

    const dispatch = useAppDispatch();
    const { id: patientId, diseaseHistoryId } = useParams<{ id: string, diseaseHistoryId: string }>();
    const patientIdNumber = patientId ? Number(patientId) : undefined;
    const diseaseHistoryIdNumber = diseaseHistoryId ? Number(diseaseHistoryId) : undefined;


    const { status: diseaseHistoriesByPatientStatus } = useAppSelector(state => state.diseaseHistory);
    const diseaseHistoryByPatient = useAppSelector((state) =>
        diseaseHistoryIdNumber ? diseaseHistorySelectors.selectById(state, diseaseHistoryIdNumber) : undefined
    );

    useEffect(() => {
        const fetchDiseaseHistoryById = async () => {
            if (patientIdNumber !== undefined && diseaseHistoryIdNumber !== undefined && !diseaseHistoryByPatient) {
                dispatch(fetchDiseaseHistoryByPatientAsync({ patientId: patientIdNumber, diseaseHistoryId: diseaseHistoryIdNumber }));
            }
        };

        fetchDiseaseHistoryById();
    }, [dispatch, patientIdNumber, diseaseHistoryIdNumber, diseaseHistoryByPatient]);

    if (diseaseHistoriesByPatientStatus.includes('pending')) return <h3>Loading...</h3>;
    if (!diseaseHistoryByPatient) return <NotFound />;


    return (
        <Box sx={{ margin: '30px 0px 0px 30px' }}>
            <Breadcrumb page="Disease Histories" />

            <Card sx={{ maxWidth: 745, padding: '20px' }}>
                <CardContent>
                    <Box>
                        <Typography gutterBottom variant="h5">
                            {diseaseHistoryByPatient?.patient}
                        </Typography>
                        <Typography sx={{ marginTop: '-10px' }} gutterBottom variant='body1' color="text.secondary">
                            Disease History | {formatDateTime(diseaseHistoryByPatient.startDate)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Description
                            </Typography>
                            <Typography>
                                {diseaseHistoryByPatient?.description}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Diagnosis
                            </Typography>
                            <Typography>
                                {diseaseHistoryByPatient?.diagnosis}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Severity
                            </Typography>
                            <Typography>
                                {diseaseHistoryByPatient?.severity}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Notes
                            </Typography>
                            <Typography>
                                {diseaseHistoryByPatient?.notes}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Is Chronic
                            </Typography>
                            <Typography>
                                {diseaseHistoryByPatient?.isChronic ? 'YES' : 'NO'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Treatment
                            </Typography>
                            <Typography>
                                {diseaseHistoryByPatient?.treatment}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
                <CardContent>
                    <Box className="attachment">
                        <Typography variant="h6" color="text.primary">
                            Attachment
                        </Typography>
                        <Box>
                            {diseaseHistoryByPatient.attachments.length > 0 ? (
                                diseaseHistoryByPatient.attachments.map((a) => (
                                    <Box>
                                        <a href={a.filePath} target="_blank" rel="noopener noreferrer">{a.fileName}</a>
                                    </Box>
                                ))) : (
                                <Typography variant="body2" color="text.secondary">
                                    No attachments available
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </CardContent>
                <CardActions sx={{ padding: '0px', marginTop: '10px' }}>
                    <Button size="small" color="info">
                        <ModeEditIcon sx={{ marginRight: '5px', }} />Edit
                    </Button>
                    <Button size="small" color="error">
                        <DeleteIcon sx={{ marginRight: '5px' }} />Delete
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}
