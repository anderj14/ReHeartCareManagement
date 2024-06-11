import { Box } from "@mui/material";

interface StatusIndicatorProps {
    name: string;
    color: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ name, color }) => {
    return (
        <Box className="status-indicator">
            <div className="circle-color" style={{ backgroundColor: color }}></div>
            <p>{name}</p>
        </Box>
    );
};

export default StatusIndicator