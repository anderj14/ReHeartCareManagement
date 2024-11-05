import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import {
  electrocardiogramSelectors,
  fetchElectrocardiogramsByPatientAsync,
  setElectrocardiogramParams,
} from "./electrocardiogramSlice";
import {
  Box,
  Typography,
  FormControl,
  Card,
  CardContent,
  MenuItem,
  Select,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import Breadcrumb from "../../../app/components/Breadcrumb";
import ElectrocardiogramList from "./ElectrocardiogramList";
import { fetchPatientAsync, patientSelectors } from "../patientSlice";
import NotFound from "../../../app/errors/NotFound";
import PaginationItem from "../../../app/components/PaginationItem";
import CustomButton from "../../../app/components/CustomButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const sortOptions = [
  { value: "PatientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function Electrocardiograms() {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const electrocardiogramsByPatient = useAppSelector(
    electrocardiogramSelectors.selectAll
  );
  const {
    electrocardiogramByPatientLoaded,
    electrocardiogramParams,
    metaData,
    status,
  } = useAppSelector((state) => state.electrocardiogram);
  const { status: electrocardiogramStatus } = useAppSelector(
    (status) => status.electrocardiogram
  );
  const patient = useAppSelector((state) =>
    patientSelectors.selectById(state, id)
  );

  useEffect(() => {
    if (!patient) dispatch(fetchPatientAsync(id));
    if (!electrocardiogramByPatientLoaded)
      dispatch(fetchElectrocardiogramsByPatientAsync(id));
  }, [electrocardiogramByPatientLoaded, dispatch, id, patient]);

  if (electrocardiogramStatus.includes("pending")) return <h3>Loading...</h3>;
  if (!electrocardiogramsByPatient) return <NotFound />;

  return (
    <Box className="contentPatient">
      <Breadcrumb page="Electrocardiograms" />
      <Card sx={{ marginBottom: "30px" }}>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" key={patient?.patientName}>
              List of Electrocardiograms for patient{" "}
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
                  value={electrocardiogramParams.sort}
                  label="Filter"
                  input={<OutlinedInput label="Filter" />}
                  onChange={(e) =>
                    dispatch(
                      setElectrocardiogramParams({ sort: e.target.value })
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

              <CustomButton
                width="210px"
                icon={AddCircleOutlineIcon}
                color="#4d7997"
                hoverColor="#f3f3f3"
                hoverTextColor="#3b5c72"
              >
                Add Electrocardiogram
              </CustomButton>
            </Box>
          </Box>

          <Box sx={{ marginTop: "15px" }}>
            {status === "pendingFetchElectrocardiogramsByPatient" ? (
              <Typography variant="h6" align="center">
                Loading Electrocardiograms...
              </Typography>
            ) : electrocardiogramByPatientLoaded &&
              electrocardiogramsByPatient.length === 0 ? (
              <Typography variant="h6" align="center">
                No Electrocardiograms Found
              </Typography>
            ) : (
              <ElectrocardiogramList
                electrocardiograms={electrocardiogramsByPatient}
              />
            )}
          </Box>

          {electrocardiogramByPatientLoaded && metaData && (
            <Box sx={{ marginTop: 4 }}>
              <PaginationItem
                metaData={metaData}
                onPageChange={(page: number) =>
                  dispatch(setElectrocardiogramParams({ pageIndex: page }))
                }
                name="Electrocardiograms"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
