import { Box, Typography, Button } from '@mui/material';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../app/components/Breadcrumb';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { patientSelectors } from '../patientSlice';
import { fetchTreatmentsByPatientAsync, treatmentSelectors } from './treatmentSlice';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import TreatmentList from './TreatmentList';

export default function Treatments() {
    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const treatmentByPatient = useAppSelector(treatmentSelectors.selectAll);
    const { treatmentsByPatientLoaded } = useAppSelector(state => state.treatment);
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    useEffect(() => {
        if (!treatmentsByPatientLoaded) dispatch(fetchTreatmentsByPatientAsync(id));
    }, [treatmentsByPatientLoaded, dispatch]);

    return (
        <div className="contentPatient">
            <Breadcrumb page="Blood Tests" />

            <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" key={patient?.patientName}>
                    list of treatments for patient {patient?.patientName}
                </Typography>

                <div className="addButton">
                    <Button className="button" startIcon={<AddRoundedIcon />}>Add Treatment</Button>
                </div>
            </Box>

            <TreatmentList treatments={treatmentByPatient} />
        </div>
    )
}
