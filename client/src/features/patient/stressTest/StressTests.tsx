import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { fetchStressTestsByPatientAsync, stressTestSelectors } from "./stressTest";
import { patientSelectors } from "../patientSlice";
import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import Breadcrumb from "../../../app/components/Breadcrumb";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import StressTestList from "./StressTestList";

export default function StressTest() {

    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const stressTestByPatient = useAppSelector(stressTestSelectors.selectAll);
    const { stressTestByPatientLoaded } = useAppSelector(state => state.stressTest);
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    useEffect(() => {
        if (!stressTestByPatientLoaded) dispatch(fetchStressTestsByPatientAsync(id));
    }, [stressTestByPatientLoaded, dispatch]);

    return (
        <div className="contentPatient">
            <Breadcrumb page="Stress Tests" />

            <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" key={patient?.patientName}>
                    list of stress test for patient {patient?.patientName}
                </Typography>

                <div className="addButton">
                    <Button className="button" startIcon={<AddRoundedIcon />}>Add Stress Test</Button>
                </div>
            </Box>

            <StressTestList stressTest={stressTestByPatient} />
        </div>)
}