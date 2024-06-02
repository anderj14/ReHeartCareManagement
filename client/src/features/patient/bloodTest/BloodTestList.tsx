import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { format } from 'date-fns';
import { BloodTest } from '../../../app/Models/bloodTest';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/configureStore';
import { patientSelectors } from '../patientSlice';

interface Props {
    bloodTests: BloodTest[];
}

export default function BloodTestList({ bloodTests }: Props) {
    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));

    return (
        <Box>
            <TableContainer component={Paper} className="table">
                <Table aria-label="patient table">
                    <TableHead>
                        <TableRow className="row">
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }}>Date</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Hemoglobin</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Hemarocit</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">White Blood Cell</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Platelets</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Glucose</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Triglycerides</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="body">
                        {bloodTests.map((bloodTest) => (
                            <TableRow key={bloodTest.id} component={Link} to={`/bloodtests/patient/${patient?.id}/bloodtests/${bloodTest.id}`} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">{bloodTest.date ? format(new Date(bloodTest.date), 'dd/MM/yyyy') : ''}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{bloodTest.hemoglobin}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{bloodTest.hematocrit}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{bloodTest.whiteBloodCell}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{bloodTest.platelets}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{bloodTest.glucose}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{bloodTest.triglycerides}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
}
