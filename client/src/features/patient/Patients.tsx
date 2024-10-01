import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Drawer, Grid, TextField, Typography } from "@mui/material";
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
import AppTextInput from "../../app/components/AppTextInput";
import { useForm } from "react-hook-form";
import PatientForm from "./admin-patient/PatientForm";

const sortOptions = [
    { value: 'patientName', label: 'Alphabetical' },
    { value: 'dobAsc', label: 'DOB - Asc to Desc' },
    { value: 'dobDesc', label: 'DOB - Desc to Asc' },
];

export default function Patients() {
    const patients = useAppSelector(patientSelectors.selectAll);
    const { patientsLoaded, patientParams, metaData, status } = useAppSelector(state => state.patient);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { control, reset, handleSubmit } = useForm();


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;

    useEffect(() => {
        if (!patientsLoaded) dispatch(fetchPatientsAsync());
    }, [patientsLoaded, dispatch]);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenForm(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 650, padding: '20px' }} role="presentation" onClick={toggleDrawer(false)}>
            <PatientForm cancelEdit={function (): void {
                throw new Error("Function not implemented.");
            }} />
        </Box>
    );

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
                                {metaData && (
                                    <Pager metaData={metaData} />
                                )}
                            </div>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '-35px' }}>
                            <div className="search">
                                <PatientSearch />
                            </div>
                            <div className="addPatientButton">
                                <Button className="button" onClick={toggleDrawer(true)} startIcon={<AddRoundedIcon />}>Add Patient</Button>
                                <Drawer open={openForm} onClose={toggleDrawer(false)} anchor="right">
                                    {DrawerList}
                                </Drawer>
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
                    {status === 'pendingFetchPatientsAsync' && (
                        <Typography variant="h6">Loading Patients...</Typography>
                    )}
                    {patientsLoaded && patients.length === 0 && (
                        <Typography variant="h6">No patient Found</Typography>
                    )}
                    {patientsLoaded && patients.length > 0 && (
                        <PatientList patients={patients} />
                    )}
                </div>
            </Box>
            <Box marginTop='30px'>
                {metaData && (
                    <PaginationItem
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPatientParams({ pageIndex: page }))}
                        name='Patients'
                    />
                )}
            </Box>
        </div>
    )
}
