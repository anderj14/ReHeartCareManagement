import { MedicalHistory } from '../../../app/Models/MedicalHistory';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/configureStore';
import { patientSelectors } from '../patientSlice';
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import formatDateTime from '../../../app/components/formatDateTime';

interface Props {
    medicalHistories: MedicalHistory[];
}

export default function MedicalHistoryList({ medicalHistories }: Props) {
    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));
    const navigate = useNavigate();

    const handleRowClick = (cardiacCathStudyId: string) => {
        navigate(`/medicalhistory/patient/${patient?.id}/medicalhistories/${cardiacCathStudyId}`);
    };

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
                            <TableRow 
                            key={medicalHistory.id} 
                            onClick={() => handleRowClick(medicalHistory.id.toString())}
                            style={{ cursor: 'pointer' }}>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">{formatDateTime(medicalHistory.date)}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{medicalHistory.previousHeartDisease ? 'YES' : 'NO'}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{medicalHistory.highBloodPressure ? 'YES' : 'NO'}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{medicalHistory.diabetes ? 'YES' : 'NO'}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{medicalHistory.hyperlipidemia ? 'YES' : 'NO'}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{medicalHistory.obesity ? 'YES' : 'NO'}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{medicalHistory.smoking ? 'YES' : 'NO'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
