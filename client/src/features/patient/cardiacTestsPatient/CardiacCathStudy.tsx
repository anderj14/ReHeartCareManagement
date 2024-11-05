import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import {
  cardiacCathStudySelectors,
  fetchCardiacCathStudiesByPatientAsync,
  setCardiacCathStudyParams,
} from "./cardiacCathStudySlice";
import {
  Box,
  Typography,
  CardContent,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Breadcrumb from "../../../app/components/Breadcrumb";
import { fetchPatientAsync, patientSelectors } from "../patientSlice";
import NotFound from "../../../app/errors/NotFound";
import CustomButton from "../../../app/components/CustomButton";
import Title from "../../../app/components/Title";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardiacCathStudyList from "./CardiacCathStudyList";
import PaginationItem from "../../../app/components/PaginationItem";

const sortOptions = [
  { value: "PatientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function CardiacCathStudy() {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const cardiachCathStudyByPatient = useAppSelector(
    cardiacCathStudySelectors.selectAll
  );
  const {
    cardiacCathStudyByPatientLoaded,
    cardiacCathStudyParams,
    metaData,
    status,
  } = useAppSelector((state) => state.cardiacCathStudy);
  const patient = useAppSelector((state) =>
    patientSelectors.selectById(state, id)
  );
  const { status: cardiacCathStudyStatus } = useAppSelector(
    (status) => status.cardiacCathStudy
  );

  useEffect(() => {
    if (!patient) {
      dispatch(fetchPatientAsync(id));
    }
    if (!cardiacCathStudyByPatientLoaded)
      dispatch(fetchCardiacCathStudiesByPatientAsync(id));
  }, [cardiacCathStudyByPatientLoaded, dispatch, id, patient]);

  if (cardiacCathStudyStatus.includes("pending")) return <h3>Loading...</h3>;
  if (!cardiachCathStudyByPatient) return <NotFound />;

  return (
    <Box className="contentPatient">
      <Breadcrumb page="Cardiac Catheterization Study" />
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
                title={`Cardiac Catheterization studies for patient ${
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
                    value={cardiacCathStudyParams.sort}
                    label="Filter"
                    input={<OutlinedInput label="Filter" />}
                    onChange={(e) =>
                      dispatch(
                        setCardiacCathStudyParams({ sort: e.target.value })
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
                Add Cardiac Catheterization Study
              </CustomButton>
            </Box>
          </Box>

          <Box sx={{ marginTop: "15px" }}>
            {status === "pendingFetchCardiacCathStudiesByPatient" ? (
              <Typography variant="h6" align="center">
                Loading Cardiac Cath Studies...
              </Typography>
            ) : cardiacCathStudyByPatientLoaded &&
              cardiachCathStudyByPatient.length === 0 ? (
              <Typography variant="h6" align="center">
                No Cardiac Cath Studies Found
              </Typography>
            ) : (
              <CardiacCathStudyList
                cardiacCathStudies={cardiachCathStudyByPatient}
              />
            )}
          </Box>

          {cardiacCathStudyByPatientLoaded && metaData && (
            <Box sx={{ marginTop: 4 }}>
              <PaginationItem
                metaData={metaData}
                onPageChange={(page: number) =>
                  dispatch(setCardiacCathStudyParams({ pageIndex: page }))
                }
                name="cardiac Catheterization Studies"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
