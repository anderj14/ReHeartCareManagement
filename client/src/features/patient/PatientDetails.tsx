
import { Box, Button, Card, CardContent, Drawer, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Appointment } from "../../app/Models/appointment";
import AppointmentsPatient from "./components/AppointmentsPatient";
import React from "react";
import BloodTestPatient from "./components/BloodTestsPatient";
import Breadcrumb from "../../app/components/Breadcrumb";
import { format } from "date-fns";
import ElectrocardiogramPatient from "./components/ElectrocardiogramPatient";
import EchocardiogramPatient from "./components/EchocardiogramPatient";
import CardiacCathStudyPatient from "./components/CardiacCathStudyPatient";
import HolterStudyPatient from "./components/HolterStudyPatient";
import PhysicalExaminationPatient from "./components/PhysicalExaminationPatient";
import DiseaseHistoryPatient from "./components/DiseaseHistoryPatient";
import MedicalHistoryPatient from "./components/MedicalHistoryPatient";
import DiagnosticPatient from "./components/DiagnosticPatient";
import TreatmentPatient from "./components/TreatmentPatient";
import NotFound from "../../app/errors/NotFound";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchPatientAsync, patientSelectors, removePatient } from "./patientSlice";
import { bloodTestSelectors, fetchBloodTestsByPatientAsync } from "./bloodTest/bloodTestSlice";
import { cardiacCathStudySelectors, fetchCardiacCathStudiesByPatientAsync } from "./cardiacTestsPatient/cardiacCathStudySlice";
import { echocardiogramSelectors, fetchEchocardiogramsByPatientAsync } from "./echocardiogram/echocardiogramSlice";
import { electrocardiogramSelectors, fetchElectrocardiogramsByPatientAsync } from "./electrocardiogram/electrocardiogramSlice";
import { fetchHolterStudiesByPatientAsync, holterStudySelectors } from "./holterStudy/holterStudySlice";
import { fetchPhysicalExaminationsByPatientAsync, physicalExaminationSelectors } from "./physicalExamination/physicalExaminationSlice";
import { diseaseHistorySelectors, fetchDiseaseHistoriesByPatientAsync } from "./diseaseHistory/diseaseHistorySlice";
import { fetchMedicalHistoriesByPatientAsync, medicalHistorySelectors } from "./medicalHistory/medicalHistorySlice";
import { diagnosticSelectors, fetchDiagnosticsByPatientAsync } from "./diagnostic/diagnosticSlice";
import { fetchTreatmentsByPatientAsync, treatmentSelectors } from "./treatment/treatmentSlice";
import { Delete, Edit } from "@mui/icons-material";
import { Patient } from "../../app/Models/patient";
import PatientForm from "./admin-patient/PatientForm";
import calculateAge from "../../app/components/calculateAge";
import { fetchCardiologySurgeriesByPatientAsync, surgerySelectors } from "../surgery/surgerySlice";
import CardiologySurgeryPatient from "./components/CardiolodySurgeryPatient";
import { fetchStressTestsByPatientAsync, stressTestSelectors } from "./stressTest/stressTestSlice";
import StressTestPatient from "./components/StressTestPatient";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function PatientDetail() {
    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));
    const { status: patientStatus } = useAppSelector(state => state.patient);
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [value, setValue] = useState(0);
    const { bloodTestByPatientLoaded } = useAppSelector(state => state.bloodTest);
    const bloodTestsByPatient = useAppSelector(bloodTestSelectors.selectAll);
    const { cardiacCathStudyByPatientLoaded } = useAppSelector(state => state.cardiacCathStudy);
    const cardiacCathStudyByPatient = useAppSelector(cardiacCathStudySelectors.selectAll);
    const { electrocardiogramByPatientLoaded } = useAppSelector(state => state.electrocardiogram);
    const electrocardiogramByPatient = useAppSelector(electrocardiogramSelectors.selectAll);
    const { echocardiogramByPatientLoaded } = useAppSelector(state => state.echocardiogram);
    const echocardiogramByPatient = useAppSelector(echocardiogramSelectors.selectAll);
    const { holterStudyByPatientLoaded } = useAppSelector(state => state.holterStudy);
    const holterStudyByPatient = useAppSelector(holterStudySelectors.selectAll);
    const { physicalExaminationByPatientLoaded } = useAppSelector(state => state.physicalExamination);
    const physicalExaminationByPatient = useAppSelector(physicalExaminationSelectors.selectAll);
    const { diseaseHistoryByPatientLoaded } = useAppSelector(state => state.diseaseHistory);
    const diseaseHistoryByPatient = useAppSelector(diseaseHistorySelectors.selectAll);
    const { medicalHistoryByPatientLoaded } = useAppSelector(state => state.medicalHistory);
    const medicalHistoryByPatient = useAppSelector(medicalHistorySelectors.selectAll);
    const { diagnosticByPatientLoaded } = useAppSelector(state => state.diagnostic);
    const diagnosticByPatient = useAppSelector(diagnosticSelectors.selectAll);
    const { treatmentsByPatientLoaded } = useAppSelector(state => state.treatment);
    const treatmentByPatient = useAppSelector(treatmentSelectors.selectAll);
    const { surgeryByPatientLoaded } = useAppSelector(state => state.cardiologySurgery);
    const surgeryByPatient = useAppSelector(surgerySelectors.selectAll);
    const { stressTestByPatientLoaded } = useAppSelector(state => state.stressTest);
    const stressTestByPatient = useAppSelector(stressTestSelectors.selectAll);
    const [editMode, setEditMode] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(undefined);
    const [target, setTarget] = useState(0);
    const navigate = useNavigate();


    function handleDeletePatient(id: number) {
        setLoading(true);
        setTarget(id);
        agent.Admin.deletePatient(id)
            .then(() => {
                dispatch(removePatient(id));
                navigate('/patients')
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }


    useEffect(() => {
        const fetchPatient = async () => {
            if (!patient) dispatch(fetchPatientAsync(id));
        };
        const fetchAppointments = async () => {
            // try {
            //     const appointmentsData = await ApiService.getAppointmentsByPatientId(id);
            //     setAppointments(appointmentsData);
            // } catch (error) {
            //     console.error('Error fetching appointments:', error);
            // } finally {
            //     setLoading(false);
            // }
            // if (!bloodTestByPatientLoaded) dispatch(fetchAppointmentByPatientAsync(id));

        };
        const fetchBloodTest = async () => {
            if (!bloodTestByPatientLoaded) dispatch(fetchBloodTestsByPatientAsync(id));
        };
        const fetchElectrocardiogram = async () => {
            if (!electrocardiogramByPatientLoaded) dispatch(fetchElectrocardiogramsByPatientAsync(id));
        };
        const fetchEchocardiogram = async () => {
            if (!echocardiogramByPatientLoaded) dispatch(fetchEchocardiogramsByPatientAsync(id));
        };
        const fetchCardiacCathStudy = async () => {
            if (!cardiacCathStudyByPatientLoaded) dispatch(fetchCardiacCathStudiesByPatientAsync(id));
        };
        const fetchHolterStudy = async () => {
            if (!holterStudyByPatientLoaded) dispatch(fetchHolterStudiesByPatientAsync(id));
        };
        const fetchPhysicalExamination = async () => {
            if (!physicalExaminationByPatientLoaded) dispatch(fetchPhysicalExaminationsByPatientAsync(id));
        };
        const fetchDiseaseHistory = async () => {
            if (!diseaseHistoryByPatientLoaded) dispatch(fetchDiseaseHistoriesByPatientAsync(id));
        };
        const fetchMedicalHistory = async () => {
            if (!medicalHistoryByPatientLoaded) dispatch(fetchMedicalHistoriesByPatientAsync(id));
        };
        const fetchDiagnostic = async () => {
            if (!diagnosticByPatientLoaded) dispatch(fetchDiagnosticsByPatientAsync(id));
        };
        const fetchTreatment = async () => {
            if (!treatmentsByPatientLoaded) dispatch(fetchTreatmentsByPatientAsync(id));
        };
        const fetchSurgery = async () => {
            if (!surgeryByPatientLoaded) dispatch(fetchCardiologySurgeriesByPatientAsync(id));
        };
        const fetchStressTest = async () => {
            if (!stressTestByPatientLoaded) dispatch(fetchStressTestsByPatientAsync(id));
        }

        fetchPatient();
        fetchAppointments();
        fetchBloodTest();
        fetchElectrocardiogram();
        fetchEchocardiogram();
        fetchCardiacCathStudy();
        fetchHolterStudy();
        fetchPhysicalExamination();
        fetchDiseaseHistory();
        fetchMedicalHistory();
        fetchDiagnostic();
        fetchTreatment();
        fetchSurgery();
        fetchStressTest();
    }, [id, dispatch, patient,
        bloodTestByPatientLoaded,
        cardiacCathStudyByPatientLoaded,
        electrocardiogramByPatientLoaded,
        echocardiogramByPatientLoaded,
        holterStudyByPatientLoaded,
        physicalExaminationByPatientLoaded,
        diseaseHistoryByPatientLoaded,
        diagnosticByPatientLoaded,
        treatmentsByPatientLoaded,
        surgeryByPatientLoaded,
        stressTestByPatientLoaded
    ]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const age = calculateAge(patient?.dob);

    const handleEditClick = () => {
        if (patient) {
            setSelectedPatient(patient);
            setEditMode(true);
        }
    };

    const toggleDrawer = () => {
        setEditMode(false);
    };

    if (patientStatus.includes('pending')) return <h3>Loading...</h3>;
    if (!patient) return <NotFound />;

    return (
        <div className="container">
            <Breadcrumb page='patients / patient name' />
            <div className="sectionPatientDetails">
                <Card>
                    <CardContent className="patientDetails">
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: '500' }}>{patient.patientName}</Typography>
                            <div className="contentInfo">
                                <Box className="patientInfo">
                                    <p>ID:</p>
                                    <p>DOB:</p>
                                    <p>Age:</p>
                                    <p>Gender:</p>
                                    <p>Social Security:</p>
                                    <p>Address:</p>
                                </Box>
                                <Box className="patientInfoData">
                                    <p>{patient.carnetIdentification}</p>
                                    <p>{patient.dob ? format(new Date(patient.dob), 'dd/MM/yyyy') : ''}</p>
                                    <p>{age !== undefined ? age : 'Unknown'} years</p>
                                    <p>{patient.gender}</p>
                                    <p>{patient.socialSecurity}</p>
                                    <p>{patient.address}</p>
                                </Box>
                            </div>
                        </Box>
                        <div className="line"></div>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: '500', fontSize: '18px' }}>Patient Contact</Typography>
                            <div className="contentInfo">
                                <Box className="patientInfo">
                                    <p>Email:</p>
                                    <p>Phone:</p>
                                    <p>Telephone:</p>
                                    <p>Fax:</p>
                                </Box>
                                <Box className="patientInfoData" sx={{ marginTop: '18px' }}>
                                    <a href={`mailto:${patient.email}`} style={{ textTransform: 'lowercase', color: '#1f2dac', textDecoration: 'none' }}>{patient.email}</a>
                                    <p style={{ color: '#1f2dac' }}>{patient.phone}</p>
                                    <p style={{ color: '#1f2dac' }}>{patient.phone}</p>
                                    <p style={{ color: '#1f2dac' }}>{patient.fax}</p>
                                </Box>
                            </div>
                        </Box>
                        <div className="line"></div>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: '500', fontSize: '18px' }}>Patient Referrer Information</Typography>
                            <div className="contentInfo">
                                <Box className="patientInfo">
                                    <p>Referring Doctor:</p>
                                    <p>Assigned Doctor:</p>
                                    <p>Family Doctor:</p>
                                </Box>
                                <Box className="patientInfoData">
                                    <p>{patient.referringDoctor}</p>
                                    <p>{patient.assignedDoctor}</p>
                                    <p>{patient.familyDoctor}</p>
                                </Box>
                            </div>
                        </Box>
                        <div className="line"></div>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: '500', fontSize: '18px' }}>Active</Typography>
                            <div className="contentInfo">
                                <Box className="active">
                                    <div className="circleTrigger"></div>
                                    <p>{patient.status}</p>
                                </Box>
                            </div>
                        </Box>
                        <div className="line"></div>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: '500', fontSize: '18px' }}>Emergency Contact</Typography>
                            <div className="contentInfo">
                                <Box className="patientInfo">
                                    <p>Contact Name:</p>
                                    <p>Number Phone:</p>
                                    <p>Contact Relation:</p>
                                </Box>
                                <Box className="patientInfoData">
                                    <p>{patient.emergencyContactName}</p>
                                    <p>{patient.emergencyContactNumber}</p>
                                    <p>{patient.emergencyContactRelation}</p>
                                </Box>
                            </div>
                        </Box>

                        <Button onClick={(handleEditClick)} startIcon={<Edit />}>
                            Edit
                        </Button>
                        <LoadingButton 
                        loading={loading && target === patient.id} 
                        startIcon={<Delete />} 
                        color="error"
                        onClick={() => handleDeletePatient(patient.id)}
                        >
                            Delete
                        </LoadingButton>
                    </CardContent>
                </Card>
                <Drawer
                    anchor="right"
                    open={editMode}
                    onClose={toggleDrawer}
                >
                    <Box sx={{ width: 600, p: 2 }}>
                        <PatientForm patient={selectedPatient} cancelEdit={toggleDrawer} title={`Editing Patient ${patient.patientName}`}/>
                    </Box>
                </Drawer>

                <Card sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            textColor="secondary"
                            indicatorColor="secondary"
                            onChange={handleChange}
                        >
                            <Tab label="appointments" sx={{ textTransform: 'capitalize' }} />
                            <Tab label="Tests / Studies" {...a11yProps(0)} sx={{ textTransform: 'capitalize' }} />
                            <Tab label="Histories" {...a11yProps(1)} sx={{ textTransform: 'capitalize' }} />
                            <Tab label="Diagnostics / Treatments / Surgeries" sx={{ textTransform: 'capitalize' }} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Box className="componentContainer">
                            <AppointmentsPatient appointments={appointments} />
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Box className="componentContainer">
                            <section style={{ display: "flex", flexDirection: "column", gap: 25 }}>
                                <Link to={`/bloodtests/patient/${patient.id}/bloodtests`} style={{ textDecoration: 'none' }}>
                                    <BloodTestPatient bloodTests={bloodTestsByPatient} />
                                </Link>
                                <Link to={`/electrocardiogram/patient/${patient.id}/electrocardiograms`} style={{ textDecoration: 'none' }}>
                                    <ElectrocardiogramPatient electrocardiogram={electrocardiogramByPatient} />
                                </Link>
                                <Link to={`/echocardiogram/patient/${patient.id}/echocardiograms`} style={{ textDecoration: 'none' }}>
                                    <EchocardiogramPatient echocardiogram={echocardiogramByPatient} />
                                </Link>
                            </section>
                            <section style={{ display: "flex", flexDirection: "column", gap: 25 }}>
                                <Link to={`/cardiaccatheterizationstudy/patient/${patient.id}/cardiaccathstudies`} style={{ textDecoration: 'none' }}>
                                    <CardiacCathStudyPatient cardiacCathStudy={cardiacCathStudyByPatient} />
                                </Link>
                                <Link to={`/holterstudy/patient/${patient.id}/holterstudies`} style={{ textDecoration: 'none' }}>
                                    <HolterStudyPatient holterStudy={holterStudyByPatient} />
                                </Link>
                                <Link to={`/physicalexamination/patient/${patient.id}/physicalexaminations`} style={{ textDecoration: 'none' }}>
                                    <PhysicalExaminationPatient physicalExamination={physicalExaminationByPatient} />
                                </Link>
                                <Link to={`/stresstest/patient/${patient.id}/stresstests`} style={{ textDecoration: 'none' }}>
                                    <StressTestPatient stressTest={stressTestByPatient} />
                                </Link>

                            </section>
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Box className="componentContainer">
                            <section style={{ display: "flex", flexDirection: "column", gap: 25, width: '100%' }}>
                                <Link to={`/diseasehistory/patient/${patient.id}/diseaseshistories`} style={{ textDecoration: 'none' }}>
                                    <DiseaseHistoryPatient diseaseHistory={diseaseHistoryByPatient} />
                                </Link>
                            </section>
                            <section style={{ display: "flex", flexDirection: "column", gap: 25, width: '100%' }}>
                                <Link to={`/medicalhistory/patient/${patient.id}/medicalhistories`} style={{ textDecoration: 'none' }}>
                                    <MedicalHistoryPatient medicalHistory={medicalHistoryByPatient} />
                                </Link>
                            </section>
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <Box className="componentContainer">
                            <section style={{ display: "flex", flexDirection: "column" }}>
                                <Link to={`/cardiologysurgery/patient/${patient.id}/cardiologysurgeries`} style={{ textDecoration: 'none' }}>
                                    <CardiologySurgeryPatient cardiologySurgery={surgeryByPatient} />
                                </Link>
                            </section>
                            <section style={{ display: "flex", flexDirection: "column", gap: 25 }}>
                                <Link to={`/diagnostic/patient/${patient.id}/diagnostics`} style={{ textDecoration: 'none' }}>
                                    <DiagnosticPatient diagnostic={diagnosticByPatient} />
                                </Link>
                                <Link to={`/treatment/patient/${patient.id}/treatments`} style={{ textDecoration: 'none' }}>
                                    <TreatmentPatient treatment={treatmentByPatient} />
                                </Link>
                            </section>
                        </Box>
                    </CustomTabPanel>
                </Card>
            </div >
        </div >
    );
}