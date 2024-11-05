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
import { Box, Typography, CardContent, Card, FormControl, InputLabel, Select, OutlinedInput, MenuItem } from "@mui/material";
import Breadcrumb from "../../../app/components/Breadcrumb";
import { useEffect } from "react";
import HolterStudyList from "./HolterStudyList";
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

  useEffect(() => {
    if (!patient) dispatch(fetchPatientAsync(id));
    if (!holterStudyByPatientLoaded)
      dispatch(fetchHolterStudiesByPatientAsync(id));
  }, [holterStudyByPatientLoaded, dispatch, id, patient]);

  if (holterStudyStatus.includes("pending")) return <h3>Loading...</h3>;
  if (!holterStudiesByPatient) return <NotFound />;

//   return (
//     <div className="contentPatient">
//       <Breadcrumb page="Blood Tests" />

//       <Box
//         sx={{
//           marginBottom: "30px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h5" key={patient?.id}>
//           list of holter study for patient {patient?.patientName}
//         </Typography>

//         <div className="addButton">
//           <Button className="button" startIcon={<AddRoundedIcon />}>
//             Add Holter Study
//           </Button>
//         </div>
//       </Box>

//       <HolterStudyList holterStudies={holterStudiesByPatient} />
//     </div>
//   );

  return (
    <Box className="contentPatient">
      <Breadcrumb page="Blood Tests" />
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
                title={`Blood tests for patient ${
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

              <CustomButton
                width="170px"
                icon={AddCircleOutlineIcon}
                color="#4d7997"
                hoverColor="#f3f3f3"
                hoverTextColor="#3b5c72"
              >
                Add Holter Study
              </CustomButton>
            </Box>
          </Box>

          <Box sx={{ marginTop: "15px" }}>
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
            <Box sx={{ marginTop: 4 }}>
              <PaginationItem
                metaData={metaData}
                onPageChange={(page: number) =>
                  dispatch(setHolterStudyParams({ pageIndex: page }))
                }
                name="Blood Tests"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
