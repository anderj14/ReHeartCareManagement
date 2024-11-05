import {
  diseaseHistorySelectors,
  fetchDiseaseHistoriesByPatientAsync,
  setDiseaseHistoryParams,
} from "./diseaseHistorySlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { useParams } from "react-router-dom";
import { fetchPatientAsync, patientSelectors } from "../patientSlice";
import { useEffect } from "react";
import {
  Box,
  Typography,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  FormControl,
  Card,
  CardContent,
} from "@mui/material";
import Breadcrumb from "../../../app/components/Breadcrumb";
import DiseaseHistoryList from "./DiseaseHistoryList";
import NotFound from "../../../app/errors/NotFound";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CustomButton from "../../../app/components/CustomButton";
import PaginationItem from "../../../app/components/PaginationItem";

const sortOptions = [
  { value: "PatientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function DiseaseHistories() {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const diseaseHistoryByPatient = useAppSelector(
    diseaseHistorySelectors.selectAll
  );
  const {
    diseaseHistoryByPatientLoaded,
    diseaseHistoryParams,
    metaData,
    status,
  } = useAppSelector((state) => state.diseaseHistory);
  const patient = useAppSelector((state) =>
    patientSelectors.selectById(state, id)
  );

  useEffect(() => {
    if (!patient) {
      dispatch(fetchPatientAsync(id));
    }
    if (!diseaseHistoryByPatientLoaded)
      dispatch(fetchDiseaseHistoriesByPatientAsync(id));
  }, [diseaseHistoryByPatientLoaded, dispatch]);

  if (!patient) {
    return <NotFound />;
  }

  return (
    <Box className="contentPatient">
      <Breadcrumb page="Disease Histories" />
      <Card sx={{ marginBottom: "30px" }}>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" key={patient?.patientName}>
              List of Disease Histories for patient{" "}
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
                  value={diseaseHistoryParams.sort}
                  label="Filter"
                  input={<OutlinedInput label="Filter" />}
                  onChange={(e) =>
                    dispatch(setDiseaseHistoryParams({ sort: e.target.value }))
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
                color="#3396ff"
                hoverColor="#f3f3f3"
                hoverTextColor="#2f7fd4"
              >
                Add Disease History
              </CustomButton>
            </Box>
          </Box>

          <Box sx={{ marginTop: "15px" }}>
            {status === "pendingFetchDiseaseHistoriesByPatient" ? (
              <Typography variant="h6" align="center">
                Loading Disease Histories...
              </Typography>
            ) : diseaseHistoryByPatientLoaded &&
              diseaseHistoryByPatient.length === 0 ? (
              <Typography variant="h6" align="center">
                No Disease Histories Found
              </Typography>
            ) : (
              <DiseaseHistoryList diseaseHistories={diseaseHistoryByPatient} />
            )}
          </Box>

          {diseaseHistoryByPatientLoaded && metaData && (
            <Box sx={{ marginTop: 4 }}>
              <PaginationItem
                metaData={metaData}
                onPageChange={(page: number) =>
                  dispatch(setDiseaseHistoryParams({ pageIndex: page }))
                }
                name="Disease Histories"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
