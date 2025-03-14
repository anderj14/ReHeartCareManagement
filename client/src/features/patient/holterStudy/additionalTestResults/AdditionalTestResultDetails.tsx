import React, { useState } from "react";
import { Modal, Box, Typography, IconButton, CircularProgress } from "@mui/material";
import { AdditionalTestResult } from "../../../../app/Models/additionalTestResult";
import formatDateTime from "../../../../app/components/formatDateTime";
import { timeDisplay } from "../../../../app/components/timeDisplay";
import { MdOutlineDelete } from "react-icons/md";
import { LuPenLine } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../../../../app/store/configureStore";
import AdditionalTestResultDetailsForm from "./AdditionalTestResultDetailsForm";
import agent from "../../../../app/api/agent";
import { removeAdditionalTestResult } from "../holterStudySlice";
import Swal from "sweetalert2";

interface AdditionalTestResultDetailsProps {
  open: boolean;
  onClose: () => void;
  test: AdditionalTestResult;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  border: 'none'
};

const   AdditionalTestResultDetails: React.FC<AdditionalTestResultDetailsProps> = ({
  open,
  onClose,
  test,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  
  const updatedTest = useAppSelector(state =>
    state.holterStudy.entities[test.holterStudyId]?.additionalTestResults?.find((t) => t.id === test.id)
  );

  const selectedTest = updatedTest || test;

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleCloseFormModal = () => {
    setIsEditing(false);
  };

  function handleDeleteAdditionalTestResult(id: number, holterStudyId: number)
  {
    agent.AdditionalTestResult.deleteAdditionalTestResult(id).then(() => {
      dispatch(removeAdditionalTestResult({holterStudyId, testId: id}));
      onClose();
      handleCloseFormModal();
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }

  const handleDeleteClick = () => {
    if (selectedTest) {
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
            handleDeleteAdditionalTestResult(selectedTest.id, selectedTest.holterStudyId);
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
      <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={style}>
        {isEditing ? (
          <AdditionalTestResultDetailsForm
            cancelEdit={handleCloseFormModal}
            test={selectedTest}
            holterStudyId={selectedTest.holterStudyId}
          />
        ) : (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography id="modal-title" variant="h6" component="h2">
                {selectedTest?.testName}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton 
                  aria-label="delete test"
                  onClick={handleDeleteClick}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} /> : <MdOutlineDelete />}
                </IconButton>
                <IconButton
                  aria-label="update test"
                  onClick={handleEditClick}
                >
                  <LuPenLine />
                </IconButton>
              </Box>
            </Box>
            <Typography id="modal-description" variant="body2" color="text.secondary">
              {formatDateTime(selectedTest?.testDateTime || "")} {timeDisplay(selectedTest?.testDateTime || "")}
            </Typography>
            <Box>
              <Typography sx={{ mt: 2, fontWeight: "600" }}>Results</Typography>
              <Typography variant="body1">{selectedTest?.results}</Typography>
            </Box>
          </>
        )}
      </Box>
    </Modal>
    </Box>
  );
};

export default AdditionalTestResultDetails;
