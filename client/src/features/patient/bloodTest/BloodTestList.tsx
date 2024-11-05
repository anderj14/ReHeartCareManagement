import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { BloodTest } from '../../../app/Models/bloodTest';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/configureStore';
import { patientSelectors } from '../patientSlice';
import formatDateTime from '../../../app/components/formatDateTime';

interface Props {
    bloodTests: BloodTest[];
}

export default function BloodTestList({ bloodTests }: Props) {
    const navigate = useNavigate();
    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    const handleRowClick = (bloodTestId: string) => {
        navigate(`/bloodtests/patient/${patient?.id}/bloodtests/${bloodTestId}`);
    };

    return (
        <Box>
            <TableContainer component={Paper} className="table">
                <Table aria-label="patient table">
                    <TableHead>
                        <TableRow className="row">
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }}>Date</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Hemoglobin</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Hematocrit</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">White Blood Cell</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Platelets</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Glucose</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Triglycerides</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="body">
                        {bloodTests.map((bloodTest) => (
                            <TableRow 
                                key={bloodTest.id} 
                                onClick={() => handleRowClick(bloodTest.id.toString())}
                                style={{ cursor: 'pointer' }}
                            >
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }}>
                                    {formatDateTime(bloodTest.date)}
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">
                                    {bloodTest.hemoglobin}g/dL
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">
                                    {bloodTest.hematocrit}%
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">
                                    {bloodTest.whiteBloodCell?.toLocaleString()} cells/µL
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">
                                    {bloodTest.platelets} cells/µL
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">
                                    {bloodTest.glucose}mg/dL
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">
                                    {bloodTest.triglycerides}mg/dL
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
