import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, IconButton, CircularProgress } from "@mui/material";
import formatDateTime from "../../../../app/components/formatDateTime";
import { timeDisplay } from "../../../../app/components/timeDisplay";
import { MdOutlineDelete } from "react-icons/md";
import { LuPenLine } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../../../../app/store/configureStore";
import agent from "../../../../app/api/agent";
import { removePatientSymptom } from "../holterStudySlice";
import { PatientSymptom } from "../../../../app/Models/patientSymptom";
import PatientSymptomForm from "./PatientSymptomForm";
import Swal from "sweetalert2";

interface PatientSymptomProps {
  open: boolean;
  onClose: () => void;
  symptom: PatientSymptom;
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
  border: 'none'
};

const PatientSymptomDetails: React.FC<PatientSymptomProps> = ({
  open,
  onClose,
  symptom,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  
  const updatedSymptom = useAppSelector(state =>
    state.holterStudy.entities[symptom.holterStudyId]?.patientSymptoms?.find((s) => s.id === symptom.id)
  );

  const selectedSymptom = updatedSymptom || symptom;

  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleCloseFormModal = () => {
    setIsEditing(false);
  };

  function handleDeletePatientSymptom(id: number, holterStudyId: number) {
    setLoading(true);
    agent.PatientSymptom.deletePatientSymptom(id)
      .then(() => {
        dispatch(removePatientSymptom({holterStudyId, symptomId: id}));
        onClose();
        handleCloseFormModal();
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }
  
  const handleDeleteClick = () => {
    if (selectedSymptom) {
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
            popup: "swal-custom-popup"
          }
        }).then((result) => {
          if (result.isConfirmed) {
            handleDeletePatientSymptom(selectedSymptom.id, selectedSymptom.holterStudyId);
            Swal.fire({
              title: "Deleted!",
              text: "The symptom has been removed.",
              icon: "success",
              confirmButtonText: "OK",
              customClass: {
                confirmButton: "swal-ok-button"
              }
            });
          }
        });
      }, 10);
    }
  };
  
  return (
    <Box>
      <Modal open={open || isEditing} onClose={isEditing ? handleCloseFormModal : onClose}>
        <Box sx={style}>
          {isEditing ? (
            <PatientSymptomForm
              cancelEdit={handleCloseFormModal}
              symptom={selectedSymptom}
              holterStudyId={selectedSymptom.holterStudyId}
            />
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography id="modal-title" variant="h6" component="h2">
                  {selectedSymptom?.symptomName}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton aria-label="delete test" onClick={handleDeleteClick} disabled={loading}>
                    {loading ? <CircularProgress size={20} /> : <MdOutlineDelete />}
                  </IconButton>
                  <IconButton aria-label="update test" onClick={handleEditClick}>
                    <LuPenLine />
                  </IconButton>
                </Box>
              </Box>
              <Typography id="modal-description" variant="body2" color="text.secondary">
                {formatDateTime(selectedSymptom?.symptomDateTime || "")} {timeDisplay(selectedSymptom?.symptomDateTime || "")}
              </Typography>
              <Box>
                <Typography sx={{ mt: 2, fontWeight: "600" }}>Description</Typography>
                <Typography variant="body1">{selectedSymptom?.description}</Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PatientSymptomDetails;