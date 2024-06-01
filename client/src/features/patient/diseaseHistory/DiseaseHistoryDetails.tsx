import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { diseaseHistorySelectors, fetchDiseaseHistoryByPatientAsync } from "./diseaseHistorySlice";
import { useEffect } from "react";
import NotFound from "../../../app/errors/NotFound";
import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { format } from "date-fns";
import Breadcrumb from "../../../app/components/Breadcrumb";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

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
                            Disease History | {diseaseHistoryByPatient?.startDate ? format(new Date(diseaseHistoryByPatient.startDate), 'dd/MM/yyyy') : ''}
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
                                Treatment
                            </Typography>
                            <Typography>
                                {diseaseHistoryByPatient?.treatment}
                            </Typography>
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
