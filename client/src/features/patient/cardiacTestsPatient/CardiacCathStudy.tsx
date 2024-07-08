import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { cardiacCathStudySelectors, fetchCardiacCathStudiesByPatientAsync } from './cardiacCathStudySlice';
import { Box, Typography, Button } from '@mui/material';
import Breadcrumb from '../../../app/components/Breadcrumb';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CardiacCathStudyList from './CardiacCathStudyList';
import { patientSelectors } from '../patientSlice';

export default function CardiacCathStudy() {
    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const cardiachCathStudyByPatient = useAppSelector(cardiacCathStudySelectors.selectAll);
    const { cardiacCathStudyByPatientLoaded } = useAppSelector(state => state.cardiacCathStudy);
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    useEffect(() => {
        if (!cardiacCathStudyByPatientLoaded) dispatch(fetchCardiacCathStudiesByPatientAsync(id));
    }, [cardiacCathStudyByPatientLoaded, dispatch]);

    return (
        <div>
            <div className="contentPatient">
                <Breadcrumb page="Cardiac Catheterization study" />

                <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5" key={patient?.id}>
                        list of cardiac catheterization studies for patient {patient?.patientName}
                    </Typography>
                    <div className="addButton">
                        <Button className="button" startIcon={<AddRoundedIcon />}>Add Catheterization Study</Button>
                    </div>
                </Box>

                <CardiacCathStudyList cardiacCathStudies={cardiachCathStudyByPatient} />
            </div>
        </div>
    )
}
