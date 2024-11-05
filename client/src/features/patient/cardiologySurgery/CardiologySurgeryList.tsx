import { useNavigate, useParams } from "react-router-dom";
import { CardiologySurgery } from "../../../app/Models/cardiologySurgery";
import { useAppSelector } from "../../../app/store/configureStore";
import { patientSelectors } from "../patientSlice";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import formatDateTime from "../../../app/components/formatDateTime";
import convertToHoursAndMinutes from "../../../app/components/convertToHoursAndMinutes";

interface Props {
    cardiologySurgeries: CardiologySurgery[];
}

export default function CardiologySurgeryList({ cardiologySurgeries }: Props) {

    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));
    const navigate = useNavigate();

    const handleRowClick = (bloodTestId: string) => {
        navigate(`/cardiologysurgery/patient/${patient?.id}/cardiologysurgeries/${bloodTestId}`);
    };

    return (
        <Box>
            <TableContainer component={Paper} className="table">
                <Table aria-label="cardiology surgery table">
                    <TableHead >
                        <TableRow className="row">
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }}>Date</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Time</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Surgery Name</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Is Emergency</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Is Elective</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Is Minimally Invasive</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Operation Room</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Duration</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="body">
                        {cardiologySurgeries.map((cardiologySurgery) => (
                            <TableRow
                                key={cardiologySurgery.id}
                                onClick={() => handleRowClick(cardiologySurgery.id.toString())}
                                style={{ cursor: 'pointer' }}
                            >
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }}>
                                    {formatDateTime(cardiologySurgery.date)}
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiologySurgery.time}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiologySurgery.surgeryName}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiologySurgery.isEmergency ? 'YES' : 'NO'}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiologySurgery.isElective ? 'YES' : 'NO'}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiologySurgery.isMinimallyInvasive ? 'YES' : 'NO'}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiologySurgery.operationRoom}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{convertToHoursAndMinutes(cardiologySurgery.duration)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer >
        </Box >
    )
}