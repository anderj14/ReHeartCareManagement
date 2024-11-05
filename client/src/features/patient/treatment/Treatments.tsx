import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../app/components/Breadcrumb";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { fetchPatientAsync, patientSelectors } from "../patientSlice";
import {
  fetchTreatmentsByPatientAsync,
  setTreatmentParams,
  treatmentSelectors,
} from "./treatmentSlice";
import TreatmentList from "./TreatmentList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CustomButton from "../../../app/components/CustomButton";
import PaginationItem from "../../../app/components/PaginationItem";

const sortOptions = [
  { value: "PatientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function Treatments() {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const treatmentByPatient = useAppSelector(treatmentSelectors.selectAll);
  const { treatmentsByPatientLoaded, treatmentParams, metaData, status } =
    useAppSelector((state) => state.treatment);
  const patient = useAppSelector((state) =>
    patientSelectors.selectById(state, id)
  );

  useEffect(() => {
    if (!patient) dispatch(fetchPatientAsync(id));
    if (!treatmentsByPatientLoaded) dispatch(fetchTreatmentsByPatientAsync(id));
  }, [treatmentsByPatientLoaded, dispatch]);

  return (
    <Box className="contentPatient">
      <Breadcrumb page="Treatments" />
      <Card sx={{ marginBottom: "30px" }}>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" key={patient?.patientName}>
              List of Treatments for patient{" "}
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
                  value={treatmentParams.sort}
                  label="Filter"
                  input={<OutlinedInput label="Filter" />}
                  onChange={(e) =>
                    dispatch(setTreatmentParams({ sort: e.target.value }))
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
                width="170px"
                icon={AddCircleOutlineIcon}
                color="#3396ff"
                hoverColor="#f3f3f3"
                hoverTextColor="#2f7fd4"
              >
                Add Treatment
              </CustomButton>
            </Box>
          </Box>

          <Box sx={{ marginTop: "15px" }}>
            {status === "pendingFetchTreatmentsByPatient" ? (
              <Typography variant="h6" align="center">
                Loading Treatments...
              </Typography>
            ) : treatmentsByPatientLoaded && treatmentByPatient.length === 0 ? (
              <Typography variant="h6" align="center">
                No Treatments Found
              </Typography>
            ) : (
              <TreatmentList treatments={treatmentByPatient} />
            )}
          </Box>

          {treatmentsByPatientLoaded && metaData && (
            <Box sx={{ marginTop: 4 }}>
              <PaginationItem
                metaData={metaData}
                onPageChange={(page: number) =>
                  dispatch(setTreatmentParams({ pageIndex: page }))
                }
                name="Treatments"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
