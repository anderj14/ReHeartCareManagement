import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, Box, Typography, CardActions, Button } from '@mui/material';
import Breadcrumb from '../../../app/components/Breadcrumb';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { fetchCardiologySurgeryAsync, surgerySelectors } from '../../surgery/surgerySlice';
import NotFound from '../../../app/errors/NotFound';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import formatDateTime from '../../../app/components/formatDateTime';
import convertToHoursAndMinutes from '../../../app/components/convertToHoursAndMinutes';

export default function CardiologySurgeryDetails() {
    const { id } = useParams<{ id: any }>();
    const cardiologySurgery = useAppSelector(state => surgerySelectors.selectById(state, id));
    const { status: cardiologySurgeryStatus } = useAppSelector(state => state.cardiologySurgery);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchCardiologySurgery = async () => {
            if (!cardiologySurgery) dispatch(fetchCardiologySurgeryAsync(id));
        }

        fetchCardiologySurgery();
    }, [id, dispatch, cardiologySurgery]);

    if (cardiologySurgeryStatus.includes('pending')) return <h3>Loading...</h3>;

    if (!cardiologySurgery) return <NotFound />;

    return (
        <div>
            <Box sx={{ padding: '0px 30px 30px 30px' }}>
                <Breadcrumb page='surgery / surgery name' />
                <Card sx={{ maxWidth: '1300px', padding: '20px' }}>
                    <CardContent className="surgeryDetails">
                        <Box>
                            <Typography gutterBottom variant="h5" >{cardiologySurgery?.patient}</Typography>
                            <Typography gutterBottom variant='body1' color="text.secondary">
                                Cardiology Surgery | {formatDateTime(cardiologySurgery.date)} - {cardiologySurgery.time}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Procedure Description
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.procedureDescription}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Note
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.notes}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Is Emergency
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.isEmergency ? 'YES' : 'NO'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Is Elective
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.isElective ? 'YES' : 'NO'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Operation Room
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.operationRoom}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Pre Operation Diagnostic
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.preOpDiagnosis}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Post Operation Diagnostic
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.postOpDiagnosis}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Is Successful
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.isSuccessful ? 'YES' : 'NO'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Duration
                                    </Typography>
                                    <Typography>
                                        {convertToHoursAndMinutes(cardiologySurgery?.duration)}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Cardiac Condition
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.cardiacCondition}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Post Operation Diagnostic
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.postOpDiagnosis}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Is Minimally Invasive
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.isMinimallyInvasive ? 'YES' : 'NO'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Complications
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.complications}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Post Operative Status
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.postOperativeStatus}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Anesthesia Type
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.anesthesiaType}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Surgical Team
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.surgicalTeam}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Intraoperative Findings
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.intraoperativeFindings}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Post Operative Instructions
                                    </Typography>
                                    <Typography>
                                        {cardiologySurgery?.postOperativeInstructions}
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

        </div>
    )
}
