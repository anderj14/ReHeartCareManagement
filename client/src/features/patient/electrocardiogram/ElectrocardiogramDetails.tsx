import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { electrocardiogramSelectors, fetchElectrocardiogramByPatientAsync } from './electrocardiogramSlice';
import NotFound from '../../../app/errors/NotFound';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { format } from 'date-fns';
import Breadcrumb from '../../../app/components/Breadcrumb';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function ElectrocardiogramDetails() {
    const dispatch = useAppDispatch();
    const { id: patientId, electrocardiogramId } = useParams<{ id: string, electrocardiogramId: string }>();
    const patientIdNumber = patientId ? Number(patientId) : undefined;
    const electrocardiogramIdNumber = electrocardiogramId ? Number(electrocardiogramId) : undefined;

    const { status: electrocardiogramsByPatientStatus } = useAppSelector(state => state.electrocardiogram);
    const electrocardiogramByPatient = useAppSelector((state) =>
        electrocardiogramIdNumber ? electrocardiogramSelectors.selectById(state, electrocardiogramIdNumber) : undefined
    );

    useEffect(() => {
        const fetchElectrocardiogramIdByPatientId = async () => {
            if (patientIdNumber !== undefined && electrocardiogramIdNumber !== undefined && !electrocardiogramByPatient) {
                dispatch(fetchElectrocardiogramByPatientAsync({ patientId: patientIdNumber, electrocardiogramId: electrocardiogramIdNumber }));
            }
        };

        fetchElectrocardiogramIdByPatientId();
    }, [dispatch, patientIdNumber, electrocardiogramIdNumber, electrocardiogramByPatient]);

    if (electrocardiogramsByPatientStatus.includes('pending')) return <h3>Loading...</h3>;
    if (!electrocardiogramByPatient) return <NotFound />;


    return (
        <Box sx={{ margin: '30px 0px 0px 30px' }}>
            <Breadcrumb page="Electrocardiograms" />

            <Card sx={{ maxWidth: 745, padding: '20px' }}>
                <CardContent>
                    <Box>
                        <Typography gutterBottom variant="h5">
                            Patient {electrocardiogramByPatient?.patient}
                        </Typography>
                        <Typography sx={{ marginTop: '-10px' }} gutterBottom variant='body1' color="text.secondary">
                            Electrocardiogram | {electrocardiogramByPatient?.date ? format(new Date(electrocardiogramByPatient.date), 'dd/MM/yyyy') : ''}
                        </Typography>
                    </Box>
                    <Box sx={{ marginTop: '20px' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Heart Rhythm
                                </Typography>
                                <Typography>
                                    {electrocardiogramByPatient?.heartRhythm}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Intervals Segments
                                </Typography>
                                <Typography>
                                    {electrocardiogramByPatient?.intervalsSegments}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Characteristic Waves
                                </Typography>
                                <Typography>
                                    {electrocardiogramByPatient?.characteristicWaves}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Heart Rate
                                </Typography>
                                <Typography>
                                    {electrocardiogramByPatient?.heartRate}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Abnormalities
                                </Typography>
                                <Typography>
                                    {electrocardiogramByPatient?.abnormalities}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Artifacts
                                </Typography>
                                <Typography>
                                    {electrocardiogramByPatient?.artifacts}
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
        </Box>
    )
}
