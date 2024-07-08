import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { fetchPhysicalExaminationByPatientAsync, physicalExaminationSelectors } from './physicalExaminationSlice';
import NotFound from '../../../app/errors/NotFound';
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Breadcrumb from '../../../app/components/Breadcrumb';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import formatDateTime from '../../../app/components/formatDateTime';
import { useEffect } from 'react';

export default function PhysicalExaminationDetails() {

    const dispatch = useAppDispatch();
    const { id: patientId, physicalExaminationId } = useParams<{ id: string, physicalExaminationId: string }>();
    const patientIdNumber = patientId ? Number(patientId) : undefined;
    const physicalExaminationIdNumber = physicalExaminationId ? Number(physicalExaminationId) : undefined;

    const { status: physicalExaminationsByPatientStatus } = useAppSelector(state => state.physicalExamination);
    const physicalExaminationByPatient = useAppSelector((state) =>
        physicalExaminationIdNumber ? physicalExaminationSelectors.selectById(state, physicalExaminationIdNumber) : undefined
    );

    useEffect(() => {
        const fetchPhysicalExaminationIdByPatientId = async () => {
            if (patientIdNumber !== undefined && physicalExaminationIdNumber !== undefined && !physicalExaminationByPatient) {
                dispatch(fetchPhysicalExaminationByPatientAsync({ patientId: patientIdNumber, physicalExaminationId: physicalExaminationIdNumber }));
            }
        };

        fetchPhysicalExaminationIdByPatientId();
    }, [dispatch, patientIdNumber, physicalExaminationIdNumber, physicalExaminationByPatient]);

    if (physicalExaminationsByPatientStatus.includes('pending')) return <h3>Loading...</h3>;
    if (!physicalExaminationByPatient) return <NotFound />;


    return (
        <Box sx={{ margin: '30px 0px 0px 30px' }}>
            <Breadcrumb page="Physical Examinations" />

            <Card sx={{ maxWidth: 745, padding: '20px' }}>
                <CardContent>
                    <Box>
                        <Typography gutterBottom variant="h5">
                            {physicalExaminationByPatient?.patient}
                        </Typography>
                        <Typography sx={{ marginTop: '-10px' }} gutterBottom variant='body1' color="text.secondary">
                            Physical Examination | {formatDateTime(physicalExaminationByPatient.date)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Time
                                </Typography>
                                <Typography>
                                    {physicalExaminationByPatient?.time}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Duration
                                </Typography>
                                <Typography>
                                    {physicalExaminationByPatient?.duration}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Max Heart Rate
                                </Typography>
                                <Typography>
                                    {physicalExaminationByPatient?.maxHeartRate} bpm
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Peak Pressure
                                </Typography>
                                <Typography>
                                    {physicalExaminationByPatient?.peakPressure}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Exercise Induced Symptoms
                                </Typography>
                                <Typography>
                                    {physicalExaminationByPatient?.exerciseInducedSymptoms}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Abnormal ECG Findings
                                </Typography>
                                <Typography>
                                    {physicalExaminationByPatient?.abnormalEcgFindings}
                                </Typography>
                            </Box>
                            <Box sx={{ gridColumn: 'span 2' }}>
                                <Typography variant="body1" color="text.secondary">
                                    Conclusion
                                </Typography>
                                <Typography>
                                    {physicalExaminationByPatient?.conclusion}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions sx={{ padding: '0px', marginTop: '10px' }}>
                    <Button startIcon size="small" color="info"><ModeEditIcon sx={{ marginRight: '5px', }} />Edit</Button>
                    <Button startIcon size="small" color="error"><DeleteIcon sx={{ marginRight: '5px' }} />Delete</Button>
                </CardActions>
            </Card>
        </Box>
    )
}
