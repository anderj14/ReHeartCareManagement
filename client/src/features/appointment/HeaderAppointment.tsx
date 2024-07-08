import { Box } from "@mui/material";
import StatusIndicator from "./StatusIndicator";

const HeaderAppointment: React.FC = () => {
    return (
        <Box className="identify" sx={{ display: 'flex' }}>
            <StatusIndicator name="Schedule" color="#4d7997" />
            <StatusIndicator name="Complete" color="#a7d7c5" />
            <StatusIndicator name="Pending" color="#f2f2f2" />
            <StatusIndicator name="Cancelled" color="#828282" />
            <StatusIndicator name="Rescheduled" color="#90CAF9" />
            <StatusIndicator name="Not Show" color="#f48fb1" />
        </Box>
    );
};

export default HeaderAppointment