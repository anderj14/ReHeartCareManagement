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
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Divider,
  Drawer,
} from "@mui/material";
import StressTestList from "./StressTestList";
import NotFound from "../../../app/errors/NotFound";
import PaginationItem from "../../../app/components/PaginationItem";
import CustomButton from "../../../app/components/CustomButton";
import { StressTest } from "../../../app/Models/stressTest";
import { LuPlus } from "react-icons/lu";
import Title from "../../../app/components/Title";
import StressTestForm from "./StressTestForm";

const sortOptions = [
  { value: "PatientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function StressTests() {
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
  const [openForm, setOpenForm] = useState(false);
  const [selectedStressTest] = useState<StressTest | undefined>(undefined);

  useEffect(() => {
    if (!patient) dispatch(fetchPatientAsync(id));
    if (!stressTestByPatientLoaded)
      dispatch(fetchStressTestsByPatientAsync(id));
  }, [stressTestByPatientLoaded, dispatch, id, patient]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenForm(newOpen);
  }

  const DrawerList = (
    <Box sx={{ width: 500, padding: '20px' }} role="presentation">
      <StressTestForm
        stressTest={selectedStressTest}
        cancelEdit={() => setOpenForm(false)}
        title="Add Stress Test"
        patientId={patient?.id}
      />
    </Box>
  )

  if (stressTestStatus.includes("pending")) return <h3>Loading...</h3>;
  if (!stressTestByPatient) return <NotFound />;

  return (
    <Box className="contentStressTest">
      <Box
        sx={{
          margin: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title 
          title={`Stress Tests of ${patient?.patientName || "Loading..."}`} 
          weight="500" 
        />
        <Box>
          <CustomButton
            open={openForm}
            onClick={toggleDrawer(true)}
            icon={LuPlus}
            color="#fff"
            width="100"
            borderColor="transparent"
          >
            Add Stress Test
          </CustomButton>
          <Drawer open={openForm} onClose={toggleDrawer(false)} anchor="right">
            {DrawerList}
          </Drawer>
        </Box>
      </Box>

      <Box sx={{ margin: "40px" }}>
        <FormControl
          sx={{
            marginBottom: '20px',          
            minWidth: 200,
            "& .MuiInputLabel-root.Mui-focused": { color: "#838384" },
            "& .MuiOutlinedInput-root": {
              fieldset: { border: "1.5px solid #e4e4e7" },
              "&:hover fieldset": { border: "1.5px solid #e4e4e7" },
              "&.Mui-focused fieldset": {
                border: "1.5px solid #e4e4e7",
              },
            },
          }}
        >
          <InputLabel>Filter</InputLabel>
          <Select
            value={stressTestParams.sort}
            label="Filter"
            input={<OutlinedInput label="Filter" />}
            onChange={(e) =>
              dispatch(
                setStressTestParams({ sort: e.target.value })
              )
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
      </Box>

      <Divider sx={{ width: "100%" }} />

      <Box sx={{ margin: "40px" }}>
        {status === "pendingFetchHolterStudiesByPatient" ? (
          <Typography variant="h6" align="center">
            Loading Holter Studies...
          </Typography>
        ) : stressTestByPatient &&
          stressTestByPatient.length === 0 ? (
          <Typography variant="h6" align="center">
            No Holter Studies Found
          </Typography>
        ) : (
          <StressTestList
            stressTest={stressTestByPatient}
          />
        )}
      </Box>
      
      {stressTestByPatientLoaded && metaData && (
        <Box sx={{ margin: "40px" }}>
          <PaginationItem
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setStressTestParams({ pageIndex: page }))
            }
            name="Holter studies"
          />
        </Box>
      )}
    </Box>
  );
}
