import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { fetchHolterStudyByPatientAsync, holterStudySelectors } from "./holterStudySlice";
import { useEffect } from "react";
import NotFound from "../../../app/errors/NotFound";
import { Box, Card, CardContent, Typography, CardActions, Button, Accordion, AccordionDetails, AccordionSummary, Divider } from "@mui/material";
import Breadcrumb from "../../../app/components/Breadcrumb";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import formatDateTime from "../../../app/components/formatDateTime";

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
                            Holter Study | {formatDateTime(holterStudyByPatient.date)} | {holterStudyByPatient.time}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
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
                                    Average Heart Rate Bpm
                                </Typography>
                                <Typography>
                                    {holterStudyByPatient?.averageHeartRate} Bpm
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Maximum Heart Rate
                                </Typography>
                                <Typography>
                                    {holterStudyByPatient?.maximumHeartRate} Bpm
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Type of Heart Rhythm
                                </Typography>
                                <Typography>
                                    {holterStudyByPatient?.typeHeartRhythm}
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
                <Divider sx={{ margin: '10px 0px 10px 0px' }} />
                <CardContent sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Accordion className="arryhmia-event">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Arrhythmia Events
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    {holterStudyByPatient.arrhythmiaEvents.length > 0 ? (
                                        holterStudyByPatient.arrhythmiaEvents.map((a) => (
                                            <Box sx={{ marginBottom: 2, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Type</Typography>
                                                    <Typography>{a.type}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Duration</Typography>
                                                    <Typography>{a.duration}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Heart Rate During Event</Typography>
                                                    <Typography>{a.heartRateDuringEvent} Bpm</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Description</Typography>
                                                    <Typography>{a.description}</Typography>
                                                </Box>
                                                <Divider />
                                            </Box>

                                        ))) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No attachments available
                                        </Typography>
                                    )}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="medication-administrations">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Medication Administration
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    {holterStudyByPatient.medicationAdministrations.length > 0 ? (
                                        holterStudyByPatient.medicationAdministrations.map((a) => (
                                            <Box sx={{ marginBottom: 2, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Medication Name</Typography>
                                                    <Typography>{a.medicationName}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Administration Date</Typography>
                                                    <Typography>{formatDateTime(a.administrationDateTime)}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Dosage</Typography>
                                                    <Typography>{a.dosage}</Typography>
                                                </Box>
                                                <Divider />
                                            </Box>

                                        ))) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No attachments available
                                        </Typography>
                                    )}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="patient-symptoms">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Symptoms
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    {holterStudyByPatient.patientSymptoms.length > 0 ? (
                                        holterStudyByPatient.patientSymptoms.map((a) => (
                                            <Box sx={{ marginBottom: 2, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Symptom Name</Typography>
                                                    <Typography>{a.symptomName}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Symptom Date</Typography>
                                                    <Typography>{formatDateTime(a.symptomDateTime)}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Description</Typography>
                                                    <Typography>{a.description}</Typography>
                                                </Box>
                                                <Divider />
                                            </Box>

                                        ))) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No attachments available
                                        </Typography>
                                    )}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Accordion className="clinical-evaluations">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Clinical Evaluation
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    {holterStudyByPatient.clinicalEvaluations.length > 0 ? (
                                        holterStudyByPatient.clinicalEvaluations.map((a) => (
                                            <Box sx={{ marginBottom: 2, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Evaluation Date</Typography>
                                                    <Typography>{a.evaluationDateTime}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Findings</Typography>
                                                    <Typography>{formatDateTime(a.findings)}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Recommendations</Typography>
                                                    <Typography>{a.recommendations}</Typography>
                                                </Box>
                                                <Divider />
                                            </Box>

                                        ))) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No attachments available
                                        </Typography>
                                    )}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className="patient-symptoms">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Additional Test Results
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    {holterStudyByPatient.additionalTestResults.length > 0 ? (
                                        holterStudyByPatient.additionalTestResults.map((a) => (
                                            <Box sx={{ marginBottom: 2, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Test Name</Typography>
                                                    <Typography>{a.testName}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Test Date</Typography>
                                                    <Typography>{formatDateTime(a.testDateTime)}</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="body1" color="text.secondary">Results</Typography>
                                                    <Typography>{a.results}</Typography>
                                                </Box>
                                                <Divider />
                                            </Box>

                                        ))) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No attachments available
                                        </Typography>
                                    )}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </CardContent>
                <CardActions sx={{ padding: '0px', marginTop: '10px' }}>
                    <Button size="small" color="info"><ModeEditIcon sx={{ marginRight: '5px', }} />Edit</Button>
                    <Button size="small" color="error"><DeleteIcon sx={{ marginRight: '5px' }} />Delete</Button>
                </CardActions>
            </Card>
        </Box >
    )
}
