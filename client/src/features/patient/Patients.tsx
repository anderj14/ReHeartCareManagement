import PatientList from "./PatientList";
import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Fade, FormControl, FormControlLabel, FormLabel, Pagination, Popper, Radio, RadioGroup, Typography } from "@mui/material";
import '../../app/styles/patient.scss'
import Breadcrumb from "../../app/components/Breadcrumb";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchPatientsAsync, patientSelectors, setPatientParams } from "./patientSlice";
import PatientSearch from "./PatientSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";

const sortOptions = [
    { value: 'patientName', label: 'Alphabetical' },
    { value: 'dobAsc', label: 'DOB - Asc to Desc' },
    { value: 'dobDesc', label: 'DOB - Desc to Asc' },
]

export default function Patients() {
    const patients = useAppSelector(patientSelectors.selectAll);
    const { patientsLoaded, patientParams } = useAppSelector(state => state.patient);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;

    useEffect(() => {
        if (!patientsLoaded) dispatch(fetchPatientsAsync());
    }, [patientsLoaded, dispatch]);

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
                                <PatientSearch />
                            </div>
                            <div className="addPatientButton">
                                <Button className="button" startIcon={<AddRoundedIcon />}>Add Patient</Button>
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
            <Box display='flex' justifyContent='space-between' alignItems='center' marginTop='30px'>
                <p>
                    Showing <strong>1 - 6</strong> of <strong>6</strong> result
                </p>
                <Pagination count={10} />
            </Box>
        </div>
    )
}