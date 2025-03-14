import {
  Box,
  CardContent,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PatientSymptom } from "../../../../app/Models/patientSymptom";
import { useState } from "react";
import Subtitle from "../../../../app/components/Subtitle";
import formatDateTime from "../../../../app/components/formatDateTime";
import PatientSymptomDetails from "./PatientSymptomDetails";
import CustomButton from "../../../../app/components/CustomButton";
import { LuPlus } from "react-icons/lu";
import PatientSymptomForm from "./PatientSymptomForm";

interface HolterStudyByPatient {
  patientSymptoms: PatientSymptom[];
}

interface PatientSymptomProps {
  holterStudyByPatient: HolterStudyByPatient;
  holterStudyId?: number;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '4px'
};

const PatientSymptoms: React.FC<PatientSymptomProps> = ({
  holterStudyByPatient,
  holterStudyId,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState<
    PatientSymptom | undefined
  >(undefined);
  const [openForm, setOpenForm] = useState(false);

  const handleOpenModal = (symptom: PatientSymptom) => {
    setSelectedSymptom(symptom);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedSymptom(undefined);
    setModalOpen(false);
  };

  const toggleFormModal = (newOpen: boolean) => () => {
    setOpenForm(newOpen);
  };

  return (
    <CardContent sx={{ padding: "25px" }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Subtitle subtitle={"Patient Symptoms"} />
          <CustomButton
              open={openForm}
              onClick={toggleFormModal(true)}
              icon={LuPlus}
              color="#fff"
              width="100"
              borderColor="transparent"
          >
              Add Patient Symptom
          </CustomButton>
        </Box>
      {holterStudyByPatient.patientSymptoms.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "600" }}>No.</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Symptom Name</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Symptom Date</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holterStudyByPatient.patientSymptoms.map((a, index) => (
              <TableRow
                key={index}
                onClick={() => handleOpenModal(a)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{a.symptomName}</TableCell>
                <TableCell>{formatDateTime(a.symptomDateTime)}</TableCell>
                <TableCell>{a.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No Patient Symptoms available
        </Typography>
      )}
      {modalOpen && selectedSymptom && (
        <PatientSymptomDetails
          open={modalOpen}
          onClose={handleCloseModal}
          symptom={selectedSymptom}
        />
      )}
      <Modal
        open={openForm}
        onClose={toggleFormModal(false)}
      >
        <Box sx={modalStyle}>
          <PatientSymptomForm
            cancelEdit={toggleFormModal(false)}
            symptom={selectedSymptom}
            holterStudyId={holterStudyId}
          />
        </Box>

      </Modal>
    </CardContent>
  );
};

export default PatientSymptoms;
