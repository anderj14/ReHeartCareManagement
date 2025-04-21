import { Card, CardContent, Typography, Box } from "@mui/material";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { RiSpeedUpLine } from "react-icons/ri";

const getPressureStatus = (systolic:number, diastolic:number) => {
    if (systolic <= 0 || diastolic <= 0) return { text: "Invalid", color: "#6b7280" };
    if (systolic < 90 || diastolic < 60) return { text: "Hypotension (Low Pressure)", color: "#f87171" };
    if (systolic >= 90 && systolic < 120 && diastolic >= 60 && diastolic < 80) return { text: "Normal", color: "#22c55e" };
    if (systolic >= 120 && systolic < 130 && diastolic < 80) return { text: "Elevated", color: "#facc15" };
    if (systolic >= 130 && systolic < 140 || diastolic >= 80 && diastolic < 90) return { text: "Hypertension Stage 1", color: "#fb923c" };
    if (systolic >= 140 || diastolic >= 90) return { text: "Hypertension Stage 2", color: "#ef4444" };
    return { text: "Outliers. Review measurement.", color: "#a78bfa" };
};

const BloodPressureCard = ({ systolic, diastolic }: any) => {
    const { text, color } = getPressureStatus(systolic, diastolic);

    return (
        <Card>
            <CardContent sx={{ padding: "20px" }}>
                <Typography variant="body1" color="text.secondary" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    Presión Arterial Máxima
                    <RiSpeedUpLine style={{ fontSize: "25px", color: '#6366F1' }}/>
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                        <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                            {systolic}/{diastolic} mmHg
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold", color }}>
                            {text}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center', flexDirection: 'column' }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <FaArrowUp style={{ color: "red" }} />
                            <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>{systolic}</Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <FaArrowDown style={{ color: "blue" }} />
                            <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>{diastolic}</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BloodPressureCard;