import { Link, useParams } from 'react-router-dom';
import { PhysicalExamination } from '../../../app/Models/physicalExamination';
import { useAppSelector } from '../../../app/store/configureStore';
import { patientSelectors } from '../patientSlice';
import { Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { format } from 'date-fns';


interface Props {
    physicalExaminations: PhysicalExamination[];
}

export default function PhysicalExaminationList({ physicalExaminations }: Props) {
    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table aria-label="physical examination table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }}>Date</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Time</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Duration</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Max Heart Rate</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Peak Pressure</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Exercise Induced Symptoms</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Abnormal ECG Findings</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {physicalExaminations.map((examination) => (
                            <TableRow
                                key={examination.id}
                                component={Link}
                                to={`/physicalExamination/patient/${patient?.id}/physicalExaminations/${examination.id}`}
                                style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                            >
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">{examination.date ? format(new Date(examination.date), 'dd/MM/yyyy') : ''}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{examination.time}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{examination.duration}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{examination.maxHeartRate}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{examination.peakPressure}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{examination.exerciseInducedSymptoms}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{examination.abnormalEcgFindings}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
