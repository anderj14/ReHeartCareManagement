import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import {
  fetchCardiologySurgeriesByPatientAsync,
  surgerySelectors,
} from "../../surgery/surgerySlice";
import { fetchPatientAsync, patientSelectors } from "../patientSlice";
import { useEffect } from "react";
import Breadcrumb from "../../../app/components/Breadcrumb";
import { Box, Typography, Button, CardContent, Card } from "@mui/material";
import CardiologySurgeryList from "./CardiologySurgeryList";
import CustomButton from "../../../app/components/CustomButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function CardiologySurgery() {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const cardiologySurgeryByPatient = useAppSelector(surgerySelectors.selectAll);
  const { surgeryByPatientLoaded, status } = useAppSelector(
    (state) => state.cardiologySurgery
  );
  const patient = useAppSelector((state) =>
    patientSelectors.selectById(state, id)
  );

  useEffect(() => {
    if (!patient) dispatch(fetchPatientAsync(id));
    if (!surgeryByPatientLoaded)
      dispatch(fetchCardiologySurgeriesByPatientAsync(id));
  }, [surgeryByPatientLoaded, dispatch, id, patient]);

  return (
    <div>
      <Box className="contentPatient">
        <Breadcrumb page="Cardiology surgery" />
        <Card sx={{ marginBottom: 3 }}>
          <CardContent>
            <Box
              sx={{
                marginBottom: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" key={patient?.id}>
                list of cardiology surgery for patient {patient?.patientName}
              </Typography>
              <div className="addButton">
                <CustomButton
                width="210px"
                  icon={AddCircleOutlineIcon}
                  color="#3396ff"
                  hoverColor="#f3f3f3"
                  hoverTextColor="#2f7fd4"
                >
                  Add Cardiology Surgery
                </CustomButton>
              </div>
            </Box>

            {/* <CardiologySurgeryList
              cardiologySurgeries={cardiologySurgeryByPatient}
            ></CardiologySurgeryList> */}
            <Box sx={{ marginTop: "15px" }}>
              {status === "fetchCardiologySurgeriesByPatient" ? (
                <Typography variant="h6" align="center">
                  Loading Cardiology Surgeries...
                </Typography>
              ) : surgeryByPatientLoaded &&
                cardiologySurgeryByPatient.length === 0 ? (
                <Typography variant="h6" align="center">
                  No Cardiology Surgery Found
                </Typography>
              ) : (
                <CardiologySurgeryList
                  cardiologySurgeries={cardiologySurgeryByPatient}
                />
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
