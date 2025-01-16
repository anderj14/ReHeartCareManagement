import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { useEffect, useState } from "react";
import BloodTestList from "./BloodTestList";
import {
  Box,
  Divider,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import {
  bloodTestSelectors,
  fetchBloodTestsByPatientAsync,
  setBloodTestParams,
} from "./bloodTestSlice";
import { fetchPatientAsync, patientSelectors } from "../patientSlice";
import PaginationItem from "../../../app/components/PaginationItem";
import CustomButton from "../../../app/components/CustomButton";
import Title from "../../../app/components/Title";
import NotFound from "../../../app/errors/NotFound";
import { LuPlus } from "react-icons/lu";
import { BloodTest } from "../../../app/Models/bloodTest";
import BloodTestForm from "./BloodTestForm";

const sortOptions = [
  { value: "patientName", label: "Alphabetical" },
  { value: "dateAsc", label: "Date - Asc to Desc" },
  { value: "dateDesc", label: "Date - Desc to Asc" },
];

export default function BloodTests() {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const bloodTestsByPatient = useAppSelector(bloodTestSelectors.selectAll);
  const { bloodTestByPatientLoaded, bloodTestParams, metaData, status } =
    useAppSelector((state) => state.bloodTest);
  const patient = useAppSelector((state) =>
    patientSelectors.selectById(state, id)
  );
  const {status: bloodTestStatus} = useAppSelector(
    (status) => status.bloodTest
  )
  const [openForm, setOpenForm] = useState(false);
  const [selectedBloodTest] = useState<BloodTest | undefined>(undefined);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenForm(newOpen)
  }

  const DrawerList = (
    <Box sx={{width: 600, padding: '20px'}} role="presentation">
      <BloodTestForm
        test={selectedBloodTest}
        cancelEdit={() => setOpenForm(false)}
        title={"Creating new Blood Test"}
        patientId={patient?.id}
      />
    </Box>
  )

  useEffect(() => {
    if (!patient) {
      dispatch(fetchPatientAsync(id));
    }
    if (!bloodTestByPatientLoaded) {
      dispatch(fetchBloodTestsByPatientAsync(id));
    }
  }, [bloodTestByPatientLoaded, dispatch, id, patient]);

  if (bloodTestStatus.includes("pending")) return <h3>Loading...</h3>;
  if (!bloodTestsByPatient) return <NotFound />;

  return (
    <Box className="contentBloodTest">
     <Box sx={{ margin: '40px', display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Title
          key={patient?.id}
          title={`Blood Tests of ${
            patient?.patientName || "Loading..."
          }`}
        />
        <Box>
          <CustomButton
            open={openForm}
            onClick={toggleDrawer(true)}
            icon={LuPlus}
            color="#fff"
            width="100%"
            borderColor="transparent"
          >
            Add Blood Test
          </CustomButton>
          <Drawer open={openForm} onClose={toggleDrawer(false)} anchor="right">
            {DrawerList}
          </Drawer>
        </Box>
      </Box>
      <Box sx={{ margin: "40px" }}>
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
            value={bloodTestParams.sort}
            label="Filter"
            input={<OutlinedInput label="Filter" />}
            onChange={(e) =>
              dispatch(setBloodTestParams({ sort: e.target.value }))
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

      <Divider sx={{ width: "100%" }} />

      <Box sx={{ margin: "40px" }}>
        {status === "pendingFetchBloodTestsByPatient" ? (
          <Typography variant="h6" align="center">
            Loading Blood Tests...
          </Typography>
        ) : bloodTestByPatientLoaded && bloodTestsByPatient.length === 0 ? (
          <Typography variant="h6" align="center">
            No Blood Tests Found
          </Typography>
        ) : (
          <BloodTestList bloodTests={bloodTestsByPatient} />
        )}
      </Box>

      {bloodTestByPatientLoaded && metaData && (
        <Box sx={{ margin: '40px' }}>
          <PaginationItem
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setBloodTestParams({ pageIndex: page }))
            }
            name="bloodtest"
          />
        </Box>
      )}
    </Box>
  );
}
