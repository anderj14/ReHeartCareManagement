import { Card, CardContent, Box, Typography, Button, CardActions } from '@mui/material';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Breadcrumb from '../../../app/components/Breadcrumb';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { bloodTestSelectors, fetchBloodTestByPatientAsync } from './bloodTestSlice';
import NotFound from '../../../app/errors/NotFound';
import { patientSelectors } from '../patientSlice';
import formatDateTime from '../../../app/components/formatDateTime';

export default function BloodTestDetails() {
    const dispatch = useAppDispatch();
    const { id: patientId, bloodTestId } = useParams<{ id: string, bloodTestId: string }>();
    const patientIdNumber = patientId ? Number(patientId) : undefined;
    const bloodTestIdNumber = bloodTestId ? Number(bloodTestId) : undefined;
    const { id } = useParams<{ id: any }>();

    const { status: bloodTestsByPatientStatus } = useAppSelector(state => state.bloodTest);
    const bloodTestByPatient = useAppSelector((state) =>
        bloodTestIdNumber ? bloodTestSelectors.selectById(state, bloodTestIdNumber) : undefined
    );
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    useEffect(() => {
        const fetchBloodTestIdByPatientId = async () => {
            if (patientIdNumber !== undefined && bloodTestIdNumber !== undefined && !bloodTestByPatient) {
                dispatch(fetchBloodTestByPatientAsync({ patientId: patientIdNumber, bloodTestId: bloodTestIdNumber }));
            }
        };

        fetchBloodTestIdByPatientId();
    }, [dispatch, patientIdNumber, bloodTestIdNumber, bloodTestByPatient]);

    if (bloodTestsByPatientStatus.includes('pending')) return <h3>Loading...</h3>;
    if (!bloodTestByPatient) return <NotFound />;

    return (
        <Box sx={{ margin: '30px 0px 0px 30px' }}>
            <Breadcrumb page="Blood Tests" />

            <Card sx={{ maxWidth: 745, padding: '20px' }}>
                <CardContent>
                    <Box>
                        <Typography gutterBottom variant="h5" key={patient?.id}>
                            {patient?.patientName}
                        </Typography>
                        <Typography sx={{ marginTop: '-10px' }} gutterBottom variant='body1' color="text.secondary">
                            Blood Test | {formatDateTime(bloodTestByPatient.date)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Hemoglobin
                                </Typography>
                                <Typography>
                                    {bloodTestByPatient?.hemoglobin}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Hematocrit
                                </Typography>
                                <Typography>
                                    {bloodTestByPatient?.hematocrit}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    White Blood Cell
                                </Typography>
                                <Typography>
                                    {bloodTestByPatient?.whiteBloodCell}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Platelets
                                </Typography>
                                <Typography>
                                    {bloodTestByPatient?.platelets}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Glucose
                                </Typography>
                                <Typography>
                                    {bloodTestByPatient?.glucose}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Cholesterol HDL
                                </Typography>
                                <Typography>
                                    {bloodTestByPatient?.cholesterolHDL}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Cholesterol LDL
                                </Typography>
                                <Typography>
                                    {bloodTestByPatient?.cholesterolLDL}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Triglycerides
                                </Typography>
                                <Typography>
                                    {bloodTestByPatient?.triglycerides}
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
        </Box >

    )
}
