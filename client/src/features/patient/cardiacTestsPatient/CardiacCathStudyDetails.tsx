import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore'
import { useNavigate, useParams } from 'react-router-dom';
import { cardiacCathStudySelectors, fetchCardiacCathStudyByPatientAsync, removeCardiacCathStudy } from './cardiacCathStudySlice';
import { Box, Card, CardContent, Typography, CardActions, Drawer, Divider, Tooltip } from '@mui/material';
import formatDateTime from '../../../app/components/formatDateTime';
import { timeDisplay } from '../../../app/components/timeDisplay';
import { CardiacCathStudy } from '../../../app/Models/cardiacCathStudy';
import agent from '../../../app/api/agent';
import CustomButton from '../../../app/components/CustomButton';
import { LuPenLine } from 'react-icons/lu';
import { MdOutlineDelete } from 'react-icons/md';
import CardiacCathStudyForm from './CardiacCathStudyForm';
import Subtitle from '../../../app/components/Subtitle';
import { RiCheckboxCircleLine, RiErrorWarningLine } from "react-icons/ri";
import { IoWarningOutline } from "react-icons/io5";


const DetailItem = ({ label, value }: { label: string, value: string | number | undefined }) => (
    <Box sx={{width: '350px'}}>
        <Typography variant="body1" color="text.secondary">
            {label}
        </Typography>
        <Typography>
            {value}
        </Typography>
    </Box>
);

export default function CardiacCathStudyDetails() {
    const dispatch = useAppDispatch();
    const { id: patientId, cardiacCathStudyId } = useParams<{ id: string, cardiacCathStudyId: string }>();
    const patientIdNumber = patientId ? Number(patientId) : undefined;
    const cardiacCathStudyIdNumber = cardiacCathStudyId ? Number(cardiacCathStudyId) : undefined;
    const cardiacCathStudyByPatient = useAppSelector((state) => cardiacCathStudyIdNumber !== undefined ? cardiacCathStudySelectors.selectById(state, cardiacCathStudyIdNumber) : undefined
    );
    const [selectedCardiacCathStudy, setSelectedCardiacCathStudy] = useState<CardiacCathStudy | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [target, setTarget] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCardiacCathStudyIdByPatientId = async () => {
            if (patientIdNumber !== undefined && cardiacCathStudyIdNumber !== undefined && !cardiacCathStudyByPatient) {
                dispatch(fetchCardiacCathStudyByPatientAsync({ patientId: patientIdNumber, cardiacCathStudyId: cardiacCathStudyIdNumber }));
            }
        }

        fetchCardiacCathStudyIdByPatientId();
    }, [dispatch, patientIdNumber, cardiacCathStudyIdNumber, cardiacCathStudyByPatient]);

    const handleEditClick = () => {
        if(cardiacCathStudyByPatient) {
            setSelectedCardiacCathStudy(cardiacCathStudyByPatient);
            setEditMode(true);
        }
    }

    function handleDeleteCardiacCathStudy(id: number) {
        setTarget(id);
        agent.CardiacCathStudy.deleteCardiacCathStudy(id)
        .then(() => {
            dispatch(removeCardiacCathStudy(id));
            navigate(`/cardiaccatheterizationstudy/patient/${patientIdNumber}/cardiaccathstudies`);
        })
        .catch(error => console.log(error))
    }

    const toggleDrawer = () => {
        setEditMode(false);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Box sx={{ margin: '30px 0px 30px 30px' }}>
                <Card sx={{ maxWidth: '900px' }}>
                    <CardContent sx={{backgroundImage: 'linear-gradient(#a7d7c5, #fff)', padding: '30px'}}>
                        <Typography gutterBottom variant="h5">
                            {cardiacCathStudyByPatient?.patient}
                        </Typography>
                        {cardiacCathStudyByPatient && (
                            <Typography gutterBottom variant='body1' color="text.secondary">
                                Cardiac Cath Study | {formatDateTime(cardiacCathStudyByPatient.date)} | {timeDisplay(cardiacCathStudyByPatient.date)}
                            </Typography>
                        )}
                    </CardContent>
                    <CardContent sx={{ padding: '30px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '-10px' }}>
                            <Box>
                                <Subtitle subtitle={'Coronary Arteries'} />
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px' }}>
                                    <DetailItem label="Number of Locations in Main Coronary" value={cardiacCathStudyByPatient?.locationMainCoronaryArteries} />
                                    <Box 
                                        sx={{
                                            backgroundColor: (() => {
                                                const percentage = cardiacCathStudyByPatient?.blockageEachCoronaryArtery || 0;
                                                if (percentage < 50) return "#FDE68A";
                                                if (percentage < 75) return "#FDBA74";
                                                return "#FDF2F2";
                                            })(),
                                            borderRadius: "4px",
                                            padding: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}>
                                        <DetailItem label="Blockage (Each Coronary Artery)" value={`${cardiacCathStudyByPatient?.blockageEachCoronaryArtery} %`}/>
                                        <Box marginTop={'5px'}>
                                        {(() => {
                                            const percentage = cardiacCathStudyByPatient?.blockageEachCoronaryArtery || 0;
                                            if (percentage < 50) return <Tooltip title="Low blockage: No concerns."><span><RiCheckboxCircleLine color="#4CAF50" /></span></Tooltip>;
                                            if (percentage < 75) return <Tooltip title="Moderate blockage: Requires follow-up." sx={{fontSize: '20px'}}><span><IoWarningOutline color="#FF9800" /></span></Tooltip>;
                                            return <Tooltip title="High blockage: Intervention recommended."><span><RiErrorWarningLine color="#EF4444" /></span></Tooltip>;
                                        })()}
                                        </Box>
                                    </Box>
                                    <DetailItem label="Description of Abnormality" value={cardiacCathStudyByPatient?.descriptionAbnormalities} />
                                    <Box
                                        sx={{
                                            backgroundColor: (() => {
                                                const bloodFlow = cardiacCathStudyByPatient?.bloodFlowCoronaryArteries || 0;
                                                if (bloodFlow < 20) return "#FDF2F2";
                                                if (bloodFlow < 30) return "#FECACA";
                                                if (bloodFlow < 60) return "#FDBA74";
                                                if (bloodFlow <= 100) return "#FDE68A";
                                                return "#D1FAE5";
                                            })(),
                                            borderRadius: "4px",
                                            padding: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <DetailItem label="Blood Flow (Coronary Arteries)" value={`${cardiacCathStudyByPatient?.bloodFlowCoronaryArteries} mL/min`}
                                        />
                                        {(() => {
                                            const bloodFlow = cardiacCathStudyByPatient?.bloodFlowCoronaryArteries || 0;

                                            if (bloodFlow < 20)return (<Tooltip title="Critical blood flow: Immediate intervention required."><span><RiErrorWarningLine color="#EF4444" /></span></Tooltip>);
                                            if (bloodFlow < 30)return (<Tooltip title="Severe blood flow: Urgent evaluation needed."><span><RiErrorWarningLine color="#F87171" /></span></Tooltip>);
                                            if (bloodFlow < 60)return (<Tooltip title="Moderate blood flow: Requires follow-up."><span><RiErrorWarningLine color="#FF9800" /></span></Tooltip>);
                                            if (bloodFlow <= 100)return (<Tooltip title="Normal blood flow: No concerns."><span><RiCheckboxCircleLine color="#4CAF50" /></span></Tooltip>);
                                            return <Tooltip title="Exceptional blood flow: Above normal range."><span><RiCheckboxCircleLine color="#10B981" /></span></Tooltip>;
                                        })()}
                                    </Box>
                                    <Box
                                        sx={{
                                            backgroundColor: (() => {
                                                const velocity = cardiacCathStudyByPatient?.velocityBloodFlow || 0;
                                                if (velocity < 10) return "#FDF2F2"; 
                                                if (velocity < 20) return "#FECACA"; 
                                                if (velocity < 40) return "#FDBA74"; 
                                                if (velocity <= 70) return "#FDE68A";
                                                return "#D1FAE5";
                                            })(),
                                            borderRadius: "4px",
                                            padding: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <DetailItem
                                            label="Velocity of Blood Flow"
                                            value={`${cardiacCathStudyByPatient?.velocityBloodFlow} cm/s`}
                                        />
                                        {(() => {
                                            const velocity = cardiacCathStudyByPatient?.velocityBloodFlow || 0;

                                            if (velocity < 10)return (<Tooltip title="Critical blood flow velocity: Immediate evaluation required."><span><RiErrorWarningLine color="#EF4444" /></span></Tooltip>);
                                            if (velocity < 20) return (<Tooltip title="Severe blood flow velocity: Urgent follow-up needed."><span><RiErrorWarningLine color="#F87171" /></span></Tooltip>);
                                            if (velocity < 40) return (<Tooltip title="Moderate blood flow velocity: Monitor condition."><span><RiErrorWarningLine color="#FF9800" /></span></Tooltip>);
                                            if (velocity <= 70) return (<Tooltip title="Normal blood flow velocity: No concerns."><span><RiCheckboxCircleLine color="#4CAF50" /></span></Tooltip>);
                                            return (<Tooltip title="Exceptional blood flow velocity: Above normal range."><span><RiCheckboxCircleLine color="#10B981" /></span></Tooltip>);
                                        })()}
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Subtitle subtitle={'Cardiac Chambers'} />
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px' }}>
                                    <DetailItem label="Left Atrium" value={cardiacCathStudyByPatient?.chambersLeftAtrium} />
                                    <DetailItem label="Left Ventricle" value={cardiacCathStudyByPatient?.chambersLeftVentricle} />
                                    <DetailItem label="Right Atrium" value={cardiacCathStudyByPatient?.chambersRightAtrium} />
                                    <DetailItem label="Right Ventricle" value={cardiacCathStudyByPatient?.chambersRightVentricle} />
                                    <Box
                                        sx={{
                                            backgroundColor: (() => {
                                            const percentage = cardiacCathStudyByPatient?.leftVentricularEjectionFraction || 0;
                                            if (percentage >= 55) return "#D1FAE5";
                                            if (percentage >= 50) return "#FDE68A";
                                            if (percentage >= 40) return "#FDBA74";
                                            return "#FDF2F2";
                                            })(),
                                            borderRadius: "4px",
                                            padding: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                        >
                                        <DetailItem
                                            label="Left Ventricular Ejection Fraction"
                                            value={`${cardiacCathStudyByPatient?.leftVentricularEjectionFraction} %`}
                                        />
                                        <Box marginTop="5px">
                                            {(() => {
                                            const percentage = cardiacCathStudyByPatient?.leftVentricularEjectionFraction || 0;

                                            if (percentage >= 55)
                                                return (
                                                <Tooltip title="Normal function: No concerns.">
                                                    <span>
                                                        <RiCheckboxCircleLine color="#10B981" />
                                                    </span>
                                                </Tooltip>
                                                );
                                            if (percentage >= 50)
                                                return (
                                                <Tooltip title="Slightly reduced function: Monitor for potential issues.">
                                                    <span>
                                                        <RiErrorWarningLine color="#FACC15" />
                                                    </span>
                                                </Tooltip>
                                                );
                                            if (percentage >= 40)
                                                return (
                                                <Tooltip title="Moderately reduced function: Requires closer follow-up.">
                                                    <span>
                                                        <RiErrorWarningLine color="#FB923C" />
                                                    </span>
                                                </Tooltip>
                                                );
                                            return (
                                                <Tooltip title="Severely reduced function: Immediate intervention needed.">
                                                    <span>
                                                        <RiErrorWarningLine color="#EF4444" />
                                                    </span>
                                                </Tooltip>
                                            );
                                            })()}
                                        </Box>
                                    </Box>

                                    <DetailItem label="Functions of Cardiac Chambers" value={cardiacCathStudyByPatient?.cardiacChamberFunctions} />
                                </Box>
                            </Box>
                            <Box>
                                <Subtitle subtitle={'Heart Valves'} />
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px' }}>
                                    <DetailItem label="Valvular Insufficiency (Aortic)" value={cardiacCathStudyByPatient?.valvularInsufficiencyAortic} />
                                    <DetailItem label="Valvular Insufficiency (Mitral)" value={cardiacCathStudyByPatient?.valvularInsufficiencyMitral} />
                                    <DetailItem label="Valvular Insufficiency (Pulmonary)" value={cardiacCathStudyByPatient?.valvularInsufficiencyPulmonary} />
                                    <DetailItem label="Valvular Insufficiency (Tricuspid)" value={cardiacCathStudyByPatient?.valvularInsufficiencyTricuspid} />
                                    <Box
                                        sx={{
                                            backgroundColor: (() => {
                                            const pressure = cardiacCathStudyByPatient?.pressureGradientValves || 0;
                                            if (pressure < 5) return "#D1FAE5";
                                            if (pressure < 10) return "#FDE68A";
                                            if (pressure < 20) return "#FDBA74";
                                            return "#FDF2F2";
                                            })(),
                                            borderRadius: "4px",
                                            padding: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                        >
                                        <DetailItem
                                            label="Pressure Gradient (Valves)"
                                            value={`${cardiacCathStudyByPatient?.pressureGradientValves} mmHg`}
                                        />
                                        <Box marginTop="5px">
                                            {(() => {
                                            const pressure = cardiacCathStudyByPatient?.pressureGradientValves || 0;

                                            if (pressure < 5)
                                                return (
                                                <Tooltip title="Normal gradient: No concerns.">
                                                    <span>
                                                        <RiCheckboxCircleLine color="#10B981" />
                                                    </span>
                                                </Tooltip>
                                                );
                                            if (pressure < 10)
                                                return (
                                                <Tooltip title="Mild gradient: Monitor for potential issues.">
                                                    <span>
                                                        <RiErrorWarningLine color="#FACC15" />
                                                    </span>
                                                </Tooltip>
                                                );
                                            if (pressure < 20)
                                                return (
                                                <Tooltip title="Moderate gradient: Requires closer follow-up.">
                                                    <span>
                                                        <RiErrorWarningLine color="#FB923C" />
                                                    </span>
                                                </Tooltip>
                                                );
                                            return (
                                                <Tooltip title="Severe gradient: Immediate intervention needed.">
                                                    <span>
                                                        <RiErrorWarningLine color="#EF4444" />
                                                    </span>
                                                </Tooltip>
                                            );
                                            })()}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Subtitle subtitle={'General'} />
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px' }}>
                                    <Box
                                        sx={{
                                            backgroundColor: (() => {
                                            const systolic = cardiacCathStudyByPatient?.systolicPressureAorta || 0;
                                            const diastolic = cardiacCathStudyByPatient?.diastolicPressureAorta || 0;

                                            if (systolic <= 120 && diastolic <= 80) return "#D1FAE5"; // Green (normal)
                                            if (systolic <= 129 && diastolic < 80) return "#FDE68A"; // Yellow (high)
                                            if ((systolic <= 139 && diastolic <= 89)) return "#FDBA74"; // Orange (stage 1 hypertension)
                                            if (systolic >= 140 || diastolic >= 90) return "#FECACA"; // Light red (stage 2 hypertension)
                                            return "#F87171"; // red (crysis hypertension)
                                            })(),
                                            borderRadius: "4px",
                                            padding: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                        >
                                        <DetailItem
                                            label="Blood Pressure (Aorta)"
                                            value={`${cardiacCathStudyByPatient?.systolicPressureAorta} / ${cardiacCathStudyByPatient?.diastolicPressureAorta} mmHg`}
                                        />
                                        <Box marginTop="5px">
                                            {(() => {
                                            const systolic = cardiacCathStudyByPatient?.systolicPressureAorta || 0;
                                            const diastolic = cardiacCathStudyByPatient?.diastolicPressureAorta || 0;

                                            if (systolic <= 120 && diastolic <= 80)
                                                return (
                                                <Tooltip title="Normal blood pressure.">
                                                    <span>
                                                        <RiCheckboxCircleLine color="#10B981" />
                                                    </span>
                                                </Tooltip>
                                                );
                                            if (systolic <= 129 && diastolic < 80)
                                                return (
                                                <Tooltip title="Elevated blood pressure. Monitor for changes.">
                                                    <span>
                                                        <RiErrorWarningLine color="#FACC15" />
                                                    </span>
                                                </Tooltip>
                                                );
                                            if (systolic <= 139 && diastolic <= 89)
                                                return (
                                                <Tooltip title="Stage 1 Hypertension. Consider lifestyle changes.">
                                                    <span>
                                                        <RiErrorWarningLine color="#FB923C" />
                                                    </span>
                                                </Tooltip>
                                                );
                                            if (systolic >= 140 || diastolic >= 90)
                                                return (
                                                <Tooltip title="Stage 2 Hypertension. Medical intervention recommended.">
                                                    <span>
                                                        <RiErrorWarningLine color="#EF4444" />
                                                    </span>
                                                </Tooltip>
                                                );
                                            return (
                                                <Tooltip title="Hypertensive Crisis! Seek immediate care.">
                                                    <span>
                                                        <RiErrorWarningLine color="#B91C1C" />
                                                    </span>
                                                </Tooltip>
                                            );
                                            })()}
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            backgroundColor: (() => {
                                            const systolic = cardiacCathStudyByPatient?.systolicPressurePulmonaryArteries || 0;
                                            const diastolic = cardiacCathStudyByPatient?.diastolicPressurePulmonaryArteries || 0;

                                            if (systolic <= 25 && diastolic <= 15) return "#D1FAE5"; // Green (normal)
                                            if (systolic > 25 || diastolic > 15) return "#FECACA"; // Light red (pulmonary hypertension)
                                            return "#F87171"; // Red (crisis or critical values)
                                            })(),
                                            borderRadius: "4px",
                                            padding: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                        >
                                        <DetailItem
                                            label="Blood Pressure (Pulmonary Arteries)"
                                            value={`${cardiacCathStudyByPatient?.systolicPressurePulmonaryArteries} / ${cardiacCathStudyByPatient?.diastolicPressurePulmonaryArteries} mmHg`}
                                        />
                                        <Box marginTop="5px">
                                            {(() => {
                                            const systolic = cardiacCathStudyByPatient?.systolicPressurePulmonaryArteries || 0;
                                            const diastolic = cardiacCathStudyByPatient?.diastolicPressurePulmonaryArteries || 0;

                                            if (systolic <= 25 && diastolic <= 15)
                                                return (
                                                <Tooltip title="Normal pulmonary pressure.">
                                                    <span>
                                                        <RiCheckboxCircleLine color="#10B981" />
                                                    </span>
                                                </Tooltip>
                                                );
                                            if (systolic > 25 || diastolic > 15)
                                                return (
                                                <Tooltip title="Pulmonary Hypertension detected. Medical evaluation recommended.">
                                                    <span>
                                                        <RiErrorWarningLine color="#EF4444" />
                                                    </span>
                                                </Tooltip>
                                                );
                                            return (
                                                <Tooltip title="Critical pulmonary pressure! Immediate intervention needed.">
                                                    <span>
                                                        <RiErrorWarningLine color="#B91C1C" />
                                                    </span>
                                                </Tooltip>
                                            );
                                            })()}
                                        </Box>
                                    </Box>
                                    <DetailItem label="Structural Abnormalities" value={cardiacCathStudyByPatient?.structuralAbnormalities} />
                                    <DetailItem label="Description of Complication" value={cardiacCathStudyByPatient?.descriptionComplications} />
                                </Box>
                            </Box>
                            <Divider sx={{marginTop: '20px', marginBottom: '20px'}}/>
                            <Box>
                                <Typography variant="body1" color="text.secondary">Conclusion</Typography>
                                <Box sx={{backgroundColor: '#FEFCE8', border: '1px solid #fae624', borderRadius: '4px', padding: '15px', marginTop: '10px'}}>
                                    <Typography>{cardiacCathStudyByPatient?.conclusion}</Typography>
                                </Box>
                            </Box>
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
                            onClick={() => handleDeleteCardiacCathStudy(cardiacCathStudyByPatient!.id)}
                        >
                            Delete
                        </CustomButton>
                    </CardActions>
                    <Drawer anchor="right" open={editMode} onClose={toggleDrawer}>
                        <Box sx={{ width: 600, p: 2 }}>
                            <CardiacCathStudyForm
                              study={selectedCardiacCathStudy}
                              cancelEdit={toggleDrawer}
                              title={`Editing Cardiac Catheterization Study`}
                              patientId={patientIdNumber}
                            />
                        </Box>
                    </Drawer>
                </Card>
            </Box>
        </Box >
    )
}
