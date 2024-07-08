import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { diagnosticSelectors, fetchDiagnosticByPatientAsync } from './diagnosticSlice';
import NotFound from '../../../app/errors/NotFound';
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Breadcrumb from '../../../app/components/Breadcrumb';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import formatDateTime from '../../../app/components/formatDateTime';

export default function DiagnosticDetails() {

    const dispatch = useAppDispatch();
    const { id: patientId, diagnosticId } = useParams<{ id: string, diagnosticId: string }>();
    const patientIdNumber = patientId ? Number(patientId) : undefined;
    const diagnosticIdNumber = diagnosticId ? Number(diagnosticId) : undefined;

    const { status: diagnosticsByPatientStatus } = useAppSelector(state => state.diagnostic);
    const diagnosticByPatient = useAppSelector((state) =>
        diagnosticIdNumber ? diagnosticSelectors.selectById(state, diagnosticIdNumber) : undefined
    );

    useEffect(() => {
        const fetchDiagnosticIdByPatientId = async () => {
            if (patientIdNumber !== undefined && diagnosticIdNumber !== undefined && !diagnosticByPatient) {
                dispatch(fetchDiagnosticByPatientAsync({ patientId: patientIdNumber, diagnosticId: diagnosticIdNumber }));
            }
        };

        fetchDiagnosticIdByPatientId();
    }, [dispatch, patientIdNumber, diagnosticIdNumber, diagnosticByPatient]);

    if (diagnosticsByPatientStatus.includes('pending')) return <h3>Loading...</h3>;
    if (!diagnosticByPatient) return <NotFound />;


    return (
        <Box sx={{ margin: '30px 0px 0px 30px' }}>
            <Breadcrumb page="Diagnostics" />

            <Card sx={{ maxWidth: 745, padding: '20px' }}>
                <CardContent>
                    <Box>
                        <Typography gutterBottom variant="h5">
                            {diagnosticByPatient?.patient}
                        </Typography>
                        <Typography sx={{ marginTop: '-10px' }} gutterBottom variant='body1' color="text.secondary">
                            Diagnostic | {formatDateTime(diagnosticByPatient.date)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Description
                            </Typography>
                            <Typography>
                                {diagnosticByPatient?.description}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Classification Condition
                            </Typography>
                            <Typography>
                                {diagnosticByPatient?.classificationCondition}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Severity
                            </Typography>
                            <Typography>
                                {diagnosticByPatient?.severity}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Risk Assessment
                            </Typography>
                            <Typography>
                                {diagnosticByPatient?.riskAssessment}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Recommendations
                            </Typography>
                            <Typography>
                                {diagnosticByPatient?.recommendations}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Follow Up Plan
                            </Typography>
                            <Typography>
                                {diagnosticByPatient?.followUpPlan}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                Conclusions
                            </Typography>
                            <Typography>
                                {diagnosticByPatient?.conclusions}
                            </Typography>
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
