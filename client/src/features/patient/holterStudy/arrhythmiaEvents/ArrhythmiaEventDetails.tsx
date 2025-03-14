import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { LuPenLine } from "react-icons/lu";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../app/store/configureStore";
import agent from "../../../../app/api/agent";
import { ArrhythmiaEvent } from "../../../../app/Models/arrhythmiaEvent";
import Swal from "sweetalert2";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { removeArrhythmiaEvent } from "../holterStudySlice";
import ArrhythmiaEventForm from "./ArrhythmiaEventForm";

interface ArrhythmiaEventProps {
  open: boolean;
  onClose: () => void;
  event: ArrhythmiaEvent;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  border: "none",
};

const ArrhythmiaEventDetails: React.FC<ArrhythmiaEventProps> = ({
  open,
  onClose,
  event,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const updatedEvent = useAppSelector((state) =>
    state.holterStudy.entities[event.holterStudyId]?.arrhythmiaEvents?.find(
      (e) => e.id === event.id
    )
  );

  const selectedEvent = updatedEvent || event;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseFormModal = () => {
    setIsEditing(false);
  };

  function handleDeleteArrhythmiaEvent(id: number, holterStudyId: number) {
    setLoading(true);
    agent.ArrhythmiaEvent.deleteArrhythmiaEvent(id)
      .then(() => {
        dispatch(removeArrhythmiaEvent({ holterStudyId, eventId: id }));
        onClose();
        handleCloseFormModal();
      })
      .catch((error: any) => console.log(error))
      .finally(() => setLoading(false));
  }

  const handleDeleteClick = () => {
    if (selectedEvent) {
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
            handleDeleteArrhythmiaEvent(
              selectedEvent.id,
              selectedEvent.holterStudyId
            );
            Swal.fire({
              title: "Deleted!",
              text: "The event has been removed.",
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
            <ArrhythmiaEventForm
                cancelEdit={handleCloseFormModal}
                event={selectedEvent}
                holterStudyId={selectedEvent.holterStudyId}
            />
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography id="modal-title" variant="h6" component="h2">
                  {selectedEvent?.type}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    aria-label="delete event"
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
                    aria-label="update event"
                    onClick={handleEditClick}
                  >
                    <LuPenLine />
                  </IconButton>
                </Box>
              </Box>
              <Box>
                <Typography sx={{ mt: 2, fontWeight: "600" }}>
                  Duration
                </Typography>
                <Typography variant="body1">
                  {selectedEvent?.duration}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ mt: 2, fontWeight: "600" }}>
                  Heart Rate During Event
                </Typography>
                <Typography variant="body1">
                  {selectedEvent?.heartRateDuringEvent} bpm
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ mt: 2, fontWeight: "600" }}>
                  Description
                </Typography>
                <Typography variant="body1">
                  {selectedEvent?.description}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ArrhythmiaEventDetails;
