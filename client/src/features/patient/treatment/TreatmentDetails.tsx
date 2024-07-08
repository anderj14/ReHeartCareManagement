import { Card, CardContent, Box, Typography, Button, CardActions } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { fetchTreatmentByPatientAsync, treatmentSelectors } from './treatmentSlice';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Breadcrumb from '../../../app/components/Breadcrumb';
import NotFound from '../../../app/errors/NotFound';
import formatDateTime from '../../../app/components/formatDateTime';

export default function TreatmentDetails() {
    const dispatch = useAppDispatch();
    const { id: patientId, treatmentId } = useParams<{ id: string, treatmentId: string }>();
    const patientIdNumber = patientId ? Number(patientId) : undefined;
    const treatmentIdNumber = treatmentId ? Number(treatmentId) : undefined;

    const { status: treatmentsByPatientStatus } = useAppSelector(state => state.treatment);
    const treatmentByPatient = useAppSelector((state) =>
        treatmentIdNumber ? treatmentSelectors.selectById(state, treatmentIdNumber) : undefined
    );

    useEffect(() => {
        const fetchTreatmentIdByPatientId = async () => {
            if (patientIdNumber !== undefined && treatmentIdNumber !== undefined && !treatmentByPatient) {
                dispatch(fetchTreatmentByPatientAsync({ patientId: patientIdNumber, treatmentId: treatmentIdNumber }));
            }
        };

        fetchTreatmentIdByPatientId();
    }, [dispatch, patientIdNumber, treatmentIdNumber, treatmentByPatient]);

    if (treatmentsByPatientStatus.includes('pending')) return <h3>Loading...</h3>;
    if (!treatmentByPatient) return <NotFound />;

    return (
        <Box sx={{ margin: '30px 0px 0px 30px' }}>
            <Breadcrumb page="Treatments" />

            <Card sx={{ maxWidth: 745, padding: '20px' }}>
                <CardContent>
                    <Box>
                        <Typography gutterBottom variant="h5">
                            {treatmentByPatient?.patient}
                        </Typography>
                        <Typography sx={{ marginTop: '-10px' }} gutterBottom variant='body1' color="text.secondary">
                            Treatment | {formatDateTime(treatmentByPatient?.date)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Medication
                                </Typography>
                                <Typography>
                                    {treatmentByPatient?.medication}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Dosage
                                </Typography>
                                <Typography>
                                    {treatmentByPatient?.dosage}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Instructions
                                </Typography>
                                <Typography>
                                    {treatmentByPatient?.instructions}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Other Treatments
                                </Typography>
                                <Typography>
                                    {treatmentByPatient?.otherTreatments}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Side Effects
                                </Typography>
                                <Typography>
                                    {treatmentByPatient?.sideEffects}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Treatment Monitoring
                                </Typography>
                                <Typography>
                                    {treatmentByPatient?.treatmentMonitoring}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Treatment Duration
                                </Typography>
                                <Typography>
                                    {treatmentByPatient?.treatmentDuration}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Treatment Outcome
                                </Typography>
                                <Typography>
                                    {treatmentByPatient?.treatmentOutcome}
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
    );
}
