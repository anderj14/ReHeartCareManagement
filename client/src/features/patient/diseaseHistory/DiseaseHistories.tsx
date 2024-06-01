import { diseaseHistorySelectors, fetchDiseaseHistoriesByPatientAsync } from './diseaseHistorySlice';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { useParams } from 'react-router-dom';
import { patientSelectors } from '../patientSlice';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Breadcrumb from '../../../app/components/Breadcrumb';
import DiseaseHistoryList from './DiseaseHistoryList';

export default function DiseaseHistories() {

    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const diseaseHistoryByPatient = useAppSelector(diseaseHistorySelectors.selectAll);
    const { diseaseHistoryByPatientLoaded } = useAppSelector(state => state.diseaseHistory);
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    useEffect(() => {
        if (!diseaseHistoryByPatientLoaded) dispatch(fetchDiseaseHistoriesByPatientAsync(id));
    }, [diseaseHistoryByPatientLoaded, dispatch]);

    return (
        <div className="contentPatient">
            <Breadcrumb page="Diseases History" />

            <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" key={patient?.id}>
                    list of diseases history for patient {patient?.patientName}
                </Typography>

                <div className="addButton">
                    <Button className="button" startIcon={<AddRoundedIcon />}>Add Disease History</Button>
                </div>
            </Box>

            <DiseaseHistoryList diseaseHistories={diseaseHistoryByPatient} />
        </div>
    )
}
