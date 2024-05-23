
import { CardiologySurgery } from '../../app/Models/cardiologySurgery'
import { useNavigate } from 'react-router-dom'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { format } from 'date-fns';

interface Props {
    cardiologySurgeries: CardiologySurgery[]
}

export default function CardiologySurgeryList({ cardiologySurgeries }: Props) {
    const history = useNavigate();

    const handleRowClick = (surgeryId: number) => {
        console.log(surgeryId);
        history(`/cardiologysurgeries/${surgeryId}`);
    }

    return (
        <TableContainer component={Paper} className="table">
        <Table aria-label="patient table">
            <TableHead>
                <TableRow className="row">
                    <TableCell sx={{ fontSize: '18px', fontWeight: 400 }}>Patient Name</TableCell>
                    <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Surgery Name</TableCell>
                    <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Date</TableCell>
                    <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Time</TableCell>
                    <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Emergency</TableCell>
                    <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Elective</TableCell>
                    <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Successful</TableCell>
                    <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Duration</TableCell>
                </TableRow>
            </TableHead>
            <TableBody className="body">
                {cardiologySurgeries.map((cardiologySurgery) => (
                    <TableRow key={cardiologySurgery.id} onClick={() => handleRowClick(cardiologySurgery.id)} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">
                            {cardiologySurgery.patient}
                        </TableCell>
                        <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiologySurgery.surgeryName}</TableCell>
                        <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiologySurgery.date ? format(new Date(cardiologySurgery.date), 'dd/MM/yyyy') : ''}</TableCell>
                        <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiologySurgery.time}</TableCell>
                        <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiologySurgery.isEmergency}</TableCell>
                        <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiologySurgery.isElective}</TableCell>
                        <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiologySurgery.isSuccessful}</TableCell>
                        <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiologySurgery.duration} Minutes</TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
    </TableContainer>
    )
}
