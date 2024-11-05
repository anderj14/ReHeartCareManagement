import { Echocardiogram } from '../../../app/Models/echocardiogram';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/configureStore';
import { patientSelectors } from '../patientSlice';
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import formatDateTime from '../../../app/components/formatDateTime';

interface Props {
    echocardiograms: Echocardiogram[];
}

export default function EchocardiogramList({ echocardiograms }: Props) {

    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));
    const navigate = useNavigate();

    const handleRowClick = (echocardiogramId: string) => {
        navigate(`/echocardiogram/patient/${patient?.id}/echocardiograms/${echocardiogramId}`);
    };
    return (
        <div>
            <Box>
                <TableContainer component={Paper} className="table">
                    <Table aria-label="echocardiogram table">
                        <TableHead>
                            <TableRow className="row">
                                <TableCell sx={{ fontSize: '18px', fontWeight: 400 }}>Date</TableCell>
                                <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Cardiac Dimensions</TableCell>
                                <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Ejection Fraction</TableCell>
                                <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Valve Function</TableCell>
                                <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Movement Cardiac Walls</TableCell>
                                <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Pulmonary Arterial Pressure</TableCell>
                                <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Blood Flow</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="body">
                            {echocardiograms.map((echocardiogram) => (
                                <TableRow 
                                key={echocardiogram.id} 
                                onClick={() => handleRowClick(echocardiogram.id.toString())}
                                style={{ cursor: 'pointer' }}>
                                    <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">{formatDateTime(echocardiogram.date)}</TableCell>
                                    <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{echocardiogram.cardiacDimensions}</TableCell>
                                    <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{echocardiogram.ejectionFraction}</TableCell>
                                    <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{echocardiogram.valveFunction}</TableCell>
                                    <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{echocardiogram.movementCardiacWalls}</TableCell>
                                    <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{echocardiogram.pulmonaryArterialPressure}</TableCell>
                                    <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{echocardiogram.bloodFlow}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}
