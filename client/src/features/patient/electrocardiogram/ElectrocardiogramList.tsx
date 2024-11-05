import { Electrocardiogram } from '../../../app/Models/electrocardiogram';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/configureStore';
import { patientSelectors } from '../patientSlice';
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import formatDateTime from '../../../app/components/formatDateTime';

interface Props {
    electrocardiograms: Electrocardiogram[];
}

export default function ElectrocardiogramList({ electrocardiograms }: Props) {
    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));
    const navigate = useNavigate();

    const handleRowClick = (electrocardiogramId: string) => {
        navigate(`/electrocardiogram/patient/${patient?.id}/electrocardiograms/${electrocardiogramId}`);
    };

    return (
        <Box>
            <TableContainer component={Paper} className="table">
                <Table aria-label="electrocardiogram table">
                    <TableHead>
                        <TableRow className="row">
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} >Date</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Heart Rhythm</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Intervals Segments</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Characteristic Waves</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Heart Rate</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Abnormalities</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Artifacts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="body">
                        {electrocardiograms.map((ecg) => (
                            <TableRow
                                key={ecg.id}
                                onClick={() => handleRowClick(ecg.id.toString())}
                                style={{ cursor: 'pointer' }}
                            >
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">
                                    {formatDateTime(ecg.date)}
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">
                                    {ecg.heartRhythm}
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">
                                    {ecg.intervalsSegments}
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">
                                    {ecg.characteristicWaves}
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">
                                    {ecg.heartRate}
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">
                                    {ecg.abnormalities}
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">
                                    {ecg.artifacts}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
