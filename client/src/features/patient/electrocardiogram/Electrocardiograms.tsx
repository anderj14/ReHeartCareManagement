import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { electrocardiogramSelectors, fetchElectrocardiogramsByPatientAsync } from './electrocardiogramSlice';
import { Box, Typography, Button } from '@mui/material';
import Breadcrumb from '../../../app/components/Breadcrumb';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ElectrocardiogramList from './ElectrocardiogramList';
import { patientSelectors } from '../patientSlice';

export default function Electrocardiograms() {

    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const electrocardiogramsByPatient = useAppSelector(electrocardiogramSelectors.selectAll);
    const { electrocardiogramByPatientLoaded } = useAppSelector(state => state.electrocardiogram);
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    useEffect(() => {
        if (!electrocardiogramByPatientLoaded) dispatch(fetchElectrocardiogramsByPatientAsync(id));
    }, [electrocardiogramByPatientLoaded, dispatch]);

    return (
        <div className="contentPatient">
            <Breadcrumb page="Blood Tests" />

            <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" key={patient?.id}>
                    list of electrocardiograms for patient {patient?.patientName}
                </Typography>
                <Box>
                    <div className="addButton">
                        <Button className="button" startIcon={<AddRoundedIcon />}>Add Electrocardiogram</Button>
                    </div>
                </Box>
            </Box>

            <ElectrocardiogramList electrocardiograms={electrocardiogramsByPatient} />
        </div>
    )
}
