import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import {
  fetchStressTestsByPatientAsync,
  setStressTestParams,
  stressTestSelectors,
} from "./stressTestSlice";
import { fetchPatientAsync, patientSelectors } from "../patientSlice";
import { useEffect } from "react";
import { Box, Typography, FormControl, InputLabel, OutlinedInput, Select, MenuItem, CardContent, Card } from "@mui/material";
import Breadcrumb from "../../../app/components/Breadcrumb";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StressTestList from "./StressTestList";
import NotFound from "../../../app/errors/NotFound";
import PaginationItem from "../../../app/components/PaginationItem";
import CustomButton from "../../../app/components/CustomButton";

const sortOptions = [
  { value: "PatientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function StressTest() {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const stressTestByPatient = useAppSelector(stressTestSelectors.selectAll);
  const { stressTestByPatientLoaded, stressTestParams, metaData, status } =
    useAppSelector((state) => state.stressTest);
  const { status: stressTestStatus } = useAppSelector(
    (status) => status.stressTest
  );
  const patient = useAppSelector((state) =>
    patientSelectors.selectById(state, id)
  );

  useEffect(() => {
    if (!patient) dispatch(fetchPatientAsync(id));
    if (!stressTestByPatientLoaded)
      dispatch(fetchStressTestsByPatientAsync(id));
  }, [stressTestByPatientLoaded, dispatch, id, patient]);

  if (stressTestStatus.includes("pending")) return <h3>Loading...</h3>;
  if (!stressTestByPatient) return <NotFound />;

  return (
    <Box className="contentPatient">
      <Breadcrumb page="Stress Tests" />
      <Card sx={{ marginBottom: "30px" }}>
        <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" key={patient?.patientName}>
            List of Stress Tests for patient {patient?.patientName || "Loading..."}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControl
              sx={{
                m: 1,
                minWidth: 200,
                "& .MuiInputLabel-root.Mui-focused": { color: "#838384" },
                "& .MuiOutlinedInput-root": {
                  fieldset: { border: "1.5px solid #e4e4e7" },
                  "&:hover fieldset": { border: "1.5px solid #e4e4e7" },
                  "&.Mui-focused fieldset": { border: "1.5px solid #e4e4e7" },
                },
              }}
            >
              <InputLabel>Filter</InputLabel>
              <Select
                value={stressTestParams.sort}
                label="Filter"
                input={<OutlinedInput label="Filter" />}
                onChange={(e) =>
                  dispatch(setStressTestParams({ sort: e.target.value }))
                }
                sx={{ height: "36px", textAlign: "left" }}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
  
            <CustomButton
              width="160px"
              icon={AddCircleOutlineIcon}
              color="#4d7997"
              hoverColor="#f3f3f3"
              hoverTextColor="#3b5c72"
            >
              Add Stress Test
            </CustomButton>
          </Box>
        </Box>
  
        <Box sx={{ marginTop: "15px" }}>
          {status === "pendingFetchStressTestsByPatient" ? (
            <Typography variant="h6" align="center">
              Loading Stress Tests...
            </Typography>
          ) : stressTestByPatientLoaded && stressTestByPatient.length === 0 ? (
            <Typography variant="h6" align="center">
              No Stress Tests Found
            </Typography>
          ) : (
            <StressTestList stressTest={stressTestByPatient} />
          )}
        </Box>
  
        {stressTestByPatientLoaded && metaData && (
          <Box sx={{ marginTop: 4 }}>
            <PaginationItem
              metaData={metaData}
              onPageChange={(page: number) =>
                dispatch(setStressTestParams({ pageIndex: page }))
              }
              name="Stress Tests"
            />
          </Box>
        )}
        </CardContent>
        
      </Card>
    </Box>
  );
  
}
