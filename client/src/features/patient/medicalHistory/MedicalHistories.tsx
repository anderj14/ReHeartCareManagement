import { useEffect } from "react";
import {
  fetchMedicalHistoriesByPatientAsync,
  medicalHistorySelectors,
  setMedicalHistoryParams,
} from "./medicalHistorySlice";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { fetchPatientAsync, patientSelectors } from "../patientSlice";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import Breadcrumb from "../../../app/components/Breadcrumb";
import MedicalHistoryList from "./MedicalHistoryList";
import NotFound from "../../../app/errors/NotFound";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CustomButton from "../../../app/components/CustomButton";
import PaginationItem from "../../../app/components/PaginationItem";

const sortOptions = [
  { value: "PatientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function MedicalHistories() {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const medicalHistoryByPatient = useAppSelector(
    medicalHistorySelectors.selectAll
  );
  const {
    medicalHistoryByPatientLoaded,
    medicalHistoryParams,
    metaData,
    status,
  } = useAppSelector((state) => state.medicalHistory);
  const patient = useAppSelector((state) =>
    patientSelectors.selectById(state, id)
  );

  useEffect(() => {
    if (!patient) {
      dispatch(fetchPatientAsync(id));
    }
    if (!medicalHistoryByPatientLoaded)
      dispatch(fetchMedicalHistoriesByPatientAsync(id));
  }, [medicalHistoryByPatientLoaded, dispatch]);

  if (!patient) {
    return (
      <NotFound/>
    );
  }

  return (
    <Box className="contentPatient">
      <Breadcrumb page="Medical Histories" />
      <Card sx={{ marginBottom: "30px" }}>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" key={patient?.patientName}>
              List of Medical Histories for patient{" "}
              {patient?.patientName || "Loading..."}
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
                  value={medicalHistoryParams.sort}
                  label="Filter"
                  input={<OutlinedInput label="Filter" />}
                  onChange={(e) =>
                    dispatch(setMedicalHistoryParams({ sort: e.target.value }))
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
                width="190px"
                icon={AddCircleOutlineIcon}
                color="#4d7997"
                hoverColor="#f3f3f3"
                hoverTextColor="#3b5c72"
              >
                Add Medical History
              </CustomButton>
            </Box>
          </Box>

          <Box sx={{ marginTop: "15px" }}>
            {status === "pendingFetchMedicalHistoriesByPatient" ? (
              <Typography variant="h6" align="center">
                Loading Medical Histories...
              </Typography>
            ) : medicalHistoryByPatientLoaded &&
              medicalHistoryByPatient.length === 0 ? (
              <Typography variant="h6" align="center">
                No Medical Histories Found
              </Typography>
            ) : (
              <MedicalHistoryList medicalHistories={medicalHistoryByPatient} />
            )}
          </Box>

          {medicalHistoryByPatientLoaded && metaData && (
            <Box sx={{ marginTop: 4 }}>
              <PaginationItem
                metaData={metaData}
                onPageChange={(page: number) =>
                  dispatch(setMedicalHistoryParams({ pageIndex: page }))
                }
                name="Medical Histories"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
