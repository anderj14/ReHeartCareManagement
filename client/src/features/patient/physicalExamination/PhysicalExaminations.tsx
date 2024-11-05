import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { fetchPatientAsync, patientSelectors } from "../patientSlice";
import {
  fetchPhysicalExaminationsByPatientAsync,
  physicalExaminationSelectors,
  setPhysicalExaminationParams,
} from "./physicalExaminationSlice";
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
import Breadcrumb from "../../../app/components/Breadcrumb";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PhysicalExaminationList from "./PhysicalExaminationList";
import NotFound from "../../../app/errors/NotFound";
import Title from "../../../app/components/Title";
import CustomButton from "../../../app/components/CustomButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PaginationItem from "../../../app/components/PaginationItem";

const sortOptions = [
  { value: "PatientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function PhysicalExaminations() {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const physicalExaminationsByPatient = useAppSelector(
    physicalExaminationSelectors.selectAll
  );
  const {
    physicalExaminationByPatientLoaded,
    physicalExaminationParams,
    metaData,
    status,
  } = useAppSelector((state) => state.physicalExamination);
  const patient = useAppSelector((state) =>
    patientSelectors.selectById(state, id)
  );
  const { status: physicalExaminationStatus } = useAppSelector(
    (state) => state.physicalExamination
  );

  useEffect(() => {
    if (!patient) dispatch(fetchPatientAsync(id));
    if (!physicalExaminationByPatientLoaded)
      dispatch(fetchPhysicalExaminationsByPatientAsync(id));
  }, [physicalExaminationByPatientLoaded, dispatch, id, patient]);

  if (physicalExaminationStatus.includes("pending")) return <h3>Loading...</h3>;
  if (!physicalExaminationsByPatient) return <NotFound />;

  return (
    <Box className="contentPatient">
      <Breadcrumb page="Physical Examination" />
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Title
                key={patient?.id}
                title={`Physical examination for patient ${
                  patient?.patientName || "Loading..."
                }`}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box>
                <FormControl
                  sx={{
                    m: 1,
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
                      dispatch(
                        setPhysicalExaminationParams({ sort: e.target.value })
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

              <CustomButton
                width="290px"
                icon={AddCircleOutlineIcon}
                color="#4d7997"
                hoverColor="#f3f3f3"
                hoverTextColor="#3b5c72"
              >
                Add Physical Examination
              </CustomButton>
            </Box>
          </Box>

          <Box sx={{ marginTop: "15px" }}>
            {status === "pendingFetchPhysicalExaminationsByPatient" ? (
              <Typography variant="h6" align="center">
                Loading Physical Examinations...
              </Typography>
            ) : physicalExaminationByPatientLoaded &&
              physicalExaminationsByPatient.length === 0 ? (
              <Typography variant="h6" align="center">
                No Physical Examinations Found
              </Typography>
            ) : (
              <PhysicalExaminationList
                physicalExaminations={physicalExaminationsByPatient}
              />
            )}
          </Box>

          {physicalExaminationByPatientLoaded && metaData && (
            <Box sx={{ marginTop: 4 }}>
              <PaginationItem
                metaData={metaData}
                onPageChange={(page: number) =>
                  dispatch(setPhysicalExaminationParams({ pageIndex: page }))
                }
                name="Physical Examinations"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
