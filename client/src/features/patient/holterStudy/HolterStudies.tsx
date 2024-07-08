import { fetchHolterStudiesByPatientAsync, holterStudySelectors } from './holterStudySlice';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { patientSelectors } from '../patientSlice';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import Breadcrumb from '../../../app/components/Breadcrumb';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useEffect } from 'react';
import HolterStudyList from './HolterStudyList';

export default function HolterStudies() {

    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const holterStudiesByPatient = useAppSelector(holterStudySelectors.selectAll);
    const { holterStudyByPatientLoaded } = useAppSelector(state => state.holterStudy);
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    useEffect(() => {
        if (!holterStudyByPatientLoaded) dispatch(fetchHolterStudiesByPatientAsync(id));
    }, [holterStudyByPatientLoaded, dispatch]);


    return (
        <div className="contentPatient">
            <Breadcrumb page="Blood Tests" />

            <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" key={patient?.id}>
                    list of holter study for patient {patient?.patientName}
                </Typography>

                <div className="addButton">
                    <Button className="button" startIcon={<AddRoundedIcon />}>Add Holter Study</Button>
                </div>
            </Box>

            <HolterStudyList holterStudies={holterStudiesByPatient} />
        </div>
    )
}
