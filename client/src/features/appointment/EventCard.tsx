import { Box } from "@mui/material";
import { Appointment } from "../../app/Models/appointment";
import borderColor from "./getBorderColor";

interface Props {
    data: Appointment
}

const EventCard: React.FC<Props> = ({ data }) => {
    return (
        <Box className="rbc-event-content" style={{ borderTopColor: borderColor(data.appointmentStatus), height: '100%' }}>
            <p style={{ fontWeight: '500', fontSize: '15px' }}>{data.patient}</p>
            <p style={{ fontWeight: '300' }}>{data.description}</p>
            <p style={{ fontWeight: '300' }}>{data.location}</p>
            <p style={{ fontWeight: '300' }}>{data.appointmentType}</p>
            <p style={{ fontWeight: '400' }}>{data.appointmentStatus}</p>
        </Box>
    );
};

export default EventCard;
