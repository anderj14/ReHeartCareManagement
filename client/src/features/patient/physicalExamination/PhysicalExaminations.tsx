import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import {
  fetchPhysicalExaminationsByPatientAsync,
  setPhysicalExaminationParams,
  physicalExaminationSelectors,
} from "./physicalExaminationSlice";
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
import PhysicalExaminationList from "./PhysicalExaminationList";
import NotFound from "../../../app/errors/NotFound";
import PaginationItem from "../../../app/components/PaginationItem";
import CustomButton from "../../../app/components/CustomButton";
import { PhysicalExamination } from "../../../app/Models/physicalExamination";
import { LuPlus } from "react-icons/lu";
import Title from "../../../app/components/Title";
import PhysicalExaminationForm from "./PhysicalExaminationForm";

const sortOptions = [
  { value: "PatientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function PhysicalExaminations() {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const examinationsByPatient = useAppSelector(physicalExaminationSelectors.selectAll);
  const { physicalExaminationByPatientLoaded, physicalExaminationParams, metaData, status } =
    useAppSelector((state) => state.physicalExamination);
  const { status: physicalExaminationStatus } = useAppSelector(
    (state) => state.physicalExamination
  );
  const patient = useAppSelector((state) =>
    patientSelectors.selectById(state, id)
  );
  const [openForm, setOpenForm] = useState(false);
  const [selectedExamination] = useState<PhysicalExamination | undefined>(undefined);

  useEffect(() => {
    if (!patient) dispatch(fetchPatientAsync(id));
    if (!physicalExaminationByPatientLoaded)
      dispatch(fetchPhysicalExaminationsByPatientAsync(id));
  }, [physicalExaminationByPatientLoaded, dispatch, id, patient]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenForm(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 500, padding: '20px' }} role="presentation">
      <PhysicalExaminationForm
        physicalExamination={selectedExamination}
        cancelEdit={() => setOpenForm(false)}
        title="Add Physical Examination"
        patientId={patient?.id}
      />
    </Box>
  );

  if (physicalExaminationStatus.includes("pending")) return <h3>Loading...</h3>;
  if (!examinationsByPatient) return <NotFound />;

  return (
    <Box className="contentPhysicalExamination">
      <Box
        sx={{
          margin: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title 
          title={`Physical Exams of ${patient?.patientName || "Loading..."}`} 
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
            Add Exam
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
            value={physicalExaminationParams.sort}
            label="Filter"
            input={<OutlinedInput label="Filter" />}
            onChange={(e) =>
              dispatch(setPhysicalExaminationParams({ sort: e.target.value }))
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
        {status === "pendingFetchPhysicalExaminationsByPatient" ? (
          <Typography variant="h6" align="center">
            Loading Physical Examinations...
          </Typography>
        ) : examinationsByPatient && examinationsByPatient.length === 0 ? (
          <Typography variant="h6" align="center">
            No Physical Examinations Found
          </Typography>
        ) : (
          <PhysicalExaminationList physicalExaminations={examinationsByPatient} />
        )}
      </Box>

      {physicalExaminationByPatientLoaded && metaData && (
        <Box sx={{ margin: "40px" }}>
          <PaginationItem
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPhysicalExaminationParams({ pageIndex: page }))
            }
            name="Physical Examinations"
          />
        </Box>
      )}
    </Box>
  );
}
