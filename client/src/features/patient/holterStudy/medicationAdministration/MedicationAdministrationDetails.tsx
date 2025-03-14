import { useState } from "react";
import { MedicationAdministration } from "../../../../app/Models/medicationAdministration";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../app/store/configureStore";
import { removeMedicationAdministration } from "../holterStudySlice";
import agent from "../../../../app/api/agent";
import Swal from "sweetalert2";
import { Box, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";
import { LuPenLine } from "react-icons/lu";
import { timeDisplay } from "../../../../app/components/timeDisplay";
import formatDateTime from "../../../../app/components/formatDateTime";
import MedicationAdministrationForm from "./MedicationAdministrationForm";

interface MedicationAdministrationProps {
  open: boolean;
  onClose: () => void;
  medicationAdministration: MedicationAdministration;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  border: "none",
};

const MedicationAdministrationDetails: React.FC<
  MedicationAdministrationProps
> = ({ open, onClose, medicationAdministration }) => {
  const [isEditing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const updateMedicationAdministration = useAppSelector((state) =>
    state.holterStudy.entities[medicationAdministration.holterStudyId]
    ?.medicationAdministrations
    ?.find((m) => m.id === medicationAdministration.id)
  );

  const selectedMedicationAdministration =
    updateMedicationAdministration || medicationAdministration;

    console.log(selectedMedicationAdministration.holterStudyId);
    

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCloseFormModal = () => {
    setEditing(false);
  };

  function handleDeleteMedicationAdministration(
    id: number,
    holterStudyId: number
  ) {
    setLoading(true);
    agent.MedicationAdministration.deleteMedicationAdministration(id)
      .then(() => {
        dispatch(
          removeMedicationAdministration({ holterStudyId, medicationId: id })
        );
        onClose();
        handleCloseFormModal();
      })
      .catch((error: any) => console.log(error))
      .finally(() => setLoading(false));
  }

  const handleDeleteClick = () => {
    if (selectedMedicationAdministration) {
      onClose();
      setTimeout(() => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes, delete it!",
          customClass: {
            confirmButton: "swal-confirm-button",
            cancelButton: "swal-cancel-button",
            popup: "swal-custom-popup",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            handleDeleteMedicationAdministration(
              selectedMedicationAdministration.id,
              selectedMedicationAdministration.holterStudyId
            );
            Swal.fire({
              title: "Deleted!",
              text: "The symptom has been removed.",
              icon: "success",
              confirmButtonText: "OK",
              customClass: {
                confirmButton: "swal-ok-button",
              },
            });
          }
        });
      }, 10);
    }
  };
  return (
    <>
      <Modal
        open={open || isEditing}
        onClose={isEditing ? handleCloseFormModal : onClose}
      >
        <Box sx={style}>
          {isEditing ? (
            <MedicationAdministrationForm
              cancelEdit={handleCloseFormModal}
              medicationAdministration={selectedMedicationAdministration}
              holterStudyId={selectedMedicationAdministration.holterStudyId}
            />
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography id="modal-title" variant="h6" component="h2">
                  {selectedMedicationAdministration?.medicationName}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    aria-label="delete test"
                    onClick={handleDeleteClick}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <MdOutlineDelete />
                    )}
                  </IconButton>
                  <IconButton
                    aria-label="update test"
                    onClick={handleEditClick}
                  >
                    <LuPenLine />
                  </IconButton>
                </Box>
              </Box>
              <Typography
                id="modal-description"
                variant="body2"
                color="text.secondary"
              >
                {formatDateTime(selectedMedicationAdministration?.administrationDateTime || "")}{" "}
                {timeDisplay(selectedMedicationAdministration?.administrationDateTime || "")}
              </Typography>
              <Box>
                <Typography sx={{ mt: 2, fontWeight: "600" }}>
                    Dosage
                </Typography>
                <Typography variant="body1">
                  {selectedMedicationAdministration?.dosage}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default MedicationAdministrationDetails;
