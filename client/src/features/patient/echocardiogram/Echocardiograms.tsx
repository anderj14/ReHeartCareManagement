import { Box, Typography, Button, Card, CardContent, FormControl, InputLabel, Select, OutlinedInput, MenuItem } from "@mui/material";
import { useEffect } from "react";
import Breadcrumb from "../../../app/components/Breadcrumb";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { fetchPatientAsync, patientSelectors } from "../patientSlice";
import {
  echocardiogramSelectors,
  fetchEchocardiogramsByPatientAsync,
  setEchocardiogramParams,
} from "./echocardiogramSlice";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useParams } from "react-router-dom";
import EchocardiogramList from "./EchocardiogramList";
import NotFound from "../../../app/errors/NotFound";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PaginationItem from "../../../app/components/PaginationItem";
import CustomButton from "../../../app/components/CustomButton";

const sortOptions = [
  { value: "PatientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function Echocardiograms() {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const echocardiogramsByPatient = useAppSelector(
    echocardiogramSelectors.selectAll
  );
  const {
    echocardiogramByPatientLoaded,
    EchocardiogramParams,
    metaData,
    status,
  } = useAppSelector((state) => state.echocardiogram);
  const patient = useAppSelector((state) =>
    patientSelectors.selectById(state, id)
  );
  const { status: echocardiogramStatus } = useAppSelector(
    (status) => status.echocardiogram
  );

  useEffect(() => {
    if (!patient) dispatch(fetchPatientAsync(id));
    if (!echocardiogramByPatientLoaded)
      dispatch(fetchEchocardiogramsByPatientAsync(id));
  }, [echocardiogramByPatientLoaded, dispatch, id, patient]);

  if (echocardiogramStatus.includes("pending")) return <h3>Loading...</h3>;
  if (!echocardiogramsByPatient) return <NotFound />;

  //   return (
  //     <div className="contentPatient">
  //       <Breadcrumb page="Echocardiogram" />

  //       <Box
  //         sx={{
  //           marginBottom: "30px",
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <Typography variant="h5" key={patient?.id}>
  //           list of echocardiograms for patient {patient?.patientName}
  //         </Typography>

  //         <div className="addButton">
  //           <Button className="button" startIcon={<AddRoundedIcon />}>
  //             Add Echocardiogram
  //           </Button>
  //         </div>
  //       </Box>

  //       <EchocardiogramList echocardiograms={echocardiogramsByPatient} />
  //     </div>
  //   );

  return (
    <Box className="contentPatient">
      <Breadcrumb page="Echocardiograms" />
      <Card sx={{ marginBottom: "30px" }}>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" key={patient?.patientName}>
              List of Echocardiograms for patient{" "}
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
                  value={EchocardiogramParams.sort}
                  label="Filter"
                  input={<OutlinedInput label="Filter" />}
                  onChange={(e) =>
                    dispatch(setEchocardiogramParams({ sort: e.target.value }))
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
                 width="200px"
                 icon={AddCircleOutlineIcon}
                 color="#4d7997"
                 hoverColor="#f3f3f3"
                 hoverTextColor="#3b5c72"
              >
                Add Echocardiogram
              </CustomButton>
            </Box>
          </Box>

          <Box sx={{ marginTop: "15px" }}>
            {status === "pendingFetchEchocardiogramsByPatient" ? (
              <Typography variant="h6" align="center">
                Loading Echocardiograms...
              </Typography>
            ) : echocardiogramByPatientLoaded &&
              echocardiogramsByPatient.length === 0 ? (
              <Typography variant="h6" align="center">
                No Echocardiograms Found
              </Typography>
            ) : (
              <EchocardiogramList echocardiograms={echocardiogramsByPatient} />
            )}
          </Box>

          {echocardiogramByPatientLoaded && metaData && (
            <Box sx={{ marginTop: 4 }}>
              <PaginationItem
                metaData={metaData}
                onPageChange={(page: number) =>
                  dispatch(setEchocardiogramParams({ pageIndex: page }))
                }
                name="Echocardiograms"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
