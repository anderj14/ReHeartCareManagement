import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore'
import { useParams } from 'react-router-dom';
import { cardiacCathStudySelectors, fetchCardiacCathStudyByPatientAsync } from './cardiacCathStudySlice';
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Breadcrumb from '../../../app/components/Breadcrumb';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import formatDateTime from '../../../app/components/formatDateTime';

export default function CardiacCathStudyDetails() {
    const dispatch = useAppDispatch();
    const { id: patientId, cardiacCathStudyId } = useParams<{ id: string, cardiacCathStudyId: string }>();
    const patientIdNumber = patientId ? Number(patientId) : undefined;
    const cardiacCathStudyIdNumber = cardiacCathStudyId ? Number(cardiacCathStudyId) : undefined;
    const cardiacCathStudyByPatient = useAppSelector((state) =>
        cardiacCathStudyIdNumber ? cardiacCathStudySelectors.selectById(state, cardiacCathStudyIdNumber) : undefined
    );

    useEffect(() => {
        const fetchCardiacCathStudyIdByPatientId = async () => {
            if (patientIdNumber !== undefined && cardiacCathStudyIdNumber !== undefined && !cardiacCathStudyByPatient) {
                dispatch(fetchCardiacCathStudyByPatientAsync({ patientId: patientIdNumber, cardiacCathStudyId: cardiacCathStudyIdNumber }));
            }
        }

        fetchCardiacCathStudyIdByPatientId();
    }, [dispatch, patientIdNumber, cardiacCathStudyIdNumber, cardiacCathStudyByPatient]);


    return (
        <div>
            <Box sx={{ margin: '30px 0px 30px 30px' }}>
                <Breadcrumb page="Cardiac Cath Study" />

                <Card sx={{ maxWidth: 745, padding: '20px' }}>
                    <CardContent>
                        <Box>
                            <Typography gutterBottom variant="h5">
                                {cardiacCathStudyByPatient?.patient}
                            </Typography>
                            <Typography gutterBottom variant='body1' color="text.secondary">
                                Cardiac Cath Study | {formatDateTime(cardiacCathStudyByPatient!.date)} | {cardiacCathStudyByPatient?.time}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Number of Locations in Main Coronary
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.locationMainCoronaryArteries}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Blockage (Each Coronary Artery)
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.blockageEachCoronaryArtery}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Description of Abnormality
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.descriptionAbnormalities}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Blood Pressure (Aorta)
                                    </Typography>
                                    <Typography>
                                        {/* {cardiacCathStudyByPatient?.bloodPressureAorta} */}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Left Atrium
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.chambersLeftAtrium}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Left Ventricle
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.chambersLeftVentricle}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Right Atrium
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.chambersRightAtrium}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Right Ventricle
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.chambersRightVentricle}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Blood Flow (Coronary Arteries)
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.bloodFlowCoronaryArteries}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Velocity of Blood Flow
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.velocityBloodFlow}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Left Ventricular Ejection Fraction
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.leftVentricularEjectionFraction}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Blood Pressure (Pulmonary Arteries)
                                    </Typography>
                                    <Typography>
                                        {/* {cardiacCathStudyByPatient?.bloodPressurePulmonaryArteries} */}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Valvular Insufficiency (Aortic)
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.valvularInsufficiencyAortic}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Valvular Insufficiency (Mitral)
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.valvularInsufficiencyMitral}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Valvular Insufficiency (Pulmonary)
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.valvularInsufficiencyPulmonary}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Valvular Insufficiency (Tricuspid)
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.valvularInsufficiencyTricuspid}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Pressure Gradient (Valves)
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.pressureGradientValves}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Structural Abnormalities
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.structuralAbnormalities}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Functions of Cardiac Chambers
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.cardiacChamberFunctions}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Description of Complication
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.descriptionComplications}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body1" color="text.secondary">
                                        Conclusion
                                    </Typography>
                                    <Typography>
                                        {cardiacCathStudyByPatient?.conclusion}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                    <CardActions sx={{ padding: '0px', marginTop: '10px' }}>
                        <Button startIcon={<ModeEditIcon sx={{ marginRight: '5px' }} />} size="small" color="info">Edit</Button>
                        <Button startIcon={<DeleteIcon sx={{ marginRight: '5px' }} />} size="small" color="error">Delete</Button>
                    </CardActions>
                </Card>
            </Box>
        </div >
    )
}
