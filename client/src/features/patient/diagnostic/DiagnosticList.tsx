import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/configureStore';
import { patientSelectors } from '../patientSlice';
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Diagnostics } from '../../../app/Models/diagnostic';
import formatDateTime from '../../../app/components/formatDateTime';

interface Props {
    diagnostics: Diagnostics[];
}

export default function DiagnosticList({ diagnostics }: Props) {

    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));
    const navigate = useNavigate();

    const handleRowClick = (diagnosticId: string) => {
        navigate(`/diagnostic/patient/${patient?.id}/diagnostics/${diagnosticId}`);
    };
    return (
        <Box>
            <TableContainer component={Paper} className="table">
                <Table aria-label="patient table">
                    <TableHead>
                        <TableRow className="row">
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }}>Date</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Condition Name</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Classification Condition</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Severity</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Risk Assessment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="body">
                        {diagnostics.map((diagnostic) => (
                            <TableRow 
                            key={diagnostic.id} 
                            onClick={() => handleRowClick(diagnostic.id.toString())}
                            style={{ cursor: 'pointer' }}>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">{formatDateTime(diagnostic.date)}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{diagnostic.conditionName}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{diagnostic.classificationCondition}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{diagnostic.severity}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{diagnostic.riskAssessment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
