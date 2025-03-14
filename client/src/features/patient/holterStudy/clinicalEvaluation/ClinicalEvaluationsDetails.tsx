import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, IconButton, CircularProgress } from "@mui/material";
import { ClinicalEvaluation } from "../../../../app/Models/clinicalEvaluation"; // Ensure the import path is correct
import formatDateTime from "../../../../app/components/formatDateTime";
import { timeDisplay } from "../../../../app/components/timeDisplay";
import { MdOutlineDelete } from "react-icons/md";
import { LuPenLine } from "react-icons/lu";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../app/store/configureStore";
import ClinicalEvaluationForm from "./ClinicalEvaluationForm"; // Import the form component for editing
import agent from "../../../../app/api/agent";
import { removeClinicalEvaluation } from "../holterStudySlice"; // Action for removing the clinical evaluation
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface ClinicalEvaluationDetailsProps {
  open: boolean;
  onClose: () => void;
  evaluation: ClinicalEvaluation;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 640,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  border: "none",
};

const ClinicalEvaluationDetails: React.FC<ClinicalEvaluationDetailsProps> = ({
  open,
  onClose,
  evaluation,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const updatedEvaluation = useAppSelector((state) =>
    state.holterStudy.entities[
      evaluation.holterStudyId
    ]?.clinicalEvaluations?.find((e) => e.id === evaluation.id)
  );

  const selectedEvaluation = updatedEvaluation || evaluation;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseFormModal = () => {
    setIsEditing(false);
  };

  function handleDeleteClinicalEvaluation(id: number, holterStudyId: number) {
    agent.ClinicalEvaluation.deleteClinicalEvaluation(id)
      .then(() => {
        dispatch(removeClinicalEvaluation({ holterStudyId, evaluationId: id }));
        onClose();
        handleCloseFormModal();
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  const handleDeleteClick = () => {
    if (selectedEvaluation) {
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
            handleDeleteClinicalEvaluation(
              selectedEvaluation.id,
              selectedEvaluation.holterStudyId
            );
            Swal.fire({
              title: "Deleted!",
              text: "The clinical evaluation has been removed.",
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
    <Box>
      <Modal
        open={open || isEditing}
        onClose={isEditing ? handleCloseFormModal : onClose}
      >
        <Box sx={style}>
          {isEditing ? (
            <ClinicalEvaluationForm
              cancelEdit={handleCloseFormModal}
              evaluation={selectedEvaluation}
              holterStudyId={selectedEvaluation.holterStudyId}
            />
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography id="modal-title" variant="h6" component="h2">
                  Clinical Evaluation
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    aria-label="delete evaluation"
                    onClick={handleDeleteClick}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={20} /> : <MdOutlineDelete />}
                  </IconButton>
                  <IconButton
                    aria-label="update evaluation"
                    onClick={handleEditClick}
                  >
                    <LuPenLine />
                  </IconButton>
                </Box>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {formatDateTime(selectedEvaluation?.evaluationDateTime || "")}{" "}
                {timeDisplay(selectedEvaluation?.evaluationDateTime || "")}
              </Typography>
              <Box>
                <Typography sx={{ mt: 2, fontWeight: "600" }}>
                  Findings
                </Typography>
                <Typography variant="body1">
                  {selectedEvaluation?.findings}
                </Typography>
                <Typography sx={{ mt: 2, fontWeight: "600" }}>
                  Recommendations
                </Typography>
                <Typography variant="body1">
                  {selectedEvaluation?.recommendations}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ClinicalEvaluationDetails;
