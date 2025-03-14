import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { fetchHolterStudyByPatientAsync, holterStudySelectors, removeHolterStudy } from "./holterStudySlice";
import { useEffect, useState } from "react";
import NotFound from "../../../app/errors/NotFound";
import { Box, Card, CardContent, Typography, CardActions, Grid, Drawer } from "@mui/material";
import formatDateTime from "../../../app/components/formatDateTime";
import { timeDisplay } from "../../../app/components/timeDisplay";
import { CiCalendar, CiHeart, CiUser } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { MdOutlineDelete, MdOutlineTimer } from "react-icons/md";
import { LuActivity, LuHeartPulse, LuPenLine } from "react-icons/lu";
import Title from "../../../app/components/Title";
import { HolterStudy } from "../../../app/Models/holterStudy";
import CustomButton from "../../../app/components/CustomButton";
import HolterStudyForm from "./HolterStudyform";
import '../../../app/styles/holter.scss';
import AdditionalTestResults from "./additionalTestResults/AdditionalTestResult";
import agent from "../../../app/api/agent";
import ClinicalEvaluations from "./clinicalEvaluation/ClinicalEvaluations";
import PatientSymptoms from "./patientSymptoms/PatientSymptoms";
import MedicationAdministrations from "./medicationAdministration/MedicationAdministrations";
import ArrhythmiaEvents from "./arrhythmiaEvents/ArrhythmiaEvents";

export default function HolterStudyDetails() {

    const dispatch = useAppDispatch();
    const { id: patientId, holterStudyId } = useParams<{ id: string, holterStudyId: string }>();
    const patientIdNumber = patientId ? Number(patientId) : undefined;
    const holterStudyIdNumber = holterStudyId ? Number(holterStudyId) : undefined;

    const { status: holterStudiesByPatientStatus } = useAppSelector(state => state.holterStudy);
    const holterStudyByPatient = useAppSelector((state) =>
        holterStudyIdNumber ? holterStudySelectors.selectById(state, holterStudyIdNumber) : undefined
    );
    const [selectedHolterStudy, setSelectedHolterStudy] = useState<HolterStudy | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    const handleEditClick = () => {
        if(holterStudyByPatient) {
            setSelectedHolterStudy(holterStudyByPatient);
            setEditMode(true);
        }
    }

    const toggleDrawer = () => {
        setEditMode(false);
    };

    function handleDeleteHolterStudy(id: number) {
        agent.HolterStudy.deleteHolterStudy(id).then(() => {
            dispatch(removeHolterStudy(id));
            navigate(`/holterstudy/patient/${patientIdNumber}/holterstudies`);
        })
        .catch(error => console.log(error));
    }

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
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={9} lg={9}>
                <Card sx={{ margin: 2 }}>
                    <CardContent
                    sx={{
                        backgroundImage: 'linear-gradient(#a7d7c5, #fff)',
                        padding: { xs: '20px', sm: '30px' },
                    }}
                    >
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Box
                                        sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}
                                    >
                                        <CiUser style={{ fontSize: "30px", strokeWidth: '0.7'}}/>
                                        <Title title={holterStudyByPatient?.patient} weight="600"/>
                                    </Box>
                                    <Typography
                                        sx={{ marginTop: '5px', fontSize: '18px' }}
                                        gutterBottom
                                        color="text.secondary"
                                    >
                                        Holter Study Report
                                    </Typography>
                                </Box>
                                <LuHeartPulse style={{ fontSize: "55px", strokeWidth: '1.5', color: '#EF4444' }}/>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}  variant='body1' color="text.secondary">
                                    <CiCalendar style={{ fontSize: '18px', strokeWidth: '1' }} />
                                    {formatDateTime(holterStudyByPatient.date)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <IoMdTime style={{ fontSize: '18px', strokeWidth: '1' }} />
                                    <span>
                                        {timeDisplay(holterStudyByPatient.date)}
                                    </span>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <MdOutlineTimer style={{ fontSize: '18px' }}/>
                                    Study Duration:
                                    <span>
                                        {holterStudyByPatient?.studyDuration}
                                    </span>
                                </Typography>
                            </Box>
                            
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Box
                            sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            marginTop: '20px',
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Card>
                                        <CardContent sx={{ padding: '20px' }}>
                                            <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 0.5 }}>
                                                Average Heart Rate
                                                <CiHeart style={{ fontSize: "25px", color: '#EF4444' }}/>
                                            </Typography>
                                            <Typography sx={{fontSize: '18px'}}>
                                                {holterStudyByPatient?.averageHeartRate} Bpm
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Card>
                                        <CardContent sx={{ padding: '20px' }}>
                                            <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 0.5 }}>
                                                Maximum Heart Rate
                                                <LuActivity style={{ fontSize: "20px", color: '#44C55E' }} />
                                            </Typography>
                                            <Typography sx={{fontSize: '18px'}}>
                                                {holterStudyByPatient?.maximumHeartRate} Bpm
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Card>
                                        <CardContent sx={{ padding: '20px' }}>
                                            <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 0.5 }}>
                                                Physical Activity
                                                <LuActivity style={{ fontSize: "20px", color: '#A855F7' }} />
                                            </Typography>
                                            <Typography sx={{fontSize: '18px'}}>{holterStudyByPatient?.physicalActivity}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Card variant="outlined" >
                                <CardContent sx={{padding: '20px'}}>
                                    <Typography sx={{fontWeight: '800', fontSize: '20px'}}>
                                        Type of Heart Rhythm
                                    </Typography>
                                    <Typography sx={{ margin: '20px 0 20px 0'}}>
                                        {holterStudyByPatient?.typeHeartRhythm}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card variant="outlined">
                                <CardContent sx={{padding: '20px'}}>
                                    <Typography sx={{fontWeight: '800', fontSize: '20px'}}>
                                        Conclusion
                                    </Typography>
                                    <Typography sx={{ margin: '20px 0 20px 0'}}>
                                        {holterStudyByPatient?.conclusion}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </CardContent>
                    
                    <ArrhythmiaEvents holterStudyByPatient={holterStudyByPatient} holterStudyId={holterStudyIdNumber}/>
                    <MedicationAdministrations holterStudyByPatient={holterStudyByPatient} holterStudyId={holterStudyIdNumber}/>
                    <PatientSymptoms holterStudyByPatient={holterStudyByPatient} holterStudyId={holterStudyIdNumber}/>
                    <ClinicalEvaluations holterStudyByPatient={holterStudyByPatient} holterStudyId={holterStudyIdNumber}/>
                    <AdditionalTestResults holterStudyByPatient={holterStudyByPatient} holterStudyId={holterStudyIdNumber}/>
               
                    <CardActions sx={{marginTop: '20px' }}>
                        <CustomButton
                            icon={LuPenLine}
                            color="#fff"
                            width="130px"
                            bg="#2377cb"
                            borderColor="transparent"
                            hoverColor="#1261a2"
                            onClick={handleEditClick}
                        >
                            Update
                        </CustomButton>
                        <CustomButton
                            icon={MdOutlineDelete}
                            color="#dc3737"
                            width="130px"
                            bg="transparent"
                            borderColor="#dc3737"
                            hoverColor="transparent"
                            onClick={() => handleDeleteHolterStudy(holterStudyByPatient!.id)}
                        >
                            Delete
                        </CustomButton>
                    </CardActions>
                    <Drawer anchor='right' open={editMode} onClose={toggleDrawer}>
                        <Box sx={{width: 600, p:2}}>
                            <HolterStudyForm 
                                study={selectedHolterStudy}
                                cancelEdit={toggleDrawer}
                                title={'Editing Holter Study'}
                                patientId={patientIdNumber}
                            />
                        </Box>
                    </Drawer>
                </Card>
            </Grid >
        </Grid>
    )
}
