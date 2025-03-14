import {
  fetchHolterStudiesByPatientAsync,
  holterStudySelectors,
  setHolterStudyParams,
} from "./holterStudySlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { fetchPatientAsync, patientSelectors } from "../patientSlice";
import { useParams } from "react-router-dom";
import { Box, Typography, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Drawer, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import HolterStudyList from "./HolterStudyList";
import NotFound from "../../../app/errors/NotFound";
import Title from "../../../app/components/Title";
import CustomButton from "../../../app/components/CustomButton";
import PaginationItem from "../../../app/components/PaginationItem";
import { LuPlus } from "react-icons/lu";
import { HolterStudy } from "../../../app/Models/holterStudy";
import HolterStudyForm from "./HolterStudyform";

const sortOptions = [
  { value: "PatientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function HolterStudies() {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const holterStudiesByPatient = useAppSelector(holterStudySelectors.selectAll);
  const { holterStudyByPatientLoaded, holterStudyParams, metaData, status } =
    useAppSelector((state) => state.holterStudy);
  const patient = useAppSelector((state) =>
    patientSelectors.selectById(state, id)
  );
  const { status: holterStudyStatus } = useAppSelector(
    (state) => state.holterStudy
  );
  const [openForm, setOpenForm] = useState(false);
  const [selectedHolterStudy] = useState<HolterStudy | undefined>(undefined);

  useEffect(() => {
    if (!patient) dispatch(fetchPatientAsync(id));
    if (!holterStudyByPatientLoaded)
      dispatch(fetchHolterStudiesByPatientAsync(id));
  }, [holterStudyByPatientLoaded, dispatch, id, patient]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenForm(newOpen);
  }

  const DrawerList = (
    <Box sx={{ width: 500, padding: '20px' }} role="presentation">
      <HolterStudyForm
        study={selectedHolterStudy}
        cancelEdit={() => setOpenForm(false)}
        title="Add Blood Test"
        patientId={patient?.id}
      />
    </Box>
  )

  if (holterStudyStatus.includes("pending")) return <h3>Loading...</h3>;
  if (!holterStudiesByPatient) return <NotFound />;

  return (
    <Box className="contentHolterStudy">
      <Box
        sx={{
          margin: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
      <Title 
        title={`Holter studies of ${patient?.patientName || "Loading..."}`} 
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
          Add Holter Study
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
          value={holterStudyParams.sort}
          label="Filter"
          input={<OutlinedInput label="Filter" />}
          onChange={(e) =>
            dispatch(
              setHolterStudyParams({ sort: e.target.value })
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
      ) : holterStudyByPatientLoaded &&
        holterStudiesByPatient.length === 0 ? (
        <Typography variant="h6" align="center">
          No Holter Studies Found
        </Typography>
      ) : (
        <HolterStudyList
          holterStudies={holterStudiesByPatient}
        />
      )}
    </Box>
    
    {holterStudyByPatientLoaded && metaData && (
      <Box sx={{ margin: "40px" }}>
        <PaginationItem
          metaData={metaData}
          onPageChange={(page: number) =>
            dispatch(setHolterStudyParams({ pageIndex: page }))
          }
          name="Holter studies"
        />
      </Box>
    )}
    </Box>
  );
}
