import { Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import Breadcrumb from "../../../app/components/Breadcrumb";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { patientSelectors } from "../patientSlice";
import { echocardiogramSelectors, fetchEchocardiogramsByPatientAsync } from "./echocardiogramSlice";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useParams } from "react-router-dom";
import EchocardiogramList from "./EchocardiogramList";

export default function Echocardiograms() {

    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const echocardiogramsByPatient = useAppSelector(echocardiogramSelectors.selectAll);
    const { echocardiogramByPatientLoaded } = useAppSelector(state => state.echocardiogram);
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    useEffect(() => {
        if (!echocardiogramByPatientLoaded) dispatch(fetchEchocardiogramsByPatientAsync(id));
    }, [echocardiogramByPatientLoaded, dispatch]);


    return (
        <div className="contentPatient">
            <Breadcrumb page="Echocardiogram" />

            <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" key={patient?.id}>
                    list of echocardiograms for patient {patient?.patientName}
                </Typography>

                <div className="addButton">
                    <Button className="button" startIcon={<AddRoundedIcon />}>Add Echocardiogram</Button>
                </div>
            </Box>

            <EchocardiogramList echocardiograms={echocardiogramsByPatient} />
        </div>
    )
}
