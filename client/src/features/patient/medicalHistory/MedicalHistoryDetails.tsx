
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../../../app/errors/NotFound';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { medicalHistorySelectors, fetchMedicalHistoryByPatientAsync } from './medicalHistorySlice';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Breadcrumb from '../../../app/components/Breadcrumb';
import formatDateTime from '../../../app/components/formatDateTime';

export default function MedicalHistoryDetails() {

    const dispatch = useAppDispatch();
    const { id: patientId, medicalHistoryId } = useParams<{ id: string, medicalHistoryId: string }>();
    const patientIdNumber = patientId ? Number(patientId) : undefined;
    const medicalHistoryIdNumber = medicalHistoryId ? Number(medicalHistoryId) : undefined;

    const { status: medicalHistoriesByPatientStatus } = useAppSelector(state => state.medicalHistory);
    const medicalHistoryByPatient = useAppSelector((state) =>
        medicalHistoryIdNumber ? medicalHistorySelectors.selectById(state, medicalHistoryIdNumber) : undefined
    );

    useEffect(() => {
        const fetchMedicalHistoryIdByPatientId = async () => {
            if (patientIdNumber !== undefined && medicalHistoryIdNumber !== undefined && !medicalHistoryByPatient) {
                dispatch(fetchMedicalHistoryByPatientAsync({ patientId: patientIdNumber, medicalHistoryId: medicalHistoryIdNumber }));
            }
        };

        fetchMedicalHistoryIdByPatientId();
    }, [dispatch, patientIdNumber, medicalHistoryIdNumber, medicalHistoryByPatient]);

    if (medicalHistoriesByPatientStatus.includes('pending')) return <h3>Loading...</h3>;
    if (!medicalHistoryByPatient) return <NotFound />;

    return (
        <Box sx={{ margin: '30px 0px 0px 30px' }}>
            <Breadcrumb page="Medical Histories" />

            <Card sx={{ maxWidth: 745, padding: '20px' }}>
                <CardContent>
                    <Box>
                        <Typography gutterBottom variant="h5">
                            {medicalHistoryByPatient?.patient}
                        </Typography>
                        <Typography sx={{ marginTop: '-10px' }} gutterBottom variant='body1' color="text.secondary">
                            Medical History | {formatDateTime(medicalHistoryByPatient?.date)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginTop: '20px' }}>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Previous Heart Disease
                            </Typography>
                            <Typography>
                                {medicalHistoryByPatient?.previousHeartDisease ? 'YES' : 'NO'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                High Blood Pressure
                            </Typography>
                            <Typography>
                                {medicalHistoryByPatient?.highBloodPressure ? 'YES' : 'NO'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Diabetes
                            </Typography>
                            <Typography>
                                {medicalHistoryByPatient?.diabetes ? 'YES' : 'NO'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Hyperlipidemia
                            </Typography>
                            <Typography>
                                {medicalHistoryByPatient?.hyperlipidemia ? 'YES' : 'NO'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Obesity
                            </Typography>
                            <Typography>
                                {medicalHistoryByPatient?.obesity ? 'YES' : 'NO'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Smoking
                            </Typography>
                            <Typography>
                                {medicalHistoryByPatient?.smoking ? 'YES' : 'NO'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Cardiac Procedures/Surgeries
                            </Typography>
                            <Typography>
                                {medicalHistoryByPatient?.cardiacProcedures}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Systemic Diseases
                            </Typography>
                            <Typography>
                                {medicalHistoryByPatient?.systemicDiseases}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Medications
                            </Typography>
                            <Typography>
                                {medicalHistoryByPatient?.medications}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Family Diseases
                            </Typography>
                            <Typography>
                                {medicalHistoryByPatient?.familyDiseases}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions sx={{ padding: '0px', marginTop: '10px' }}>
                    <Button size="small" color="info"><ModeEditIcon sx={{ marginRight: '5px', }} />Edit</Button>
                    <Button size="small" color="error"><DeleteIcon sx={{ marginRight: '5px' }} />Delete</Button>
                </CardActions>
            </Card>
        </Box>
    )
}
