import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { fetchCardiologySurgeriesByPatientAsync, surgerySelectors } from "../../surgery/surgerySlice";
import { patientSelectors } from "../patientSlice";
import { useEffect } from "react";
import Breadcrumb from "../../../app/components/Breadcrumb";
import { Box, Typography, Button } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CardiologySurgeryList from "./CardiologySurgeryList";

export default function CardiologySurgery() {
    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const cardiologySurgeryByPatient = useAppSelector(surgerySelectors.selectAll);
    const { surgeryByPatientLoaded } = useAppSelector(state => state.cardiologySurgery);
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    useEffect(() => {
        if (!surgeryByPatientLoaded) dispatch(fetchCardiologySurgeriesByPatientAsync(id));
    }, [surgeryByPatientLoaded, dispatch]);

    return (
        <div>
            <div className="contentPatient">
                <Breadcrumb page="Cardiology surgery" />

                <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5" key={patient?.id}>
                        list of cardiology surgery for patient {patient?.patientName}
                    </Typography>
                    <div className="addButton">
                        <Button className="button" startIcon={<AddRoundedIcon />}>Add Cardiology Surgery</Button>
                    </div>
                </Box>

                <CardiologySurgeryList cardiologySurgeries={cardiologySurgeryByPatient}></CardiologySurgeryList>
            </div>
        </div>
    )
}