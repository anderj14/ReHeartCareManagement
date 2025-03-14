import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import { ArrhythmiaEvent } from "../../../../app/Models/arrhythmiaEvent";
import Subtitle from "../../../../app/components/Subtitle";
import CustomButton from "../../../../app/components/CustomButton";
import { Box, CardContent, Modal, Typography } from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from "@mui/lab";
import ArrhythmiaEventDetails from "./ArrhythmiaEventDetails";
import ArrhythmiaEventForm from "./ArrhythmiaEventForm";

interface HolterStudyByPatient {
  arrhythmiaEvents: ArrhythmiaEvent[];
}

interface ArrhythmiaEventsProps {
  holterStudyByPatient: HolterStudyByPatient;
  holterStudyId?: number;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "4px",
};

const ArrhythmiaEvents: React.FC<ArrhythmiaEventsProps> = ({
  holterStudyByPatient,
  holterStudyId,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<
    ArrhythmiaEvent | undefined
  >(undefined);
  const [openForm, setOpenForm] = useState(false);

  const handleOpenModal = (event: ArrhythmiaEvent) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(undefined);
    setModalOpen(false);
  };

  const toggleFormModal = (newOpen: boolean) => () => {
    setOpenForm(newOpen);
  };

  return (
    <CardContent sx={{ padding: "25px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Subtitle subtitle={"Arrhythmia Events"} />
        <CustomButton
          open={openForm}
          onClick={toggleFormModal(true)}
          icon={LuPlus}
          color="#fff"
          width="100"
          borderColor="transparent"
        >
          Add Arrhythmia Event
        </CustomButton>
      </Box>
      {holterStudyByPatient.arrhythmiaEvents.length > 0 ? (
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {holterStudyByPatient.arrhythmiaEvents.map((a, index) => (
            <TimelineItem
              className="timeline-item"
              key={index}
              sx={{ textAlign: "left", cursor: "pointer" }}
              onClick={() => handleOpenModal(a)}
            >
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {a.type}
                  </Typography>
                  <Typography variant="body2">{a.duration}</Typography>
                  <Typography variant="body2">
                    {a.heartRateDuringEvent} Bpm
                  </Typography>
                  <Typography variant="body2">{a.description}</Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No arrhythmia events available
        </Typography>
      )}
      {modalOpen && selectedEvent && (
        <ArrhythmiaEventDetails
          open={modalOpen}
          onClose={handleCloseModal}
          event={selectedEvent}
        />
      )}
      <Modal
        open={openForm}
        onClose={toggleFormModal(false)}
        aria-labelledby="arrhythmia-event-form"
        aria-describedby="form-to-add-arrhythmia-event"
      >
        <Box sx={modalStyle}>
          <ArrhythmiaEventForm
            cancelEdit={toggleFormModal(false)}
            event={selectedEvent}
            holterStudyId={holterStudyId}
          />
        </Box>
      </Modal>
    </CardContent>
  );
};

export default ArrhythmiaEvents;
