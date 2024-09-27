import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { useEffect, useState } from "react";
import BloodTestList from "./BloodTestList";
import { Box, Button, Card, CardContent, Drawer, Typography } from "@mui/material";
import Breadcrumb from "../../../app/components/Breadcrumb";
import { bloodTestSelectors, fetchBloodTestsByPatientAsync, setBloodTestParams } from "./bloodTestSlice";
import { patientSelectors } from "../patientSlice";
import RadioButtonGroup from "../../../app/components/RadioButtonGroup";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import PaginationItem from "../../../app/components/PaginationItem";

const sortOptions = [
    {value: 'PatientName', label: 'Alphabetical'},
    { value: 'dateAsc', label: 'Date - Asc to Desc' },
    { value: 'dateDesc', label: 'Date - Desc to Asc' },
];

export default function BloodTests() {
    
    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const bloodTestsByPatient = useAppSelector(bloodTestSelectors.selectAll);
    const { bloodTestByPatientLoaded, bloodTestParams, metaData, status } = useAppSelector(state => state.bloodTest);
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
    useEffect(() => {
        if(!bloodTestByPatientLoaded) dispatch(fetchBloodTestsByPatientAsync(id));
    }, [bloodTestByPatientLoaded, dispatch]);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

//   const canBeOpen = open && Boolean(anchorEl);
//   const id = canBeOpen ? 'spring-popper' : undefined;

    // console.log(patient.id);

    return (
        <div className="contentPatient">
            <Breadcrumb page="Blood Tests" />
            <Box>
                <Typography variant="h4">Blood Tests</Typography>
            </Box>
            <div className="line"></div>

            <Card>
                <CardContent>
                    <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h5" key={patient?.id}>
                            list of blood tests for patient {patient?.patientName}
                        </Typography>

                        <div className="addButton">
                            <Button className="button" startIcon={<AddRoundedIcon />}>Add Blood Test</Button>
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '-35px' }}>

                        <div className="addFilterButton">
                            <Button className="button" startIcon={<SortRoundedIcon />} onClick={handleClick}>Filter</Button>
                            <RadioButtonGroup
                                selectedValue={bloodTestParams.sort}
                                options={sortOptions}
                                onChange={(e) => dispatch(setBloodTestParams({ sort: e.target.value }))}
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                            />
                        </div>
                    </Box>
                </CardContent>
            </Card>

            <Box sx={{marginTop: '20px'}}>
                <div className="bloodTestList">
                    {status === 'pendingFetchBloodTestsByPatient' && (
                        <Typography variant="h6">Loading Patients...</Typography>
                    )}
                    {bloodTestByPatientLoaded && bloodTestsByPatient.length === 0 && (
                        <Typography variant="h6">No Blood Tets Found</Typography>
                    )}
                    {bloodTestByPatientLoaded && bloodTestsByPatient.length > 0 &&(
                        <BloodTestList bloodTests={bloodTestsByPatient} />
                    )}
                </div>
            </Box>
            {bloodTestByPatientLoaded && (
                <Box marginTop={'30px'}>
                {/* <h2>pagination</h2> */}
                {metaData && (
                    <PaginationItem
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setBloodTestParams({ pageIndex: page }))}
                    />
                )}
                </Box>
            )}
        </div>
    )
}
