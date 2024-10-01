import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { useEffect } from "react";
import BloodTestList from "./BloodTestList";
import { Box, Card, CardContent, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import Breadcrumb from "../../../app/components/Breadcrumb";
import { bloodTestSelectors, fetchBloodTestsByPatientAsync, setBloodTestParams } from "./bloodTestSlice";
import { patientSelectors } from "../patientSlice";
import PaginationItem from "../../../app/components/PaginationItem";
import CustomButton from "../../../app/components/CustomButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Title from "../../../app/components/Title";

const sortOptions = [
    { value: 'PatientName', label: 'Alphabetical' },
    { value: 'dateAsc', label: 'Date - Asc to Desc' },
    { value: 'dateDesc', label: 'Date - Desc to Asc' },
];

export default function BloodTests() {
    const { id } = useParams<{ id: any }>();
    const dispatch = useAppDispatch();
    const bloodTestsByPatient = useAppSelector(bloodTestSelectors.selectAll);
    const { bloodTestByPatientLoaded, bloodTestParams, metaData, status } = useAppSelector(state => state.bloodTest);
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    useEffect(() => {
        if (!bloodTestByPatientLoaded) dispatch(fetchBloodTestsByPatientAsync(id));
    }, [bloodTestByPatientLoaded, dispatch, id]);

    return (
        <Box className="contentPatient">
            <Breadcrumb page="Blood Tests" />
            <Card sx={{ marginBottom: 3 }}>
                <CardContent>
                    <Box display={"flex"} alignItems="center" justifyContent="space-between">
                        <Box>
                            <Title key={patient?.id} title={`Blood tests for patient ${patient?.patientName}`}></Title>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Box>
                                <FormControl sx={{ m: 1, minWidth: 200, "& .MuiInputLabel-root.Mui-focused": { color: '#838384'},
                                    "& .MuiOutlinedInput-root": {
                                    "fieldset": {border: '1.5px solid #e4e4e7'},
                                    "&:hover fieldset": {border: '1.5px solid #e4e4e7' },
                                    "&.Mui-focused fieldset": {border: '1.5px solid #e4e4e7'}
                                    }}}
                                >
                                    <InputLabel>Filter</InputLabel>
                                    <Select
                                    value={bloodTestParams.sort}
                                    label="Filter"
                                    input={<OutlinedInput label="Filter" />}
                                    onChange={(e) => dispatch(setBloodTestParams({sort: e.target.value}))}
                                    sx={{height: '36px', textAlign: 'left'}}
                                    >
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            <CustomButton icon={AddCircleOutlineIcon} color="#3396ff" hoverColor="#f3f3f3" hoverTextColor="#2f7fd4" >
                                Add Blood Test
                            </CustomButton>
                        </Box>
                    </Box>

                    <Box sx={{marginTop: '15px'}}>
                        {status === 'pendingFetchBloodTestsByPatient' ? (
                            <Typography variant="h6" align="center">Loading Blood Tests...</Typography>
                        ) : (
                            bloodTestByPatientLoaded && bloodTestsByPatient.length === 0 ? (
                                <Typography variant="h6" align="center">No Blood Tests Found</Typography>
                            ) : (
                                <BloodTestList bloodTests={bloodTestsByPatient} />
                            )
                        )}
                    </Box>

                    {bloodTestByPatientLoaded && metaData && (
                        <Box sx={{ marginTop: 4 }}>
                            <PaginationItem
                                metaData={metaData}
                                onPageChange={(page: number) => dispatch(setBloodTestParams({ pageIndex: page }))}
                                name='bloodtest'
                            />
                        </Box>
                    )}
                </CardContent>
            </Card>
           
        </Box>
    );
}
