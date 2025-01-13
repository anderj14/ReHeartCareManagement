import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, Box, Typography, Drawer, CardActions } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import {
  fetchCardiologySurgeryAsync,
  removeSurgery,
  surgerySelectors,
} from "../../surgery/surgerySlice";
import NotFound from "../../../app/errors/NotFound";
import formatDateTime from "../../../app/components/formatDateTime";
import convertToHoursAndMinutes from "../../../app/components/convertToHoursAndMinutes";
import Title from "../../../app/components/Title";
import Subtitle from "../../../app/components/Subtitle";
import { timeDisplay } from "../../../app/components/timeDisplay";
import { FaRegCircleCheck } from "react-icons/fa6";
import { LuActivity, LuPenLine } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { LuStethoscope } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { LuFileText } from "react-icons/lu";
import { LuClipboard } from "react-icons/lu";
import { LuHeartPulse } from "react-icons/lu";
import {
  fetchSugeryFollowUpsBySurgeryAsync,
  surgeryFollowUpSelector,
} from "../../surgery/surgeryfollowups/sugeryFollowUpsSlice";
import SurgeryFollowUps from "../../surgery/surgeryfollowups/SurgeryFollowUps";
import { CardiologySurgery } from "../../../app/Models/cardiologySurgery";
import CardiologySurgeryForm from "./admin-surgery/CardiologySurgeryForm";
import CustomButton from "../../../app/components/CustomButton";
import { MdOutlineDelete } from "react-icons/md";
import agent from "../../../app/api/agent";

export default function CardiologySurgeryDetails() {
  const [editMode, setEditMode] = useState(false);
  const [selectedSurgery, setSelectedSurgery] = useState<CardiologySurgery | undefined>(undefined);
  const { id } = useParams<{ id: any }>();
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState(0);
  const navigate = useNavigate();

  

  const cardiologySurgery = useAppSelector((state) =>
    surgerySelectors.selectById(state, id)
  );
  const { status: cardiologySurgeryStatus } = useAppSelector(
    (state) => state.cardiologySurgery
  );

  const { surgeryFollowUpByCardiologySurgeryLodaded } = useAppSelector(
    (state) => state.surgeryFollowUp
  );
  const surgeryFollowUpBySurgery = useAppSelector(
    surgeryFollowUpSelector.selectAll
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!cardiologySurgery) {
      dispatch(fetchCardiologySurgeryAsync(id));
    }

    const fetchFollowUp = async () => {
      if (!surgeryFollowUpByCardiologySurgeryLodaded && cardiologySurgery) {
        dispatch(fetchSugeryFollowUpsBySurgeryAsync(id));
      }
    };

    fetchFollowUp();
  }, [
    dispatch,
    id,
    cardiologySurgery,
    surgeryFollowUpByCardiologySurgeryLodaded,
  ]);

  const handleEditClick = () => {
    if (cardiologySurgery) {
      setSelectedSurgery(cardiologySurgery);
      setEditMode(true);
    }
  };

  function handleDeleteSurgery(id: number) {
    setLoading(true);
    setTarget(id);
    agent.CardiologySurgery.deleteCardiologySurgery(id)
      .then(() => {
        dispatch(removeSurgery(id));
        navigate("/cardiologysurgeries");
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  const toggleDrawer = () => {
    setEditMode(false);
  };
  console.log(selectedSurgery);

  if (cardiologySurgeryStatus.includes("pending")) return <h3>Loading...</h3>;

  if (!cardiologySurgery) return <NotFound />;

  return (
    <Box className="section-surgery">
      <Title title="Cardiology Surgery Details" weight="800" />
      <Box className="surgery-details" sx={{ marginTop: "30px" }}>
        <Box className="info" sx={{ width: "100%" }}>
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Subtitle
                  subtitle={cardiologySurgery.surgeryName}
                  weight="600"
                />

                <Typography variant="h6" color="text.info">
                  {cardiologySurgery.patient}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  marginTop: "-10px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <CiCalendar style={{ fontSize: "18px", strokeWidth: "1" }} />
                  {formatDateTime(cardiologySurgery.date)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {timeDisplay(cardiologySurgery.date)}
                </Typography>
                {cardiologySurgery.isElective ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      backgroundColor: "#eee",
                      padding: "3px 15px",
                      borderRadius: "15px",
                    }}
                  >
                    <FaRegCircleCheck />
                    <Typography variant="body2">Elective</Typography>
                  </Box>
                ) : null}
                {cardiologySurgery.isEmergency ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      backgroundColor: "#eee",
                      padding: "3px 15px",
                      borderRadius: "15px",
                    }}
                  >
                    <FaRegCircleCheck />
                    <Typography variant="body2">Emergency</Typography>
                  </Box>
                ) : null}
              </Box>
            </CardContent>
            <CardContent sx={{ marginTop: "-10px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <LuActivity style={{ fontSize: "25px" }} />
                <Subtitle
                  subtitle="Procedure Details"
                  weight="600"
                  size="18px"
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  <strong>Description</strong>{" "}
                  {cardiologySurgery.procedureDescription}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  <strong>Duration</strong>{" "}
                  {convertToHoursAndMinutes(cardiologySurgery.duration)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  <strong>Operation Room</strong>{" "}
                  {cardiologySurgery.operationRoom}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  <strong>Minimally Invasive</strong>{" "}
                  {cardiologySurgery.isMinimallyInvasive ? "Si" : "No"}
                </Typography>
              </Box>
            </CardContent>
            <CardContent sx={{ marginTop: "-10px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <LuStethoscope style={{ fontSize: "25px" }} />
                <Subtitle subtitle="Diagnostic" weight="600" size="18px" />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  <strong>Pre-Op Diagnosis</strong>{" "}
                  {cardiologySurgery.preOpDiagnosis}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  <strong>Post-Op Diagnosis</strong>{" "}
                  {cardiologySurgery.postOpDiagnosis}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  <strong>Heart Condition</strong>{" "}
                  {cardiologySurgery.cardiacCondition}
                </Typography>
              </Box>
            </CardContent>
            <CardContent sx={{ marginTop: "-10px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <LuUser style={{ fontSize: "25px" }} />
                <Subtitle
                  subtitle="Equipment and Anesthesia"
                  weight="600"
                  size="18px"
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  <strong>Surgical Equipment</strong>{" "}
                  {cardiologySurgery.surgicalTeam}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  <strong>Anesthesia Type</strong>{" "}
                  {cardiologySurgery.anesthesiaType}
                </Typography>
              </Box>
            </CardContent>
            <CardContent sx={{ marginTop: "-10px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <LuFileText style={{ fontSize: "25px" }} />
                <Subtitle
                  subtitle="Findings and Instructions"
                  weight="600"
                  size="18px"
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  <strong>Intraoperative Findings</strong>{" "}
                  {cardiologySurgery.intraoperativeFindings}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  <strong>Post-Operative Instructions</strong>{" "}
                  {cardiologySurgery.postOperativeInstructions}
                </Typography>
              </Box>
            </CardContent>
            <CardContent sx={{ marginTop: "-10px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <LuClipboard style={{ fontSize: "25px" }} />
                <Subtitle subtitle="Result" weight="600" size="18px" />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  <strong>Successfull</strong>{" "}
                  {cardiologySurgery.isSuccessful ? "Si" : "No"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  <strong>Complications</strong>{" "}
                  {cardiologySurgery.complications}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  <strong>Post-Operative Status</strong>{" "}
                  {cardiologySurgery.postOperativeStatus}
                </Typography>
              </Box>
            </CardContent>
            <CardContent sx={{ marginTop: "-10px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <LuHeartPulse style={{ fontSize: "25px" }} />
                <Subtitle
                  subtitle="Additional Notes"
                  weight="600"
                  size="18px"
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  color="text.secondary"
                >
                  {cardiologySurgery.notes}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{display: 'flex', gap: '10px'}}>
              <CustomButton
                icon={LuPenLine}
                color="#fff"
                width="130px"
                bg="#2377cb"
                borderColor="transparent"
                hoverColor="#1261a2"
                onClick={handleEditClick}
              >
                Update
              </CustomButton>
              <CustomButton
                icon={MdOutlineDelete}
                color="#dc3737"
                width="130px"
                bg="transparent"
                borderColor="#dc3737"
                hoverColor="transparent"
                onClick={() => handleDeleteSurgery(cardiologySurgery.id)}
                disabled={loading && target === cardiologySurgery.id}
              >
                {loading && target === cardiologySurgery.id ? "Deleting..." : "Delete"}
              </CustomButton>
            </CardActions>

            
          </Card>
          <Drawer anchor="right" open={editMode} onClose={toggleDrawer}>
            <Box sx={{ width: 600, p: 2 }}>
              <CardiologySurgeryForm
                surgery={selectedSurgery}
                cancelEdit={toggleDrawer}
                title={`Editing ${selectedSurgery?.surgeryName}`}
              />
            </Box>
          </Drawer>
        </Box>
        <Box sx={{ width: "70%" }}>
          <SurgeryFollowUps surgeryFollowUp={surgeryFollowUpBySurgery} />
        </Box>
      </Box>
    </Box>
  );
}
