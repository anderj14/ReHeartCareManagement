import { useNavigate, useParams } from "react-router-dom";
import { CardiacCathStudy } from "../../../app/Models/cardiacCathStudy"
import { useAppSelector } from "../../../app/store/configureStore";
import { patientSelectors } from "../patientSlice";
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import formatDateTime from "../../../app/components/formatDateTime";

interface Props {
    cardiacCathStudies: CardiacCathStudy[];
}

export default function CardiacCathStudyList({ cardiacCathStudies }: Props) {
    const { id } = useParams<{ id: any }>();
    const patient = useAppSelector(state => patientSelectors.selectById(state, id));
    const navigate = useNavigate();

    const handleRowClick = (cardiacCathStudyId: string) => {
        navigate(`/cardiaccatheterizationstudy/patient/${patient?.id}/cardiaccathstudies/${cardiacCathStudyId}`);
    };

    return (
        <Box>
            <TableContainer component={Paper} className="table">
                <Table aria-label="patient table">
                    <TableHead>
                        <TableRow className="row">
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }}>Patient Name</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Date</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Blockage (Each Coronary Artery)</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Systolic Blood Pressure (Aorta)</TableCell>
                            <TableCell sx={{ fontSize: '18px', fontWeight: 400 }} align="right">Diastolic Blood Pressure (Aorta)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="body">
                        {cardiacCathStudies.map((cardiacCathStudy) => (
                            <TableRow 
                                key={cardiacCathStudy.id} 
                                onClick={() => handleRowClick(cardiacCathStudy.id.toString())}
                                style={{ cursor: 'pointer' }}
                            >
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} component="th" scope="row">
                                    {cardiacCathStudy.patient}
                                </TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{formatDateTime(cardiacCathStudy.date)}</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiacCathStudy.blockageEachCoronaryArtery} %</TableCell>
                                <TableCell sx={{ fontSize: '15px', fontWeight: 300 }} align="right">{cardiacCathStudy.systolicPressureAorta} mmHg</TableCell>
                                <TableCell sx={{ fontSize: '18px', fontWeight: 300 }} align="right">{cardiacCathStudy.diastolicPressureAorta} mmHg</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
