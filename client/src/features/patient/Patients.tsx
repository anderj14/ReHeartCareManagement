import PatientList from "./PatientList";
import { Patient } from "../../app/Models/patient";
import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, IconButton, TextField, Typography } from "@mui/material";
import '../../app/styles/patient.scss'
import SearchIcon from "@mui/icons-material/Search";
import Breadcrumb from "../../app/components/Breadcrumb";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchPatientAsync, fetchPatientsAsync, patientSelectors } from "./patientSlice";

export default function Patients() {
    const patients = useAppSelector(patientSelectors.selectAll);
    const {patientLoaded} = useAppSelector(state => state.patient);
    const dispatch = useAppDispatch();
    // const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        if (!patientLoaded) dispatch(fetchPatientsAsync());
        // agent.Patient.list().then(patients => setPatients(patients.data));
    }, [patientLoaded, dispatch]);

    return (
        <div className="contentPatient">
            <Breadcrumb page="Patients" />
            <Box>
                <Typography variant="h4">Patients</Typography>
            </Box>
            <div className="line"></div>
            <Card>
                <CardContent>
                    <div className="filtersContainer">
                        <Box>
                            <Typography variant="h6">Patient List</Typography>
                            <div className="pager">
                                <p>
                                    Showing <strong>1 - 6</strong> of <strong>6</strong> result
                                </p>
                            </div>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '-35px' }}>
                            <div className="search">
                                <TextField
                                    id="search-bar"
                                    className="text"
                                    label="Search by name"
                                    variant="outlined"
                                    placeholder="Search..."
                                    size="small"
                                />
                                <IconButton type="submit" aria-label="search">
                                    <SearchIcon style={{ fill: "#5a9580", fontSize: '30px' }} />
                                </IconButton>
                            </div>
                            <div className="addPatientButton">
                                <Button className="button" startIcon={<AddRoundedIcon />}>Add Patient</Button>
                            </div>
                            <div className="addFilterButton">
                                <Button className="button" startIcon={<SortRoundedIcon />}>Filter</Button>
                            </div>
                        </Box>
                    </div>
                </CardContent>
            </Card>

            <Box sx={{ marginTop: '20px' }}>
                <div className="patientList">
                    <PatientList patients={patients} />
                </div>
            </Box>
        </div>
    )
}