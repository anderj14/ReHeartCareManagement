import { useEffect, useState } from "react";
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
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Divider,
  Drawer,
} from "@mui/material";
import { fetchPatientAsync, patientSelectors } from "../patientSlice";
import NotFound from "../../../app/errors/NotFound";
import CustomButton from "../../../app/components/CustomButton";
import Title from "../../../app/components/Title";
import CardiacCathStudyList from "./CardiacCathStudyList";
import PaginationItem from "../../../app/components/PaginationItem";
import { LuPlus } from "react-icons/lu";
import { CardiacCathStudy } from "../../../app/Models/cardiacCathStudy";
import CardiacCathStudyForm from "./CardiacCathStudyForm";

const sortOptions = [
  { value: "PatientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function CardiacCathStudies() {
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
  const [openForm, setOpenForm] = useState(false);
  const [selectedCardiacCathStudy] = useState<CardiacCathStudy | undefined>(undefined);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenForm(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 650, padding: "20px" }} role="presentation">
      <CardiacCathStudyForm
        study={selectedCardiacCathStudy}
        cancelEdit={() => setOpenForm(false)}
        title={"Creating New Cardiac Cath Study"}
        patientId={patient?.id}
      />
    </Box>
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
    <Box className="contentCardiacCathStudy">
      <Box sx={{ margin: '40px', display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Title
          key={patient?.id}
          title={`Cardiac Catheterization studies of ${
            patient?.patientName || "Loading..."
          }`}
        />
        <Box>
          <CustomButton
            open={openForm}
            onClick={toggleDrawer(true)}
            icon={LuPlus}
            color="#fff"
            width="290px"
            borderColor="transparent"
          >
            Add Cardiac Catheterization Study
          </CustomButton>
          <Drawer open={openForm} onClose={toggleDrawer(false)} anchor="right">
            {DrawerList}
          </Drawer>
        </Box>
      </Box>
      <Box sx={{ margin: "40px" }}>
        <Box>
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
      </Box>

      <Divider sx={{ width: "100%" }} />

      <Box sx={{ margin: "40px" }}>
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
        <Box sx={{ margin: '40px' }}>
          <PaginationItem
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setCardiacCathStudyParams({ pageIndex: page }))
            }
            name="cardiac Catheterization Studies"
          />
        </Box>
      )}
    </Box>
  );
}
