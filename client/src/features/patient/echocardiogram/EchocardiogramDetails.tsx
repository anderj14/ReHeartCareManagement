import { useParams } from 'react-router-dom';
import NotFound from '../../../app/errors/NotFound';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { echocardiogramSelectors, fetchEchocardiogramByPatientAsync } from './echocardiogramSlice';
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Breadcrumb from '../../../app/components/Breadcrumb';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import formatDateTime from '../../../app/components/formatDateTime';
import { useEffect } from 'react';

export default function EchocardiogramDetails() {
    const dispatch = useAppDispatch();
    const { id: patientId, echocardiogramId } = useParams<{ id: string, echocardiogramId: string }>();
    const patientIdNumber = patientId ? Number(patientId) : undefined;
    const echocardiogramIdNumber = echocardiogramId ? Number(echocardiogramId) : undefined;

    const { status: echocardiogramsByPatientStatus } = useAppSelector(state => state.echocardiogram);
    const echocardiogramByPatient = useAppSelector((state) =>
        echocardiogramIdNumber ? echocardiogramSelectors.selectById(state, echocardiogramIdNumber) : undefined
    );

    useEffect(() => {
        const fetchEchocardiogramByPatientId = async () => {
            if (patientIdNumber !== undefined && echocardiogramIdNumber !== undefined && !echocardiogramByPatient) {
                dispatch(fetchEchocardiogramByPatientAsync({ patientId: patientIdNumber, echocardiogramId: echocardiogramIdNumber }));
            }
        };

        fetchEchocardiogramByPatientId();
    }, [dispatch, patientIdNumber, echocardiogramIdNumber, echocardiogramByPatient]);

    if (echocardiogramsByPatientStatus.includes('pending')) return <h3>Loading...</h3>;
    if (!echocardiogramByPatient) return <NotFound />;

    return (
        <Box sx={{ margin: '30px 0px 0px 30px' }}>
            <Breadcrumb page="Echocardiograms" />

            <Card sx={{ maxWidth: 945, padding: '20px' }}>
                <CardContent>
                    <Box>
                        <Typography gutterBottom variant="h5">
                            {echocardiogramByPatient?.patient}
                        </Typography>
                        <Typography sx={{ marginTop: '-10px' }} gutterBottom variant='body1' color="text.secondary">
                            Echocardiogram | {formatDateTime(echocardiogramByPatient?.date)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Cardiac Dimensions
                                </Typography>
                                <Typography>
                                    {echocardiogramByPatient?.cardiacDimensions}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Ejection Fraction
                                </Typography>
                                <Typography>
                                    {echocardiogramByPatient?.ejectionFraction}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Valve Function
                                </Typography>
                                <Typography>
                                    {echocardiogramByPatient?.valveFunction}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Velocities Blood Flows
                                </Typography>
                                <Typography>
                                    {echocardiogramByPatient?.velocitiesBloodFlows}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Movement Cardiac Walls
                                </Typography>
                                <Typography>
                                    {echocardiogramByPatient?.movementCardiacWalls}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Pulmonary Arterial Pressure
                                </Typography>
                                <Typography>
                                    {echocardiogramByPatient?.pulmonaryArterialPressure}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Blood Flow
                                </Typography>
                                <Typography>
                                    {echocardiogramByPatient?.bloodFlow}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Indications
                                </Typography>
                                <Typography>
                                    {echocardiogramByPatient?.indications}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Findings
                                </Typography>
                                <Typography>
                                    {echocardiogramByPatient?.findings}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Clinical Impression
                                </Typography>
                                <Typography>
                                    {echocardiogramByPatient?.clinicalImpression}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Technical Details
                                </Typography>
                                <Typography>
                                    {echocardiogramByPatient?.technicalDetails}
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
