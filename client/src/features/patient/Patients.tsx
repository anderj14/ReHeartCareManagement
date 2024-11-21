import { useState } from "react";
import { Box, Button, Card, CardContent, Drawer, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import '../../app/styles/patient.scss';
import Breadcrumb from "../../app/components/Breadcrumb";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setPageIndex, setPatientParams } from "./patientSlice";
import PatientList from "./PatientList";
import PatientSearch from "./PatientSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import PaginationItem from "../../app/components/PaginationItem";
import Pager from "../../app/components/Pager";
import PatientForm from "./admin-patient/PatientForm";
import { Patient } from "../../app/Models/patient";
import usePatients from "../../app/hooks/usePatient";

const sortOptions = [
    { value: 'patientName', label: 'Alphabetical' },
    { value: 'dobAsc', label: 'DOB - Asc to Desc' },
    { value: 'dobDesc', label: 'DOB - Desc to Asc' },
];

export default function Patients() {
    const { patientParams } = useAppSelector(state => state.patient);
    const {patients, patientsLoaded, status, patientStatus, metaData} = usePatients();
    
    const dispatch = useAppDispatch();
    const [openFilter, setOpenFilter] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedPatient] = useState<Patient | undefined>(undefined);
    const [selectedStatus, setSelectedStatus] = useState<number>(0);

    const canBeOpen = openFilter && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;
   

    const handleClickFilter = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenFilter((previousOpen) => !previousOpen);
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenForm(newOpen);
    };

    const handleStatusChange = (event: any) => {
        setSelectedStatus(event.target.value);
        dispatch(setPatientParams({ statusId: event.target.value }));
    };

    const DrawerList = (
        <Box sx={{ width: 650, padding: '20px' }} role="presentation">
            <PatientForm patient={selectedPatient} cancelEdit={() => setOpenForm(false)} title={"Creating New Patient"}/>
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
                                {metaData && metaData.count > 0  && (
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
                                <Button className="button" startIcon={<SortRoundedIcon />} onClick={handleClickFilter}>Filter</Button>
                                <RadioButtonGroup
                                    selectedValue={patientParams.sort}
                                    options={sortOptions}
                                    onChange={(e) => dispatch(setPatientParams({ sort: e.target.value }))}
                                    id={id}
                                    open={openFilter}
                                    anchorEl={anchorEl}
                                />
                            </div>
                        </Box>
                    </div>

                    <Box sx={{ minWidth: 120, marginTop: '20px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="status-select-label">Patient Status</InputLabel>
                            <Select
                                labelId="status-select-label"
                                id="status-select"
                                value={selectedStatus}
                                label="Patient Status"
                                onChange={handleStatusChange}
                                sx={{height: 45}}
                            >
                                <MenuItem value={0}>All Statuses</MenuItem>
                                {patientStatus.map((status) => (
                                    <MenuItem key={status.id} value={status.id}>
                                        {status.patientStatusName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
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
                {metaData && metaData.count > 0  && (
                    <PaginationItem
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageIndex({ pageIndex: page }))}
                        name='Patients'
                    />
                )}
            </Box>
        </div>
    );
}
