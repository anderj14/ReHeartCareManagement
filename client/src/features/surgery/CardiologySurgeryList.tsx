
import { CardiologySurgery } from '../../app/Models/cardiologySurgery'
import { Link, useNavigate } from 'react-router-dom'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import convertToHoursAndMinutes from '../../app/components/convertToHoursAndMinutes';
import formatDateTime from '../../app/components/formatDateTime';

interface Props {
    cardiologySurgeries: CardiologySurgery[]
}

export default function CardiologySurgeryList({ cardiologySurgeries }: Props) {

    const navigate = useNavigate();
    const handleRowClick = (cardiologySurgeryId: number) => {
        navigate(`/cardiologysurgeries/${cardiologySurgeryId}`);
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
                                onClick={() => handleRowClick(cardiologySurgery.id)}
                                style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
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
