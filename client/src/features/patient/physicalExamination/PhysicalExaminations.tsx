import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { patientSelectors } from "../patientSlice";
import { fetchPhysicalExaminationsByPatientAsync, physicalExaminationSelectors } from "./physicalExaminationSlice";
import { Box, Typography, Button } from "@mui/material";
import Breadcrumb from "../../../app/components/Breadcrumb";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PhysicalExaminationList from "./PhysicalExaminationList";

export default function PhysicalExaminations() {

    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const physicalExaminationsByPatient = useAppSelector(physicalExaminationSelectors.selectAll);
    const { physicalExaminationByPatientLoaded } = useAppSelector(state => state.physicalExamination);
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    useEffect(() => {
        if (!physicalExaminationByPatientLoaded) dispatch(fetchPhysicalExaminationsByPatientAsync(id));
    }, [physicalExaminationByPatientLoaded, dispatch]);


    return (
        <div className="contentPatient">
            <Breadcrumb page="Blood Tests" />

            <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" key={patient?.id}>
                    list of blood tests for patient {patient?.patientName}
                </Typography>

                <div className="addButton">
                    <Button className="button" startIcon={<AddRoundedIcon />}>Add Blood Test</Button>
                </div>
            </Box>

            <PhysicalExaminationList physicalExaminations={physicalExaminationsByPatient} />
        </div>
    )
}
