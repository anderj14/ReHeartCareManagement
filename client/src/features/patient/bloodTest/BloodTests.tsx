import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { useEffect, useState } from "react";
import BloodTestList from "./BloodTestList";
import { Box, Button, Typography } from "@mui/material";
import Breadcrumb from "../../../app/components/Breadcrumb";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { bloodTestSelectors, fetchBloodTestsByPatientAsync } from "./bloodTestSlice";

export default function BloodTests() {

    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const bloodTestsByPatient = useAppSelector(bloodTestSelectors.selectAll);
    const { bloodTestByPatientLoaded } = useAppSelector(state => state.bloodTest);

    useEffect(() => {
        if(!bloodTestByPatientLoaded) dispatch(fetchBloodTestsByPatientAsync(id));
    }, [bloodTestByPatientLoaded, dispatch]);

    // useEffect(() => {
    //     const fetchBloodTest = async () => {
    //         try {
    //             const bloodTestsData = await ApiService.getBloodTestByPatientId(id);
    //             console.log(bloodTestsData);
    //             setBloodTests(bloodTestsData);
    //         } catch (error) {
    //             console.error('Error fetching blood tests:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    //     fetchBloodTest();
    // }, [id]);

    const latestBloodTest = bloodTestsByPatient?.slice(-1)[0];

    return (
        <div className="contentPatient">
            <Breadcrumb page="Blood Tests" />

            <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {latestBloodTest && (
                    <Typography variant="h5" key={latestBloodTest?.id}>
                        list of blood tests for patient {latestBloodTest.patient}
                    </Typography>

                )}
                <div className="addButton">
                    <Button className="button" startIcon={<AddRoundedIcon />}>Add Blood Test</Button>
                </div>
            </Box>

            <BloodTestList bloodTests={bloodTestsByPatient} />
        </div>
    )
}
