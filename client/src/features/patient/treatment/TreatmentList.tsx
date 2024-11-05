import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { Treatment } from '../../../app/Models/treatment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/configureStore';
import { patientSelectors } from '../patientSlice';
import formatDateTime from '../../../app/components/formatDateTime';

interface Props {
    treatments: Treatment[];
}

export default function TreatmentList({ treatments }: Props) {
    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));
    const navigate = useNavigate();
    
    const handleRowClick = (treatmentId: string) => {
        navigate(`/treatment/patient/${patient?.id}/treatments/${treatmentId}`);
    };
    
    return (
        <Box>
            <TableContainer component={Paper} className="table">
                <Table aria-label="treatment table">
                    <TableHead>
                        <TableRow className="row">
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }}>Date</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Medication</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Dosage</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Side Effects</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Treatment Monitoring</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Treatment Duration</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Treatment Outcome</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="body">
                        {treatments.map((treatment) => (
                            <TableRow 
                            key={treatment.id} 
                            onClick={() => handleRowClick(treatment.id.toString())}
                            style={{ cursor: 'pointer' }}>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">{formatDateTime(treatment.date)}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{treatment.medication}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{treatment.dosage}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{treatment.sideEffects}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{treatment.treatmentMonitoring}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{treatment.treatmentDuration}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{treatment.treatmentOutcome}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
