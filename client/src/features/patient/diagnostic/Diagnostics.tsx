import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { fetchPatientAsync, patientSelectors } from "../patientSlice";
import {
  diagnosticSelectors,
  fetchDiagnosticsByPatientAsync,
  setDiagnosticParams,
} from "./diagnosticSlice";
import { useEffect } from "react";
import Breadcrumb from "../../../app/components/Breadcrumb";
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import DiagnosticList from "./DiagnosticList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PaginationItem from "../../../app/components/PaginationItem";
import CustomButton from "../../../app/components/CustomButton";

const sortOptions = [
  { value: "PatientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function Diagnostics() {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const diagnosticsByPatient = useAppSelector(diagnosticSelectors.selectAll);
  const { diagnosticByPatientLoaded, diagnosticParams, metaData, status } =
    useAppSelector((state) => state.diagnostic);
  const patient = useAppSelector((state) =>
    patientSelectors.selectById(state, id)
  );

  useEffect(() => {
    if (!patient) dispatch(fetchPatientAsync(id));
    if (!diagnosticByPatientLoaded)
      dispatch(fetchDiagnosticsByPatientAsync(id));
  }, [diagnosticByPatientLoaded, dispatch, id, patient]);

  return (
    <Box className="contentPatient">
      <Breadcrumb page="Diagnostics" />
      <Card sx={{ marginBottom: "30px" }}>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" key={patient?.patientName}>
              List of Diagnostics for patient{" "}
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
                  value={diagnosticParams.sort}
                  label="Filter"
                  input={<OutlinedInput label="Filter" />}
                  onChange={(e) =>
                    dispatch(setDiagnosticParams({ sort: e.target.value }))
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
                color="#3396ff"
                hoverColor="#f3f3f3"
                hoverTextColor="#2f7fd4"
              >
                Add Diagnostic
              </CustomButton>
            </Box>
          </Box>

          <Box sx={{ marginTop: "15px" }}>
            {status === "pendingFetchDiagnosticsByPatient" ? (
              <Typography variant="h6" align="center">
                Loading Diagnostics...
              </Typography>
            ) : diagnosticByPatientLoaded &&
              diagnosticsByPatient.length === 0 ? (
              <Typography variant="h6" align="center">
                No Diagnostics Found
              </Typography>
            ) : (
              <DiagnosticList diagnostics={diagnosticsByPatient} />
            )}
          </Box>

          {diagnosticByPatientLoaded && metaData && (
            <Box sx={{ marginTop: 4 }}>
              <PaginationItem
                metaData={metaData}
                onPageChange={(page: number) =>
                  dispatch(setDiagnosticParams({ pageIndex: page }))
                }
                name="Diagnostics"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
