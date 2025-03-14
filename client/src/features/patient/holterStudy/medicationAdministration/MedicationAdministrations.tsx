import { Box, CardContent, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { MedicationAdministration } from "../../../../app/Models/medicationAdministration";
import Subtitle from "../../../../app/components/Subtitle";
import formatDateTime from "../../../../app/components/formatDateTime";
import CustomButton from "../../../../app/components/CustomButton";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import MedicationAdministrationDetails from "./MedicationAdministrationDetails";
import { timeDisplay } from "../../../../app/components/timeDisplay";
import MedicationAdministrationForm from "./MedicationAdministrationForm";

interface HolterStudyByPatient {
  medicationAdministrations: MedicationAdministration[];
}

interface MedicationAdministrationProps {
  holterStudyByPatient: HolterStudyByPatient;
  holterStudyId?: number;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "4px",
};

const MedicationAdministrations: React.FC<MedicationAdministrationProps> = ({
  holterStudyByPatient,
  holterStudyId,
}) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedicationAdministration, setMedicationAdministration] = useState<MedicationAdministration | undefined>(undefined);
  const [openForm, setOpenForm] = useState(false);

  const handleOpenModal = (medicationAdministration: MedicationAdministration) => {
    setMedicationAdministration(medicationAdministration);
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setMedicationAdministration(undefined);
    setModalOpen(false);
  }

  const toggleFormModal = (open: boolean) => () => {
    setOpenForm(open);
  };

  return (
    <CardContent sx={{ padding: "25px" }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Subtitle subtitle={"Medication"} />
            <CustomButton
              open={openForm}
              onClick={toggleFormModal(true)}
              icon={LuPlus}
              color="#fff"
              width="100"
              borderColor="transparent"
          >
              Add Medication
          </CustomButton>
        </Box>
      {holterStudyByPatient.medicationAdministrations.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "600" }}>No.</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Medication Name</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>
                Administration Date
              </TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Dosage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holterStudyByPatient.medicationAdministrations.map((a, index) => (
              <TableRow 
                key={index} 
                onClick={() => handleOpenModal(a)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{a.medicationName}</TableCell>
                <TableCell>
                  {formatDateTime(a.administrationDateTime)}, {timeDisplay(a.administrationDateTime)}
                </TableCell>
                <TableCell>{a.dosage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No Medication available
        </Typography>
      )}
      {modalOpen && selectedMedicationAdministration && (
        <MedicationAdministrationDetails
          open={modalOpen}
          onClose={handleCloseModal}
          medicationAdministration={selectedMedicationAdministration}
        />
      )}
      <Modal
        open={openForm}
        onClose={toggleFormModal(false)}
        aria-labelledby="patient-symptom-form"
        aria-describedby="form-to-add-patient-symptom"
      >
        <Box sx={modalStyle}>
          <MedicationAdministrationForm
            cancelEdit={toggleFormModal(false)}
            medicationAdministration={selectedMedicationAdministration}
            holterStudyId={holterStudyId}
          />
        </Box>

      </Modal>
    </CardContent>
  );
};

export default MedicationAdministrations;
