import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Breadcrumb from "../../../app/components/Breadcrumb";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import fetchBloodTestByPatientAsync, {
  bloodTestSelectors,
} from "./bloodTestSlice";
import NotFound from "../../../app/errors/NotFound";
import { patientSelectors } from "../patientSlice";
import formatDateTime from "../../../app/components/formatDateTime";

export default function BloodTestDetails() {
  const dispatch = useAppDispatch();
  const { id: patientId, bloodTestId } = useParams<{
    id: string;
    bloodTestId: string;
  }>();
  const patientIdNumber = Number(patientId);
  const bloodTestIdNumber = Number(bloodTestId);

  const { status: bloodTestsByPatientStatus } = useAppSelector(
    (state) => state.bloodTest
  );
  const bloodTestByPatient = useAppSelector((state) =>
    bloodTestIdNumber
      ? bloodTestSelectors.selectById(state, bloodTestIdNumber)
      : undefined
  );
  const patient = useAppSelector((state) =>
    patientSelectors.selectById(state, patientIdNumber)
  );

  useEffect(() => {
    if (patientIdNumber && bloodTestIdNumber && !bloodTestByPatient) {
      dispatch(
        fetchBloodTestByPatientAsync({
          patientId: patientIdNumber,
          bloodTestId: bloodTestIdNumber,
        })
      );
    }
  }, [dispatch, patientIdNumber, bloodTestIdNumber, bloodTestByPatient]);

  if (bloodTestsByPatientStatus.includes("pending")) return <h3>Loading...</h3>;
  if (!bloodTestByPatient) return <NotFound />;

  // Define standard reference ranges and determine the status
  const tests = [
    {
      test: "Hemoglobin",
      result: bloodTestByPatient.hemoglobin,
      reference: "13.5-17.5 g/dL",
      status: "Normal",
    },
    {
      test: "Hematocrit",
      result: bloodTestByPatient.hematocrit,
      reference: "38-50%",
      status: "Normal",
    },
    {
      test: "White Blood Cell",
      result: bloodTestByPatient.whiteBloodCell,
      reference: "4500-11000 /mm³",
      status: "Normal",
    },
    {
      test: "Platelets",
      result: bloodTestByPatient.platelets,
      reference: "150000-450000 /mm³",
      status: "Normal",
    },
    {
      test: "Glucose",
      result: bloodTestByPatient.glucose,
      reference: "70-100 mg/dL",
      status: "Normal",
    },
    {
      test: "Cholesterol HDL",
      result: bloodTestByPatient.cholesterolHDL,
      reference: "> 40 mg/dL",
      status: "Normal",
    },
    {
      test: "Cholesterol LDL",
      result: bloodTestByPatient.cholesterolLDL,
      reference: "< 130 mg/dL",
      status: "Slightly Elevated",
    },
    {
      test: "Triglycerides",
      result: bloodTestByPatient.triglycerides,
      reference: "< 150 mg/dL",
      status: "Elevated",
    },
    {
      test: "Red Blood Cell",
      result: bloodTestByPatient.redBloodCell,
      reference: "4.2-5.9 million cells/mcL",
      status: "Normal",
    },
    {
      test: "Mean Corpuscular Volume",
      result: bloodTestByPatient.meanCorpuscularVolume,
      reference: "80-100 fL",
      status: "Normal",
    },
    {
      test: "Mean Corpuscular Hemoglobin",
      result: bloodTestByPatient.meanCorpuscularHemoglobin,
      reference: "27-33 pg",
      status: "Normal",
    },
    {
      test: "Mean Corpuscular Hemoglobin Concentration",
      result: bloodTestByPatient.meanCorpuscularHemoglobinConcentration,
      reference: "32-36 g/dL",
      status: "Normal",
    },
    {
      test: "Red Cell Distribution Width",
      result: bloodTestByPatient.redCellDistributionWidth,
      reference: "11.5-14.5%",
      status: "Normal",
    },
    {
      test: "Blood Urea Nitrogen",
      result: bloodTestByPatient.bloodUreaNitrogen,
      reference: "7-20 mg/dL",
      status: "Normal",
    },
    {
      test: "Creatinine",
      result: bloodTestByPatient.creatinine,
      reference: "0.6-1.2 mg/dL",
      status: "Normal",
    },
    {
      test: "Sodium",
      result: bloodTestByPatient.sodium,
      reference: "135-145 mEq/L",
      status: "Normal",
    },
    {
      test: "Potassium",
      result: bloodTestByPatient.potassium,
      reference: "3.5-5.0 mEq/L",
      status: "Normal",
    },
    {
      test: "Chloride",
      result: bloodTestByPatient.chloride,
      reference: "98-106 mEq/L",
      status: "Normal",
    },
    {
      test: "Bicarbonate",
      result: bloodTestByPatient.bicarbonate,
      reference: "22-28 mEq/L",
      status: "Normal",
    },
    {
      test: "Calcium",
      result: bloodTestByPatient.calcium,
      reference: "8.5-10.5 mg/dL",
      status: "Normal",
    },
    {
      test: "Magnesium",
      result: bloodTestByPatient.magnesium,
      reference: "1.7-2.2 mg/dL",
      status: "Elevated",
    },
    {
      test: "Neutrophils",
      result: bloodTestByPatient.neutrophils,
      reference: "40-70%",
      status: "Normal",
    },
    {
      test: "Lymphocytes",
      result: bloodTestByPatient.lymphocytes,
      reference: "20-40%",
      status: "Normal",
    },
    {
      test: "Monocytes",
      result: bloodTestByPatient.monocytes,
      reference: "2-8%",
      status: "Normal",
    },
    {
      test: "Eosinophils",
      result: bloodTestByPatient.eosinophils,
      reference: "1-4%",
      status: "Elevated",
    },
    {
      test: "Basophils",
      result: bloodTestByPatient.basophils,
      reference: "< 1%",
      status: "Elevated",
    },
  ];

  return (
    <Box sx={{ margin: "30px 0px 0px 30px" }}>
      <Breadcrumb page="Blood Tests" />
      <Card sx={{ maxWidth: 745, padding: "20px" }}>
        <CardContent>
          <Box>
            <Typography gutterBottom variant="h5" key={patient?.id}>
              {patient?.patientName}
            </Typography>
            <Typography
              sx={{ marginTop: "-10px" }}
              gutterBottom
              variant="body1"
              color="text.secondary"
            >
              Blood Test | {formatDateTime(bloodTestByPatient.date)}
            </Typography>
          </Box>

          <Table sx={{ marginTop: "20px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Test</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Reference Range</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map((test, index) => (
                <TableRow key={index}>
                  <TableCell>{test.test}</TableCell>
                  <TableCell>{test.result}</TableCell>
                  <TableCell>{test.reference}</TableCell>
                  <TableCell>{test.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardActions sx={{ padding: "0px", marginTop: "10px" }}>
          <Button startIcon={<ModeEditIcon />} size="small" color="info">
            Edit
          </Button>
          <Button startIcon={<DeleteIcon />} size="small" color="error">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
