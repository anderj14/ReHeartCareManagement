import React, { useEffect } from 'react'
import { fetchMedicalHistoriesByPatientAsync, medicalHistorySelectors } from './medicalHistorySlice';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { patientSelectors } from '../patientSlice';
import { Box, Typography, Button } from '@mui/material';
import Breadcrumb from '../../../app/components/Breadcrumb';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MedicalHistoryList from './MedicalHistoryList';

export default function MedicalHistories() {

    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const medicalHistoryByPatient = useAppSelector(medicalHistorySelectors.selectAll);
    const { medicalHistoryByPatientLoaded } = useAppSelector(state => state.medicalHistory);
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    useEffect(() => {
        if (!medicalHistoryByPatientLoaded) dispatch(fetchMedicalHistoriesByPatientAsync(id));
    }, [medicalHistoryByPatientLoaded, dispatch]);

    return (
        <div className="contentPatient">
            <Breadcrumb page="Medical Histories" />

            <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" key={patient?.id}>
                    list of medical history for patient {patient?.patientName}
                </Typography>

                <div className="addButton">
                    <Button className="button" startIcon={<AddRoundedIcon />}>Add Blood Test</Button>
                </div>
            </Box>

            <MedicalHistoryList medicalHistories={medicalHistoryByPatient} />
        </div>
    )
}
