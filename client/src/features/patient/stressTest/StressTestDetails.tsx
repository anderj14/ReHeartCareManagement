import { Box, Card, CardActions, CardContent, Drawer, Grid, LinearProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeStressTest } from "./stressTestSlice";
import { useState } from "react";
import NotFound from "../../../app/errors/NotFound";
import formatDateTime from "../../../app/components/formatDateTime";
import { StressTest } from "../../../app/Models/stressTest";
import agent from "../../../app/api/agent";
import { CiCalendar, CiCircleAlert, CiHeart, CiUser } from "react-icons/ci";
import { LuActivity, LuPenLine } from "react-icons/lu";
import { IoMdTime } from "react-icons/io";
import { MdOutlineDelete, MdOutlineTimer } from "react-icons/md";
import { timeDisplay } from "../../../app/components/timeDisplay";
import { FaChartLine } from "react-icons/fa6";
import BloodPressureCard from "../../../app/components/BloodPressureCard";
import CustomButton from "../../../app/components/CustomButton";
import StressTestForm from "./StressTestForm";
import CustomCard, { DetailCard } from "../../../app/components/CustomCard";
import { GrDocumentText } from "react-icons/gr";
import { useStressTest } from "../../../app/hooks/useStresTest";
import { SectionHeaderCard } from "../../../app/components/SectionHeaderCard";
import '../../../app/styles/_mixins.scss';

const minHeartRate = 60;

const extractNumber = (heartRate: any) => {
    const match = heartRate?.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
};

export default function StressTestDetails() {

    const {dispatch, patient, patientIdNumber, stressTestByPatient, status} = useStressTest();

    const [selectedStressTest, setSelectedStressTest] = useState<StressTest | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    const handleEditClick = () => {
        if (stressTestByPatient) {
            setSelectedStressTest(stressTestByPatient);
            setEditMode(true);
        }
     };

    const toggleDrawer = () => {
        setEditMode(false);
    };

    function handleDeleteStressTest(id: number) {
        agent.StressTest.deleteStressTest(id).then(() => {
            dispatch(removeStressTest(id));
            navigate(`/stresstest/patient/${patientIdNumber}/stresstests`);
        })
        .catch(error => console.log(error));
    }

    if (status.includes('pending')) return <h3>Loading...</h3>
    if (!stressTestByPatient) return <NotFound />


    const heartRateStr = stressTestByPatient?.maxHeartRate || "0 bpm";
    const heartRateValue = extractNumber(heartRateStr);
    const age = patient?.dob ? new Date().getFullYear() - new Date(patient.dob).getFullYear() : 0;

    console.log(age);
    
    
    // Calculate maximum heart rate based on age
    const maxHeartRateExpected = 220 - age;

    // Asegurar que el mínimo sea razonable
    let percentage = ((heartRateValue - minHeartRate) / (maxHeartRateExpected - minHeartRate)) * 100;

    percentage = Math.max(0, percentage); // Solo aseguramos que no sea negativo
    
    const getColor = () => {
        if (percentage < 50) return "#22c55e"; // Green (low effort)
        if (percentage < 75) return "#3b82f6"; // Blue (moderate)
        if (percentage < 90) return "#f59e0b"; // Orange (high)
        return "#dc2626"; // Red (very high)
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={9} lg={9}>
                <Card sx={{ margin: 2 }}>
                    <SectionHeaderCard 
                        mainIcon={<CiUser style={{fontSize: '30px', strokeWidth: '0.7'}}/>}
                        secondaryIcon={<LuActivity style={{ fontSize: "55px", strokeWidth: '1.5', color: '#EF4444' }}/>}
                        mainTitle={stressTestByPatient.patient}
                        subtitle='Stress Test Report'
                        infoItems={[
                            {
                                icon: <CiCalendar style={{fontSize: '18px'}} />,
                                text: formatDateTime(stressTestByPatient.date) || 'N/A',
                            },
                            {
                                icon: <IoMdTime style={{fontSize: '18px'}} />,
                                text: timeDisplay(stressTestByPatient.date) || 'N/A',
                            },
                            {
                                icon: <MdOutlineTimer style={{fontSize: '18px'}} />,
                                text: stressTestByPatient.duration || 'N/A',
                            },
                        ]}
                    />

                    <CardContent>
                        <Box
                           className="flex-column-spacing"
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                     <DetailCard
                                        title="Indications"
                                        icon={<CiCircleAlert style={{ fontSize: "22px", color: '#f59e0b', strokeWidth: '1' }}/>}
                                    >
                                        {stressTestByPatient?.indications || 'No indications'}
                                    </DetailCard>
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', minHeight: '80px', flexGrow: 1 }}>
                                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 'bold' }}>
                                                <FaChartLine style={{ fontSize: "20px", color: '#3b82f6' }} />
                                                Max Heart Rate
                                            </Typography>
                                            <Typography variant="body1">{heartRateStr}</Typography>

                                           {/* Bar container + percentage */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box sx={{ padding: '3px', width: '100%' }}>
                                                    <LinearProgress 
                                                        variant="determinate" 
                                                        value={Math.min(100, percentage)} // Limit the visual value of the bar to 100
                                                        sx={{ 
                                                            flexGrow: 1, 
                                                            height: 10, 
                                                            borderRadius: 5, 
                                                            backgroundColor: '#e5e7eb',
                                                            '& .MuiLinearProgress-bar': { backgroundColor: getColor() },
                                                        }} 
                                                    />
                                                </Box>
                                                
                                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: getColor() }}>
                                                    {Math.round(percentage)}%
                                                </Typography>
                                            </Box>

                                            <Typography variant="subtitle2" color="textSecondary">
                                                {minHeartRate} bpm - {maxHeartRateExpected} bpm (según edad: {age} años)
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>

                    <CardContent>
                        <Box>
                            <Typography sx={{fontWeight: 'bold', fontSize: '20px'}}>
                                Key Metrics
                            </Typography>
                        </Box>
                        <Box
                            className="flex-column-spacing"
                        >
                            <Grid container spacing={2}>
                                    <Grid item xs={12} sm={3}>
                                        <CustomCard
                                            title="Maximum Heart Rate"
                                            icon={<CiHeart style={{ fontSize: "25px", color: '#EF4444' }} />}
                                            value={`${stressTestByPatient?.maxHeartRate} Bpm` || "N/A"}
                                            description="Highest heart rate recorded"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <CustomCard
                                            title="Resting Heart Rate"
                                            icon={<CiHeart style={{ fontSize: "25px", color: '#EF4444' }} />}
                                            value={`${stressTestByPatient?.restingHeartRate} Bpm` || "N/A"}
                                            description="Heart rate before exercise"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <BloodPressureCard 
                                            systolic={stressTestByPatient?.maxBloodPressureSystolic} 
                                            diastolic={stressTestByPatient?.maxBloodPressureDiastolic} 
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <CustomCard
                                            title="Physical Activity"
                                            icon={<CiHeart style={{ fontSize: "25px", color: '#EF4444' }} />}
                                            value={`${stressTestByPatient?.duration}` || "N/A"}
                                            description="Total test time"
                                        />
                                    </Grid>
                            </Grid>
                        </Box>
                    </CardContent>

                    <CardContent>
                        <Box
                            className="flex-column-spacing"
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                     <DetailCard
                                        title="Exercise Induced Symptoms"
                                        icon={<FaChartLine style={{ fontSize: "20px", color: '#3b82f6' }} />}
                                    >
                                        {stressTestByPatient?.exerciseInducedSymptoms || 'No symptoms'}
                                    </DetailCard>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DetailCard
                                        title="Abnormal Ecg Findings"
                                        icon={<FaChartLine style={{ fontSize: "20px", color: '#3b82f6' }} />}
                                    >
                                        {stressTestByPatient?.abnormalEcgFindings || 'No findings'}
                                    </DetailCard>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>

                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                marginTop: '10px',
                            }}
                        >
                            <DetailCard
                                title="Conclusion"
                                icon={<GrDocumentText style={{ fontSize: "25px", strokeWidth: '1' }} />}
                                highlighted
                            >
                                {stressTestByPatient?.conclusion}
                            </DetailCard>
                        </Box>
                    </CardContent>

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
                            onClick={() => handleDeleteStressTest(stressTestByPatient!.id)}
                        >
                            Delete
                        </CustomButton> 
                    </CardActions>
                    <Drawer anchor='right' open={editMode} onClose={toggleDrawer}>
                        <Box sx={{width: 600, p:2}}>
                            <StressTestForm 
                                stressTest={selectedStressTest}
                                cancelEdit={toggleDrawer}
                                title={'Editing Stress Test'}
                                patientId={patientIdNumber}
                            />
                        </Box>
                    </Drawer>
                </Card>
            </Grid>
        </Grid>
    )
}