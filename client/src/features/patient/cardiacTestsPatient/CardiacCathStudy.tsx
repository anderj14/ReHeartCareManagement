import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { cardiacCathStudySelectors, fetchCardiacCathStudiesByPatientAsync } from './cardiacCathStudySlice';
import { Box, Typography, Button } from '@mui/material';
import Breadcrumb from '../../../app/components/Breadcrumb';
import BloodTestList from '../bloodTest/BloodTestList';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CardiacCathStudyList from './CardiacCathStudyList';

export default function CardiacCathStudy() {
    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const cardiachCathStudyByPatient = useAppSelector(cardiacCathStudySelectors.selectAll);
    const { cardiacCathStudyByPatientLoaded } = useAppSelector(state => state.cardiacCathStudy);

    useEffect(() => {
        if (!cardiacCathStudyByPatientLoaded) dispatch(fetchCardiacCathStudiesByPatientAsync(id));
    }, [cardiacCathStudyByPatientLoaded, dispatch]);

    const patientName = cardiachCathStudyByPatient?.slice(-1)[0];

    return (
        <div>
            <div className="contentPatient">
                <Breadcrumb page="Cardiac Catheterization study" />

                <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {patientName && (
                        <Typography variant="h5" key={patientName?.id}>
                            list of blood tests for patient {patientName.patient}
                        </Typography>

                    )}
                    <div className="addButton">
                        <Button className="button" startIcon={<AddRoundedIcon />}>Add Blood Test</Button>
                    </div>
                </Box>

                <CardiacCathStudyList cardiacCathStudies={cardiachCathStudyByPatient} />
            </div>
        </div>
    )
}
