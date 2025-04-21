import { Box, Card, CardContent, Typography, CardActions, Grid, Drawer } from '@mui/material';
import { CiCalendar, CiHeart, CiTimer, CiUser } from 'react-icons/ci';
import { LuPenLine } from 'react-icons/lu';
import { CgGym } from "react-icons/cg";
import { IoMdTime } from 'react-icons/io';
import { MdOutlineDelete, MdOutlineTimer } from 'react-icons/md';
import { timeDisplay } from '../../../app/components/timeDisplay';
import { FaChartLine } from 'react-icons/fa6';
import { GrDocumentText } from "react-icons/gr";
import CustomButton from '../../../app/components/CustomButton';
import PhysicalExaminationForm from './PhysicalExaminationForm';
import formatDateTime from '../../../app/components/formatDateTime';
import { useNavigate } from 'react-router-dom';
import { removePhysicalExamination } from './physicalExaminationSlice';
import { useState } from 'react';
import { PhysicalExamination } from '../../../app/Models/physicalExamination';
import agent from '../../../app/api/agent';
import NotFound from '../../../app/errors/NotFound';
import CustomCard, { DetailCard } from '../../../app/components/CustomCard';
import { usePhysicalExamination } from '../../../app/hooks/usePhysicalExamination';
import { toast } from 'react-toastify';
import { SectionHeaderCard } from '../../../app/components/SectionHeaderCard';
import '../../../app/styles/_mixins.scss';

export default function PhysicalExaminationDetails() {

    const {dispatch, patientIdNumber, physicalExaminationByPatient, status} = usePhysicalExamination();

    const [selectedPhysicalExamination, setSelectedPhysicalExamination] = useState<PhysicalExamination | undefined>(undefined);

    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    const handleEditClick = () => {
        if(physicalExaminationByPatient)
        {
            setSelectedPhysicalExamination(physicalExaminationByPatient);
            setEditMode(true);
        }
    }

    const toggleDrawer = () => {
        setEditMode(false);
    }

    function handleDeletePhysicalExamination(id: number) {
        agent.PhysicalExamination.deletePhysicalExamination(id).then(() => {
            dispatch(removePhysicalExamination(id));
            navigate(`/physicalexamination/patient/${patientIdNumber}/physicalexaminations`);
        })
        .catch(() => toast.error("Failed to delete the examination. Please try again."));
    }
    
    if (status.includes('pending')) return <h3>Loading...</h3>
    if (!physicalExaminationByPatient) return <NotFound />

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={9} lg={9}>
                <Card sx={{margin: 2}}>
                    <SectionHeaderCard 
                        mainIcon={<CiUser style={{fontSize: '30px', strokeWidth: '0.7'}}/>}
                        secondaryIcon={<CgGym/>}
                        mainTitle={physicalExaminationByPatient.patient}
                        subtitle='Physical Examination Report'
                        infoItems={[
                            {
                                icon: <CiCalendar style={{fontSize: '18px'}} />,
                                text: formatDateTime(physicalExaminationByPatient.date) || 'N/A',
                            },
                            {
                                icon: <IoMdTime style={{fontSize: '18px'}} />,
                                text: timeDisplay(physicalExaminationByPatient.date) || 'N/A',
                            },
                            {
                                icon: <MdOutlineTimer style={{fontSize: '18px'}} />,
                                text: physicalExaminationByPatient.duration || 'N/A',
                            },
                        ]}
                    />

                    <CardContent>
                        <Box
                            className="flex-column-spacing"
                        >
                             <Box>
                                <Typography variant='h5' sx={{fontWeight: 'bold'}}>
                                    Key Metrics
                                </Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <CustomCard
                                        title="Maximum Heart Rate"
                                        icon={<CiHeart style={{ fontSize: "25px", color: '#EF4444' }} />}
                                        value={`${physicalExaminationByPatient?.maxHeartRate} Bpm` || "N/A"}
                                        description="Maximum blood pressure during exercise"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <CustomCard
                                        title="Peak Blood Pressure"
                                        icon={<CiHeart style={{ fontSize: "25px", color: '#021e7c' }} />}
                                        value={`${physicalExaminationByPatient?.peakPressure} mmHg` || "N/A"}
                                        description="Highest heart rate recorded during the exam"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <CustomCard
                                        title="Duration of the Exercise"
                                        icon={<CiTimer style={{ fontSize: "25px", color: '#16a807' }} />}
                                        value={`${physicalExaminationByPatient?.duration}` || "N/A"}
                                        description="Total time of the stress test"
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
                                        {physicalExaminationByPatient?.exerciseInducedSymptoms || 'No symptoms'}
                                    </DetailCard>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DetailCard
                                        title="Abnormal ECG Findings"
                                        icon={<FaChartLine style={{ fontSize: "20px", color: '#41b984' }} />}
                                    >
                                        {physicalExaminationByPatient?.abnormalEcgFindings || 'No findings'}
                                    </DetailCard>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Box
                            className="flex-column-spacing"
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <DetailCard
                                        title="Conclusion"
                                        icon={<GrDocumentText style={{ fontSize: "25px", strokeWidth: '1' }} />}
                                        highlighted
                                    >
                                        {physicalExaminationByPatient?.conclusion || "N/A"}
                                    </DetailCard>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ padding: '30px', marginTop: '-20px' }}>
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
                            onClick={() => handleDeletePhysicalExamination(physicalExaminationByPatient.id)}
                        >
                            Delete
                        </CustomButton>
                    </CardActions>
                    <Drawer 
                        anchor="right" 
                        open={editMode} 
                        onClose={toggleDrawer}
                    >
                        <Box sx={{ width: 600, p: 2 }}>
                            <PhysicalExaminationForm
                              physicalExamination={selectedPhysicalExamination}
                              cancelEdit={toggleDrawer}
                              title={`Editing Physical Examination Study`}
                              patientId={patientIdNumber}
                            />
                        </Box>
                    </Drawer>
                </Card>
            </Grid>
        </Grid>
    )
}
