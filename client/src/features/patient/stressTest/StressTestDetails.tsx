import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { useParams } from "react-router-dom";
import { fetchStressTestByPatientAsync, stressTestSelectors } from "./stressTestSlice";
import { useEffect } from "react";
import NotFound from "../../../app/errors/NotFound";
import Breadcrumb from "../../../app/components/Breadcrumb";
import formatDateTime from "../../../app/components/formatDateTime";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function StressTestDetails() {

    const dispatch = useAppDispatch();
    const { id: patientId, stressTestId } = useParams<{ id: string, stressTestId: string }>();
    const patientIdNumber = patientId ? Number(patientId) : undefined;
    const stressTestIdNumber = stressTestId ? Number(stressTestId) : undefined;

    const { status: stressTestByPatientStatus } = useAppSelector(state => state.stressTest);
    const stressTestByPatient = useAppSelector((state) =>
        stressTestIdNumber ? stressTestSelectors.selectById(state, stressTestIdNumber) : undefined
    );

    useEffect(() => {
        const fetchStressTestIdByPatientId = async () => {
            if (patientIdNumber !== undefined && stressTestIdNumber !== undefined && !stressTestByPatient) {
                dispatch(fetchStressTestByPatientAsync({ patientId: patientIdNumber, stressTestId: stressTestIdNumber }));
            }
        };

        fetchStressTestIdByPatientId();
    }, [dispatch, patientIdNumber, stressTestIdNumber, stressTestByPatient]);

    if (stressTestByPatientStatus.includes('pending')) return <h3>Loading...</h3>
    if (!stressTestByPatient) return <NotFound />

    return (
        <Box sx={{ padding: '0px 30px 30px 30px' }}>
            <Breadcrumb page="Stress Test" />
            <Card sx={{ maxWidth: '1100px', padding: '20px' }}>
                <CardContent className="surgeryDetails">
                    <Box>
                        <Typography gutterBottom variant="h5" >{stressTestByPatient?.patient}</Typography>
                        <Typography gutterBottom variant='body1' color="text.secondary">
                            Stress Test | {formatDateTime(stressTestByPatient.date)} - {stressTestByPatient.time}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>

                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Duration
                                </Typography>
                                <Typography>
                                    {stressTestByPatient?.duration}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Max Heart Rate
                                </Typography>
                                <Typography>
                                    {stressTestByPatient?.maxHeartRate} bpm
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Peak Pressure
                                </Typography>
                                <Typography>
                                    {stressTestByPatient?.peakPressure} mmHg
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Exercise Induced Symptoms
                                </Typography>
                                <Typography>
                                    {stressTestByPatient?.exerciseInducedSymptoms}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Resting Heart Rate
                                </Typography>
                                <Typography>
                                    {stressTestByPatient?.restingHeartRate} bpm
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Max Blood Pressure Systolic
                                </Typography>
                                <Typography>
                                    {stressTestByPatient?.maxBloodPressureSystolic} mmHg
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Max Blood Pressure Diastolic
                                </Typography>
                                <Typography>
                                    {stressTestByPatient?.maxBloodPressureDiastolic} mmHg
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Exercise Protocol
                                </Typography>
                                <Typography>
                                    {stressTestByPatient?.exerciseProtocol}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Indications
                                </Typography>
                                <Typography>
                                    {stressTestByPatient?.indications}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Abnormal ECG Findings
                                </Typography>
                                <Typography>
                                    {stressTestByPatient?.abnormalEcgFindings}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Conclusion
                                </Typography>
                                <Typography>
                                    {stressTestByPatient?.conclusion}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>



                </CardContent>
                <CardActions sx={{ padding: '0px', marginTop: '10px' }}>
                    <Button startIcon={<ModeEditIcon sx={{ marginRight: '5px' }} />} size="small" color="info">Edit</Button>
                    <Button startIcon={<DeleteIcon sx={{ marginRight: '5px' }} />} size="small" color="error">Delete</Button>
                </CardActions>
            </Card>
        </Box >
    )
}