import React from 'react'
import { MedicalHistory } from '../../../app/Models/MedicalHistory';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/configureStore';
import { patientSelectors } from '../patientSlice';
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { format } from 'date-fns';


interface Props {
    medicalHistories: MedicalHistory[];
}

export default function MedicalHistoryList({ medicalHistories }: Props) {
    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    return (
        <Box>
            <TableContainer component={Paper} className="table">
                <Table aria-label="patient table">
                    <TableHead>
                        <TableRow className="row">
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} >Date</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Previous Heart Disease</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">High Blood Pressure</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Diabetes</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Hyperlipidemia</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Obesity</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Smoking</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="body">
                        {medicalHistories.map((medicalHistory) => (
                            <TableRow key={medicalHistory.id} component={Link} to={`/medicalhistory/patient/${patient?.id}/medicalhistories/${medicalHistory.id}`} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">{medicalHistory.date ? format(new Date(medicalHistory.date), 'dd/MM/yyyy') : ''}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{medicalHistory.previousHeartDisease}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{medicalHistory.highBloodPressure}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{medicalHistory.diabetes}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{medicalHistory.hyperlipidemia}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{medicalHistory.obesity}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{medicalHistory.smoking}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
