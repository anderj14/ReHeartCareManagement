
import { Box, Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { Appointment } from "../../app/Models/appointment";
import AppointmentsPatient from "./components/AppointmentsPatient";
import React from "react";
import BloodTestPatient from "./components/BloodTestsPatient";
import { BloodTest } from "../../app/Models/bloodTest";
import Breadcrumb from "../../app/components/Breadcrumb";
import { format } from "date-fns";
import ElectrocardiogramPatient from "./components/ElectrocardiogramPatient";
import { Electrocardiogram } from "../../app/Models/electrocardiogram";
import { Echocardiogram } from "../../app/Models/echocardiogram";
import EchocardiogramPatient from "./components/EchocardiogramPatient";
import CardiacCathStudyPatient from "./components/CardiacCathStudyPatient";
import { CardiacCathStudy } from "../../app/Models/cardiacCathStudy";
import HolterStudyPatient from "./components/HolterStudyPatient";
import { HolterStudy } from "../../app/Models/holterStudy";
import { PhysicalExamination } from "../../app/Models/physicalExamination";
import PhysicalExaminationPatient from "./components/PhysicalExaminationPatient";
import { DiseaseHistory } from "../../app/Models/DiseaseHistory";
import DiseaseHistoryPatient from "./components/DiseaseHistoryPatient";
import { MedicalHistory } from "../../app/Models/MedicalHistory";
import MedicalHistoryPatient from "./components/MedicalHistoryPatient";
import { Diagnostic } from "../../app/Models/diagnostic";
import DiagnosticPatient from "./components/DiagnosticPatient";
import { Treatment } from "../../app/Models/treatment";
import TreatmentPatient from "./components/TreatmentPatient";
import NotFound from "../../app/errors/NotFound";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchPatientAsync, patientSelectors } from "./patientSlice";
import { bloodTestSelectors, fetchBloodTestsByPatientAsync } from "./bloodTest/bloodTestSlice";

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
    const [electrocardiogram, setElectrocardiogram] = useState<Electrocardiogram[]>([]);
    const [echocardiogram, setEchocardiogram] = useState<Echocardiogram[]>([]);
    const [cardiacCathStudy, setCardiacCathStudy] = useState<CardiacCathStudy[]>([]);
    const [holterStudy, setholterStudy] = useState<HolterStudy[]>([]);
    const [physicalexamination, setPhysicalExamination] = useState<PhysicalExamination[]>([]);
    const [diseaseHistory, setDiseaseHistory] = useState<DiseaseHistory[]>([]);
    const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>([]);
    const [diagnostic, setDiagnostic] = useState<Diagnostic[]>([]);
    const [treatment, setTreatment] = useState<Treatment[]>([]);
    const [value, setValue] = useState(0);
    const { bloodTestByPatientLoaded } = useAppSelector(state => state.bloodTest);
    const bloodTestsByPatient = useAppSelector(bloodTestSelectors.selectAll);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchPatient = async () => {
            if (!patient) dispatch(fetchPatientAsync(id));
        };
        const fetchAppointments = async () => {
            try {
                const appointmentsData = await ApiService.getAppointmentsByPatientId(id);
                setAppointments(appointmentsData);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            } finally {
                setLoading(false);
            }
        };
        const fetchBloodTest = async () => {
            if (!bloodTestByPatientLoaded) dispatch(fetchBloodTestsByPatientAsync(id));

        };
        const fetchElectrocardiogram = async () => {
            try {
                const electrocardiogramData = await ApiService.getElectrocardiogramByPatientId(id);
                setElectrocardiogram(electrocardiogramData);
            } catch (error) {
                console.error('Error fetching electrocardiogram:', error);
            } finally {
                setLoading(false);
            }
        };
        const fetchEchocardiogram = async () => {
            try {
                const echocardiogramData = await ApiService.getEchocardiogramByPatientId(id);
                setEchocardiogram(echocardiogramData);
                console.log('Echocardiograms: ', echocardiogramData);
            } catch (error) {
                console.error('Error fetching echocardiogram:', error);
            } finally {
                setLoading(false);
            }
        };
        const fetchCardiacCathStudy = async () => {
            try {
                const cardiacCathStudyData = await ApiService.getCardiacCathStudyByPatientId(id);
                setCardiacCathStudy(cardiacCathStudyData);
            } catch (error) {
                console.error('Error fetching cardiac catheterization study:', error);
            } finally {
                setLoading(false);
            }
        };
        const fetchHolterStudy = async () => {
            try {
                const holterStudyData = await ApiService.getHolterStudyByPatientId(id);
                setholterStudy(holterStudyData);
            } catch (error) {
                console.error('Error fetching holter study:', error);
            } finally {
                setLoading(false);
            }
        };
        const fetchPhysicalExamination = async () => {
            try {
                const physicalExaminationData = await ApiService.getPhysicalExaminationPatientId(id);
                setPhysicalExamination(physicalExaminationData);
            } catch (error) {
                console.error('Error fetching physical examination:', error);
            } finally {
                setLoading(false);
            }
        };
        const fetchDiseaseHistory = async () => {
            try {
                const diseaseHistoryData = await ApiService.getDiseaseHistoryByPatientId(id);
                setDiseaseHistory(diseaseHistoryData);
            } catch (error) {
                console.error('Error fetching disease history:', error);
            } finally {
                setLoading(false);
            }
        };
        const fetchMedicalHistory = async () => {
            try {
                const medicalHistoryData = await ApiService.getMedicalHistoryByPatientId(id);
                setMedicalHistory(medicalHistoryData);
            } catch (error) {
                console.error('Error fetching medical history:', error);
            } finally {
                setLoading(false);
            }
        };
        const fetchDiagnostic = async () => {
            try {
                const diagnosticData = await ApiService.getDiagnosticByPatientId(id);
                setDiagnostic(diagnosticData);
            } catch (error) {
                console.error('Error fetching diagnostic:', error);
            } finally {
                setLoading(false);
            }
        };
        const fetchTreatment = async () => {
            try {
                const treatmentData = await ApiService.getTreatmentByPatientId(id);
                setTreatment(treatmentData);
            } catch (error) {
                console.error('Error fetching treatment:', error);
            } finally {
                setLoading(false);
            }
        };

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
        fetchTreatment()
    }, [id, dispatch, patient, bloodTestByPatientLoaded]);

    function calculateAge(dob: any) {
        if (dob) {
            const today = new Date();
            const birthDate = new Date(dob);
            let age = today.getFullYear() - birthDate.getFullYear();

            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
        return undefined;
    }

    const age = calculateAge(patient?.dob);

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
                                    <p style={{ color: '#1f2dac' }}>-----</p>
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
                                    <p>Alberth West</p>
                                    <p>Alejandra Roman</p>
                                    <p>-----</p>
                                </Box>
                            </div>
                        </Box>
                        <div className="line"></div>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: '500', fontSize: '18px' }}>Active</Typography>
                            <div className="contentInfo">
                                <Box className="active">
                                    <div className="circleTrigger"></div>
                                    <p>PAT</p>
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
                                    <p>Alberth West</p>
                                    <p>Alejandra Roman</p>
                                    <p>-----</p>
                                </Box>
                            </div>
                        </Box>
                    </CardContent>
                </Card>

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
                            <Tab label="Diagnostics / Treatments" sx={{ textTransform: 'capitalize' }} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Box className="componentContainer">
                            <AppointmentsPatient appointments={appointments} />
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Box className="componentContainer">
                            <section style={{ display: "flex", flexDirection: "column", gap: 25, width: '350px' }}>
                                <Link to={`/bloodtests/patient/${patient.id}/bloodtests`} style={{ textDecoration: 'none' }}>
                                    <BloodTestPatient bloodTests={bloodTestsByPatient} />
                                </Link>
                                <ElectrocardiogramPatient electrocardiogram={electrocardiogram} />
                                <EchocardiogramPatient echocardiogram={echocardiogram} />
                            </section>
                            <section style={{ display: "flex", flexDirection: "column", gap: 25 }}>
                                <CardiacCathStudyPatient cardiacCathStudy={cardiacCathStudy} />
                                <HolterStudyPatient holterStudy={holterStudy} />
                                <PhysicalExaminationPatient physicalExamination={physicalexamination} />
                            </section>
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Box className="componentContainer">
                            <section style={{ display: "flex", flexDirection: "column", gap: 25, width: '100%' }}>
                                <DiseaseHistoryPatient diseaseHistory={diseaseHistory} />
                            </section>
                            <section style={{ display: "flex", flexDirection: "column", gap: 25, width: '100%' }}>
                                <MedicalHistoryPatient medicalHistory={medicalHistory} />
                            </section>
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <Box className="componentContainer">
                            <section style={{ display: "flex", flexDirection: "column", gap: 25, width: '100%' }}>
                                <DiagnosticPatient diagnostic={diagnostic} />
                            </section>
                            <section style={{ display: "flex", flexDirection: "column", gap: 25, width: '100%' }}>
                                <TreatmentPatient treatment={treatment} />
                            </section>
                        </Box>
                    </CustomTabPanel>
                </Card>
            </div >
        </div >
    );
}