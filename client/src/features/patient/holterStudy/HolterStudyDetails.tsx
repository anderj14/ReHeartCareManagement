import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { fetchHolterStudyByPatientAsync, holterStudySelectors } from "./holterStudySlice";
import { useEffect } from "react";
import NotFound from "../../../app/errors/NotFound";
import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { format } from "date-fns";
import Breadcrumb from "../../../app/components/Breadcrumb";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function HolterStudyDetails() {

    const dispatch = useAppDispatch();
    const { id: patientId, holterStudyId } = useParams<{ id: string, holterStudyId: string }>();
    const patientIdNumber = patientId ? Number(patientId) : undefined;
    const holterStudyIdNumber = holterStudyId ? Number(holterStudyId) : undefined;

    const { status: holterStudiesByPatientStatus } = useAppSelector(state => state.holterStudy);
    const holterStudyByPatient = useAppSelector((state) =>
        holterStudyIdNumber ? holterStudySelectors.selectById(state, holterStudyIdNumber) : undefined
    );


    useEffect(() => {
        const fetchHolterStudyByPatientId = async () => {
            if (patientIdNumber !== undefined && holterStudyIdNumber !== undefined && !holterStudyByPatient) {
                dispatch(fetchHolterStudyByPatientAsync({ patientId: patientIdNumber, holterStudyId: holterStudyIdNumber }));
            }
        };

        fetchHolterStudyByPatientId();
    }, [dispatch, patientIdNumber, holterStudyIdNumber, holterStudyByPatient]);

    if (holterStudiesByPatientStatus.includes('pending')) return <h3>Loading...</h3>;
    if (!holterStudyByPatient) return <NotFound />;

    return (
        <Box sx={{ margin: '30px 0px 0px 30px' }}>
            <Breadcrumb page="Holter Studies" />

            <Card sx={{ maxWidth: 745, padding: '20px' }}>
                <CardContent>
                    <Box>
                        <Typography gutterBottom variant="h5">
                            {holterStudyByPatient?.patient}
                        </Typography>
                        <Typography sx={{ marginTop: '-10px' }} gutterBottom variant='body1' color="text.secondary">
                            Holter Study | {holterStudyByPatient?.date ? format(new Date(holterStudyByPatient.date), 'dd/MM/yyyy') : ''}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Study Duration
                                </Typography>
                                <Typography>
                                    {holterStudyByPatient?.studyDuration}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Average Heart Rate
                                </Typography>
                                <Typography>
                                    {holterStudyByPatient?.averageHeartRate}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Maximum Heart Rate
                                </Typography>
                                <Typography>
                                    {holterStudyByPatient?.maximumHeartRate}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Type of Heart Rhythm
                                </Typography>
                                <Typography>
                                    {holterStudyByPatient?.typeHeartRhythm}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Arrhythmia Episodes
                                </Typography>
                                <Typography>
                                    {holterStudyByPatient?.arrhythmiaEpisodes}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Physical Activity
                                </Typography>
                                <Typography>
                                    {holterStudyByPatient?.physicalActivity}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Patient Symptoms
                                </Typography>
                                <Typography>
                                    {holterStudyByPatient?.patientSymptoms}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Conclusion
                                </Typography>
                                <Typography>
                                    {holterStudyByPatient?.conclusion}
                                </Typography>
                            </Box>
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
