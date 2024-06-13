import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import '../../app/styles/patient.scss';
import Breadcrumb from "../../app/components/Breadcrumb";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchPatientsAsync, patientSelectors, setPatientParams } from "./patientSlice";
import PatientList from "./PatientList";
import PatientSearch from "./PatientSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import PaginationItem from "../../app/components/PaginationItem";
import Pager from "../../app/components/Pager";
import PatientForm from "./admin-patient/PatientForm";
import { Patient } from "../../app/Models/patient";
import { Edit } from "@mui/icons-material";

const sortOptions = [
    { value: 'patientName', label: 'Alphabetical' },
    { value: 'dobAsc', label: 'DOB - Asc to Desc' },
    { value: 'dobDesc', label: 'DOB - Desc to Asc' },
];

export default function Patients() {
    const patients = useAppSelector(patientSelectors.selectAll);
    const { patientsLoaded, patientParams, metaData } = useAppSelector(state => state.patient);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [editMode, setEditMode] = useState(false);

    const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(undefined);

    function handleSelectPatient(patient: Patient) {
        setSelectedPatient(patient);
        setEditMode(true);
    }

    function cancelEdit() {
        if (selectedPatient) setSelectedPatient(undefined);
        setEditMode(false);
    }

    if (editMode) return <PatientForm patient={selectedPatient} cancelEdit={cancelEdit} />

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;

    // useEffect(() => {
    //     if (!patientsLoaded) dispatch(fetchPatientsAsync());
    // }, [patientsLoaded, dispatch]);

    if (!patientsLoaded || !metaData) {
        return (
            <Typography variant="h6">Loading patients...</Typography>
        );
    }

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
                                {/* <p>
                                    Showing <strong>1 - 6</strong> of <strong>6</strong> result
                                </p> */}
                                <Pager metaData={metaData} />
                            </div>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '-35px' }}>
                            <div className="search">
                                <PatientSearch />
                            </div>
                            <div className="addPatientButton">
                                <Button onClick={() => setEditMode(true)} className="button" startIcon={<AddRoundedIcon />}>Add Patient</Button>
                            </div>
                            <div className="addFilterButton">
                                <Button className="button" startIcon={<SortRoundedIcon />} onClick={handleClick}>Filter</Button>
                                <RadioButtonGroup
                                    selectedValue={patientParams.sort}
                                    options={sortOptions}
                                    onChange={(e) => dispatch(setPatientParams({ sort: e.target.value }))}
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                />
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
            <Box marginTop='30px'>

                <PaginationItem
                    metaData={metaData}
                    onPageChange={(page: number) => dispatch(setPatientParams({ pageIndex: page }))}
                />
            </Box>
            {/* <Button onClick={() => handleSelectPatient(patient)} startIcon={<Edit />} /> */}

        </div>
    )
}
