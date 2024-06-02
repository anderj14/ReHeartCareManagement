import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { patientSelectors } from '../patientSlice';
import { diagnosticSelectors, fetchDiagnosticsByPatientAsync } from './diagnosticSlice';
import { useEffect } from 'react';
import Breadcrumb from '../../../app/components/Breadcrumb';
import { Box, Typography, Button } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DiagnosticList from './DiagnosticList';

export default function Diagnostics() {

    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const diagnosticsByPatient = useAppSelector(diagnosticSelectors.selectAll);
    const { diagnosticByPatientLoaded } = useAppSelector(state => state.diagnostic);
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    useEffect(() => {
        if (!diagnosticByPatientLoaded) dispatch(fetchDiagnosticsByPatientAsync(id));
    }, [diagnosticByPatientLoaded, dispatch]);

    return (
        <div className="contentPatient">
            <Breadcrumb page="Blood Tests" />

            <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" key={patient?.id}>
                    list of diagnostics for patient {patient?.patientName}
                </Typography>

                <div className="addButton">
                    <Button className="button" startIcon={<AddRoundedIcon />}>Add Diagnostic</Button>
                </div>
            </Box>

            <DiagnosticList diagnostics={diagnosticsByPatient} />
        </div>
    )
}
